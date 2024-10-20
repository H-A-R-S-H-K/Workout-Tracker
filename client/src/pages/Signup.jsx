import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function Signup() {
    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    return (
        <>
            <div className="login flex justify-center h-full items-center">
                <Card className='login-card w-2/6 h-3/6 p-8'>
                    <CardHeader>
                        <CardTitle>Signup</CardTitle>
                    </CardHeader>
                    <Input className='mb-5' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                    <Input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    <Button className='m-5'>Submit</Button>
                    <CardFooter className='flex justify-around'>
                        <p>Already have an account! <span className="font-semibold cursor-pointer" onClick={() => navigate('/login')}>Login</span></p>
                    </CardFooter>
                </Card> 
            </div>
        </>
    )
}

export default Signup;