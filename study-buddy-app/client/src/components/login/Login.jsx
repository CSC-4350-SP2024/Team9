import React from "react";
import Button from "../Button";

const Login = () => {
    return (
        <div className="w-full h-screen pt-16 bg-slate-50">
            <h1 className="text-3xl font-semibol text-center text-black">Log in</h1>
            <form className="mt-6">
                <div className="mb-2">
                    <label className="block text-sm font-semibold text-center text-black">Email:</label>
                    <div className="flex justify-center">
                        <input type="text" id="name" placeholder="Email" className="block w-64 px-4 py-2 mt-2 text-black bg-white border-2 border-black rounded-xl focus:border-slate-400 focus:ring-purple-300 focus:outline-none " required />
                        </div>
                </div>
                 <div className="mb-2">
                    <label className="block text-sm font-semibold text-center text-black">Password:</label>
                    <div className="flex justify-center">
                        <input type="text" id="password" placeholder="Password" className="block w-64 px-4 py-2 mt-2 text-black bg-white border-2 border-black rounded-xl focus:border-slate-400 focus:ring-purple-300 focus:outline-none " required />
                        </div>
                </div>
                        <div className="mt-6 flex justify-center ">
          <Button type="submit" variant="success">
            Log In
          </Button>
        </div>
            </form> 
        </div>
    );
};

export default Login;