import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, Zap, BarChart3, LogOut, Shield } from 'lucide-react';

const AdminSidebar = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/candidates', icon: <Users size={20} />, label: 'Candidates' },
        { path: '/admin/companies', icon: <Building2 size={20} />, label: 'Companies' },
        { path: '/admin/match', icon: <Zap size={20} />, label: 'The Brain' },
        { path: '/admin/matches', icon: <BarChart3 size={20} />, label: 'Track Matches' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 glass min-h-[calc(100vh-120px)] rounded-3xl p-6 space-y-8 sticky top-24">
            <div className="flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                    <Shield size={20} />
                </div>
                <div>
                   <span className="block font-black text-slate-800 tracking-tighter">ADMIN PANEL</span>
                   <span className="block text-[10px] text-slate-400 font-bold uppercase">Zynkr OS v1.0</span>
                </div>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Link 
                        key={item.path} 
                        to={item.path}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 font-medium ${isActive(item.path) ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' : 'text-slate-500 hover:bg-white hover:text-primary-600'}`}
                    >
                        {item.icon}
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="pt-8 border-t border-slate-100">
                <button 
                    onClick={() => { localStorage.removeItem('zynkr_user'); window.location.href = '/'; }}
                    className="w-full flex items-center gap-3 p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-medium"
                >
                    <LogOut size={20} />
                    Exit Admin
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
