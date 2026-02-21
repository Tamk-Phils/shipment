"use client";

import { useState } from "react";
import { Search, Package, MapPin, Truck, Clock, AlertCircle, User, Calendar, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShipmentUpdate {
    status: string;
    location: string;
    description: string;
    created_at: string;
}

interface Shipment {
    tracking_number: string;
    shipment_name?: string;
    item_type?: string;
    description?: string;
    sender_name: string;
    recipient_name: string;
    origin: string;
    destination: string;
    current_status: string;
    status?: string; // Backwards compatibility
    weight: number;
    dimensions: string;
    payment_status?: string;
    estimated_delivery?: string;
    updates: ShipmentUpdate[];
}

// Helper to get shipments from localStorage (simulating admin data)
const getAdminShipments = () => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("trackflow_shipments");
    return saved ? JSON.parse(saved) : [
        // Default demo data if none exists
        {
            tracking_number: "TRK123456789",
            sender_name: "John Logist",
            recipient_name: "Emma Receive",
            origin: "New York, USA",
            destination: "London, UK",
            current_status: "In Transit",
            weight: 2.5,
            dimensions: "30x20x15 cm",
            updates: [
                { status: "In Transit", location: "Paris, FR", description: "Package is on its way to the destination.", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
                { status: "Processing", location: "New York, USA", description: "Package has been processed at the sorting facility.", created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
            ]
        }
    ];
};

export default function TrackingSearch() {
    const [trackingNumber, setTrackingNumber] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<Shipment | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingNumber.trim()) return;

        setIsSearching(true);
        setResult(null);
        setError(null);

        // Simulate search delay
        setTimeout(() => {
            const shipments = getAdminShipments();
            const found = shipments.find((s: Shipment & { is_deleted?: boolean }) =>
                s.tracking_number.toLowerCase() === trackingNumber.trim().toLowerCase() &&
                !s.is_deleted
            );

            if (found) {
                setResult(found);
            } else {
                setError("This tracking number does not exist or has been archived by the administrator.");
            }
            setIsSearching(false);
        }, 1200);
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
                        placeholder="Enter tracking ID"
                        className="w-full bg-white border-2 border-slate-100 rounded-[24px] md:rounded-3xl py-5 md:py-6 px-8 pl-14 text-lg md:text-xl text-black focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 shadow-sm"
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full md:w-auto md:absolute md:right-3 md:top-1/2 md:-translate-y-1/2 bg-primary hover:bg-primary-dark text-white px-8 py-5 md:py-4 rounded-[20px] font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50 whitespace-nowrap"
                >
                    {isSearching ? "Verifying..." : "Track Now"}
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
                            <p className="font-extrabold text-red-900">Package Not Found</p>
                            <p className="text-red-700 mt-1 font-medium">{error}</p>
                        </div>
                    </motion.div>
                )}

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 bg-white rounded-[32px] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50"
                    >
                        <div className="flex flex-wrap gap-8 justify-between items-start mb-12">
                            <div>
                                <p className="text-slate-500 text-sm font-extrabold uppercase tracking-widest mb-1">Cargo Reference</p>
                                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{result.shipment_name || 'General Shipment'}</h2>
                                <div className="flex items-center gap-2 text-primary font-mono font-bold">
                                    <Package size={16} />
                                    {result.tracking_number}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div className="bg-primary/10 text-primary-dark px-6 py-3 rounded-full text-lg font-bold flex items-center gap-3 border border-primary/20">
                                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                                    {result.current_status || result.status || "Pending"}
                                </div>
                                {result.payment_status && (
                                    <span className={`text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider ${result.payment_status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        Payment: {result.payment_status}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            {/* Stakeholders */}
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                                <div className="flex items-center gap-3 text-slate-900 font-extrabold pb-2 border-b border-slate-200">
                                    <User size={18} className="text-primary" />
                                    Stakeholders
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Sender</p>
                                    <p className="font-bold text-slate-900">{result.sender_name || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Recipient</p>
                                    <p className="font-bold text-slate-900">{result.recipient_name || 'N/A'}</p>
                                </div>
                            </div>

                            {/* Logistics Path */}
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                                <div className="flex items-center gap-3 text-slate-900 font-extrabold pb-2 border-b border-slate-200">
                                    <MapPin size={18} className="text-primary" />
                                    Logistics Path
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Origin</p>
                                    <p className="font-bold text-slate-900">{result.origin}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                                    <p className="font-bold text-slate-900">{result.destination}</p>
                                </div>
                            </div>

                            {/* Cargo Details */}
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 space-y-4">
                                <div className="flex items-center gap-3 text-slate-900 font-extrabold pb-2 border-b border-slate-200">
                                    <Truck size={18} className="text-primary" />
                                    Cargo Info
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Type & Metrics</p>
                                    <p className="font-bold text-slate-900">{result.item_type || 'General Cargo'}</p>
                                    <p className="text-xs text-slate-500 font-bold">{result.weight} kg • {result.dimensions}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Estimated Delivery</p>
                                    <div className="flex items-center gap-2 text-primary font-bold">
                                        <Calendar size={14} />
                                        <span>{result.estimated_delivery ? new Date(result.estimated_delivery).toLocaleDateString() : 'TBD'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Box */}
                        <div className="mb-12 p-8 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200">
                            <div className="flex items-center gap-3 mb-4 opacity-50">
                                <FileText size={18} />
                                <span className="text-xs font-extrabold uppercase tracking-widest">Cargo Manifest Description</span>
                            </div>
                            <p className="text-lg font-medium leading-relaxed italic">
                                "{result.description || 'No detailed description provided for this manifest.'}"
                            </p>
                        </div>

                        <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
                            {result.updates.map((update: ShipmentUpdate, idx: number) => (
                                <div key={idx} className="relative pl-12 group">
                                    <div className={`absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${idx === 0 ? 'bg-primary text-white' : 'bg-slate-100 text-slate-300'}`}>
                                        {idx === 0 ? <Truck size={16} /> : <Clock size={16} />}
                                    </div>
                                    <div className="bg-white group-hover:bg-slate-50/50 p-1 rounded-xl transition-colors">
                                        <div className="flex flex-wrap items-center gap-4 mb-2">
                                            <p className={`font-extrabold text-xl ${idx === 0 ? 'text-slate-900' : 'text-slate-600'}`}>{update.status}</p>
                                            <span className="text-sm font-bold text-slate-400">{new Date(update.created_at).toLocaleString()}</span>
                                        </div>
                                        <p className="text-slate-700 font-bold leading-relaxed max-w-2xl">{update.description}</p>
                                        <div className="flex items-center gap-2 text-primary font-bold text-sm mt-3">
                                            <MapPin size={14} />
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
