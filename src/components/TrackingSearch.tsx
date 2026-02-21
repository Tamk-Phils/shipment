"use client";

import { useState } from "react";
import { Search, Package, MapPin, Truck, Clock, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ShipmentUpdate {
    status: string;
    location: string;
    description: string;
    created_at: string;
}

interface Shipment {
    tracking_number: string;
    sender_name: string;
    recipient_name: string;
    origin: string;
    destination: string;
    current_status: string;
    status?: string; // Backwards compatibility
    weight: number;
    dimensions: string;
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
                { status: "Pending", location: "New York, USA", description: "Shipment info received.", created_at: new Date(Date.now() - 3600000 * 48).toISOString() },
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
            const found = shipments.find((s: Shipment) => s.tracking_number.toLowerCase() === trackingNumber.trim().toLowerCase());

            if (found) {
                setResult(found);
            } else {
                setError("This tracking number does not exist. Only shipments created by our administrators can be tracked.");
            }
            setIsSearching(false);
        }, 1200);
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSearch} className="relative group">
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
                    placeholder="Enter tracking number (e.g. TRK123456789)"
                    className="w-full bg-white border-2 border-slate-100 rounded-3xl py-6 px-8 pl-14 text-xl text-black focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-300 shadow-sm"
                />
                <button
                    type="submit"
                    disabled={isSearching}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-[20px] font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
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
                                <p className="text-slate-500 text-sm font-extrabold uppercase tracking-widest mb-2">Shipment ID</p>
                                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{result.tracking_number}</h2>
                            </div>
                            <div className="bg-primary/10 text-primary-dark px-6 py-3 rounded-full text-lg font-bold flex items-center gap-3 border border-primary/20">
                                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                                {result.current_status || result.status || "Pending"}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="text-slate-500 text-xs font-extrabold uppercase mb-3">Origin</p>
                                <div className="flex items-center gap-3">
                                    <MapPin className="text-primary" size={20} />
                                    <span className="font-extrabold text-slate-900">{result.origin}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="text-slate-500 text-xs font-extrabold uppercase mb-3">Destination</p>
                                <div className="flex items-center gap-3">
                                    <Package className="text-secondary" size={20} />
                                    <span className="font-extrabold text-slate-900">{result.destination}</span>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <p className="text-slate-500 text-xs font-extrabold uppercase mb-3">Measurements</p>
                                <div className="flex items-center gap-3">
                                    <Truck className="text-accent" size={20} />
                                    <span className="font-extrabold text-slate-900">{result.weight} kg • {result.dimensions}</span>
                                </div>
                            </div>
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
