import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Search, Target, Send, CheckCircle, ChevronRight, Filter } from 'lucide-react';

const MatchSystem = () => {
    const [companies, setCompanies] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            const [companiesRes, candidatesRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/companies', { headers: { Authorization: `Bearer ${user.token}` } }),
                axios.get('http://localhost:5000/api/candidate/all', { headers: { Authorization: `Bearer ${user.token}` } })
            ]);
            setCompanies(companiesRes.data);
            setCandidates(candidatesRes.data.filter(c => c.profile?.status === 'shortlisted'));
        } catch (error) {
            console.error('Error fetching data');
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') fetchData();
    }, [user]);

    const handleMatch = async () => {
        if (!selectedCompany || selectedCandidates.length === 0) return;
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/admin/match', {
                candidate_ids: selectedCandidates,
                company_id: selectedCompany._id
            }, { headers: { Authorization: `Bearer ${user.token}` } });
            alert('Matches sent successfully!');
            setSelectedCandidates([]);
            setSelectedCompany(null);
        } catch (error) {
            alert('Matching failed');
        } finally {
            setLoading(false);
        }
    };

    const toggleCandidate = (id) => {
        setSelectedCandidates(prev => 
            prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-8">
             <header>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">The Brain: Matching System</h1>
                <p className="text-slate-500 italic">Connect shortlisted talent with the perfect hiring partners.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Step 1: Select Company */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2 px-2">
                        <Building2 className="text-primary-600" size={20} />
                        1. Select Hiring Company
                    </h2>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {companies.map(company => (
                            <div 
                                key={company._id} 
                                onClick={() => setSelectedCompany(company)}
                                className={`p-4 card cursor-pointer transition-all border-l-4 ${selectedCompany?._id === company._id ? 'border-primary-600 bg-primary-50/50' : 'border-slate-100 hover:border-primary-400'}`}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-slate-800">{company.company_name}</h3>
                                    <div className="px-2 py-0.5 bg-slate-100 text-[10px] font-extrabold uppercase rounded text-slate-500">
                                        {company.role_hiring}
                                    </div>
                                </div>
                                <div className="mt-2 text-xs flex flex-wrap gap-1">
                                    {company.skills_required?.map(s => <span key={s} className="text-primary-600 font-bold">#{s} </span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step 2: Select Candidates */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold flex items-center gap-2 px-2">
                        <Users className="text-primary-600" size={20} />
                        2. Select Candidates ({selectedCandidates.length})
                    </h2>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        {candidates.length === 0 && <p className="text-center py-10 text-slate-400 italic">No shortlisted candidates available.</p>}
                        {candidates.map(candidate => (
                            <div 
                                key={candidate._id} 
                                onClick={() => toggleCandidate(candidate._id)}
                                className={`p-4 card cursor-pointer transition-all border-l-4 ${selectedCandidates.includes(candidate._id) ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-100 hover:border-emerald-400'}`}
                            >
                                 <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-slate-800">{candidate.name}</h3>
                                        <p className="text-xs text-slate-500">{candidate.profile?.specialization}</p>
                                    </div>
                                    {selectedCandidates.includes(candidate._id) && <CheckCircle size={20} className="text-emerald-600" />}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {candidate.profile?.skills?.map(s => <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-bold rounded uppercase">{s}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Step 3: Action */}
            <AnimatePresence>
                {selectedCompany && selectedCandidates.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6"
                    >
                        <div className="glass p-6 rounded-3xl shadow-2xl flex items-center justify-between gap-6 border-primary-100">
                             <div className="flex-1 space-y-1">
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sending match...</p>
                                <div className="flex items-center gap-2 font-bold text-slate-700">
                                    <span>{selectedCandidates.length} Candidates</span>
                                    <ChevronRight size={16} />
                                    <span className="text-primary-600">{selectedCompany.company_name}</span>
                                </div>
                             </div>
                             <button 
                                onClick={handleMatch}
                                disabled={loading}
                                className="btn-primary flex items-center gap-3 py-4 px-8 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                             >
                                {loading ? 'Processing...' : 'Execute Match'} <Send size={20} />
                             </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MatchSystem;
