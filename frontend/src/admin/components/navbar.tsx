import React, { useState } from 'react';
import { useSidebar } from '../context/is-sidebar-active';

const Navbar = () => {
    const user = {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "avatar.jpg",
    };

    const [notificationCount, setNotificationCount] = useState(1);
    const { toggleSidebar } = useSidebar();

    return (
        <div id="main" style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <nav className="navbar navbar-expand-lg shadow-sm ms-auto p-0">
                <div className="container-fluid">
                    <button onClick={toggleSidebar} className="navbar-toggler sidebar-hide" style={{ height: "fit-content", marginTop: "10px" }}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="ms-auto" id="navbarContent">
                        <ul className="navbar-nav ms-auto align-items-center" style={{ flexDirection: "unset" }}>
                            <li className="nav-item dropdown me-2">
                                <a
                                    className="nav-link"
                                    href="#"
                                    id="notificationDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-bell-fill" style={{ fontSize: "1.5rem" }}></i>
                                    {notificationCount > 0 && (
                                        <span
                                            className="badge bg-danger rounded-pill"
                                            style={{
                                                position: "absolute",
                                                top: "4px",
                                                left: "77%",
                                                transform: "translateX(-50%)",
                                                fontSize: "0.7rem",
                                                borderWidth: "1px",
                                            }}
                                        >
                                            {notificationCount}
                                        </span>
                                    )}
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown" id="notification">
                                    <li>
                                        <h6 className="dropdown-header">Notifikasi</h6>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">Tidak ada notifikasi yang belum dibaca</a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item text-center text-primary" href="#">Lihat Semua</a>
                                    </li>
                                </ul>
                            </li>

                            {/* User Profile */}
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link"
                                    href="#"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <div className="avatar avatar-online position-relative">
                                        <img
                                            src={"/" + user.avatar}
                                            alt="User Avatar"
                                            className="rounded-circle"
                                            width="32"
                                            height="32"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end border rounded" aria-labelledby="userDropdown" style={{ marginTop: "5px" }}>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 me-3">
                                                    <div className="avatar avatar-online">
                                                        <img
                                                            src={"/" + user.avatar}
                                                            alt="User Avatar"
                                                            className="rounded-circle"
                                                            width="40"
                                                            height="40"
                                                            style={{ objectFit: "cover" }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <span className="fw-medium d-block">{user.name}</span>
                                                    <small className="text-muted">{user.email}</small>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); document.getElementById('logout-form').submit(); }}>
                                            <i className="bi bi-box-arrow-right"></i> Keluar
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
