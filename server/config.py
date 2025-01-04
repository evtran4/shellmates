from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
import certifi
from fastapi_mail import ConnectionConfig 

# Username: evtran
# Password: idr....

uri = "mongodb+srv://evtran:ec5141@shellmates.shkzj.mongodb.net/?retryWrites=true&w=majority&appName=ShellMates"
# Create a new client and connect to the server
client = MongoClient(uri, tlsCAFile=certifi.where())

db = client.mainDB
users_collection = db["Users"]
chats_collection = db["Chats"]




mailConf = ConnectionConfig(
    MAIL_USERNAME ="shellmatesumd@gmail.com",
    MAIL_PASSWORD = "rxkx gyjo vkyy kngi",
    MAIL_FROM = "shellmatesumd@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="ShellMates",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)