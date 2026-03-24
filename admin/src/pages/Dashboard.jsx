import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Users, Building2, CheckCircle, Zap } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ totalCandidates: 0, shortlistedCandidates: 0, totalCompanies: 0, activeMatches: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/stats', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStats(data);
            } catch (_) {}
        };
        fetchStats();
    }, [user]);

    const cards = [
        { label: 'Total Candidates', value: stats.totalCandidates, icon: <Users size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Shortlisted', value: stats.shortlistedCandidates, icon: <CheckCircle size={24} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Companies', value: stats.totalCompanies, icon: <Building2 size={24} />, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Active Matches', value: stats.activeMatches, icon: <Zap size={24} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black text-slate-900">Welcome back, {user?.name} 👋</h1>
                <p className="text-slate-500 mt-1">Here's what's happening on the Zynkr platform today.</p>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map(card => (
                    <div key={card.label} className="card flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center`}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="text-2xl font-black text-slate-800">{card.value}</p>
                            <p className="text-xs text-slate-400 font-semibold">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
