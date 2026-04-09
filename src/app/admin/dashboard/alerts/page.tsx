"use client";

import { motion } from "framer-motion";
import { AlertTriangle, PlusCircle, Radio, Trash2, Send, CloudRain, Wind, Anchor, Plane } from "lucide-react";
import { useState } from "react";

export default function AlertsManager() {
    const [alerts, setAlerts] = useState([
        { id: 1, type: "Warning", title: "Severe Weather: North Atlantic", impact: "High", status: "Published" },
        { id: 2, type: "Info", title: "Singapore Port Maintenance", impact: "Low", status: "Published" },
        { id: 3, type: "Success", title: "Air Cargo Expansion: Nairobi Hub", impact: "Positive", status: "Published" },
    ]);

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Service Alerts Hub</h1>
                    <p className="text-slate-600 text-lg font-bold">Broadcast operational updates to the public status board.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 transition-all">
                    <PlusCircle size={20} /> Create New Alert
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900">Active Board</h3>
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Dispatch
                            </div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="p-8 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                            alert.type === 'Warning' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                        }`}>
                                            <AlertTriangle size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">{alert.title}</h4>
                                            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                <span>{alert.type}</span>
                                                <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                <span className={alert.impact === 'High' ? 'text-red-500' : 'text-blue-500'}>Impact: {alert.impact}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                            <Trash2 size={20} />
                                        </button>
                                        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[40px] p-10 text-white">
                        <Radio className="text-primary mb-6" size={40} />
                        <h3 className="text-2xl font-black mb-4">Emergency Dispatch</h3>
                        <p className="text-slate-400 font-bold mb-8 leading-relaxed">
                            Simultaneously broadcast to email, SMS, and platform board.
                        </p>
                        
                        <div className="space-y-4">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest block">Quick Template</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['Weather', 'Port Hub', 'Airport', 'Strike'].map(t => (
                                    <button key={t} className="bg-white/5 border border-white/10 p-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-colors">{t}</button>
                                ))}
                            </div>
                            <button className="w-full bg-primary text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl shadow-primary/30 mt-6">
                                Force Broadcast <Send size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full" />
                        <h4 className="font-black text-slate-900 mb-2 relative z-10">Board Analytics</h4>
                        <p className="text-slate-400 font-bold text-sm mb-6 relative z-10">Reach of active alerts.</p>
                        
                        <div className="space-y-4">
                             <div className="flex justify-between items-end">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Public Views</span>
                                <span className="text-xl font-black text-slate-900">12,402</span>
                             </div>
                             <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-2/3" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
