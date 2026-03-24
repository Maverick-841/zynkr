import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, Loader } from 'lucide-react';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/admin/login', form);
            login(data);
            navigate('/');
        } catch (_) {
            setError('Invalid admin credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md space-y-8">
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">ZYNKR Admin</h1>
                    <p className="text-slate-400 text-sm">Restricted access — authorized personnel only</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                        <input type="email" required className="input-field"
                            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                        <input type="password" required className="input-field"
                            value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                    </div>
                    {error && <p className="text-rose-500 text-sm">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full btn-primary flex justify-center items-center gap-2 py-3">
                        {loading ? <><Loader size={18} className="animate-spin" /> Authenticating...</> : 'Login to Admin Panel'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
