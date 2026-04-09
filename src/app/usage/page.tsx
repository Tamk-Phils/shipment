"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Cpu, Database, Activity } from "lucide-react";

export default function UsagePage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-24">
            <div className="container mx-auto px-6 py-20 max-w-5xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6 border border-emerald-100">
                        <Activity size={14} />
                        Operational Guidelines
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">
                        Platform <br/> <span className="text-emerald-500">Usage Policy</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold leading-relaxed max-w-2xl mx-auto">
                        NexusTrack is designed for high-throughput logistics intelligence. To maintain peak performance for all users, we enforce the following usage standards.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-blue-600/20">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4">API Rate Limits</h3>
                        <p className="text-slate-600 font-bold leading-relaxed mb-6">
                            Standard API access is limited to 1,000 requests per minute. Enterprise accounts feature custom bursting capabilities defined in their respective SLAs.
                        </p>
                        <div className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="w-2 h-2 rounded-full bg-emerald-500" />
                           <span className="text-xs font-black uppercase tracking-widest text-slate-500">Live Fair-Usage Monitoring</span>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-600/20">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-4">Automated Access</h3>
                        <p className="text-slate-600 font-bold leading-relaxed mb-6">
                            Unauthorized scraping or automated harvesting of tracking data is strictly prohibited. All automated access must use an official API key with valid auth headers.
                        </p>
                        <div className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="w-2 h-2 rounded-full bg-blue-500" />
                           <span className="text-xs font-black uppercase tracking-widest text-slate-500">Security Handshake Required</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 text-white p-16 rounded-[60px] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 rounded-l-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black tracking-tighter mb-8">Data Ethics</h2>
                            <div className="space-y-6">
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Database size={24} className="text-emerald-400" />
                                    </div>
                                    <p className="text-slate-400 font-bold">We never cache sensitive PII data beyond the legal necessity for tracking fulfillment.</p>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Cpu size={24} className="text-blue-400" />
                                    </div>
                                    <p className="text-slate-400 font-bold">Our algorithms are regularly audited for bias and accuracy in ETA predictions.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10 text-center">
                            <p className="text-3xl font-black mb-2">99.99%</p>
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Uptime Integrity</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
