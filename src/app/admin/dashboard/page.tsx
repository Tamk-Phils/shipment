"use client";

import { useEffect, useState } from "react";
import { Package, TrendingUp, AlertCircle, CheckCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Shipment {
    tracking_number: string;
    current_status: string;
    status?: string; // Backwards compatibility
    created_at: string;
}

export default function DashboardOverview() {
    const [stats, setStats] = useState([
        { label: "Total Shipments", value: "0", icon: Package, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "In Transit", value: "0", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Delivered", value: "0", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Exceptions", value: "0", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
    ]);
    const [recentShipments, setRecentShipments] = useState<Shipment[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const timer = setTimeout(() => {
            const saved = localStorage.getItem("trackflow_shipments");
            const shipments: Shipment[] = saved ? JSON.parse(saved) : [];

            const total = shipments.length;
            const inTransit = shipments.filter(s => (s.current_status || s.status) === "In Transit").length;
            const delivered = shipments.filter(s => (s.current_status || s.status) === "Delivered").length;
            const exceptions = shipments.filter(s => (s.current_status || s.status) === "Held").length;

            setStats([
                { label: "Total Shipments", value: total.toLocaleString(), icon: Package, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "In Transit", value: inTransit.toLocaleString(), icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Delivered", value: delivered.toLocaleString(), icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Exceptions", value: exceptions.toLocaleString(), icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
            ]);

            setRecentShipments(shipments.slice(-4).reverse());
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Operational Overview</h1>
                    <p className="text-slate-600 text-lg font-bold">Metrics and logistics KPIs for the active tracking period.</p>
                </div>
                <Link href="/admin/dashboard/shipments" className="flex items-center gap-2 text-primary font-bold hover:underline">
                    View All Shipments <ArrowUpRight size={18} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={28} />
                        </div>
                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-4xl font-extrabold text-slate-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                    <h3 className="text-2xl font-bold mb-8 text-slate-800">Recent Inventory Updates</h3>
                    <div className="space-y-8">
                        {recentShipments.length === 0 ? (
                            <div className="py-10 text-center text-slate-400 font-medium italic">No recent shipment activity detected.</div>
                        ) : recentShipments.map((shipment) => (
                            <div key={shipment.tracking_number} className="flex gap-5 items-center p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                    <Package size={22} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-slate-900">Shipment <span className="text-primary">#{shipment.tracking_number}</span> sync complete</p>
                                    <p className="text-slate-500 font-medium text-sm mt-0.5">Status: &quot;{shipment.current_status}&quot; • {new Date(shipment.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="text-xs font-bold text-slate-300 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-lg">Logistics</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
                    <h3 className="text-2xl font-bold mb-8 text-slate-800">System Status</h3>
                    <div className="space-y-6 flex-1">
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-emerald-700 font-bold uppercase text-xs tracking-widest">Database</span>
                                <div className="flex items-center gap-1.5 font-bold text-emerald-600 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    Operational
                                </div>
                            </div>
                            <div className="h-1.5 bg-emerald-200/50 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 w-full" />
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-blue-700 font-bold uppercase text-xs tracking-widest">Tracking API</span>
                                <div className="flex items-center gap-1.5 font-bold text-blue-600 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    High Performance
                                </div>
                            </div>
                            <div className="h-1.5 bg-blue-200/50 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[98%]" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <div className="bg-slate-900 rounded-2xl p-6 text-white text-center">
                            <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-widest">Support Access</p>
                            <p className="font-bold mb-4">Enterprise Dedicated Line</p>
                            <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Start Session</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
