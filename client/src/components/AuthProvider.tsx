import { useNavigate } from 'react-router-dom';
import React, { createContext, useState } from 'react';

export const AuthContext = createContext<any>(null);

export type UserData = {
    login: string;
};

const AuthProvider = ({ children }: any) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        const userData = await fetch('/api/is-auth').then((res) => res.json());
        console.log({ userData });
        if (userData) setUserData(userData);
    };

    const deleteAllCookies = () => {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    };

    const handleLogout = () => {
        setUserData(null);
        deleteAllCookies();
        navigate('/login');
    };

    const value = {
        userData,
        setUserData: setUserData,
        onLogin: handleLogin,
        onLogout: handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
