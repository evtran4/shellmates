import NavBar from "./componenets/NavBar"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function logout(){
    Cookies.remove("user")
}

export default function Settings(){
    let navigate = useNavigate()
    return (
        <>
            <h1>Settings</h1>
            <button onClick = {() => {logout(); navigate("/Login")}}>Log out</button>
            <NavBar></NavBar>
        </>
    )
}

