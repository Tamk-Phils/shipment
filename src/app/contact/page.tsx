"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, MapPin, Globe, Sparkles } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50 relative overflow-hidden py-24">
            {/* Background Blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-bold text-primary mb-6 shadow-sm border border-slate-100"
                    >
                        <Sparkles size={16} />
                        <span>Global Support Network</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6"
                    >
                        We&apos;re here to <span className="text-primary">help.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-500 font-medium max-w-2xl mx-auto"
                    >
                        Whether you need technical integration assistance or a status update on a critical shipment, our elite support squad is available 24/7.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all group"
                    >
                        <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Live Chat</h3>
                        <p className="text-slate-500 font-medium mb-4">Connect with a support agent instantly through our interactive widget.</p>
                        <button className="text-primary font-bold hover:underline">Start Chat &rarr;</button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all group"
                    >
                        <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Mail size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
                        <p className="text-slate-500 font-medium mb-4">For detailed inquiries, drop us an email. We typically reply in &lt; 2 hours.</p>
                        <a href="mailto:support@nexustrack.com" className="text-emerald-600 font-bold hover:underline">support@nexustrack.com &rarr;</a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all group"
                    >
                        <div className="w-14 h-14 bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Phone size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Phone</h3>
                        <p className="text-slate-500 font-medium mb-4">Need immediate priority escalation? Give our hotline a call.</p>
                        <a href="tel:+1800NEXUS" className="text-purple-600 font-bold hover:underline">+1 (800) NEXUS-99 &rarr;</a>
                    </motion.div>
                </div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-slate-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    <div className="md:w-2/5 p-12 bg-slate-800 text-white flex flex-col justify-between">
                        <div>
                            <h3 className="text-3xl font-bold mb-4">Send a Message</h3>
                            <p className="text-slate-400 font-medium leading-relaxed mb-10">Fill out the form to the right and we will route your request to the appropriate department.</p>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <MapPin className="text-primary" size={24} />
                                    <div>
                                        <p className="font-bold text-white">Headquarters</p>
                                        <p className="text-slate-400 text-sm">124 Nexus Boulevard, Tech District</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Globe className="text-primary" size={24} />
                                    <div>
                                        <p className="font-bold text-white">Global Reach</p>
                                        <p className="text-slate-400 text-sm">Offices in NY, London, and Singapore</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-3/5 p-12 bg-white">
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">First Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email Address</label>
                                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Message</label>
                                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="How can we help?" />
                            </div>
                            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-0.5">
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
