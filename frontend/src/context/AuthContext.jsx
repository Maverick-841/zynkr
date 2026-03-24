import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('zynkr_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        setUser(data);
        localStorage.setItem('zynkr_user', JSON.stringify(data));
        return data;
    };

    const signup = async (name, email, password, role) => {
        const { data } = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, role });
        setUser(data);
        localStorage.setItem('zynkr_user', JSON.stringify(data));
        return data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('zynkr_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
