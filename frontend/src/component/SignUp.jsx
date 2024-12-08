import { BottomWarning } from "./BottomWarning";
import { ButtonCompo } from "./ButtonCompo";
import { HeadingCompoent } from "./HeadingCompoent";
import { InputBox } from "./InputBox";
import { SubHeading } from "./SubHeading";
import "../index.css"
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function SingUp(){
    const [firstname,setfirstName] = useState("");
    const [lastname,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();


    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            
             <div className="flex flex-col justify-center">
             <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <HeadingCompoent label = {"Sign Up"}></HeadingCompoent>
            <SubHeading label = {"Enter your information to create an account"}></SubHeading>
            <InputBox onChange= {(e)=>{
                setfirstName(e.target.value);
            }}  label={"First Name"} placeholder={"first name"}></InputBox>
            <InputBox onChange= {(e)=>{
                setLastName(e.target.value);
            }} label={"Last Name"} placeholder={"last name"}></InputBox>
            <InputBox onChange= {(e)=>{
                setEmail(e.target.value);
            }} label={"Email"} placeholder={"email@gmail.com"}></InputBox>
            <InputBox onChange= {(e)=>{
                setPassword(e.target.value);
            }}label={"Password"} placeholder={"12346732"}></InputBox>
            <ButtonCompo onClick={ async ()=>{
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username: email,
                    password: password,
                    firstName: firstname,
                    lastName: lastname,
                  }
                );

                   localStorage.setItem("token", response.data.token)
                  navigate("/dashboard")
                
            }} label={"Sign Up"}></ButtonCompo> 
            <BottomWarning label={"Already have an account ?"} to={"/signIn"} ButtonText={"Sign in"}></BottomWarning>
            </div>
    </div>
        </div>
    )
}