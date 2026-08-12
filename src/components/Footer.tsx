"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Facebook, Mail, Phone, MapPin, ArrowRight, Instagram } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
    return (
        <footer className="bg-[#1A1A1A] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <Logo className="w-12 h-12" />
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-white tracking-tight leading-none uppercase">NEXUS</span>
                                <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Tracking</span>
                            </div>
                        </Link>
                        <p className="text-slate-400 font-bold leading-relaxed text-sm">
                            The official tracking gateway for Nexus. Providing secure, real-time logistics intelligence across the global network.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-300">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 border-b border-white/10 pb-4">Logistics Services</h4>
                        <ul className="space-y-4">
                            {['Global Tracking', 'Air Freight', 'Ocean Freight', 'Supply Chain'].map(item => (
                                <li key={item}>
                                    <Link href="#" className="text-slate-400 hover:text-primary font-black uppercase tracking-widest text-[10px] transition-colors flex items-center gap-2 group">
                                        <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 border-b border-white/10 pb-4">Global Support</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Customer Helpdesk', href: '/contact' },
                                { name: 'System Status', href: '/alerts' },
                                { name: 'Security Center', href: '#' },
                                { name: 'Whistleblowing', href: '#' },
                                { name: 'Branch Locator', href: '#' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-slate-400 hover:text-primary font-black uppercase tracking-widest text-[10px] transition-colors flex items-center gap-2 group">
                                        <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 border-b border-white/10 pb-4">Contact</h4>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <Phone size={16} />
                                </div>
                                <p className="text-slate-400 text-xs font-black uppercase tracking-widest">+1 (205) 376 5055</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="flex-1 max-w-md">
                        <h5 className="text-white font-black text-xs uppercase tracking-widest mb-4">Official Notification Service</h5>
                        <div className="flex gap-2">
                            <input type="email" placeholder="ENTER EMAIL FOR TRACKING ALERTS" className="flex-1 bg-white/5 border border-white/10 rounded py-3 px-4 text-white text-[10px] font-black uppercase tracking-widest focus:ring-1 focus:ring-primary transition-all outline-none" />
                            <button className="bg-primary text-white px-6 py-3 rounded text-[10px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all">Enroll</button>
                        </div>
                    </div>
                    <div className="text-center lg:text-right">
                        <p className="text-slate-600 font-black text-[9px] uppercase tracking-[0.3em] mb-4">© 2026 NEXUS. ALL RIGHTS RESERVED.</p>
                        <div className="flex gap-6 justify-center lg:justify-end">
                            <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Legal Notice</Link>
                            <Link href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
