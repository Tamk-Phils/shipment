"use client";

import { motion } from "framer-motion";
import { Calculator, Package, Globe, Ruler, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function QuotePage() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <main className="min-h-screen bg-white pt-32 pb-20">
                <div className="container mx-auto px-4 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-xl mx-auto bg-slate-50 p-12 rounded-[60px] border border-slate-100"
                    >
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-emerald-500/20">
                            <CheckCircle2 size={40} />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 mb-4">Estimate Received</h2>
                        <p className="text-slate-500 font-bold text-lg mb-8 leading-relaxed">
                            Our logistics algorithms are processing your request. A detailed quote will be sent to your inbox within 15 minutes.
                        </p>
                        <button 
                            onClick={() => window.location.href = '/'}
                            className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all"
                        >
                            Return Home
                        </button>
                    </motion.div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 pt-20 pb-32">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-600/20 mb-6">
                                <Calculator size={16} />
                                <span>Precision Quote Engine</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6">
                                Instant <br/>
                                <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Freight Analysis</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-bold leading-relaxed">
                                Get instant visibility into shipping costs across our global network. No hidden fees, just data-driven pricing.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { icon: Globe, title: "Global Network", desc: "Access to 180+ countries and thousands of transit hubs." },
                                { icon: Package, title: "Multi-Modal", desc: "Air, Sea, and Land options calculated in real-time." },
                                { icon: Ruler, title: "Dimensional Cargo", desc: "Special handling for oversized or high-value shipments." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shrink-0 shadow-sm">
                                        <item.icon size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-400 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 md:p-12 rounded-[50px] shadow-2xl shadow-blue-900/5 border border-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                            
                            <form onSubmit={handleSubmit} className="relative z-10">
                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                        <h3 className="text-2xl font-black text-slate-900 mb-8">Origin & Destination</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Origin City/Port</label>
                                                <input type="text" placeholder="e.g. Berlin" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Destination City/Port</label>
                                                <input type="text" placeholder="e.g. Hamburg" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Service Level</label>
                                            <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                                                <option>Standard Freight (10-14 days)</option>
                                                <option>Priority Express (3-5 days)</option>
                                                <option>Critical Overnight (Next Day)</option>
                                            </select>
                                        </div>
                                        <button type="button" onClick={nextStep} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 group">
                                            Next Details <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                                        <h3 className="text-2xl font-black text-slate-900 mb-8">Cargo Specifications</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Weight (KG)</label>
                                                <input type="number" placeholder="500" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cargo Volume (m³)</label>
                                                <input type="number" placeholder="2.4" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold focus:ring-2 focus:ring-primary focus:border-transparent transition-all" required />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <button type="button" onClick={prevStep} className="w-1/3 bg-slate-100 text-slate-600 py-5 rounded-2xl font-black border border-slate-200">
                                                Back
                                            </button>
                                            <button type="submit" className="w-2/3 bg-primary text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-primary/20">
                                                Generate Quote <Send size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        </motion.div>

                        <div className="mt-8 p-6 bg-blue-600 rounded-3xl text-white flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Calculator size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest opacity-80">Enterprise</p>
                                    <p className="font-bold">Massive Volume Discount</p>
                                </div>
                            </div>
                            <span className="text-sm font-black underline cursor-pointer">Inquire Now</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
