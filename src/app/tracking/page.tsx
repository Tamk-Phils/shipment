"use client";

import { motion } from "framer-motion";
import { Package, ShieldCheck, Clock, MapPin } from "lucide-react";
import TrackingSearch from "@/components/TrackingSearch";

export default function TrackingPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            
            <section className="pt-20 pb-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-600/20 mb-6">
                                <Package size={16} />
                                <span>Global Infrastructure Tracking</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter mb-6">
                                Track your <span className="text-primary">Goods</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                                Get real-time visibility into your shipment's journey. Our system integrates directly with carriers for sub-second updates.
                            </p>
                        </motion.div>

                        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-100">
                            <TrackingSearch />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                            {[
                                { icon: ShieldCheck, title: "Secure Data", desc: "Your tracking data is encrypted and protected." },
                                { icon: Clock, title: "Real-time Updates", desc: "Direct integration with terminal systems." },
                                { icon: MapPin, title: "Global Coverage", desc: "Track shipments across 180+ countries." }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
                                >
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-primary mb-6">
                                        <item.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
