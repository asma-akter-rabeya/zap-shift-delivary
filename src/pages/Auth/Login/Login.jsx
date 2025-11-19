import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className="w-full min-h-[70vh] flex items-center justify-center">
            <div className="w-[80%] bg-white p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-600 mb-6">Login with ZapShift</p>

                <form className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <p className=" text-sm text-red-600 cursor-pointer hover:underline">
                        Forgot Password?
                    </p>

                    <button
                        type="button"
                        className="w-full bg-lime-400 hover:bg-lime-500 text-black py-2 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm">
                        Don’t have an account?
                        <Link to={"/register"} className="text-blue-500 underline ml-1">Register</Link>
                    </p>

                    {/* OR Divider */}
                    <div className="flex items-center gap-3 my-3">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-gray-500">Or</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full border flex items-center justify-center gap-2 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                        <FcGoogle className="text-2xl" />
                        Login with Google
                    </button>

                </form>

            </div>
        </div>
    );
};

export default Login;
