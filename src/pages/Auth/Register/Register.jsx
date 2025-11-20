import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { registerUser } = useAuth();

    const handleRegistration = (data) => {
        console.log("After Register:", data);
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className="w-full min-h-[70vh] flex items-center justify-center">
            <div className="w-[80%] bg-white p-8 rounded-xl shadow-lg">

                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-gray-600 mb-6">Register with ZapShift</p>

                <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Email"
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
                            {...register("password", {
                                required: true,
                                minLength: 8,
                                // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                            })}
                            className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Password"
                        />
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 8 characters  or longer </p>
                        }
                        {/* commenting for reducing hessel! */}
                        {/* {
                            errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have special character , catipal letter, number etc. </p>
                        } */}

                    </div>


                    <button
                        type="submit"
                        className="w-full bg-lime-400 hover:bg-lime-500 text-black py-2 rounded-lg font-semibold transition"
                    >
                        Register
                    </button>

                    <p className="text-center text-sm mt-2">
                        Already have an account?
                        <Link to={'/login'} className="text-blue-500 underline ml-1">Login</Link>
                    </p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;
