def user_serializer(user) -> dict:
    return {
        "name": user["name"],
        "email": user["email"],
        "password": user["password"],
        "major": user["major"],
        "bio": user["bio"],
        "cookie": user["cookie"]
    }


