"use client";

import { motion } from "framer-motion";
import { Globe, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="container mx-auto py-24 px-4 max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl font-extrabold mb-6">About TrackFlow</h1>
                <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
                    <p>
                        Founded in 2015, TrackFlow was built with a single mission: to bring enterprise-grade logistics monitoring to every business, regardless of size.
                    </p>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                        <Target size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                        To provide logistics professionals with the most accurate, real-time data possible, enabling them to make informed decisions and build trust with their own clients.
                    </p>
                </div>
                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-lg shadow-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                        <Globe size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                    <p className="text-slate-600 leading-relaxed font-medium">
                        A world where every shipment is visible, every delay is anticipated, and global commerce flows without interruption.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-12 text-white overflow-hidden relative">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Enterprise Reliability</h2>
                        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                            We understand that in logistics, timing is everything. That&apos;s why we&apos;ve built our infrastructure on enterprise-grade servers with 99.9% uptime guarantees.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                    <ShieldCheck size={14} className="text-primary" />
                                </div>
                                <span className="font-semibold">ISO 27001 Certified Infrastructure</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                    <ShieldCheck size={14} className="text-primary" />
                                </div>
                                <span className="font-semibold">GDPR Compliant Data Processing</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                            <p className="text-4xl font-bold text-primary mb-2">10M+</p>
                            <p className="text-slate-400 font-medium">Packages Tracked</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-4 text-slate-900">Our Vision</h3>
                            <p className="text-slate-700 font-medium text-lg">To create the world&apos;s most transparent and efficient logistics network, powered by real-time data and smart automation.</p>
                        </div>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                            <h3 className="text-xl font-bold mb-4 text-slate-900">Our Values</h3>
                            <p className="text-slate-700 font-medium text-lg">Integrity, precision, and a relentless focus on our customers&apos; success in the global marketplace.</p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                            <p className="text-4xl font-bold text-emerald-400 mb-2">24/7</p>
                            <p className="text-slate-400 font-medium">Expert Support</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
