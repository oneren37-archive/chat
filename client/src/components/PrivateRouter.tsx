import { Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const PrivateRoute = (props: any) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const auth = useAuth();

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(true);
            const userData = await fetch('/api/is-auth').then((res) =>
                res.json(),
            );
            setLoading(false);
            auth.setUserData(userData || null);
            setIsAuthenticated(!!userData);
        };
        checkAuth();
    }, []);

    return (
        <>
            {isAuthenticated ? (
                props.children
            ) : loading ? (
                <div>LOADING...</div>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    );
};

export default PrivateRoute;
