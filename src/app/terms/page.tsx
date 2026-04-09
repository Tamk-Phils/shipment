"use client";

import { motion } from "framer-motion";
import { Scale, ShieldAlert, Lock, FileText, CheckCircle } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="bg-white min-h-screen pt-24">
            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20"
                >
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6 border border-blue-100">
                        <Scale size={14} />
                        Legal Framework
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">
                        Terms of <br/> <span className="text-primary">Usage</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold leading-relaxed">
                        Last Modified: April 9, 2026. Please read these terms carefully before using the NexusTrack Global Logistics Platform.
                    </p>
                </motion.div>

                <div className="space-y-16">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                                <FileText size={20} />
                            </div>
                            1. Acceptance of Terms
                        </h2>
                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium">
                            <p>By accessing or using the NexusTrack platform, you agree to be bound by these Terms of Service. If you are using the platform on behalf of a company, you represent that you have the authority to bind that entity to these terms.</p>
                            <p>NexusTrack reserves the right to modify these terms at any time. Continued use of the platform after such changes constitutes acceptance of the new terms.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                                <Lock size={20} />
                            </div>
                            2. Data Privacy & Security
                        </h2>
                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium">
                            <p>We take the security of your shipping data seriously. All tracking information is encrypted in transit and at rest. You retain ownership of all data submitted to the platform, but grant NexusTrack a non-exclusive license to use such data to provide the services.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                                <ShieldAlert size={20} />
                            </div>
                            3. Prohibited Conduct
                        </h2>
                        <div className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium">
                            <p>Users are strictly prohibited from reverse engineering the NexusTrack telemetry algorithms, attempting to bypass API rate limits, or using the platform for illegal trade tracking.</p>
                        </div>
                    </section>

                    <section className="p-12 bg-slate-50 rounded-[40px] border border-slate-100 flex justify-between items-center">
                        <div>
                            <p className="font-bold text-slate-600 mb-2">Have legal concerns?</p>
                            <div className="flex items-center gap-3 text-emerald-600 font-black uppercase tracking-widest text-xs">
                                <CheckCircle size={16} />
                                Fully Compliant Platform
                            </div>
                        </div>
                        <a href="mailto:legal@nexustrack.com" className="bg-white px-8 py-4 border border-slate-200 rounded-2xl font-black text-slate-900 hover:border-primary hover:text-primary transition-all">
                            Contact Legal
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
