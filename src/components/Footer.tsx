"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-white/5 pt-32 pb-12 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-primary/20">
                                <span className="text-white font-black text-2xl tracking-tighter">TF</span>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tight">NexusTrack</span>
                        </Link>
                        <p className="text-slate-400 font-bold leading-relaxed">
                            Pioneering the future of global logistics through intelligent automation, real-time telemetry, and sustainable supply chain solutions.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Solutions</h4>
                        <ul className="space-y-4">
                            {['Global Tracking', 'Fleet Management', 'Supply Chain AI', 'Carrier Network'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Resources</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Support Hub', href: '/resources' },
                                { name: 'Service Status', href: '/alerts' },
                                { name: 'Enterprise API', href: '#' },
                                { name: 'Terms of Use', href: '/terms' },
                                { name: 'Privacy Policy', href: '#' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-white font-bold transition-colors flex items-center gap-2 group">
                                        <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-xs mb-10">Global HQ</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <MapPin size={18} />
                                </div>
                                <p className="text-slate-400 font-bold text-sm leading-relaxed">
                                    One Logistics Plaza,<br />
                                    Tech District, CA 94105
                                </p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <Phone size={18} />
                                </div>
                                <p className="text-slate-400 font-bold text-sm">+1 (800) TRACKFLOW</p>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <Mail size={18} />
                                </div>
                                <p className="text-slate-400 font-bold text-sm">ops@nexustrack.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter & Bottom */}
                <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="flex-1 max-w-md">
                        <h5 className="text-white font-black text-lg mb-2">Subscribe to Logistics Intelligence</h5>
                        <p className="text-slate-500 text-sm font-bold mb-6">Weekly insights on supply chain optimization and AI.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email address" className="flex-1 bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white font-bold focus:ring-2 focus:ring-primary/20 transition-all outline-none" />
                            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-dark transition-all">Submit</button>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">© 2026 NexusTrack Global. All rights reserved.</p>
                        <div className="flex gap-6 justify-center lg:justify-end">
                            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Cookie Policy</Link>
                            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
