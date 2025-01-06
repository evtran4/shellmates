def user_serializer(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "password": user["password"],
        "major": user["major"],
        "tags" : user["tags"],
        "likes": user["likes"],
        "bio": user["bio"],
        "seen": user["seen"],
        "dealbreakers": user["dealbreakers"],
        "cookie": user["cookie"]
    }

def message_serializer(message) -> dict:
    return {
        "sender": message["sender"],
        "to": message["to"],
        "text": message["text"],
        "time": message["time"]
    }





