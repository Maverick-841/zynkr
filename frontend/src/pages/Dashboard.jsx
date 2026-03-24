import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, Clock, XCircle, ExternalLink, Code, Globe, Briefcase, User, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(user?.profile || {});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/candidate/profile', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setProfile(data.profile || {});
            } catch (_) {
                setProfile(user?.profile || {});
            } finally {
                setLoading(false);
            }
        };
        if (user?.token) fetchProfile();
    }, [user]);

    const status = profile.status || 'pending';

    const statusConfig = {
        pending:     { color: 'text-amber-500',   bg: 'bg-amber-50',   icon: <Clock />,        label: 'Under Review' },
        shortlisted: { color: 'text-blue-500',    bg: 'bg-blue-50',    icon: <CheckCircle />,  label: 'Shortlisted' },
        interview:   { color: 'text-purple-500',  bg: 'bg-purple-50',  icon: <Briefcase />,    label: 'Interview Stage' },
        rejected:    { color: 'text-rose-500',    bg: 'bg-rose-50',    icon: <XCircle />,      label: 'Not Selected' },
    };

    const currentStatus = statusConfig[status] || statusConfig.pending;

    // Profile completion
    const fields = ['specialization', 'experience_level', 'skills', 'github_link', 'linkedin_link', 'resume_url', 'expected_stipend'];
    const filled = fields.filter(f => {
        const val = profile[f];
        return Array.isArray(val) ? val.length > 0 : Boolean(val);
    }).length;
    const completion = Math.round((filled / fields.length) * 100);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name} 👋</h1>
                    <p className="text-slate-500">Track your application and profile status.</p>
                </div>
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 font-semibold ${currentStatus.bg} ${currentStatus.color}`}>
                    {currentStatus.icon}
                    {currentStatus.label}
                </div>
            </header>

            {/* Profile Completion Bar */}
            <div className="card space-y-3">
                <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-700">Profile Completion</span>
                    <span className="font-extrabold text-primary-600">{completion}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                        className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 transition-all duration-700"
                        style={{ width: `${completion}%` }}
                    />
                </div>
                {completion < 100 && (
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                        <AlertCircle size={12} /> Complete your profile at <a href="/apply" className="text-primary-600 font-semibold underline">/apply</a> to improve your match chances.
                    </p>
                )}
            </div>

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
                                <span className="font-semibold text-slate-700 capitalize">{profile.specialization || '—'}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider">Experience</span>
                                <span className="font-semibold text-slate-700 capitalize">{profile.experience_level || '—'}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider">Stipend</span>
                                <span className="font-semibold text-slate-700">{profile.expected_stipend ? `$${profile.expected_stipend}/mo` : '—'}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl">
                                <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider">Availability</span>
                                <span className="font-semibold text-slate-700">{profile.availability_24hr ? '24hr Ready ⚡' : 'Standard'}</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <span className="block text-slate-400 uppercase text-[10px] font-bold tracking-wider px-1">Skills</span>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills?.length > 0
                                    ? profile.skills.map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-xs font-bold">{skill}</span>
                                    ))
                                    : <span className="text-slate-400 text-sm italic">No skills added yet.</span>
                                }
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
                            {profile.github_link ? (
                                <a href={profile.github_link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <Code size={20} className="text-slate-700" />
                                        <span className="text-sm font-medium">GitHub</span>
                                    </div>
                                    <ExternalLink size={16} className="text-slate-300 group-hover:text-primary-600" />
                                </a>
                            ) : null}
                            {profile.linkedin_link ? (
                                <a href={profile.linkedin_link} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <Globe size={20} className="text-[#0077b5]" />
                                        <span className="text-sm font-medium">LinkedIn</span>
                                    </div>
                                    <ExternalLink size={16} className="text-slate-300 group-hover:text-primary-600" />
                                </a>
                            ) : null}
                            {profile.resume_url ? (
                                <a href={profile.resume_url} target="_blank" rel="noreferrer" className="btn-primary w-full py-2 text-sm flex justify-center items-center gap-2">
                                    View Resume <ExternalLink size={16} />
                                </a>
                            ) : (
                                <a href="/apply" className="btn-secondary w-full py-2 text-sm flex justify-center items-center gap-2">
                                    Complete Profile
                                </a>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
