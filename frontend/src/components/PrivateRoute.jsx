import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { AUTH_ROUTES } from '../config/routes';

const PrivateRoute = ({ children, auth = true, redirectTo }) => {
    const { authState } = useContext(AuthContext);
    const location = useLocation();

    if (authState.loading) {
        return <div>Loading...</div>;
    }

    if (authState.isAuthenticated !== auth) {
        return <Navigate to={redirectTo || AUTH_ROUTES.REGISTER} state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;