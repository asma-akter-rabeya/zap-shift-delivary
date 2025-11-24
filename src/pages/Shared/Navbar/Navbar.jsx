import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { FaArrowCircleRight } from 'react-icons/fa';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const linkClass = ({ isActive }) =>
        isActive
            ? "bg-primary font-semibold border-b-2 border-primary"
            : "text-gray-700 hover:text-primary";

    const links = <>
        <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
        <li><NavLink to="/services" className={linkClass}>Services</NavLink></li>
        <li><NavLink to="/coverage" className={linkClass}>Coverage</NavLink></li>
        <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
        <li><NavLink to="/sendParcel" className={linkClass}>Send a Parcel</NavLink></li>
        <li><NavLink to="/pricing" className={linkClass}>Pricing</NavLink></li>
        <li><NavLink to="/rider" className={linkClass}>Be a Rider</NavLink></li>
        {
            user && <>
                <li><NavLink to="/dashboard/my-parcels" className={linkClass}>My Parcels</NavLink></li>
            </>
        }
    </>

    const handelLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Logged Out",
                    text: "You have successfully logged out!",
                    timer: 1800,
                    showConfirmButton: false,
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Logout Failed",
                    text: error.message || "Something went wrong!",
                });
            });
    }

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
                {
                    user ?
                        <button
                            onClick={handelLogOut}
                            className="btn btn-primary text-black">Log Out</button>
                        :
                        <Link to={"/login"} className="btn btn-primary text-black">Log In</Link>

                }
                <Link
                    to="/rider"
                    className="btn bg-primary flex items-center ml-1.5">
                    <span>Be a rider</span>
                    <FaArrowCircleRight />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
