import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { NavLink } from 'react-router';

const Navbar = () => {

    const linkClass = ({ isActive }) =>
        isActive
            ? "bg-primary font-semibold border-b-2 border-primary"
            : "text-gray-700 hover:text-primary";

    const links = <>
        <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
        <li><NavLink to="/coverage" className={linkClass}>Coverage</NavLink></li>
        <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
        <li><NavLink to="/pricing" className={linkClass}>Pricing</NavLink></li>
        <li><NavLink to="/rider" className={linkClass}>Be a Rider</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">

                {/* Mobile Menu */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>

                <a className="btn btn-ghost text-xl">
                    <Logo />
                </a>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                <button className="btn btn-primary">Get Started</button>
            </div>
        </div>
    );
};

export default Navbar;
