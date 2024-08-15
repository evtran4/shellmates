import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EmailVerification from './EmailVerification'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import CreateAccount from './CreateAccount';
import Login from './componenets/Login';

const AuthRouter = () => {
  return(
      <Router>
          <Routes>
              <Route path = "/" element = {<App/>}></Route>
              <Route path = "/EmailVerification" element = {<EmailVerification/>}></Route>
              <Route path = "/CreateAccount" element = {<CreateAccount/>}></Route>
              <Route path = "/Login" element = {<Login/>}></Route>
          </Routes>
      </Router>
  )
}

function App() {
  let navigate = useNavigate()
  const [user, setUser] = useState({
    name: "Loading..."
  })

  async function fetchUser(){
    const response = await fetch("http://127.0.0.1:8000/getUserByCookie/" + Cookies.get("user"))
    setUser(await response.json())
  }

  useEffect(()=> {
    if(Cookies.get("user") == null){
      navigate("/Login")
    }
    else{
      fetchUser();
    }
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Welcome, + {user.name}</h2>
      <button onClick = {() => {Cookies.remove("user"); navigate("/Login")}}>Log out</button>
    </>
  )
}

export default AuthRouter;