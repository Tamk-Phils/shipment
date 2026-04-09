"use client";

import { motion } from "framer-motion";
import { Users, Target, History, Globe2, ShieldCheck, Award } from "lucide-react";
import Image from "next/image";

export default function CompanyPage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-24">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8"
                        >
                            Global Logistics, <br />
                            <span className="text-primary italic">Redefined.</span>
                        </motion.h1>
                        <p className="text-xl text-slate-600 font-bold leading-relaxed mb-10">
                            Founded in 2021, NexusTrack was born from a simple observation: the world's most complex industry was running on fragmented, legacy systems. We built the cure.
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] -z-10" />
            </section>

            {/* Stats */}
            <section className="py-20 bg-white border-y border-slate-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Founded", val: "2021" },
                            { label: "Global Offices", val: "14" },
                            { label: "Tracking Events/Day", val: "2.5M+" },
                            { label: "Team Size", val: "450+" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
                                <p className="text-4xl font-black text-slate-900">{stat.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 bg-blue-600 rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform shadow-xl shadow-blue-600/20">
                                    <Target size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">Our Mission</h3>
                                    <p className="text-slate-600 font-bold leading-relaxed">
                                        To synchronize global trade by providing absolute transparency and predictive intelligence to every participant in the supply chain.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 shrink-0 bg-indigo-600 rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-12 transition-transform shadow-xl shadow-indigo-600/20">
                                    <Globe2 size={32} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">Our Vision</h3>
                                    <p className="text-slate-600 font-bold leading-relaxed">
                                        A world where distance is no longer a barrier to visibility, and data flows as fast as the goods it describes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl skew-y-1">
                            <Image src="/images/hero-plane.png" alt="Company Vision" fill className="object-cover" />
                            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-32 bg-slate-900 text-white rounded-[60px] mx-6 mb-32 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />
                <div className="container mx-auto px-10 relative z-10">
                    <div className="max-w-3xl mb-20">
                        <h2 className="text-5xl font-black tracking-tighter mb-8">The NexusTrack DNA</h2>
                        <p className="text-xl text-slate-400 font-bold">We don't just build software. We engineer the future of logistics infrastructure.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: ShieldCheck, title: "Radical Integrity", desc: "Our data is our bond. We provide raw, unfiltered truth, 24/7." },
                            { icon: Award, title: "Precision First", desc: "In logistics, centimeters matter. We obsess over the details." },
                            { icon: History, title: "Agile Evolution", desc: "We move as fast as the industry we serve, iterating daily." }
                        ].map((v, i) => (
                            <div key={i} className="p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group">
                                <v.icon className="text-primary mb-8 group-hover:scale-110 transition-transform" size={48} />
                                <h4 className="text-2xl font-black mb-4">{v.title}</h4>
                                <p className="text-slate-400 font-bold leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
