import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/admin/login', { email, password });
            localStorage.setItem('zynkr_user', JSON.stringify(data));
            window.location.href = '/admin'; // Force reload to update context/sidebar
        } catch (error) {
            alert('Invalid admin credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <motion.div 
                className="max-w-md w-full card space-y-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto text-primary-600">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Admin Portal</h1>
                        <p className="text-slate-500 italic">Restricted access for Zynkr Administrators only.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Mail size={18} />
                            </span>
                            <input 
                                type="email" 
                                placeholder="Admin Email" 
                                className="input-field pl-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Lock size={18} />
                            </span>
                            <input 
                                type="password" 
                                placeholder="Admin Password" 
                                className="input-field pl-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary flex justify-center items-center gap-2 py-4 bg-slate-900 hover:bg-black">
                        Authorized Access <ArrowRight size={20} />
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400">
                    Secure channel encrypted. Actions are logged.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
