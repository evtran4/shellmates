
import Cookies from 'js-cookie'
import AuthRouter from './App';
import {useNavigate, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProgressBar from './componenets/ProgressBar';
import OTPInput from './componenets/OTPInput';
import EmailVerification from './EmailVerification';

let account = {
    email: "",
    password: "",
    name: "",
    major: "",
    bio: "",
    cookie: ""
}

function createCookie(){
    let cookie = ""
    for(let i = 0; i < 50; i++){
        let num = ~~(Math.random() * (10));
        cookie += num + ""
    }
    Cookies.set("user", cookie.toString(), {expires: 1})
    account.cookie = cookie.toString();
}

function createAcc(){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "name": account.name,
      "email": account.email,
      "password": account.password,
      "major": account.major,
      "bio": account.bio,
      "cookie": account.cookie
      
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    console.log(account)
    const response =  fetch("http://127.0.0.1:8000/createAccount", requestOptions)
}

export default function CreateAccount(){
    const [stepNum, setStepNum] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        account.email = email
        account.password = password
    }, [email, password])

    return(
        <>
        {stepNum != 0? <ProgressBar step = {stepNum} steps = {4}></ProgressBar> : ""}
        <div className = "accountSetupContainer">
            <EmailVerification 
                setStepNum = {setStepNum} 
                stepNum = {stepNum} 
                setEmail = {setEmail}
                setPassword = {setPassword}/>
            <Name
                setStepNum = {setStepNum} 
                stepNum = {stepNum}/>
            <Major
                setStepNum = {setStepNum} 
                stepNum = {stepNum}/>
            <Bio 
                 setStepNum = {setStepNum} 
                stepNum = {stepNum}/>
            <Finalize
                setStepNum = {setStepNum} 
                stepNum = {stepNum}
                navigate = {navigate}/>
        </div>
        </>
    )
}

function Name({stepNum, setStepNum}){
    const [inputStatus, setInputStatus] = useState("")
    return (stepNum == 1)?(
        <>
            <h3>What's your name?</h3>
            <p className = "inputStatus" style = {(inputStatus == ""? {display: "none"}: {display: "block"})}>{inputStatus}</p>
            <div className = "nameInputContainer">
                <input id = "firstName" className = "informationBox" type = "text" placeholder = "First Name"></input>
                <input id = "lastName" className = "informationBox" type = "text" placeholder = "Last Name"></input>
            </div>
            <button className = "submitButton" onClick = {() => {
                let value = document.getElementById("firstName").value.trim() + " " + document.getElementById("lastName").value.trim();
                if(value.length >= 2){
                    account.name = value;
                    setStepNum(2); 
                    document.getElementById("createBox").value = ""
                }
                else{
                    setInputStatus("Your name cannot be empty.")
                }
                }}>Submit</button>
        </>
    ): ""
}

function Major({stepNum, setStepNum}){
    const majors = ["Select a major", "Accounting", "African-american/black studies", "Agricultural economics", "Agricultural engineering", "Agriculture", "Aerospace, aeronautical and astronautical/space engineering", "American/united states studies/civilization", "Animal sciences", "Anthropology", "Applied and professional ethics", "Arabic language and literature", "Architecture", "Art history, criticism and conservation", "Art teacher education", "Astronomy", "Atmospheric sciences and meteorology", "Biochemistry", "Biology/biological sciences", "Business administration and management", "Chemical engineering", "Chemistry", "Chinese language and literature", "Classics and classical languages, literatures, and linguistics", "Civil engineering", "Communication sciences and disorders", "Community health and preventive medicine", "Computer engineering", "Computer science", "Criminology", "Dance", "Developmental and child psychology", "Drama and dramatics/theatre arts", "Ecology", "Econometrics and quantitative economics", "Electrical and electronics engineering", "Elementary education and teaching", "Engineering", "English language and literature", "Environmental science", "Family and community services", "Film/cinema/video studies", "Finance", "Fine/studio arts", "Food science", "French language and literature", "Geographic information science and cartography", "Geology/earth science", "German language and literature", "History", "Information science/studies", "International business/trade/commerce", "Iranian languages, literatures, and linguistics", "Italian language and literature", "Japanese language and literature", "Jewish/judaic studies", "Journalism", "Junior high/intermediate/middle school education and teaching", "Kindergarten/preschool education and teaching", "Kinesiology and exercise science", "Linguistics", "Logistics, materials, and supply chain management", "Management science", "Marketing/marketing management", "Materials engineering", "Mathematics", "Mechanical engineering", "Multi-/interdisciplinary studies", "Music", "Music performance", "Music teacher education", "Neuroscience", "Philosophy", "Physics", "Plant sciences", "Political science and government", "Psychology", "Public health", "Public policy analysis", "Religion/religious studies", "Romance languages, literatures, and linguistics", "Russian language and literature", "Secondary education and teaching", "Sociology", "Spanish language and literature", "Special education and teaching", "Speech communication and rhetoric", "Sustainability studies", "Women's studies"]
    return (stepNum == 2)?(
        <>
            <h3>What's your major?</h3>
            <select id = "majorBox" className = "informationBox">
                {majors.map((major)=>(
                    <option className = "informationBox">{major}</option>
                ))}
            </select>
            <button className = "submitButton" onClick = {() => {
                account.major = document.getElementById("majorBox").value;
                console.log(account.major)
                setStepNum(3); 
                }}>Submit</button>
        </>
    ): ""
}

function Bio({stepNum, setStepNum}){
    return (stepNum == 3)?(
        <>
            <h3>Tell us about yourself!</h3>
            <textarea maxLength={200} id = "createBox" className = "bioBox" placeholder = "Enter Bio"></textarea>
            <button className = "submitButton" onClick = {() => {
                account.bio = document.getElementById("createBox").value; 
                setStepNum(4); 
                document.getElementById("createBox").value = ""
                }}>Submit</button>
        </>
    ): ""
}


function Finalize({stepNum, navigate}){
    return (stepNum == 4)? (
        <>
            <h3>Finalize!</h3>
            <button className = "submitButton" onClick = {() => {
                createCookie();
                createAcc();
                navigate("/")
                }}>Create Account</button>
            <p>Once you create an account, your Terpmail address cannot be used again.</p>
        </>
    ): ""
}
