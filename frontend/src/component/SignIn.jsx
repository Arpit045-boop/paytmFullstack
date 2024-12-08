import { useState } from "react";
import { BottomWarning } from "./BottomWarning";
import { ButtonCompo } from "./ButtonCompo";
import { HeadingCompoent } from "./HeadingCompoent";
import { InputBox } from "./InputBox";
import { SubHeading } from "./SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SingIn(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
      <HeadingCompoent label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={(e)=>{
            setEmail(e.target.value)
        }} placeholder="arpit@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
            setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <ButtonCompo onClick={async ()=>{
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username: email,
                password: password
            });
            navigate("/dashboard");
            // console.log(response.data);
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} to={"/signUp"} buttonText={"Sign up"}  />
        </div>
        </div>
        </div>
    )
}