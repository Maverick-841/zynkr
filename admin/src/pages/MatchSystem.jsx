import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Zap } from 'lucide-react';

const MatchSystem = () => {
    const { user } = useAuth();
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSmartMatches = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/smart-matches', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setMatches(data);
        } catch (_) {}
        setLoading(false);
    };

    useEffect(() => { fetchSmartMatches(); }, [user]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">The Brain 🧠</h1>
                    <p className="text-slate-500">Smart skill-based candidate matching.</p>
                </div>
                <button onClick={fetchSmartMatches} className="btn-primary flex items-center gap-2">
                    <Zap size={16} /> Refresh Matches
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : matches.length === 0 ? (
                <div className="card text-center py-20 text-slate-400 italic border-2 border-dashed border-slate-200">
                    No skill matches found. Add companies with required skills to see matches.
                </div>
            ) : (
                <div className="space-y-5">
                    {matches.map(({ candidate, matchedCompanies }) => (
                        <div key={candidate._id} className="card border-l-4 border-primary-500 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-slate-800">{candidate.name}</h3>
                                    <p className="text-xs text-slate-400">{candidate.email} · <span className="capitalize">{candidate.specialization}</span></p>
                                </div>
                                <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-full text-[10px] font-extrabold uppercase">
                                    {matchedCompanies.length} match{matchedCompanies.length > 1 ? 'es' : ''}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {candidate.skills.map(s => (
                                    <span key={s} className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-lg text-[10px] font-bold">{s}</span>
                                ))}
                            </div>
                            <div className="space-y-2 pt-2 border-t border-slate-50">
                                <p className="text-[10px] font-bold uppercase text-slate-400">Matched Companies</p>
                                {matchedCompanies.map(comp => (
                                    <div key={comp._id} className="flex items-center justify-between p-2 bg-slate-50 rounded-xl text-sm">
                                        <span className="font-semibold text-slate-700">{comp.company_name}</span>
                                        <span className="text-xs text-slate-400">{comp.role_hiring}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchSystem;
