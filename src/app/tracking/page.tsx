"use client";

import { motion } from "framer-motion";
import { Package, ShieldCheck, Clock, MapPin } from "lucide-react";
import TrackingSearch from "@/components/TrackingSearch";

export default function TrackingPage() {
    return (
        <main className="min-h-screen bg-white">
            
            <section className="pt-32 pb-48">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-24"
                        >
                            <div className="inline-flex items-center gap-3 bg-primary/5 text-primary px-6 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] border-l-4 border-primary mb-10">
                                <Package size={14} />
                                <span>Institutional Gateway Verification</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black text-[#1A1A1A] tracking-tighter mb-8 uppercase leading-[0.9]">
                                TRANSIT <span className="text-primary italic">INTELLIGENCE.</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-bold max-w-3xl mx-auto leading-relaxed uppercase tracking-tight">
                                Access the National Financial Credit secure tracking node. 
                                Enter your institutional ID to verify real-time telemetry across the global network.
                            </p>
                        </motion.div>

                        <div className="bg-white p-2 rounded-sm shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100">
                            <TrackingSearch />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-32">
                            {[
                                { icon: ShieldCheck, title: "DATA INTEGRITY", desc: "Military-grade AES-256 encryption for every transit record." },
                                { icon: Clock, title: "TELEMETRY SYNC", desc: "Sub-second integration with terminal management systems." },
                                { icon: MapPin, title: "GLOBAL NODES", desc: "Institutional visibility across 180+ international hubs." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="bg-slate-50 p-12 rounded-sm border border-slate-100 group hover:bg-[#1A1A1A] transition-all duration-500"
                                >
                                    <div className="w-16 h-16 bg-white rounded-sm flex items-center justify-center text-primary mb-10 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                                        <item.icon size={32} />
                                    </div>
                                    <h3 className="text-xs font-black text-[#1A1A1A] mb-4 group-hover:text-white transition-colors uppercase tracking-[0.2em]">{item.title}</h3>
                                    <p className="text-slate-500 font-bold text-sm leading-relaxed group-hover:text-slate-400 transition-colors uppercase tracking-tight">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
