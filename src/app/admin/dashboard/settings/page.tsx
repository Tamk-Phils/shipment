"use client";

import { motion } from "framer-motion";
import { Settings, Shield, Globe, Bell, Mail, CreditCard, Save, RefreshCw } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Platform Configuration</h1>
                    <p className="text-slate-600 text-lg font-bold">Global system parameters and enterprise branding.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary/20 transition-all">
                    <Save size={20} /> Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { label: "General", icon: Settings, active: true },
                        { label: "Security", icon: Shield, active: false },
                        { label: "Network", icon: Globe, active: false },
                        { label: "Notifications", icon: Bell, active: false },
                        { label: "API & Webhooks", icon: RefreshCw, active: false },
                        { label: "Billing", icon: CreditCard, active: false },
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${item.active ? 'bg-white shadow-sm border border-slate-100 text-primary' : 'text-slate-500 hover:bg-slate-100'}`}>
                            <item.icon size={20} /> {item.label}
                        </button>
                    ))}
                </div>

                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
                        <section className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Globe className="text-primary" /> Company Identity
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Platform Name</label>
                                    <input type="text" defaultValue="NexusTrack Global" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Support Email</label>
                                    <input type="email" defaultValue="ops@nexustrack.com" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 font-bold focus:ring-2 focus:ring-primary/20 transition-all" />
                                </div>
                            </div>
                        </section>

                        <div className="h-[1px] bg-slate-50" />

                        <section className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Bell className="text-primary" /> Automated Messaging
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Email status updates", desc: "Notify customers instantly when shipment status changes.", enabled: true },
                                    { label: "SMS dispatch alerts", desc: "Critical alerts for delayed or held shipments.", enabled: false },
                                    { label: "Webhook triggers", desc: "Push data to external ERP systems.", enabled: true },
                                ].map((opt, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div>
                                            <p className="font-bold text-slate-800">{opt.label}</p>
                                            <p className="text-sm text-slate-400 font-medium">{opt.desc}</p>
                                        </div>
                                        <div className={`w-14 h-8 rounded-full p-1 relative cursor-pointer transition-colors ${opt.enabled ? 'bg-primary' : 'bg-slate-300'}`}>
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${opt.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="h-[1px] bg-slate-50" />

                        <section className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Shield className="text-primary" /> API Security
                            </h3>
                            <div className="p-6 bg-slate-900 rounded-2xl text-white">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Production API Key</span>
                                    <button className="text-primary font-bold text-xs uppercase hover:underline">Revoke Key</button>
                                </div>
                                <code className="block bg-black/30 p-4 rounded-xl font-mono text-sm break-all opacity-80">
                                    tf_live_2026_9481k_x92kja_02jk_lms0293
                                </code>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
