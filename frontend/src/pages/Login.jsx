import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/home');
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto pt-10">
            <motion.div 
                className="card space-y-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent italic">ZYNKR</h1>
                    <h2 className="text-xl font-semibold text-slate-800">Welcome Back</h2>
                    <p className="text-slate-500">Access your candidate dashboard.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <Mail size={18} />
                            </span>
                            <input 
                                type="email" 
                                placeholder="Email Address" 
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
                                placeholder="Password" 
                                className="input-field pl-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full btn-primary flex justify-center items-center gap-2">
                        Login <ArrowRight size={20} />
                    </button>
                </form>

                <div className="text-center text-sm text-slate-500">
                    Don't have an account? <Link to="/signup" className="text-primary-600 font-semibold">Sign up</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
