import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Users, Building2, Zap, Target } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalCandidates: 0,
        shortlistedCandidates: 0,
        totalCompanies: 0,
        activeMatches: 0
    });
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/stats', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setStats(data);
            } catch (error) {
                console.error('Error fetching stats');
            }
        };
        if (user?.role === 'admin') fetchStats();
    }, [user]);

    const statCards = [
        { label: 'Total Candidates', value: stats.totalCandidates, icon: <Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Shortlisted', value: stats.shortlistedCandidates, icon: <Target />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Companies', value: stats.totalCompanies, icon: <Building2 />, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Active Matches', value: stats.activeMatches, icon: <Zap />, color: 'text-amber-600', bg: 'bg-amber-50' }
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Admin Overview</h1>
                <p className="text-slate-500 italic">Real-time statistics for Zynkr platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                    <motion.div 
                        key={i}
                        className="card flex items-center gap-6 p-8"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg} ${card.color}`}>
                            {React.cloneElement(card.icon, { size: 28 })}
                        </div>
                        <div>
                            <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider">{card.label}</span>
                            <span className="text-3xl font-extrabold text-slate-800">{card.value}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="card space-y-4 min-h-[300px]">
                     <h2 className="text-xl font-bold">Recent Activity</h2>
                     <p className="text-sm text-slate-400 italic">No recent system logs found.</p>
                </section>
                <section className="card space-y-4 min-h-[300px]">
                     <h2 className="text-xl font-bold">System Health</h2>
                     <div className="flex items-center gap-4 text-emerald-500 font-bold">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        Backend API: Operational
                     </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
