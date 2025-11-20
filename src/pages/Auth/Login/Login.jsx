import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { signInUser } = useAuth();
    const navigate = useNavigate();

    const handleLogIn = (data) => {
        console.log("Form Data:", data);
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                navigate('/')

            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="w-full min-h-[70vh] flex items-center justify-center">
            <div className="w-[80%] bg-white p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-gray-600 mb-6">Login with ZapShift</p>

                <form
                    onSubmit={handleSubmit(handleLogIn)}
                    className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {errors.email?.type === "required" && (
                            <p className='text-red-700'>Please enter your email</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <p className=" text-sm text-red-600 cursor-pointer hover:underline">
                        Forgot Password?
                    </p>

                    <button
                        type="submit"
                        className="w-full bg-lime-400 hover:bg-lime-500 text-black py-2 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm">
                        Don’t have an account?
                        <Link to={"/register"} className="text-blue-500 underline ml-1">Register</Link>
                    </p>
                </form>
                <SocialLogin></SocialLogin>

            </div>
        </div>
    );
};

export default Login;
