import NavBar from "./componenets/NavBar"
import Cookies from 'js-cookie'
import { useEffect, useState } from "react"



export default function Notifications(){
    const [notifications, setNotifications] = useState(["Loading..."])
    
    async function fetchData(){
        const userRawResponse = await fetch("http://127.0.0.1:8000/getUserByCookie/" + Cookies.get("user"))
        let user = await userRawResponse.json()
        console.log(user.likes)
        setNotifications(user.likes)
    }

      useEffect(()=> {
        fetchData();
      }, [])
    return (
        <>
            <h1>Notifications</h1>

            <div className = "notificationsContainer">
                {notifications.map((notification) => (
                    <Notification notification = {notification}></Notification>
                ))}
            </div>

            <NavBar></NavBar>
        </>
    )
}

function Notification({notification}){
    return(
        <div className = "notification">
            <div className = "profilePic"></div>
            <p>{notification}</p>
        </div>
    )
}