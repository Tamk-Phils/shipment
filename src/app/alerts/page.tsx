"use client";

import { motion } from "framer-motion";
import { Info, AlertTriangle, CheckCircle2, CloudRain, Wind, Anchor, Plane, Truck } from "lucide-react";

export default function AlertsPage() {
    const alerts = [
        { 
            id: 1, 
            type: "warning", 
            title: "Severe Weather: North Atlantic", 
            description: "Winter Storm 'Epsilon' is causing 24-48 hour delays for maritime freight between NYC and Rotterdam.",
            icon: Wind,
            impact: "High",
            date: "Today, 08:30 AM"
        },
        { 
            id: 2, 
            type: "info", 
            title: "Singapore Port Maintenance", 
            description: "Scheduled berth upgrades at Terminal 4. Expect slight delays in container processing through Friday.",
            icon: Anchor,
            impact: "Low",
            date: "Yesterday, 14:15 PM"
        },
        { 
            id: 3, 
            type: "success", 
            title: "Air Cargo Expansion: Nairobi Hub", 
            description: "New direct freighter routes established between London Heathrow and Nairobi Jomo Kenyatta.",
            icon: Plane,
            impact: "Positive",
            date: "Apr 07, 2026"
        }
    ];

    const systems = [
        { name: "Global Tracking API", status: "Operational", color: "bg-emerald-500" },
        { name: "Maritime Transponders", status: "Operational", color: "bg-emerald-500" },
        { name: "Air Freight Manifests", status: "Optimal", color: "bg-blue-500" },
        { name: "Warehouse Robotics", status: "Maintenance", color: "bg-amber-500" },
    ];

    return (
        <main className="min-h-screen bg-slate-50 pt-20 pb-32">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-amber-600/10 text-amber-700 px-4 py-2 rounded-full text-sm font-bold border border-amber-600/20 mb-6">
                            <Info size={16} />
                            <span>Live Operational Intelligence</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
                            Service <span className="text-primary">Status</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed">
                            Monitor the health of our global infrastructure and stay informed about factors affecting your shipments.
                        </p>
                    </div>

                    <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
                        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <CheckCircle2 className="text-emerald-500" />
                            System Infrastructure
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {systems.map((sys, i) => (
                                <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="font-bold text-slate-700">{sys.name}</span>
                                    <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider">
                                        <div className={`w-2.5 h-2.5 rounded-full ${sys.color} animate-pulse`} />
                                        <span className={sys.color.replace('bg-', 'text-')}>{sys.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <AlertTriangle className="text-amber-500" />
                            Active Alerts & Advisories
                        </h3>
                        {alerts.map((alert) => (
                            <motion.div 
                                key={alert.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start group hover:shadow-md transition-all"
                            >
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                                    alert.type === 'warning' ? 'bg-red-50 text-red-500' : 
                                    alert.type === 'info' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'
                                }`}>
                                    <alert.icon size={32} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                                        <h4 className="text-2xl font-black text-slate-900">{alert.title}</h4>
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">{alert.date}</span>
                                    </div>
                                    <p className="text-slate-500 font-bold mb-6 leading-relaxed">{alert.description}</p>
                                    <div className="flex items-center gap-4">
                                        <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg border ${
                                            alert.impact === 'High' ? 'bg-red-50 border-red-100 text-red-600' : 
                                            alert.impact === 'Low' ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                        }`}>
                                            Impact: {alert.impact}
                                        </div>
                                        <button className="text-primary font-black text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Deep Intel <CheckCircle2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="bg-slate-900 rounded-[40px] p-10 text-white text-center">
                        <p className="text-sm font-black text-slate-400 mb-2 uppercase tracking-[0.3em]">Notification Protocol</p>
                        <h4 className="text-3xl font-black mb-6">Stay ahead of every event.</h4>
                        <p className="text-slate-400 font-medium mb-10 max-w-xl mx-auto">
                            Sign up for critical alert SMS dispatch. We'll notify your operations team the second our sensors detect potential disruption.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                            <input type="text" placeholder="Phone Number" className="flex-1 bg-white/10 border border-white/20 rounded-2xl py-4 px-6 text-white font-bold" />
                            <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-black transition-colors">Activate</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
