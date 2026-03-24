import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, User, Building2, Clock, CheckCircle, XCircle } from 'lucide-react';

const statusIcons = {
    sent:      { icon: <Clock size={14} />,        color: 'text-amber-500',   bg: 'bg-amber-50' },
    interview: { icon: <Calendar size={14} />,     color: 'text-blue-500',    bg: 'bg-blue-50'  },
    selected:  { icon: <CheckCircle size={14} />,  color: 'text-emerald-500', bg: 'bg-emerald-50' },
    rejected:  { icon: <XCircle size={14} />,      color: 'text-rose-500',    bg: 'bg-rose-50'  },
};

const MatchTracking = () => {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/admin/matches', {
                    headers: { Authorization: `Bearer ${user.token}` }
                });
                setMatches(data);
            } catch (_) {}
        };
        fetchMatches();
    }, [user]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-black text-slate-900">Match Tracking</h1>
                <p className="text-slate-500">Monitor all candidate-company match progress.</p>
            </div>

            <div className="space-y-4">
                {matches.map(match => {
                    const s = statusIcons[match.status] || statusIcons.sent;
                    return (
                        <div key={match._id} className="card flex flex-col md:flex-row items-center gap-6 justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                                    <User size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">{match.candidate_id?.name}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">{match.candidate_id?.profile?.specialization}</p>
                                </div>
                            </div>

                            <div className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase ${s.color} ${s.bg}`}>
                                {s.icon} {match.status}
                            </div>

                            <div className="flex items-center gap-4 flex-1 justify-end">
                                <div className="text-right">
                                    <p className="font-bold text-slate-800">{match.company_id?.company_name}</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">{match.company_id?.role_hiring}</p>
                                </div>
                                <div className="w-11 h-11 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                    <Building2 size={20} />
                                </div>
                            </div>
                        </div>
                    );
                })}
                {matches.length === 0 && (
                    <div className="card text-center py-20 text-slate-400 italic border-2 border-dashed border-slate-200">
                        No matches created yet. Use The Brain to create matches first!
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchTracking;
