import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, User, LogIn } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent">
                    ZYNKR
                </Link>
                
                <div className="flex items-center gap-6">
                    <Link to="/apply" className="text-slate-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-2">
                        <Briefcase size={18} />
                        Apply Now
                    </Link>
                    <Link to="/login" className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm">
                        <LogIn size={18} />
                        Login
                    </Link>
                    <Link to="/signup" className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
                         <User size={18} />
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
