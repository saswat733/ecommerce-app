import { useState } from "react";

export default function LoginPage(){
    let userInfo={
        email:"",
        password:""
    }
    const [userDetails, setuserDetails] = useState(userInfo)

    

    const handleChange=(e:any)=>{
        setuserDetails({...userDetails,[e.target.name]:e.target.value})
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <div className="text-4xl font-bold text-red-500 my-5">MyStore</div>
                <div className="flex flex-col p-10 items-center border rounded-xl  ">
                    <div className="text-4xl font-bold text-black ">Log In</div>
                    <input type="email" name="email" value={userDetails.email} onChange={handleChange} placeholder="Enter Email" className="border-2 border-gray-200 p-2 rounded-md my-2"/>
                    <input type="password" name="password" value={userDetails.password} onChange={handleChange} placeholder="Enter Password" className="border-2 border-gray-200 p-2 rounded-md my-2"/>
                    <button className="bg-black w-full text-white px-5 py-2 rounded-md my-2">Login</button>
                </div>
        </div>
    );
}