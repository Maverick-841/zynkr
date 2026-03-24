import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Users, Filter, Search, Check, X, Mail } from 'lucide-react';

const AdminDashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
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
        if (user?.role === 'admin') fetchCandidates();
    }, [user]);

    return (
        <div className="space-y-8">
             <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Admin Console</h1>
                    <p className="text-slate-500">Manage candidates and hiring matches.</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search candidates..." className="input-field pl-10 py-2 text-sm" />
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <section className="card space-y-4">
                        <h2 className="font-bold flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </h2>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Status</span>
                                <div className="space-y-2">
                                    {['Pending', 'Shortlisted', 'Rejected'].map(s => (
                                        <label key={s} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary-600">
                                            <input type="checkbox" className="rounded" /> {s}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="md:col-span-3 card p-0 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Candidate</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Skills</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {candidates.map((c) => (
                                <tr key={c._id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{c.name}</div>
                                        <div className="text-xs text-slate-400">{c.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm capitalize">{c.profile?.specialization}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {c.profile?.skills?.slice(0, 2).map(s => (
                                                <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{s}</span>
                                            ))}
                                            {c.profile?.skills?.length > 2 && <span className="text-[10px] text-slate-400 font-bold">+{c.profile.skills.length - 2}</span>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-extrabold uppercase ${c.profile?.status === 'shortlisted' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {c.profile?.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-2 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors"><Check size={18} /></button>
                                            <button className="p-2 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"><X size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {candidates.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400 text-sm">No candidates found matching filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
