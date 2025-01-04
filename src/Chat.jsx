import NavBar from "./componenets/NavBar";
import Message from "./componenets/Message";
import Cookies from 'js-cookie'

import { useState } from "react";
let temp = [
    {
        text: "Hello"
    },
    {
        text: "World!"
    },
    {
        text: "This is a message that i am writing to test out my message bubbles on this dating app. so far, they look pretty fire!!!"
    }
]
export default function Chat(){
    const [messages,setMessages] = useState([])
    let currMessage = {
        text: "",
        from: Cookies.get("user"),
        to: "",
        time: ""
    }

    const handleSend = () => {
        let currText = document.getElementById("chatTextbox").value;
        if(currText.trim() != ""){
            currMessage.text = document.getElementById("chatTextbox").value;
            messages.push(currMessage)
            setMessages([...messages]);
        }
        document.getElementById("chatTextbox").value = "";
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            text: currMessage.text,
            sender: currMessage.from,
            to: currMessage.to,  
            time: ""
        });
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = fetch("http://127.0.0.1:8000/sendMessage", requestOptions)
    }

    return(
        <>
        <div className = "chatHeader">
            <div></div>
            <div className = "profilePic"></div>
            <p>Name</p>
        </div>
        <div className = "messagesContainer">
            {messages.map(message =>(
                <Message text = {message.text}></Message>
            ))}
        </div>
        <div className = "chatFooter">
            <input id = "chatTextbox" className = "chatTextbox" placeholder="Send Message..." onChange={(e) => {}}></input>
            <button className = "sendButton" onClick = {handleSend}>S</button>
        </div>
            <NavBar></NavBar>
        </>
    )
}