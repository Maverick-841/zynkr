import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            navigate('/apply');
        } catch (error) {
            alert(error.response?.data?.message || 'Signup failed');
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
                    <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
                    <p className="text-slate-500">Join Zynkr and find your dream job.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                <User size={18} />
                            </span>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="input-field pl-12"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
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
                        Create Account <ArrowRight size={20} />
                    </button>
                </form>

                <div className="text-center text-sm text-slate-500">
                    Already have an account? <Link to="/login" className="text-primary-600 font-semibold">Login</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
