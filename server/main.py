from typing import List
from fastapi import BackgroundTasks, FastAPI
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from starlette.responses import JSONResponse
from serializers import user_serializer
from fastapi.middleware.cors import CORSMiddleware
import random
from config import users_collection, mailConf
from schemas import EmailSchema, AccountSchema
import json
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def generateVerificationEmail(code):
    return """<p>Your ShellMates verification code is:  """ + code + """. If you did not request this code, please ignore this email.</p>"""



@app.post("/createAccount")
async def createAccount(account: AccountSchema):
    id = users_collection.insert_one(dict(account))
    account = user_serializer(users_collection.find_one({"_id": id.inserted_id}))

@app.get("/getUserByCookie/{cookie}")
async def getUser(cookie: str):
    user = users_collection.find_one({"cookie" : cookie})
    if user == None:
        return {"cookie" : -1}
    else:
        user = user_serializer(user)
        return user

@app.get("/getAllUsers")
async def getAllUsers():
    rawUsers = users_collection.find({})
    users = []
    for rawUser in rawUsers:
        user = user_serializer(rawUser)
        users.append(user)
    return users

@app.get("/getBatch/{cookie}")
async def getBatch(cookie: str):
    seen = users_collection.find_one({"cookie": cookie},{"_id": 0, "seen":1}).get("seen")
    rawBatch = users_collection.find({"cookie" : {'$nin': seen, '$ne':cookie}}).limit(10)  #limit searches to user preferences 
    batch = []
    for user in rawBatch:
        batch.append(user_serializer(user))
    return batch

@app.post("/swipe")
async def scroll(user: AccountSchema, displayed: AccountSchema):
    seen = user.seen
    print(seen)
    seen.append(displayed.cookie)
    print(seen)
    users_collection.update_one({'cookie' : user.cookie}, { '$set' : { "seen" : seen}})
    return seen

@app.get("/clearLikes")
async def swipeRight():
    users_collection.update_many({}, { '$set' : { "likes" : []}})
    return {"status" : "ok"}

@app.get("/clearSeen")
async def swipeRight():
    users_collection.update_many({}, { '$set' : { "seen" : []}})
    return {"status" : "ok"}

@app.get("/clearSeenForUser/{cookie}")
async def swipeRight(cookie: str):
    users_collection.update_one({"cookie" : cookie}, { '$set' : { "seen" : []}})
    return {"status" : "ok"}

@app.post("/swipeRight")
async def swipeRight(user: AccountSchema, displayed: AccountSchema):
    currentLikes = displayed.likes
    currentLikes.append(user.name + " sent you a like")
    users_collection.update_one({'cookie' : displayed.cookie}, { '$set' : { "likes" : currentLikes}})
    return currentLikes


@app.get("/getUserByLogin/{email}/{password}")
async def getUser(email: str, password: str):
    user = users_collection.find_one({"email" : email, "password" : password})
    if user == None:
        return {"cookie" : "-1"}
    else:
        user = user_serializer(user)
        return user

@app.get("/checkValidEmail/{email}")
async def checkEmail(email: str):
    user = users_collection.find_one({"email" : email})
    if user != None:
        return {"valid" : False}
    else:
        return {"valid" : True}

@app.post("/email/{code}")
async def send(email: EmailSchema, code: str) -> JSONResponse:
    html = generateVerificationEmail(code)
    message = MessageSchema(
        subject="Verify your Terpmail Address",
        recipients=email.dict().get("email"),
        body=html,
        subtype=MessageType.html)

    fm = FastMail(mailConf)
    await fm.send_message(message)
    return {"message": "email has been sent"}