import { useState } from "react";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export function Signup(){
  const [firstname,setfirstname]=useState("");
  const [lastname,setlastname]=useState("");
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
    return (
        <div className="bg-gray-100 h-screen flex justify-center">
         <div className="flex flex-col justify-center">
          <div className="rounded-lg bg-gray-950 w-90 text-center p-2 h-max px-4 shadow-lg shadow-black">
            <Heading label={"Sign Up"}/>
            <SubHeading label={"Enter your information to create an account"}/>
            <InputBox onChange={(e) =>{
                setfirstname(e.target.value)
            }} label={"first Name"} placeholder={"John"}/>
            <InputBox onChange={(e) =>{
                setlastname(e.target.value)
            }}  label={"Last Name"} placeholder={"Doe"}/>
            <InputBox onChange={(e) =>{
                setUsername(e.target.value)
            }} label={"Email"} placeholder={"johndoe@example.com"}/>
            <InputBox onChange={(e) =>{
                setPassword(e.target.value)
            }} label={"Password"} placeholder={"123456"}/>
            <div className="pt-4">
                <Button onCLick={async() =>{
                   const res= await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        firstname,
                        lastname,
                        password
                     });
                     console.log(res.data.token)
                     localStorage.setItem("token",res.data.token)
                
                     navigate("/dashboard")
                }} label={"Sign Up"}/>
            </div>
            <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
           </div>
           </div>
        </div>
    )
}