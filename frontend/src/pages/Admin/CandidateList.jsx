import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Search, CheckCircle, XCircle, ExternalLink, Filter, Mail } from 'lucide-react';

const CandidateList = () => {
    const [candidates, setCandidates] = useState([]);
    const [filter, setFilter] = useState({ role: '', status: '' });
    const { user } = useAuth();

    const fetchCandidates = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/candidate/all', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCandidates(data);
        } catch (error) {
            console.error('Error fetching candidates');
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') fetchCandidates();
    }, [user]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put('http://localhost:5000/api/admin/candidate/status', { id, status }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchCandidates();
        } catch (error) {
            alert('Status update failed');
        }
    };

    const filteredCandidates = candidates.filter(c => {
        return (filter.role === '' || c.profile?.specialization === filter.role) &&
               (filter.status === '' || c.profile?.status === filter.status);
    });

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Candidate Pool</h1>
                    <p className="text-slate-500 italic">Review and manage candidate selection process.</p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <select className="input-field py-2 text-sm w-40" value={filter.role} onChange={(e) => setFilter({...filter, role: e.target.value})}>
                        <option value="">All Roles</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
                    </select>
                    <select className="input-field py-2 text-sm w-40" value={filter.status} onChange={(e) => setFilter({...filter, status: e.target.value})}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCandidates.map((c, i) => (
                    <motion.div 
                        key={c._id}
                        className="card border-l-4 border-slate-200 hover:border-primary-500 transition-all group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-slate-800">{c.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Mail size={12} /> {c.email}
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${c.profile?.status === 'shortlisted' ? 'bg-emerald-100 text-emerald-600' : c.profile?.status === 'rejected' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                {c.profile?.status || 'pending'}
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                             {c.profile?.skills?.map(s => (
                                <span key={s} className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold">{s}</span>
                             ))}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 text-[11px]">
                            <div className="p-3 bg-slate-50 rounded-xl">
                                <span className="block text-slate-400 uppercase font-bold tracking-tighter mb-1">Experience</span>
                                <span className="font-bold text-slate-700 capitalize">{c.profile?.experience_level}</span>
                            </div>
                             <div className="p-3 bg-slate-50 rounded-xl">
                                <span className="block text-slate-400 uppercase font-bold tracking-tighter mb-1">Specialization</span>
                                <span className="font-bold text-slate-700 capitalize">{c.profile?.specialization}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-50 pt-6">
                            <div className="flex gap-2">
                                <a href={c.profile?.resume_url} target="_blank" className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleStatusUpdate(c._id, 'shortlisted')} className="btn-primary py-2 px-4 text-xs bg-emerald-600 hover:bg-emerald-700">Shortlist</button>
                                <button onClick={() => handleStatusUpdate(c._id, 'rejected')} className="btn-secondary py-2 px-4 text-xs text-rose-600 border-rose-100 hover:bg-rose-50">Reject</button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {filteredCandidates.length === 0 && (
                <div className="text-center py-20 card border-dashed border-2 bg-transparent text-slate-400 italic">
                    No candidates found matching selected filters.
                </div>
            )}
        </div>
    );
};

export default CandidateList;
