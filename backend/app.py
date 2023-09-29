from flask import Flask, request,session,render_template
from algosdk.v2client import algod,indexer
from algosdk import account, mnemonic, encoding
from algosdk import util,transaction,error
from beaker import client,sandbox,consts
import contract
import json,base64
from flask_cors import CORS
import base64
from PIL import Image, ImageDraw, ImageFont
import datetime
import mysql.connector
from mysql.connector import errors
import qrcode,pickle
import requests,hashlib

##### GLOBAL CONSTANTS ##########
INDEXER_ENDPOINT="https://testnet-algorand.api.purestake.io/idx2"
ALGOD_ENDPOINT="https://testnet-algorand.api.purestake.io/ps2"
APP_ID=394681975
API_KEY="LFIoc7BZFY4CAAHfCC2at53vp5ZabBio5gAQ0ntL"
CREATOR_ADDRESS="CVPT5JBQ7RCXDVSRW7TSFJPBKRTDCOETDZE6GQKPN7NVEKDXIJWN3FKEAM"
TOKEN=''
HEADERS = {
        "X-API-Key": API_KEY,
    }
DEPLOYED_URL="http://127.0.0.1:5000/"
PINATA_JWT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwMDQ1NGViOS0zYjM1LTRjYjUtYWE5MC01MTVjOTdmYzIwN2YiLCJlbWFpbCI6Ijk1MDU2NDQ2NzhwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWQwNTU3YWU3ZmNiOGZhZTdkZjYiLCJzY29wZWRLZXlTZWNyZXQiOiI5MGI1MjVhYWVmNDFkZjdkNGFkZmY0ZjE3NjA2MDFjMTRlYTE5MGI2MjkwOTc0MDMwODI4OTZjY2ExZmE5NDkxIiwiaWF0IjoxNjg0NTI4OTg5fQ.twfAGH-iWVc_SCumHfMVJ_9yiBjO2E5E2iuwsNf1doc"
PINATA_KEY="ed0557ae7fcb8fae7df6"
PINATA_SECRET_KEY="90b525aaef41df7d4adff4f1760601c14ea190b629097403082896cca1fa9491"
DB_NAME='medisafe'
DB_USER='root'
DB_PASSWORD=''
DB_HOST='localhost'
#################################


def decodeB64(str:str) -> str:
    return base64.b64decode(str).decode()

def hashTuple(tup:tuple) -> str:
    tuple_str = str(tup)
    hash_object = hashlib.sha256()
    hash_object.update(tuple_str.encode('utf-8'))
    hash_hex = hash_object.hexdigest()
    return hash_hex



indexer_client = indexer.IndexerClient(TOKEN,INDEXER_ENDPOINT, HEADERS)


class User():

    user_add=None

    def __init__(self,user_add:str) -> None:
        self.user_add = user_add
        self.is_opted = self.get_is_opted()
        if(self.is_opted):
            self.retrive_local_state()

    def get_is_opted(self) -> bool:
        user_add = self.user_add
        res=indexer_client.lookup_account_application_local_state(user_add,application_id=APP_ID)
        if len(res["apps-local-states"])>0:
            if res['apps-local-states'][0]['id']==APP_ID:
                return True
        return False
    
    def retrive_local_state(self)-> None:
        if(self.is_opted):
            res=indexer_client.lookup_account_application_local_state(self.user_add,application_id=APP_ID)
            self.local_state = dict()
            for pair in res['apps-local-states'][0]['key-value']:
                key= decodeB64(pair['key'])
                value = pair['value']['uint'] if pair['value']['type']==2 else decodeB64(pair['value']['bytes'])
                self.local_state[key]=value
        else:
            self.local_state = None
        return self.local_state
    
    def generate_request_hash(self,patient_add:str,request_type:int,note:str)->str:
        if self.retrive_local_state()!=None:
            if(self.local_state['role']=='DOCTOR'):
                previous_hash=self.local_state['reserved_local_valuerequest_hash']
                time_stamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                tup = tuple(self.user_add,patient_add,request_type,note,time_stamp,previous_hash)
                return {"doctor_add":self.user_add,"patient_add":patient_add,"request_type":request_type,"note":note,
                        "time_stamp":time_stamp,"previous_hash":previous_hash,"current_hash":hashTuple(tup)}
        return None
    
    def update_request_hash():
        con = mysql.connector.connect(host=DB_HOST , user=DB_USER, password=DB_PASSWORD, database=DB_NAME)
        cursor = con.cursor(buffered=False, dictionary=True)
        
                




app = Flask(__name__)
app.secret_key = 'algo-project'
CORS(app,resources={r"/*": {"origins": "*"}})



@app.route('/login',methods=['POST'])
def login():
    if session.get('user'):
        return json.dumps({"statusCode":999,"notify":"Logout First to Login Again.!!"})
    else:
        user_add = request.form.get('user_add')
        user = User(user_add=user_add)
        if(user.is_opted):
            session['user']=pickle.dumps(user)
            return json.dumps({"statusCode":200,"notify":"Login Successfull.!!"})
        else:
            return json.dumps({"statusCode":302,"href":"/register","notify":"Opt In to Our Dapp To Continue.!!"})



@app.route('/user_info',methods=['POST'])
def user_info():
    if session.get('user'):
        user = pickle.loads(session.get('user'))
        return json.dumps({"statusCode":200,"data":{"user_add":user.user_add,"is_opted":user.is_opted,"local_state":user.retrive_local_state()}})
    else:
        return json.dumps({"statusCode":302,"href":"/login","notify":"Login To Continue.!!"})



@app.route('/auth',methods=['GET'])
def auth():
    if session.get('user'):
        return json.dumps({"statusCode":200})
    return json.dumps({"statusCode":302,"href":"/login","notify":"Login To Continue.!!"})



@app.route('/logout',methods=['GET'])
def logout():
    if session.get('user'):
        session.pop('user')
    return json.dumps({"statusCode":302,"href":"/","notify":"Logout Successfull.!!"})

    



# /auth -
#@app.route('/auth')

# @app.route('/login', methods=['POST'])
# def login():
#     indexer_client = indexer.IndexerClient(TOKEN,INDEXER_ENDPOINT, HEADERS)
#     #aps=indexer_client.applications(APP_ID)
#     public_add = request.form.get('public_add')
#     #creator=aps['application']['params']['creator']
#     ds = indexer_client.account_info(public_add)
#     return ds
    
#     # Get the public address from the request parameters
    



if __name__ == '__main__':
    app.run(debug=True)