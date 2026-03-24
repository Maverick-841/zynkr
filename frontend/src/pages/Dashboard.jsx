import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, XCircle, ExternalLink, Code, Globe, Briefcase, User } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    
    const profile = user?.profile || {};
    const status = profile.status || 'pending';

    const statusConfig = {
        pending: { color: 'text-amber-500', bg: 'bg-amber-50', icon: <Clock />, label: 'Under Review' },
        shortlisted: { color: 'text-emerald-500', bg: 'bg-emerald-50', icon: <CheckCircle />, label: 'Shortlisted' },
        rejected: { color: 'text-rose-500', bg: 'bg-rose-50', icon: <XCircle />, label: 'Not Selected' }
    };

    const currentStatus = statusConfig[status];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name}</h1>
                    <p className="text-slate-500">Track your application and profile status.</p>
                </div>
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 font-semibold ${currentStatus.bg} ${currentStatus.color}`}>
                    {currentStatus.icon}
                    {currentStatus.label}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <section className="card space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <User size={20} className="text-primary-600" />
                            Profile Overview
                        </h2>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider">Role</span>
                                <span className="font-semibold text-slate-700 capitalize">{profile.specialization || 'Not set'}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider">Experience</span>
                                <span className="font-semibold text-slate-700 capitalize">{profile.experience_level || 'Not set'}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                             <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider px-1">Skills</span>
                             <div className="flex flex-wrap gap-2">
                                {profile.skills?.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-bold">
                                        {skill}
                                    </span>
                                ))}
                             </div>
                        </div>
                    </section>

                    <section className="card space-y-4">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Briefcase size={20} className="text-primary-600" />
                            Active Interviews
                        </h2>
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-3xl">
                            <p className="text-slate-400 text-sm">No active interviews yet. We'll notify you soon!</p>
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section className="card space-y-4">
                        <h2 className="text-lg font-bold">Quick Links</h2>
                        <div className="space-y-3">
                            <a href={profile.github_link} target="_blank" className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Code size={20} className="text-slate-700" />
                                    <span className="text-sm font-medium">GitHub</span>
                                </div>
                                <ExternalLink size={16} className="text-slate-300 group-hover:text-primary-600" />
                            </a>
                            <a href={profile.linkedin_link} target="_blank" className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                                <div className="flex items-center gap-3">
                                    <Globe size={20} className="text-[#0077b5]" />
                                    <span className="text-sm font-medium">LinkedIn</span>
                                </div>
                                <ExternalLink size={16} className="text-slate-300 group-hover:text-primary-600" />
                            </a>
                            <a href={profile.resume_url} target="_blank" className="btn-primary w-full py-2 text-sm flex justify-center items-center gap-2">
                                View Resume <ExternalLink size={16} />
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
