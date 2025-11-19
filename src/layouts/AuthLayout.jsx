import React from 'react';
import Logo from '../components/Logo/Logo';
import authImg from '../assets/authImage.png';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="w-11/12 mx-auto">
            <Logo />

            <div className="flex flex-col md:flex-row items-center justify-center mt-10">
                
                {/* Form Area */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <Outlet />
                </div>

                {/* Image Area */}
                <div className="hidden md:block w-1/2">
                    <img
                        src={authImg}
                        alt="Authentication"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
