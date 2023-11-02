import React,{useEffect, useState} from "react";
import { QRCodeSVG } from "qrcode.react";
import { QrReader } from "react-qr-reader";
import "../ScanQR.css";
import { Navigate,Link } from "react-router-dom";
import algosdk,{ OnApplicationComplete } from "algosdk";
import appspec from '../application.json'
import { Buffer } from 'buffer';



function PatientScanQR({restapi,accountAddress,peraWallet,handleDisconnectWalletClick}) {
    const [showCamera, setShowCamera] = useState(false);
    const toggleCamera = () => {
        setShowCamera(!showCamera);
      };
    const [qrscan, setQrscan] = useState(' ');

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBlurred, setIsBlurred] = useState(false);
    const [requestAccess, setRequestAccess] = useState(false);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [data, setData] = useState({});
    const [err, setErr] = useState('');

  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
      setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
    };
    const hamburger_class = isMenuOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring';
    const blur_class = isBlurred ? 'blur' : '';

    useEffect(() => {
        // when page loads for the first time send a request to the server to get the data
        async function sendRequest() {
          try {
            const response = await restapi.get("/user_info", {
              method: "GET",
            });
            const responseData = response.data;
            if (responseData.statusCode === 200) {
              console.log(responseData.data);
              setRole(responseData.data.local_state.role);
              setName(responseData.data.local_state.name)
            }
            else{
              <Navigate to="/" />
            }
          } catch (error) {
            console.log(error);
          }
        }
        sendRequest();
      }
      , []);

      function peraWalletSigner(peraWallet){
        return async (txnGroup, indexesToSign) => {
          return await peraWallet.signTransaction([
            txnGroup.map((txn, index) => {
              if (indexesToSign.includes(index)) {
                return {
                  txn,
                  signers: [accountAddress],
                };
              }
      
              return {
                txn,
                signers: [],
              };
            }),
          ]);
        };
      }
    
    async function ski(obj) {
    const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
    const port = '';
    const token = {
        'X-API-Key': 'LFIoc7BZFY4CAAHfCC2at53vp5ZabBio5gAQ0ntL'
    }
    const algodclient = new algosdk.Algodv2(token, baseServer, port);
    const suggestedParams = await algodclient.getTransactionParams().do();
    const contract = new algosdk.ABIContract(appspec.contract);
    const atc = new algosdk.AtomicTransactionComposer();
    console.log("ac add",accountAddress);
    
    atc.addMethodCall({
        appID:394681975,
        method:algosdk.getMethodByName(contract.methods, 'add_request_hash'),
        methodArgs: [obj.current_hash],
        note: new Uint8Array(Buffer.from(JSON.stringify(obj).length<1024?JSON.stringify(obj):'')),
        sender: accountAddress,
        suggestedParams:suggestedParams,
        signer: peraWalletSigner(peraWallet),
        onComplete: OnApplicationComplete.NoOpOC
    })
    console.log(atc);

    atc.execute(algodclient,4)
      .then(async result => {
        console.log(result);
        const response = await restapi.post("/update_request_hash",JSON.stringify({
              obj: obj,
            }),
            {headers: {
              "Content-Type": "application/json",
            }}
          );
          const responseData = response.data;
          if ( responseData.statusCode === 302 ) {
    
            console.log(responseData);
            window.location.href = "/";
          }
          if ( responseData.statusCode === 200 ) {
            console.log(responseData);
            alert(responseData.notify);
            window.location.reload();
          }
          else{
            alert(responseData.notify);
          }
      })
      .catch(error => {
        // console.error(error);
        alert(error)
      });
    }

      async function handleRequestAccess(){
        var btn = document.getElementById('request_btn');
        btn.disabled=true;
        var request_type = document.getElementById('request_type').value;
        var note = document.getElementById('data').value
        if(note.length<1){
          alert("Enter note");
          btn.disabled=false;
          return;
        }
        if(note.length>500){
          alert("note must be less than 500 chars");
          btn.disabled=false;
          return;
        }
        var response = await restapi.post('/generate_request_hash',JSON.stringify({
          patient_add:data.user_add,
          request_type:request_type,
          note:note
        }),{headers:{
          "Content-Type": "application/json",
        }})
        var responseData = response.data
        console.log(responseData);
        if(responseData.statusCode===200){
          console.log(responseData.obj);
          await ski(responseData.obj)
        }
        else if(responseData.statusCode==500 || responseData.statusCode==403){
          alert(responseData.notify);
        }
        else{
          window.location.href="/";
        }
        btn.disabled=false;
      }
    return (
        <div className="navbar-container scan-body">
      <nav className="navbar"> {/* Use the class name directly */}
        <div className="logo">
          <img src="logo.png" alt="Medisafe Logo" />
          <span className='nav-heading'>MEDISAFE</span>
        </div>
        <div className="profile">
          <img src="profile.png" alt="Profile Pic" />
          {/* <span>Hello, {userName}</span> */}
          <button class={hamburger_class} type="button" onClick={toggleMenu}>
            <span class="hamburger-box">
              <span class="hamburger-inner"></span>
            </span>
          </button>  
        </div>
      </nav>
        <div className={`card ${blur_class}`}>
            <div class="tools">
                <div class="circle">
                  <span class="red box"></span>
                </div>
                <div class="circle">
                  <span class="yellow box"></span>
                </div>
                <div class="circle">
                  <span class="green box"></span>
                </div>
              </div>
            {showCamera ? (
          <div className="camera">
            <QrReader
                delay={300}
                onResult={async(result, error) => {
                  console.log(result);
                    if (!!result) {
                      console.log(result);
                      const response = await restapi.post("/get_scan_details",JSON.stringify({
                        add: result?.text,
                      }), {
                        headers: {
                          "Content-Type": "application/json",
                        }
                      });
                      const responseData = response.data;
                      if ( role === "DOCTOR" ) {
                        if ( responseData.statusCode === 403 ) {
                          alert(responseData.notify);
                        }
                        else if ( responseData.statusCode === 200 ) {
                          setData(responseData.data);
                          if(responseData.data.is_having_access === true){
                            setErr('You have General access for data of this Patient, go to Patients Section for Accessing Data')
                          }
                          else if(responseData.data.is_having_emergency === true){
                            setErr('You have Emergency access for data of this Patient, go to Patients Section for Accessing Data')
                          }
                          else if(responseData.data.is_pending === true){
                            setErr('You have Pending Request for data of this Patient, go to Patients Section for Accessing Status of Request')
                          }
                          else{
                            setRequestAccess(true);
                          }
                        }
                      }
                      else if ( role === "PATIENT" ) {
                        if ( responseData.statusCode === 403 ) {
                          alert(responseData.notify);
                        }
                        else if ( responseData.statusCode === 200 ) {
                          if(responseData.data.is_having_access === true){
                            
                          }
                          else if(responseData.data.is_having_emergency_access === true){
                            console.log(responseData.data.patient_history)
                          }
                          else{
                            
                          }
                        }
                      }

                    }
          
                    if (!!error) {
                      //console.info(error);
                    }
                  }}

                style={{ height: '20px', width: '20px' }}
                /> 
            <a href={qrscan}>link:{qrscan}</a>
            
          </div>
        ) : (
            <div className="user-info">
              <div className="qr">
                <QRCodeSVG
                    value={`${accountAddress}`}
                    bgColor = {"#fff"}
                    fgColor = {"#000"}
                />
              </div>
                <p>Username: {name}</p>
                <p>Role: {role}</p>
            </div>
        )}                 
        <button onClick={toggleCamera} className="button1">
          {showCamera ? 'Show QR' : 'Scan QR'}
        </button>
      </div>
      {
        // if length of data is greater than 0 then show the data
        Object.keys(data).length > 0 ? (
          <div className="patient-details">
            <div className="patient-info">
              <p>name: {data.patient_details.name}</p>
              <p>dob: {data.patient_details.DOB}</p>
              <p>role: {data.patient_details.role}</p>
              <p>address: {data.user_add}</p>
            </div>
          </div>
        ) : (
          <div></div>
        )
      }



      {
        requestAccess ? (
          <div className="request-access">
              <select id='request_type'>
              <option value="1">Normal Access</option>
              <option value="2">Emergency Access</option>
              </select>
              <textarea id='data' placeholder="Enter your note"></textarea>
              <button id='request_btn' onClick={handleRequestAccess}>Request Access</button>
          </div>
        ) : (
          <div>{err}</div>
        )
      }
    
      <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link className="button" to="/patient_logs">Request Logs</Link>        
        <Link className="button" to="/patient_qr">QR Scan</Link>
        <hr />
        <button className="button" onClick={handleDisconnectWalletClick}>Logout</button>
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
      </div>
  );
}

export default PatientScanQR;