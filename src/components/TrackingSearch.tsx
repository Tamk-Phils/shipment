"use client";

import { useState } from "react";
import { Search, Package, MapPin, Truck, Clock, AlertCircle, User, Calendar, FileText, Mail, Phone, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Shipment, ShipmentUpdate } from "@/types";

export default function TrackingSearch() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<Shipment | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isCopying, setIsCopying] = useState(false);

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;

        setIsSearching(true);
        setResult(null);
        setError(null);

        try {
            const { data, error: sbError } = await supabase
                .from('shipments')
                .select('*')
                .eq('tracking_number', trackingNumber.trim())
                .eq('is_deleted', false)
                .single();

            if (sbError) {
                if (sbError.code === 'PGRST116') {
                    // Not found, try fallback for demo
                    const saved = localStorage.getItem("trackflow_shipments");
                    const localShipments: Shipment[] = saved ? JSON.parse(saved) : [];
                    const found = localShipments.find(s =>
                        s.tracking_number.toLowerCase() === trackingNumber.trim().toLowerCase() && !s.is_deleted
                    );
                    if (found) {
                        setResult(found);
                    } else {
                        setError("This tracking number does not exist or has been archived.");
                    }
                } else {
                    throw sbError;
                }
            } else {
                setResult(data);
            }
        } catch (err) {
            const errorObj = err as { message?: string };
            console.error(errorObj);
            setError("Connectivity issue. Please verify your tracking ID or try again later.");
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 relative group">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Search size={22} className="text-slate-400 group-focus-within:text-primary transition-colors" />
                    </div>
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => {
                            setTrackingNumber(e.target.value);
                            if (error) setError(null);
                        }}
                        placeholder="Enter tracking ID (e.g. TRK...)"
                        className="w-full bg-white border-2 border-slate-100 rounded-[24px] md:rounded-3xl py-5 md:py-6 px-8 pl-14 text-lg md:text-xl text-black focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full md:w-auto md:absolute md:right-3 md:top-1/2 md:-translate-y-1/2 bg-primary hover:bg-primary-dark text-white px-8 py-5 md:py-4 rounded-[20px] font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50 whitespace-nowrap"
                >
                    {isSearching ? "Searching..." : "Track Now"}
                </button>
            </form>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-6 p-6 rounded-2xl bg-red-50 border border-red-100 flex items-start gap-4"
                    >
                        <AlertCircle className="text-red-500 shrink-0" size={24} />
                        <div>
                            <p className="font-extrabold text-red-900">Tracking Error</p>
                            <p className="text-red-700 mt-1 font-medium">{error}</p>
                        </div>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden"
                    >
                        {/* Header Branding & ID */}
                        <div className="flex flex-wrap gap-8 justify-between items-start mb-12 pb-12 border-b border-slate-50">
                            <div>
                                <p className="text-slate-500 text-xs font-extrabold uppercase tracking-widest mb-2">Shipment Status Dashboard</p>
                                <div className="flex items-center gap-4">
                                    <h2 className="text-4xl font-mono font-extrabold text-slate-900 tracking-tighter">
                                        {result.tracking_number}
                                    </h2>
                                    <button
                                        onClick={() => handleCopy(result.tracking_number)}
                                        className={`p-2 rounded-lg transition-all ${isCopying ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        {isCopying ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div className="bg-primary text-white px-8 py-4 rounded-2xl text-xl font-extrabold flex items-center gap-3 shadow-lg shadow-primary/20">
                                    <Truck size={24} className="animate-bounce" />
                                    {result.current_status || "Processing"}
                                </div>
                                {result.payment_status && (
                                    <span className={`text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider border ${result.payment_status === 'Paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-500'}`}>
                                        Payment: {result.payment_status}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-6 lg:col-span-2">
                                <div className="flex items-center gap-3 text-slate-900 font-extrabold pb-3 border-b border-slate-100">
                                    <User size={20} className="text-primary" />
                                    Stakeholder & Contact Details
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Sender</p>
                                            <p className="font-extrabold text-slate-900">{result.sender_name || 'N/A'}</p>
                                            <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mt-1">
                                                <Mail size={12} className="text-primary" />
                                                {result.sender_email || 'No email provided'}
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-slate-100">
                                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Receiver Name</p>
                                            <p className="text-xl font-extrabold text-slate-900">{result.recipient_name || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Receiver Contact</p>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                                    <Mail size={14} className="text-primary" />
                                                    {result.recipient_email || 'N/A'}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                                    <Phone size={14} className="text-primary" />
                                                    {result.recipient_phone || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Shipping Address</p>
                                            <div className="flex items-start gap-2 text-slate-700 font-bold bg-white p-4 rounded-2xl border border-slate-100 text-sm italic">
                                                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                                                {result.recipient_address || 'TBD'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Logistics Metrics */}
                            <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl space-y-6">
                                <div className="flex items-center gap-3 font-extrabold pb-3 border-b border-white/10 opacity-80">
                                    <Package size={20} className="text-primary" />
                                    Shipment Specs
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Weight</span>
                                        <span className="font-extrabold text-primary">{result.weight} kg</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Type</span>
                                        <span className="font-extrabold">{result.item_type || 'General'}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">ETA</span>
                                        <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                            <Calendar size={14} />
                                            <span>{result.estimated_delivery ? new Date(result.estimated_delivery).toLocaleDateString() : 'TBD'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Box */}
                        <div className="mb-12 p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px]">
                            <div className="flex items-center gap-3 mb-4 opacity-50">
                                <FileText size={18} />
                                <span className="text-xs font-extrabold uppercase tracking-widest tracking-[0.2em] text-slate-500">Logistics Manifest Description</span>
                            </div>
                            <p className="text-xl font-bold text-slate-700 leading-relaxed">
                                {result.description || 'Verified cargo manifest with high-priority handling requirements.'}
                            </p>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2.5px] before:bg-slate-100">
                            {result.updates.map((update: ShipmentUpdate, idx: number) => (
                                <div key={idx} className="relative pl-12 group">
                                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-300 ${idx === 0 ? 'bg-primary text-white scale-110' : 'bg-slate-200 text-slate-400'}`}>
                                        {idx === 0 ? <Truck size={18} /> : <Clock size={16} />}
                                    </div>
                                    <div className="bg-white group-hover:bg-slate-50/50 p-2 rounded-2xl transition-colors">
                                        <div className="flex flex-wrap items-center gap-4 mb-2">
                                            <p className={`font-extrabold text-2xl ${idx === 0 ? 'text-slate-900' : 'text-slate-600'}`}>{update.status}</p>
                                            <span className="text-sm font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{new Date(update.created_at).toLocaleString()}</span>
                                        </div>
                                        <p className="text-slate-600 font-bold text-lg leading-relaxed max-w-3xl">{update.description}</p>
                                        <div className="flex items-center gap-2 text-primary font-extrabold text-sm mt-4">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {update.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
