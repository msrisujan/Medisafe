// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {PeraWalletConnect} from "@perawallet/connect"
import Home from './Home.jsx';
import Signup from './Signup.jsx';
import NavbarProfile from './NavbarProfile.jsx';
import ScanQR from './ScanQR.jsx';
import DoctorAccess from './DoctorAccess.jsx'
import { Navigate } from 'react-router-dom';
import axios from 'axios';


const AppRouter = () => {
  const peraWallet = new PeraWalletConnect({
    // Default chainId is "4160"
    chainId: "416002",
    shouldShowSignTxnToast: false
});


const restapi = axios.create({
  baseURL: 'http://127.0.0.1:5000',
  withCredentials: true
});

restapi.interceptors.request.use(
  function(config) {
    config.headers.withcredentials = true;   
    return config;
  },
  function(err) {
    console.log(err);
  }
);

const [accountAddress, setAccountAddress] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const isConnectedToPeraWallet = !!accountAddress;

  function reconnectWallet() {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
      }
    });
  }
  reconnectWallet();

  
  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }
  function handleDisconnectWalletClick() {
    console.log("disconnect");
    peraWallet.disconnect();
    setAccountAddress(null);
    // setLoggedIn(false);
    // setIsDoctor(false);
    // setIsPatient(false);
 }

 useEffect(() => {
  async function sendRequest() {
    try {
      const response = await restapi.post("/login",JSON.stringify({
        user_add: accountAddress,
      }),{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const responseData = response.data;
      if ( responseData.statusCode === 302 ) {
        console.log(responseData);
        setLoggedIn(true);
      }
      if ( responseData.statusCode === 200 ) {
        console.log(responseData);
        setLoggedIn(true);
        if(responseData.role === "DOCTOR"){
          setIsDoctor(true);
        }
        else{
          setIsPatient(true);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
  if(accountAddress !== null){
    sendRequest();
  }

 },[accountAddress]);



  
  return (
        <Router>
          <Routes>
              <Route exact path="/" element={<Home loggedIn={loggedIn} isDoctor={isDoctor} isPatient={isPatient} isConnectedToPeraWallet={isConnectedToPeraWallet} handleConnectWalletClick={handleConnectWalletClick} handleDisconnectWalletClick={handleDisconnectWalletClick} />} />
              <Route path="/signup" element={<Signup peraWallet={peraWallet} accountAddress={accountAddress} />} />
              <Route path="/doctorprofile" element={<NavbarProfile loggedIn={loggedIn} handleDisconnectWalletClick={handleDisconnectWalletClick} />} />
              <Route path="/patientprofile" element={<NavbarProfile loggedIn={loggedIn} handleDisconnectWalletClick={handleDisconnectWalletClick}/>} />
              <Route path="/profile_qr" element={<ScanQR restapi={restapi} loggedIn={loggedIn} peraWallet={peraWallet} accountAddress={accountAddress} />} />
              <Route path="/doctor_access" element={<DoctorAccess restapi={restapi}/>} />
          </Routes>
        </Router>
  );
};

export default AppRouter;
