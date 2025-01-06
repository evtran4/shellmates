import { useState, useEffect } from "react"
import NavBar from "./componenets/NavBar";
import { useNavigate } from "react-router-dom";
export default function Messages(){
  const [allUsers, setUsers] = useState([]);
  let navigate = useNavigate()

  async function fetchData(){
    const allUsersRawResponse = await fetch("http://127.0.0.1:8000/getAllUsers")
    setUsers(await allUsersRawResponse.json());
  }
  let firstRender = true;
  useEffect(()=> {
    if(firstRender == false){
        fetchData();
    }
    else{
        firstRender = false;
    }
  }, [])

    return(
        <>
            <div className = "chatsContainer">
                {allUsers.map(user => (
                    <div className = "chatContainer" onClick = {() => {
                        navigate("/Chat", { state: { displayedUser: user} })
                    }}>
                        <div className="profilePic"></div>
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>
            <NavBar></NavBar>
        </>
    )
}