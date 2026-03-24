import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Mail, ExternalLink } from 'lucide-react';

const statusStyle = {
    pending:     'bg-amber-100 text-amber-700',
    shortlisted: 'bg-emerald-100 text-emerald-700',
    interview:   'bg-purple-100 text-purple-700',
    rejected:    'bg-rose-100 text-rose-700',
};

const CandidateList = () => {
    const { user } = useAuth();
    const [candidates, setCandidates] = useState([]);
    const [filter, setFilter] = useState({ role: '', status: '' });

    const fetchCandidates = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/candidate/all', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCandidates(data);
        } catch (_) {}
    };

    useEffect(() => { fetchCandidates(); }, [user]);

    const handleStatus = async (id, status) => {
        try {
            await axios.put('http://localhost:5000/api/admin/candidate/status', { id, status }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchCandidates();
        } catch (_) { alert('Update failed'); }
    };

    const filtered = candidates.filter(c =>
        (filter.role === '' || c.profile?.specialization === filter.role) &&
        (filter.status === '' || c.profile?.status === filter.status)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Candidate Pool</h1>
                    <p className="text-slate-500">Review and manage candidate applications.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                    <select className="input-field py-2 text-sm w-36" value={filter.role} onChange={e => setFilter({ ...filter, role: e.target.value })}>
                        <option value="">All Roles</option>
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="fullstack">Fullstack</option>
                    </select>
                    <select className="input-field py-2 text-sm w-36" value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {filtered.map(c => (
                    <div key={c._id} className="card border-l-4 border-slate-200 hover:border-primary-500 transition-all space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">{c.name}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                    <Mail size={11} /> {c.email}
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${statusStyle[c.profile?.status] || statusStyle.pending}`}>
                                {c.profile?.status || 'pending'}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            {c.profile?.skills?.map(s => (
                                <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold">{s}</span>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-2.5 bg-slate-50 rounded-xl">
                                <span className="block text-slate-400 uppercase font-bold text-[9px]">Experience</span>
                                <span className="font-bold text-slate-700 capitalize">{c.profile?.experience_level || '—'}</span>
                            </div>
                            <div className="p-2.5 bg-slate-50 rounded-xl">
                                <span className="block text-slate-400 uppercase font-bold text-[9px]">Role</span>
                                <span className="font-bold text-slate-700 capitalize">{c.profile?.specialization || '—'}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                            {c.profile?.resume_url && (
                                <a href={c.profile.resume_url} target="_blank" rel="noreferrer"
                                    className="flex items-center gap-1.5 text-xs text-primary-600 font-semibold hover:underline">
                                    <ExternalLink size={14} /> Resume
                                </a>
                            )}
                            <div className="flex gap-2 ml-auto">
                                <button onClick={() => handleStatus(c._id, 'shortlisted')}
                                    className="btn-primary py-1.5 px-3 text-xs bg-emerald-600 hover:bg-emerald-700">Shortlist</button>
                                <button onClick={() => handleStatus(c._id, 'interview')}
                                    className="btn-primary py-1.5 px-3 text-xs bg-purple-600 hover:bg-purple-700">Approve</button>
                                <button onClick={() => handleStatus(c._id, 'rejected')}
                                    className="btn-secondary py-1.5 px-3 text-xs text-rose-600 border-rose-100 hover:bg-rose-50">Reject</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {filtered.length === 0 && (
                <div className="text-center py-20 card border-dashed border-2 border-slate-200 text-slate-400 italic">
                    No candidates found.
                </div>
            )}
        </div>
    );
};

export default CandidateList;
