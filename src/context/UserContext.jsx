import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));

    // This effect now runs ONLY ONCE when the app first loads.
    // Its job is to re-establish a session from localStorage if a token exists.
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            // In a real app, you would verify this token with your backend or decode it
            // to get user data. For now, we'll set a placeholder to show someone is logged in.
            setToken(storedToken);
            // You can decode the token here to get user info if you have a library like jwt-decode
            // For now, we'll just set a generic user object.
            setUser({ loggedIn: true });
        }
    }, []); // The empty dependency array [] is the key fix.

    // This function handles the logic for a NEW login.
    const login = (userData, authToken) => {
        localStorage.setItem('authToken', authToken);
        setToken(authToken);
        setUser(userData);
    };

    // This function handles logging out.
    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
    };

    const value = { user, token, login, logout };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};