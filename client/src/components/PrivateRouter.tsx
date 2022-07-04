import { Navigate } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ children }: any) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
