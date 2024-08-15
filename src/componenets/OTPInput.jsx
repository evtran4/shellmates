import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
let inputs = ["", "", "", ""]
export default function OTPInput({otpStatus, setOtpStatus, verifyCode}){
    const [otp, setOtp] = useState(new Array(4).fill(""))
    const inputRefs = useRef([])

    useEffect(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, []);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
    
        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
    
        // submit trigger
        const code = newOtp.join("");
        if (code.length === 4){
            verifyCode(code)
        }
    
        // Move to next input if current field is filled
        if (value && index < 3 && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      };

    const handleKeyDown = (index, event) => {
        if(event.key == "Backspace" && !otp[index] && index != 0 && inputRefs.current[index-1]){
            inputRefs.current[index -1].focus()
        }
    }
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

      };
  return (otpStatus) ? (
        <>
            <p>Please enter the verification code sent to your Terpmail</p>
            <div className = "OTPInputContainer">
                {otp.map((value, index) => (
                    <input 
                    disabled={false} 
                    value = {value} 
                    key = {index} 
                    ref = {(input)=> {inputRefs.current[index] = input}} 
                    type = "text" 
                    onChange = {(event) => {handleChange(index, event)}} 
                    onClick = {() => {handleClick(index)}}
                    onKeyDown = {(event) => {handleKeyDown(index, event)}}
                    className = "OTPInputBox"></input>
                ))}
            </div>
        </>
    ): ""
}