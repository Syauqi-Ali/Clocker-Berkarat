import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Fungsi untuk memeriksa apakah halaman saat ini aktif
    const isActive = (path) => location.pathname === path ? "active" : "";

    return (
        <nav className="navbar navbar-expand-lg navbar-light topbar static-top bg-landing osahan-nav-top px-0">
            <div className="container">
                {/* Sidebar Toggle (Topbar) */}
                <Link className="navbar-brand" to="#">
                    <img src='/assets_landing/images/Asset 14.png' alt="" />
                </Link>

                {/* Topbar Navbar */}
                <div className={`collapse navbar-collapse nav-links ${isMenuOpen ? '' : 'collapsed'}`} id="navLinks">
                    <ul className="navbar-nav ml-auto">
                        <li className={`nav-item ${isActive('/landing')}`}>
                            <Link className="nav-landing" to="/landing">Clocker Pro</Link>
                        </li>
                        <li className={`nav-item ${isActive('/landing/about')}`}>
                            <Link className="nav-landing" to="/landing/about">About Us</Link>
                        </li>
                        <li className={`nav-item ${isActive('/landing/guides')}`}>
                            <Link className="nav-landing" to="/landing/guides">Guides</Link>
                        </li>
                        <li className={`nav-item ${isActive('/landing/learn')}`}>
                            <Link className="nav-landing" to="/landing/learn">Learn</Link>
                        </li>
                        <li className={`nav-item ${isActive('/landing/events')}`}>
                            <Link className="nav-landing" to="/landing/events">Events</Link>
                        </li>

                        <li>
                            <a href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2.1rem" viewBox="0 0 24 24" style={{ color: "#ffffff", marginLeft: "2rem" }}>
                                    <path fill="currentColor" d="M12 21q-1.858 0-3.5-.71q-1.642-.711-2.86-1.93T3.71 15.5T3 12q0-1.864.71-3.503q.711-1.64 1.93-2.857T8.5 3.71Q10.142 3 12 3q1.864 0 3.503.71q1.64.711 2.858 1.93t1.929 2.857Q21 10.137 21 12q0 1.858-.71 3.5q-.711 1.642-1.93 2.86t-2.857 1.93T12 21m0-.992q.88-1.131 1.452-2.221q.571-1.09.929-2.44H9.619q.397 1.426.948 2.516q.552 1.09 1.433 2.145m-1.273-.15q-.7-.825-1.278-2.04q-.578-1.214-.86-2.472H4.754q.86 1.865 2.437 3.06q1.578 1.194 3.536 1.452m2.546 0q1.958-.258 3.536-1.452q1.577-1.195 2.437-3.06h-3.834q-.38 1.277-.957 2.491q-.578 1.215-1.182 2.02m-8.927-5.51h4.035q-.114-.616-.16-1.2q-.048-.583-.048-1.147t.047-1.147t.16-1.2H4.347q-.163.52-.255 1.133Q4 11.398 4 12t.091 1.215t.255 1.131m5.035 0h5.238q.114-.615.16-1.18q.048-.564.048-1.166t-.047-1.166t-.16-1.18H9.38q-.113.615-.16 1.18q-.047.564-.047 1.166t.047 1.166t.16 1.18m6.24 0h4.034q.163-.519.255-1.131Q20 12.602 20 12t-.091-1.215t-.255-1.131h-4.035q.114.615.16 1.199q.048.584.048 1.147t-.047 1.147t-.16 1.2m-.208-5.693h3.834q-.879-1.904-2.408-3.06t-3.565-1.471q.7.921 1.259 2.107q.559 1.185.88 2.424m-5.793 0h4.762q-.396-1.408-.977-2.546T12 3.992q-.823.977-1.404 2.116T9.62 8.654m-4.865 0h3.834q.321-1.238.88-2.424t1.259-2.107q-2.054.316-3.574 1.48q-1.52 1.166-2.4 3.05" />
                                </svg>
                            </a>
                            <span style={{ color: "#ffffff" }}>Indonesia</span>
                        </li>
                    </ul>
                </div>

                <ul className="navbar-nav align-items-center mr-auto">
                    <li className="nav-item mr-3">
                        <a href="#register" className="btn btn-outline-landing">
                            Sign Up
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#login" className="btn btn-outline-login">
                            Log in
                        </a>
                    </li>

                    <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
