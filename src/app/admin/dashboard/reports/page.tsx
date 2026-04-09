"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Ship, Plane, Truck, Download, Calendar } from "lucide-react";

export default function ReportsPage() {
    const stats = [
        { label: "Monthly Revenue", val: "$428,500", change: "+12.5%", trend: "up", color: "text-emerald-500" },
        { label: "Active Shipments", val: "1,842", change: "+4.2%", trend: "up", color: "text-blue-500" },
        { label: "Avg. Delivery Time", val: "4.2 Days", change: "-0.5 Days", trend: "down", color: "text-emerald-500" },
        { label: "Fuel Surcharge", val: "18.5%", change: "+2.1%", trend: "up", color: "text-red-500" },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Logistics Intelligence</h1>
                    <p className="text-slate-600 text-lg font-bold">Comprehensive performance metrics and financial reports.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                        <Calendar size={20} /> Last 30 Days
                    </button>
                    <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-xl shadow-slate-200">
                        <Download size={20} /> Export PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                        <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
                        <h3 className="text-4xl font-black text-slate-900 mb-4">{stat.val}</h3>
                        <div className={`flex items-center gap-1.5 font-bold text-sm ${stat.color}`}>
                            {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-2xl font-black text-slate-900">Volume by Modality</h3>
                        <div className="flex gap-4">
                            {['Week', 'Month', 'Year'].map(t => (
                                <button key={t} className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${t === 'Month' ? 'bg-primary text-white' : 'text-slate-400'}`}>{t}</button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="space-y-10">
                        {[
                            { name: "Ocean Freight", val: 65, icon: Ship, color: "bg-blue-500" },
                            { name: "Air Cargo", val: 45, icon: Plane, color: "bg-indigo-500" },
                            { name: "Land Logistics", val: 85, icon: Truck, color: "bg-emerald-500" },
                        ].map((m, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg ${m.color.replace('bg-', 'text-')} bg-slate-50 flex items-center justify-center shadow-inner`}>
                                            <m.icon size={18} />
                                        </div>
                                        <span className="font-bold text-slate-700">{m.name}</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-400">{m.val}% Capacity</span>
                                </div>
                                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${m.val}%` }}
                                        transition={{ duration: 1, delay: i * 0.2 }}
                                        className={`h-full ${m.color}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-black mb-4">Quota Utilization</h3>
                        <p className="text-slate-400 font-bold mb-10 leading-relaxed">
                            Enterprise API limits and resource consumption for the current billing cycle.
                        </p>
                        
                        <div className="relative w-48 h-48 mx-auto mb-10">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="16" />
                                <circle cx="96" cy="96" r="88" fill="transparent" stroke="#3b82f6" strokeWidth="16" strokeDasharray="552.9" strokeDashoffset="138.2" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black">75%</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Consumed</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-white/10">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                            <span>Credits Used</span>
                            <span className="text-white">75,000 / 100,000</span>
                        </div>
                        <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-200 transition-colors">
                            Upgrade Tier
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
