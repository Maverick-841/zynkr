import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Target, Zap, ShieldCheck, Briefcase } from 'lucide-react';

const Home = () => {
    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="text-center space-y-8 pt-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl font-extrabold tracking-tight md:text-7xl">
                        Hire Faster with <span className="bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent italic">ZYNKR</span>
                    </h1>
                    <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        The ultimate platform connecting top candidates to interviews within 24–48 hours. Scalable, secure, and lightning fast.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link to="/signup" className="btn-primary flex items-center gap-2">
                             Get Started <Rocket size={20} />
                        </Link>
                        <Link to="/apply" className="btn-secondary flex items-center gap-2">
                             Apply as Candidate <Target size={20} />
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Elements Mockup */}
                <motion.div 
                    className="relative mt-20 max-w-5xl mx-auto h-[400px] glass rounded-3xl overflow-hidden shadow-2xl border-white/50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent/10 pointer-events-none" />
                    <div className="flex items-center justify-center h-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 w-full">
                            <div className="card text-center space-y-4 bg-white/40">
                                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto text-primary-600">
                                    <Zap />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">24hr Match</h3>
                                <p className="text-sm text-slate-500">Fastest matching algorithm in the industry.</p>
                            </div>
                             <div className="card text-center space-y-4 bg-white/70 animate-float translate-y-[-20px] scale-105 border-primary-200">
                                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto text-accent">
                                    <ShieldCheck />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">Verified Skills</h3>
                                <p className="text-sm text-slate-500">Every candidate is pre-vetted by our admin team.</p>
                            </div>
                             <div className="card text-center space-y-4 bg-white/40">
                                <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto text-primary-600">
                                    <Briefcase />
                                </div>
                                <h3 className="font-bold text-lg text-slate-800">Top Companies</h3>
                                <p className="text-sm text-slate-500">Direct connections to premium startups.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
