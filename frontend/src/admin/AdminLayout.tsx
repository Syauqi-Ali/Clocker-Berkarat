import React from "react";
import { Link, Outlet } from "react-router-dom";

import './css/app.css';
import './css/app-dark.css';
import './css/detail.css';
import './css/iconly.css';
import './AdminLayout.css';

//import './js/app.js';
import './js/bootstrap.js';

import { SidebarProvider } from './context/is-sidebar-active';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

const routeData = [
    {
        title: "Menu",
        items: [
            { name: "Dashboard", icon: "bi bi-grid-fill", path: "dashboard" },
            { name: "Banner", icon: "bi bi-map-fill", path: "banner" },
            { name: "About Us", icon: "bi bi-person-fill", path: "about" },
        ],
    },
    {
        title: "Project",
        items: [
            { name: "Project", icon: "bi bi-folder-fill", path: "project" },
            { name: "Category", icon: "bi bi-list-task", path: "category" },
        ],
    },
    {
        title: "Users",
        items: [
            { name: "Users", icon: "bi bi-people-fill", path: "user" },
        ],
    },
    {
        title: "Freelancer",
        items: [
            { name: "Contract", icon: "bi bi-file-earmark-text-fill", path: "contract" },
        ],
    },
    {
        title: "Transaction",
        items: [
            { name: "Transaction", icon: "bi bi-wallet", path: "transaction" },
        ],
    },
    {
        title: "Setting",
        items: [
            { name: "Language", icon: "bi bi-wallet", path: "language" },
        ],
    },
];

const AdminLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <Sidebar routeData={routeData} />
      <Navbar />
      <Outlet />
      <Footer />
    </SidebarProvider>
  );
};

export default AdminLayout;
