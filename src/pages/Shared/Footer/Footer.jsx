import React from 'react';
import Logo from '../../../components/Logo/Logo';
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-horizontal footer-center gap-2.5 p-10">
                <aside>
                    <Logo />
                    <p className="font-bold">
                        ACME Industries Ltd.
                        <br />
                        Providing reliable tech since 1992
                    </p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>

                <nav>
                    <div className="grid grid-flow-col gap-4 text-2xl ">
                        {/* Twitter */}
                        <a href="#" className="text-[#1DA1F2] hover:opacity-80">
                            <FaTwitter />
                        </a>

                        {/* YouTube */}
                        <a href="#" className="text-[#FF0000] hover:opacity-80">
                            <FaYoutube />
                        </a>

                        {/* Facebook */}
                        <a href="#" className="text-[#1877F2] hover:opacity-80">
                            <FaFacebook />
                        </a>
                    </div>
                </nav>
            </footer>
        </div>
    );
};

export default Footer;
