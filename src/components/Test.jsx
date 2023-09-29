import algosdk,{ AtomicTransactionComposer, OnApplicationComplete } from "algosdk";
import { Buffer } from 'buffer';
import appspec from '../application.json'



async function ski() {
const baseServer = 'https://testnet-algorand.api.purestake.io/ps2'
const port = '';
const token = {
    'X-API-Key': 'LFIoc7BZFY4CAAHfCC2at53vp5ZabBio5gAQ0ntL'
}
const algodclient = new algosdk.Algodv2(token, baseServer, port);
const suggestedParams = await algodclient.getTransactionParams().do();
const userMnemonic = "forest retreat cart wave tell slim kick labor hole royal coast unaware robot affair castle limb fossil soft antenna betray frown roof leisure ability confirm";
const userAccout =  algosdk.mnemonicToSecretKey(userMnemonic);
console.log(algodclient);
const contract = new algosdk.ABIContract(appspec.contract);
const signer = algosdk.makeBasicAccountTransactionSigner(userAccout);

const atc = new algosdk.AtomicTransactionComposer();
atc.addMethodCall({
    appID:394681975,
    method:algosdk.getMethodByName(contract.methods, 'account_optin'),
    methodArgs: ["Danger","PATIENT","44/44/44"],
    sender: "JVM6EULRE7GISC4MF4VP2SVWMCLHBXTXASRHMPI4WA6KTQACCMDKDWAM5U",
    suggestedParams:suggestedParams,
    signer: signer,
    onComplete: OnApplicationComplete.OptInOC
})
console.log(atc);

console.log(atc.execute(algodclient,4))

// let optin = algosdk.makeApplicationOptInTxn("LRHLFXTCU3TA2NBTCUMANOZRDRW7J3I63TYGZJFZR2ZY3NUX4R6YFCN2TA",suggestedParams,392834643,[new Uint8Array(Buffer.from("x")),new Uint8Array(Buffer.from("satttty")),new Uint8Array(Buffer.from("PATIENT")), new Uint8Array(Buffer.from("9/9/9"))]);

// let txId = optin.txID().toString();
//     // Sign the transaction
//     let signedTxn = optin.signTxn(userAccout.sk);
//     console.log("Signed transaction with txID: %s", txId);

//     // Submit the transaction
//     await algodclient.sendRawTransaction(signedTxn).do()                           
//         // Wait for transaction to be confirmed
//        const confirmedTxn = await algosdk.waitForConfirmation(algodclient, txId, 4);
//         console.log("confirmed" + confirmedTxn)

//         //Get the completed Transaction
//         console.log("Transaction " + txId + " confirmed in round " + confirmedTxn["confirmed-round"]);

        

}

function Test(){
    ski();
    return (<h1>test</h1>);
}

export default Test;
