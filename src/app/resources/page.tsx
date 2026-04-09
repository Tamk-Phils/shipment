"use client";

import { motion } from "framer-motion";
import { Book, FileText, Code, MessageCircle, HelpCircle, ArrowRight, Search, Download } from "lucide-react";

export default function ResourcesPage() {
    const categories = [
        {
            title: "Shipping Guides",
            icon: Book,
            items: ["International Shipping 101", "Customs Documentation Guide", "Packaging Best Practices", "Dangerous Goods Protocol"]
        },
        {
            title: "Developer Portal",
            icon: Code,
            items: ["Tracking API Documentation", "Webhooks Integration", "GraphQL Schema Overview", "SDK Reference"]
        },
        {
            title: "Operational Docs",
            icon: FileText,
            items: ["Terms of Service", "Privacy & Data Protection", "Carrier Liability Rules", "Claims Process Guide"]
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 pt-20 pb-32">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto space-y-20">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-600/20 mb-6">
                            <HelpCircle size={16} />
                            <span>NexusTrack Knowledge Base</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8">
                            Resources & <br/> <span className="text-primary">Support</span>
                        </h1>
                        
                        <div className="max-w-2xl mx-auto relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
                            <input 
                                type="text" 
                                placeholder="Search documentation, guides, and FAQs..." 
                                className="w-full bg-white border border-slate-200 rounded-[32px] py-6 px-8 pl-16 text-lg font-medium shadow-xl shadow-blue-900/5 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 text-primary flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <cat.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6">{cat.title}</h3>
                                <ul className="space-y-4">
                                    {cat.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center justify-between text-slate-500 font-bold hover:text-primary cursor-pointer transition-colors group/item">
                                            {item}
                                            <ArrowRight size={16} className="opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-slate-900 rounded-[50px] p-12 text-white flex flex-col justify-between overflow-hidden relative">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-4">Direct Support</h3>
                                <p className="text-slate-400 font-bold text-lg mb-8 leading-relaxed max-w-sm">
                                    Need immediate assistance with a complex shipment? Our elite support team is online 24/7.
                                </p>
                                <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-200 transition-colors">
                                    <MessageCircle size={22} /> Start Live Chat
                                </button>
                            </div>
                            <div className="mt-12 flex gap-8 items-center pt-12 border-t border-white/10 opacity-60">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Response Time</p>
                                    <p className="font-bold">Avg. 45 Seconds</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Satisfaction</p>
                                    <p className="font-bold">99.2% Positive</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary rounded-[50px] p-12 text-white flex flex-col justify-between overflow-hidden relative shadow-2xl shadow-primary/30">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <Download size={200} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-4">Media Assets</h3>
                                <p className="text-blue-100 font-bold text-lg mb-8 leading-relaxed max-w-sm">
                                    Download our official branding guidelines, company logos, and high-resolution logistics photography.
                                </p>
                                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-black transition-colors">
                                    <Download size={22} /> Download Press Kit
                                </button>
                            </div>
                            <div className="mt-12 flex gap-8 items-center pt-12 border-t border-white/10 opacity-80">
                                <p className="text-xs font-black uppercase tracking-widest">Version 2026.1.4  •  Updated Today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
