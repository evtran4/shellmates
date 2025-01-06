import NavBar from "./componenets/NavBar";
import Message from "./componenets/Message";
import Cookies from 'js-cookie'

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Chat(){
    const [messages,setMessages] = useState([])
    const {state} = useLocation();
    const fetchMessages = async () => {
        let rawMessages = await fetch("http://127.0.0.1:8000/getMessageBatch/" + Cookies.get("user") + "/" + state.displayedUser.cookie);
        let process = await rawMessages.json()
        setMessages(process)
    }

    useEffect(() => {
        fetchMessages()
    },[])

    let currMessage = {
        text: "",
        sender: Cookies.get("user"),
        to: state.displayedUser.cookie,
        time: ""
    }

    const handleSend = () => {
        let currText = document.getElementById("chatTextbox").value;
        if(currText.trim() != ""){
            currMessage.text = document.getElementById("chatTextbox").value;
            console.log("")
            messages.push(currMessage)
            setMessages([...messages]);
        }
        document.getElementById("chatTextbox").value = "";
        const myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            text: currMessage.text,
            sender: currMessage.sender,
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
            <p>{state.displayedUser.name}</p>
        </div>
        
        <div className = "messagesContainer">
            {messages.map(message =>(
                <Message user = {Cookies.get("user")} text = {message.text} sender = {message.sender}></Message>
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