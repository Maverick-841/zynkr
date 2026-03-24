import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, Mail, Users, MapPin, Briefcase, Zap, CheckCircle } from 'lucide-react';

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const { user } = useAuth();
    const [newCompany, setNewCompany] = useState({
        company_name: '',
        contact_person: '',
        email: '',
        role_hiring: 'fullstack',
        skills_required: '',
        stipend: '',
        hiring_type: 'normal',
        interview_speed: '3days'
    });

    const fetchCompanies = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/companies', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCompanies(data);
        } catch (error) {
            console.error('Error fetching companies');
        }
    };

    useEffect(() => {
        if (user?.role === 'admin') fetchCompanies();
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const skillsArray = newCompany.skills_required.split(',').map(s => s.trim());
            await axios.post('http://localhost:5000/api/admin/company', { ...newCompany, skills_required: skillsArray }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setShowAddForm(false);
            fetchCompanies();
            setNewCompany({ company_name: '', contact_person: '', email: '', role_hiring: 'fullstack', skills_required: '', stipend: '', hiring_type: 'normal', interview_speed: '3days' });
        } catch (error) {
            alert('Error adding company');
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-primary-600">Company Partners</h1>
                    <p className="text-slate-500 italic">Manage hiring companies and requirements.</p>
                </div>
                <button onClick={() => setShowAddForm(true)} className="btn-primary flex items-center gap-2">
                    <Plus size={20} /> Add Company
                </button>
            </header>

            <AnimatePresence>
                {showAddForm && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="card bg-primary-50/50 border-primary-100">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                            <input type="text" placeholder="Company Name" className="input-field" value={newCompany.company_name} onChange={(e) => setNewCompany({...newCompany, company_name: e.target.value})} required />
                            <input type="text" placeholder="Contact Person" className="input-field" value={newCompany.contact_person} onChange={(e) => setNewCompany({...newCompany, contact_person: e.target.value})} required />
                            <input type="email" placeholder="Email" className="input-field" value={newCompany.email} onChange={(e) => setNewCompany({...newCompany, email: e.target.value})} required />
                            <select className="input-field" value={newCompany.role_hiring} onChange={(e) => setNewCompany({...newCompany, role_hiring: e.target.value})}>
                                <option value="frontend">Frontend</option>
                                <option value="backend">Backend</option>
                                <option value="fullstack">Fullstack</option>
                            </select>
                            <input type="text" placeholder="Skills (React, Node...)" className="input-field" value={newCompany.skills_required} onChange={(e) => setNewCompany({...newCompany, skills_required: e.target.value})} required />
                            <input type="text" placeholder="Stipend (e.g. $500)" className="input-field" value={newCompany.stipend} onChange={(e) => setNewCompany({...newCompany, stipend: e.target.value})} />
                            <select className="input-field" value={newCompany.interview_speed} onChange={(e) => setNewCompany({...newCompany, interview_speed: e.target.value})}>
                                <option value="24hr">24h Interview</option>
                                <option value="3days">3 Day Speed</option>
                                <option value="1week">Weekly Batch</option>
                            </select>
                             <div className="flex gap-2">
                                <button type="submit" className="flex-1 btn-primary py-2 text-xs">Save</button>
                                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-xs text-slate-500 hover:text-rose-600 transition-colors">Cancel</button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, i) => (
                    <motion.div key={company._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="card group hover:shadow-2xl transition-all border-b-4 border-slate-100 hover:border-primary-500">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-primary-600 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                <Building2 />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{company.company_name}</h3>
                                <p className="text-xs text-slate-400 italic">Hiring for {company.role_hiring}</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-xs">
                             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-1"><Zap size={10} /> Speed</span>
                                <span className={`font-bold ${company.interview_speed === '24hr' ? 'text-rose-500' : 'text-slate-700'}`}>{company.interview_speed}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                <span className="text-slate-400 font-bold uppercase tracking-tighter flex items-center gap-1"><Briefcase size={10} /> Stipend</span>
                                <span className="font-bold text-emerald-600">{company.stipend}</span>
                            </div>
                            <div className="space-y-2">
                                <span className="text-slate-400 font-bold uppercase tracking-tighter px-1 flex items-center gap-1"><CheckCircle size={10} /> Required Skills</span>
                                <div className="flex flex-wrap gap-2">
                                    {company.skills_required?.map(s => (
                                        <span key={s} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-lg font-bold">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                             <span className="flex items-center gap-1"><Mail size={12} /> {company.contact_person}</span>
                             <span className="text-slate-300">|</span>
                             <span className="italic">{company.email}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default CompanyManagement;
