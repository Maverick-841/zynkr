import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Code, FileText, Clock, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const CandidateForm = () => {
    const [step, setStep] = useState(1);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        profile: {
            specialization: 'fullstack',
            skills: '',
            github_link: '',
            linkedin_link: '',
            experience_level: 'entry',
            expected_stipend: '',
            availability_24hr: false
        }
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
        try {
            const skillsArray = formData.profile.skills.split(',').map(s => s.trim());
            const submissionData = {
                profile: {
                    ...formData.profile,
                    skills: skillsArray
                }
            };
            await axios.put('http://localhost:5000/api/candidate/profile', submissionData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            navigate('/dashboard');
        } catch (error) {
            alert('Error submitting profile');
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="mb-12 flex justify-between items-center px-4">
                {[1, 2, 3, 4].map((num) => (
                    <div key={num} className={`flex items-center ${num < 4 ? 'flex-1' : ''}`}>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${step >= num ? 'bg-primary-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                            {step > num ? <CheckCircle size={20} /> : num}
                        </div>
                        {num < 4 && <div className={`h-1 flex-1 mx-2 rounded-full ${step > num ? 'bg-primary-600' : 'bg-slate-200'}`} />}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <User size={24} />
                            <h2 className="text-2xl font-bold">Profile Basics</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Specialization</span>
                                <select className="input-field" value={formData.profile.specialization} onChange={(e) => setFormData({...formData, profile: {...formData.profile, specialization: e.target.value}})}>
                                    <option value="frontend">Frontend Developer</option>
                                    <option value="backend">Backend Developer</option>
                                    <option value="fullstack">Fullstack Developer</option>
                                </select>
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Experience Level</span>
                                <select className="input-field" value={formData.profile.experience_level} onChange={(e) => setFormData({...formData, profile: {...formData.profile, experience_level: e.target.value}})}>
                                    <option value="entry">Entry/Freshmen</option>
                                    <option value="junior">Junior (1-2 years)</option>
                                    <option value="mid">Mid-level (3-5 years)</option>
                                    <option value="senior">Senior (5+ years)</option>
                                </select>
                            </label>
                        </div>
                        <button onClick={nextStep} className="w-full btn-primary flex justify-center items-center gap-2">
                            Next Step <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <Code size={24} />
                            <h2 className="text-2xl font-bold">Skills & Links</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Skills (Comma separated)</span>
                                <input type="text" placeholder="React, Node, Express..." className="input-field" value={formData.profile.skills} onChange={(e) => setFormData({...formData, profile: {...formData.profile, skills: e.target.value}})} />
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">GitHub Link</span>
                                <input type="url" placeholder="https://github.com/..." className="input-field" value={formData.profile.github_link} onChange={(e) => setFormData({...formData, profile: {...formData.profile, github_link: e.target.value}})} />
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">LinkedIn Link</span>
                                <input type="url" placeholder="https://linkedin.com/in/..." className="input-field" value={formData.profile.linkedin_link} onChange={(e) => setFormData({...formData, profile: {...formData.profile, linkedin_link: e.target.value}})} />
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevStep} className="flex-1 btn-secondary flex justify-center items-center gap-2"><ArrowLeft size={20} /> Back</button>
                            <button onClick={nextStep} className="flex-1 btn-primary flex justify-center items-center gap-2">Next <ArrowRight size={20} /></button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <FileText size={24} />
                            <h2 className="text-2xl font-bold">Resume & Stipend</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Resume URL (PDF Link)</span>
                                <input type="url" placeholder="Gdrive or Cloudinary link" className="input-field" value={formData.profile.resume_url} onChange={(e) => setFormData({...formData, profile: {...formData.profile, resume_url: e.target.value}})} />
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Expected Stipend (Monthly)</span>
                                <input type="text" placeholder="e.g. $500 - $800" className="input-field" value={formData.profile.expected_stipend} onChange={(e) => setFormData({...formData, profile: {...formData.profile, expected_stipend: e.target.value}})} />
                            </label>
                        </div>
                         <div className="flex gap-4">
                            <button onClick={prevStep} className="flex-1 btn-secondary flex justify-center items-center gap-2"><ArrowLeft size={20} /> Back</button>
                            <button onClick={nextStep} className="flex-1 btn-primary flex justify-center items-center gap-2">Next <ArrowRight size={20} /></button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <Clock size={24} />
                            <h2 className="text-2xl font-bold">Availability</h2>
                        </div>
                        <div className="space-y-6">
                            <label className="flex items-center gap-4 p-4 glass rounded-2xl cursor-pointer hover:bg-white/90 transition-all">
                                <input type="checkbox" className="w-6 h-6 rounded-lg text-primary-600" checked={formData.profile.availability_24hr} onChange={(e) => setFormData({...formData, profile: {...formData.profile, availability_24hr: e.target.checked}})} />
                                <div>
                                    <span className="block font-bold">24-hour Availability</span>
                                    <span className="text-sm text-slate-500 italic">I am ready to start immediately (within 24 hours).</span>
                                </div>
                            </label>
                            <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                <p className="text-sm text-primary-700 leading-relaxed">
                                    <strong>Almost there!</strong> By submitting, your profile will be sent to our admin team for review. You'll hear back within 24-48 hours.
                                </p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <button onClick={prevStep} className="flex-1 btn-secondary flex justify-center items-center gap-2"><ArrowLeft size={20} /> Back</button>
                            <button onClick={handleSubmit} className="flex-1 btn-primary bg-emerald-600 hover:bg-emerald-700 flex justify-center items-center gap-2">Submit Profile <CheckCircle size={20} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CandidateForm;
