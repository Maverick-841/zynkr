import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Building2, Plus, Mail, Briefcase, Zap, CheckCircle } from 'lucide-react';

const CompanyManagement = () => {
    const [companies, setCompanies] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();
    const [form, setForm] = useState({ company_name: '', contact_person: '', email: '', role_hiring: 'fullstack', skills_required: '', stipend: '', interview_speed: '3days' });

    const fetchCompanies = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/companies', { headers: { Authorization: `Bearer ${user.token}` } });
            setCompanies(data);
        } catch (_) {}
    };

    useEffect(() => { fetchCompanies(); }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const skillsArray = form.skills_required.split(',').map(s => s.trim());
            await axios.post('http://localhost:5000/api/admin/company', { ...form, skills_required: skillsArray }, { headers: { Authorization: `Bearer ${user.token}` } });
            setShowForm(false);
            fetchCompanies();
            setForm({ company_name: '', contact_person: '', email: '', role_hiring: 'fullstack', skills_required: '', stipend: '', interview_speed: '3days' });
        } catch (_) { alert('Error adding company'); }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">Company Partners</h1>
                    <p className="text-slate-500">Manage hiring companies and requirements.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    <Plus size={18} /> Add Company
                </button>
            </div>

            {showForm && (
                <div className="card bg-primary-50 border border-primary-100">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input type="text" placeholder="Company Name" className="input-field" value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} required />
                        <input type="text" placeholder="Contact Person" className="input-field" value={form.contact_person} onChange={e => setForm({ ...form, contact_person: e.target.value })} required />
                        <input type="email" placeholder="Email" className="input-field" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                        <select className="input-field" value={form.role_hiring} onChange={e => setForm({ ...form, role_hiring: e.target.value })}>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="fullstack">Fullstack</option>
                        </select>
                        <input type="text" placeholder="Required Skills (React, Node...)" className="input-field" value={form.skills_required} onChange={e => setForm({ ...form, skills_required: e.target.value })} required />
                        <input type="text" placeholder="Stipend (e.g. $500/mo)" className="input-field" value={form.stipend} onChange={e => setForm({ ...form, stipend: e.target.value })} />
                        <select className="input-field" value={form.interview_speed} onChange={e => setForm({ ...form, interview_speed: e.target.value })}>
                            <option value="24hr">24h Interview</option>
                            <option value="3days">3 Day Speed</option>
                            <option value="1week">Weekly Batch</option>
                        </select>
                        <div className="flex gap-2 items-center">
                            <button type="submit" className="btn-primary py-2 px-6 text-sm flex-1">Save</button>
                            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-400 hover:text-rose-500">Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {companies.map(company => (
                    <div key={company._id} className="card hover:shadow-lg transition-all border-b-4 border-slate-100 hover:border-primary-500 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                <Building2 size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800">{company.company_name}</h3>
                                <p className="text-xs text-slate-400 capitalize">Hiring: {company.role_hiring}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {company.skills_required?.map(s => (
                                <span key={s} className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded-lg text-[10px] font-bold">{s}</span>
                            ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-50">
                            <span className="flex items-center gap-1"><Briefcase size={11} /> <span className="text-emerald-600 font-bold">{company.stipend}</span></span>
                            <span className="flex items-center gap-1"><Zap size={11} /> {company.interview_speed}</span>
                            <span className="flex items-center gap-1"><Mail size={11} /> {company.contact_person}</span>
                        </div>
                    </div>
                ))}
            </div>
            {companies.length === 0 && !showForm && (
                <div className="card text-center py-20 text-slate-400 italic border-2 border-dashed border-slate-200">No companies added yet.</div>
            )}
        </div>
    );
};

export default CompanyManagement;
