import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Building2, Zap, BarChart3, LogOut, Shield } from 'lucide-react';

const menuItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/candidates', icon: <Users size={20} />, label: 'Candidates' },
    { path: '/companies', icon: <Building2 size={20} />, label: 'Companies' },
    { path: '/match', icon: <Zap size={20} />, label: 'The Brain' },
    { path: '/matches', icon: <BarChart3 size={20} />, label: 'Track Matches' },
];

const Sidebar = () => {
    const location = useLocation();
    const { logout } = useAuth();
    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col p-6 gap-8 sticky top-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                    <Shield size={20} />
                </div>
                <div>
                    <span className="block font-black text-slate-800 tracking-tight">ADMIN PANEL</span>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Zynkr OS v1.0</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map(item => (
                    <Link key={item.path} to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-xl font-medium transition-all ${
                            isActive(item.path)
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-primary-600'
                        }`}>
                        {item.icon} {item.label}
                    </Link>
                ))}
            </nav>

            <button onClick={logout}
                className="flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-medium">
                <LogOut size={20} /> Logout
            </button>
        </aside>
    );
};

export default Sidebar;
