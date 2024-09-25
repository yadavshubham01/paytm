import { useState } from "react";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";




export function Signin(){
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();
   

  return (
    <div className="bg-gray-100 h-screen flex justify-center">
     <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-slate-900 w-80 text-center p-2 h-max px-4 shadow-lg shadow-black">
        <Heading label={"Sign In"}/>
        <SubHeading label={"Enter your credentials to access your account"}/>
        <InputBox onChange={(e)=>{
            setUsername(e.target.value)
        }} label={"Email"} placeholder={"johndoe@gmail.com"}/>
        <InputBox onChange={(e) =>{
          setPassword(e.target.value)
        }} label={"Password"} placeholder={"123456"}/>
        <div className="pt-4">
            <Button onCLick={async() => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
              })
              localStorage.setItem("token",response.data.token)
              console.log(response.data.token)
              navigate("/dashboard")
            }} label={"Sign In"}/>
        </div>
        <ButtonWarning label={"Don't have an account"} buttonText={"Sign Up"} to={"/signup"}/>
        </div>
        </div>
     </div>
  )  
}