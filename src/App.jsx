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
import Card from './componenets/Card';
import SwipeButtons from './componenets/SwipeButtons';
import NavBar from './componenets/NavBar';
import Notifications from './Notifications';
import Settings from './Settings';
import Chat from './Chat';
import Messages from './Messages';
//pull 10 users
//after each swipe, remove user from 10 and from unscrolled database
//end of scroll, pull 10 more
const AuthRouter = () => {
  return(
      <Router>
          <Routes>
              <Route path = "/" element = {<App/>}></Route>
              <Route path = "/EmailVerification" element = {<EmailVerification/>}></Route>
              <Route path = "/CreateAccount" element = {<CreateAccount/>}></Route>
              <Route path = "/Login" element = {<Login/>}></Route>
              <Route path = "/Notifications" element = {<Notifications/>}></Route>
              <Route path = "/Settings" element = {<Settings/>}></Route>
              <Route path = "/Messages" element = {<Messages/>}></Route>
              <Route path = "/Chat" element = {<Chat/>}></Route>
          </Routes>
      </Router>
  )
}
let scroll = 0;
const loading = {
  id: "Loading...",
  name: "Loading...",
  major: "Loading...",
  tags: ["Loading..."],
  bio: "Loading..."
}
let user = loading;

function App() {
  let navigate = useNavigate()
  const [allUsers, setUsers] = useState([]);

  async function fetchData(){
    const userRawResponse = await fetch("http://127.0.0.1:8000/getUserByCookie/" + Cookies.get("user"))
    user = await userRawResponse.json()
    const allUsersRawResponse = await fetch("http://127.0.0.1:8000/getBatch/" + user.cookie)
    setUsers(await allUsersRawResponse.json());
    console.log("setting user")
    changeUser()
  }
  let firstRender = true;
  useEffect(()=> {
      if(Cookies.get("user") == null){
        navigate("/Login")
      }
      else{
        if(firstRender == false){
          user = loading;
          setUsers([loading]);
          scroll = 0;
          fetchData();
        }
        else{
          firstRender = false;
        }
      }
  }, [])

  async function handleSwipe(userToSend, pos){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
        "user" : user,
        "displayed": userToSend
    });
  
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    if(pos > 70){    
      const response = await fetch("http://127.0.0.1:8000/swipeRight", requestOptions)
    }
    const response = await fetch("http://127.0.0.1:8000/swipe", requestOptions)
    user.seen.push(userToSend.cookie)
  }

  function changeUser(){
    console.log(scroll)
    let nextUser = allUsers[scroll];
    console.log(nextUser.id + " and " + user.id);
    if(nextUser.id != user.id){
      // setDisplayedUser(nextUser);
      scroll++;
    }
    else{
      scroll++;
      changeUser()
    }
  }

  return (
    <>
      <h1>{user.name}</h1>
      <div className = "cardSwipe">
        {allUsers.map((user) => (
          <Card handleSwipe = {handleSwipe} allUsers = {allUsers} setUsers = {setUsers} displayedUser = {user}></Card>
        ))}
      </div>
      <NavBar></NavBar>
      
    </>
  )
}

export default AuthRouter;