import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";

import Dashboard from "./admin/page/dashboard";
import Banner from './admin/page/banner';
import AboutUs from './admin/page/aboutUs';
import Project from './admin/page/project';
import Category from './admin/page/category';
import User from './admin/page/user';
import Contract from './admin/page/contract';
import Transaction from './admin/page/transaction';
import Language from './admin/page/language';

const NotFound: React.FC = () => {
  return <h2>NotFound</h2>;
};

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

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        {/* Route untuk Admin dengan Nested Routing */}
        <Route path="/admin" element={<AdminLayout />}>
          {routeData.flatMap((section) =>
            section.items.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={React.createElement(
                   {
                      dashboard: Dashboard,
                      banner: Banner,
                      about: AboutUs,
                      project: Project,
                      category: Category,
                      user: User,
                      contract: Contract,
                      transaction: Transaction,
                      language: Language,
                   }[route.path]
                )}
              />
            ))
          )}
        </Route>

        {/* Route Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
