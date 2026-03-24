import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Code, FileText, Clock, CheckCircle, ArrowRight, ArrowLeft, Loader } from 'lucide-react';

const CandidateForm = () => {
    const [step, setStep] = useState(1);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        profile: {
            specialization: 'fullstack',
            skills: '',
            github_link: '',
            linkedin_link: '',
            experience_level: 'entry',
            expected_stipend: '',
            resume_url: '',
            availability_24hr: false
        }
    });

    const update = (field, value) => {
        setFormData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
        setErrors(prev => ({ ...prev, [field]: '' }));
    };

    const validateStep = () => {
        const p = formData.profile;
        const newErrors = {};

        if (step === 2) {
            if (!p.skills.trim()) newErrors.skills = 'Skills are required.';
            if (!p.github_link.trim() && !p.linkedin_link.trim())
                newErrors.links = 'At least one link (GitHub or LinkedIn) is required.';
        }
        if (step === 3) {
            if (!p.resume_url.trim()) newErrors.resume_url = 'Resume link is required.';
            if (!p.expected_stipend.trim()) {
                newErrors.expected_stipend = 'Stipend is required.';
            } else if (isNaN(Number(p.expected_stipend))) {
                newErrors.expected_stipend = 'Stipend must be a number (e.g. 500).';
            }
        }
        if (step === 4) {
            if (!p.availability_24hr) newErrors.availability_24hr = 'You must confirm availability to submit.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) setStep(s => s + 1);
    };
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = async () => {
        if (!validateStep()) return;
        setLoading(true);
        try {
            const skillsArray = formData.profile.skills.split(',').map(s => s.trim()).filter(Boolean);
            const submissionData = {
                profile: { ...formData.profile, skills: skillsArray }
            };
            await axios.put('http://localhost:5000/api/candidate/profile', submissionData, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setSubmitted(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (_err) {
            setErrors({ submit: 'Error submitting profile. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto mt-24 card text-center space-y-6"
            >
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Profile Submitted!</h2>
                <p className="text-slate-500">Your profile has been successfully submitted. We'll review it and get back to you within 24–48 hours.</p>
                <p className="text-xs text-slate-400 animate-pulse">Redirecting to dashboard...</p>
            </motion.div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12">
            {/* Step indicator */}
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
                {/* STEP 1 */}
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <User size={24} />
                            <h2 className="text-2xl font-bold">Profile Basics</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Specialization <span className="text-rose-500">*</span></span>
                                <select className="input-field" value={formData.profile.specialization} onChange={(e) => update('specialization', e.target.value)}>
                                    <option value="frontend">Frontend Developer</option>
                                    <option value="backend">Backend Developer</option>
                                    <option value="fullstack">Fullstack Developer</option>
                                </select>
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Experience Level <span className="text-rose-500">*</span></span>
                                <select className="input-field" value={formData.profile.experience_level} onChange={(e) => update('experience_level', e.target.value)}>
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

                {/* STEP 2 */}
                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <Code size={24} />
                            <h2 className="text-2xl font-bold">Skills & Links</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Skills <span className="text-rose-500">*</span></span>
                                <input type="text" placeholder="React, Node, Express..." className={`input-field ${errors.skills ? 'border-rose-400 focus:ring-rose-400' : ''}`}
                                    value={formData.profile.skills} onChange={(e) => update('skills', e.target.value)} />
                                {errors.skills && <p className="text-rose-500 text-xs mt-1">{errors.skills}</p>}
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">GitHub Link</span>
                                <input type="url" placeholder="https://github.com/..." className={`input-field ${errors.links ? 'border-rose-400' : ''}`}
                                    value={formData.profile.github_link} onChange={(e) => update('github_link', e.target.value)} />
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">LinkedIn Link</span>
                                <input type="url" placeholder="https://linkedin.com/in/..." className={`input-field ${errors.links ? 'border-rose-400' : ''}`}
                                    value={formData.profile.linkedin_link} onChange={(e) => update('linkedin_link', e.target.value)} />
                                {errors.links && <p className="text-rose-500 text-xs mt-1">{errors.links}</p>}
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevStep} className="flex-1 btn-secondary flex justify-center items-center gap-2"><ArrowLeft size={20} /> Back</button>
                            <button onClick={nextStep} className="flex-1 btn-primary flex justify-center items-center gap-2">Next <ArrowRight size={20} /></button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <FileText size={24} />
                            <h2 className="text-2xl font-bold">Resume & Stipend</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Resume URL (PDF Link) <span className="text-rose-500">*</span></span>
                                <input type="url" placeholder="Gdrive or Cloudinary link" className={`input-field ${errors.resume_url ? 'border-rose-400' : ''}`}
                                    value={formData.profile.resume_url || ''} onChange={(e) => update('resume_url', e.target.value)} />
                                {errors.resume_url && <p className="text-rose-500 text-xs mt-1">{errors.resume_url}</p>}
                            </label>
                            <label className="block space-y-2">
                                <span className="text-sm font-semibold text-slate-700">Expected Stipend (Monthly, in $) <span className="text-rose-500">*</span></span>
                                <input type="number" placeholder="e.g. 500" className={`input-field ${errors.expected_stipend ? 'border-rose-400' : ''}`}
                                    value={formData.profile.expected_stipend} onChange={(e) => update('expected_stipend', e.target.value)} />
                                {errors.expected_stipend && <p className="text-rose-500 text-xs mt-1">{errors.expected_stipend}</p>}
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevStep} className="flex-1 btn-secondary flex justify-center items-center gap-2"><ArrowLeft size={20} /> Back</button>
                            <button onClick={nextStep} className="flex-1 btn-primary flex justify-center items-center gap-2">Next <ArrowRight size={20} /></button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="card space-y-6">
                        <div className="flex items-center gap-3 text-primary-600">
                            <Clock size={24} />
                            <h2 className="text-2xl font-bold">Availability</h2>
                        </div>
                        <div className="space-y-6">
                            <label className={`flex items-center gap-4 p-4 glass rounded-2xl cursor-pointer hover:bg-white/90 transition-all ${errors.availability_24hr ? 'border border-rose-400' : ''}`}>
                                <input type="checkbox" className="w-6 h-6 rounded-lg text-primary-600"
                                    checked={formData.profile.availability_24hr}
                                    onChange={(e) => update('availability_24hr', e.target.checked)} />
                                <div>
                                    <span className="block font-bold">24-hour Availability <span className="text-rose-500">*</span></span>
                                    <span className="text-sm text-slate-500 italic">I am ready to start immediately (within 24 hours).</span>
                                </div>
                            </label>
                            {errors.availability_24hr && <p className="text-rose-500 text-xs">{errors.availability_24hr}</p>}

                            <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                <p className="text-sm text-primary-700 leading-relaxed">
                                    <strong>Almost there!</strong> By submitting, your profile will be sent to our admin team for review. You'll hear back within 24–48 hours.
                                </p>
                            </div>
                            {errors.submit && <p className="text-rose-500 text-sm text-center">{errors.submit}</p>}
                        </div>
                        <div className="flex gap-4">
                            <button onClick={prevStep} className="flex-1 btn-secondary flex justify-center items-center gap-2"><ArrowLeft size={20} /> Back</button>
                            <button onClick={handleSubmit} disabled={loading} className="flex-1 btn-primary bg-emerald-600 hover:bg-emerald-700 flex justify-center items-center gap-2 disabled:opacity-50">
                                {loading ? <><Loader size={20} className="animate-spin" /> Submitting...</> : <>Submit Profile <CheckCircle size={20} /></>}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CandidateForm;
