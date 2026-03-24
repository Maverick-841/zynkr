import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, User, Building2, Clock, CheckCircle, XCircle } from 'lucide-react';

const MatchTracking = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/matches', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setMatches(data);
            } catch (error) {
                console.error('Error fetching matches');
            }
        };
        if (user?.role === 'admin') fetchMatches();
    }, [user]);

    const statusIcons = {
        sent: { icon: <Clock size={16} />, color: 'text-amber-500', bg: 'bg-amber-50' },
        interview: { icon: <Calendar size={16} />, color: 'text-blue-500', bg: 'bg-blue-50' },
        selected: { icon: <CheckCircle size={16} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        rejected: { icon: <XCircle size={16} />, color: 'text-rose-500', bg: 'bg-rose-50' }
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Active Match Tracking</h1>
                <p className="text-slate-500 italic">Monitor the progress of every candidate-company match.</p>
            </header>

            <div className="card p-0 overflow-hidden bg-white/50 border-none shadow-none">
                <div className="grid grid-cols-1 gap-4">
                    {matches.map((match, i) => (
                        <motion.div 
                            key={match._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="glass p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border-white/40"
                        >
                            <div className="flex items-center gap-6 flex-1">
                                <div className="text-center min-w-[120px]">
                                    <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-2 text-slate-600">
                                        <User size={24} />
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-800">{match.candidate_id?.name}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">{match.candidate_id?.profile?.specialization}</p>
                                </div>
                                
                                <div className="h-px bg-slate-100 flex-1 relative flex items-center justify-center">
                                    <div className={`px-4 py-1 rounded-full text-[10px] items-center gap-1 font-extrabold uppercase flex ${statusIcons[match.status].color} ${statusIcons[match.status].bg} border border-white/50 backdrop-blur-sm z-10`}>
                                        {statusIcons[match.status].icon}
                                        {match.status}
                                    </div>
                                </div>

                                 <div className="text-center min-w-[120px]">
                                    <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-2 text-primary-600">
                                        <Building2 size={24} />
                                    </div>
                                    <h4 className="font-bold text-sm text-slate-800">{match.company_id?.company_name}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase font-black">{match.company_id?.role_hiring}</p>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-primary-600"><Clock size={20} /></button>
                                <button className="btn-secondary py-2 px-4 text-[10px] font-bold uppercase tracking-widest bg-white">Update Status</button>
                            </div>
                        </motion.div>
                    ))}
                    {matches.length === 0 && (
                        <div className="py-20 text-center italic text-slate-400">No matches found. Start matching from the Brain!</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MatchTracking;
