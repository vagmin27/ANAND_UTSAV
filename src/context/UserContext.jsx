import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken'));
    const [favourites, setFavourites] = useState([]);

    // Restore session
    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            setUser({ loggedIn: true });
            fetchFavourites(storedToken); // fetch favourites on load
        }
    }, []);

    // Login
    const login = (userData, authToken) => {
        localStorage.setItem('authToken', authToken);
        setToken(authToken);
        setUser(userData);
        fetchFavourites(authToken); // fetch favourites after login
    };

    // Logout
    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setFavourites([]);
    };

    // --- Fetch favourites from backend
const fetchFavourites = async (authToken) => {
    try {
        const res = await axios.get('https://anand-u.vercel.app/user/getFavorite', {
            headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.data.success) {
            // store only IDs
            const favIds = res.data.favorites.map(f => f._id ? f._id : f);
            setFavourites(favIds);
        }
    } catch (err) {
        console.error('Error fetching favourites:', err);
    }
};

// --- Toggle favourite (optimistic UI)
const toggleFavourite = async (serviceId) => {
    if (!user) return alert('Please login to manage favourites');

    const isFav = favourites.includes(serviceId);
    const updatedFavourites = isFav
        ? favourites.filter(id => id !== serviceId)
        : [...favourites, serviceId];

    setFavourites(updatedFavourites);

    try {
        if (isFav) {
            await axios.delete('https://anand-u.vercel.app/user/removeFavorite', {
                data: { serviceId },
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            await axios.post(
                'https://anand-u.vercel.app/user/addFavorite',
                { serviceId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        }
    } catch (err) {
        console.error('Error toggling favourite:', err);
        setFavourites(favourites); // rollback if error
    }
};


    const value = { user, token, login, logout, favourites, toggleFavourite };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
