// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect,useState } from 'react';
import {PeraWalletConnect} from "@perawallet/connect"
import Home from './Home.jsx';
import Signup from './Signup.jsx';
import NavbarProfile from './NavbarProfile.jsx';
import ScanQR from './ScanQR.jsx';

const AppRouter = () => {
  const peraWallet = new PeraWalletConnect({
    // Default chainId is "4160"
    chainId: "416002",
    shouldShowSignTxnToast: false
});
const [accountAddress, setAccountAddress] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const isConnectedToPeraWallet = !!accountAddress;

  useEffect(() => {
    // Reconnect to the session when the component is mounted
    peraWallet.reconnectSession().then((accounts) => {
      // Setup the disconnect event listener
      peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

      if (accounts.length) {
        setAccountAddress(accounts[0]);
      }
    });
  }, []);
  
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
    peraWallet.disconnect();
    setAccountAddress(null);
 }

 useEffect(() => {
  async function sendRequest() {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_add: accountAddress,
        }),
      });
      const responseData = await response.json();
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
              <Route path="/doctorprofile" element={<NavbarProfile />} />
              <Route path="/patientprofile" element={<NavbarProfile />} />
              <Route path="/profile_qr" element={<ScanQR accountAddress={accountAddress} />} />
          </Routes>
        </Router>
  );
};

export default AppRouter;
