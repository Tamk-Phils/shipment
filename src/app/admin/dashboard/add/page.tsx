"use client";

import { useState } from "react";
import { ArrowLeft, Save, Package, User, MapPin, Scale, Maximize, AlertCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddShipment() {
    const router = useRouter();
    const [formData, setFormData] = useState(() => ({
        tracking_number: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`,
        sender_name: "",
        recipient_name: "",
        origin: "",
        destination: "",
        weight: "",
        dimensions: "",
        current_status: "Pending"
    }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Logic to save to localStorage so the public tracker can find it
        const existing = localStorage.getItem("trackflow_shipments");
        const shipments = existing ? JSON.parse(existing) : [];

        // Create professional update sequence
        const newShipment = {
            ...formData,
            status: formData.current_status, // Ensure legacy status is also set
            weight: parseFloat(formData.weight),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updates: [
                {
                    status: formData.current_status,
                    location: formData.origin,
                    description: `Shipment registered at ${formData.origin}. Initial status: ${formData.current_status}`,
                    created_at: new Date().toISOString()
                }
            ]
        };

        shipments.push(newShipment);
        localStorage.setItem("trackflow_shipments", JSON.stringify(shipments));

        alert(`Shipment ${formData.tracking_number} registered successfully!`);
        router.push("/admin/dashboard/shipments");
    };

    return (
        <div className="space-y-10 max-w-5xl">
            <div className="flex items-center gap-6">
                <Link href="/admin/dashboard/shipments" className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all shadow-sm">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900">Shipment Registration</h1>
                    <p className="text-slate-500 text-lg font-medium">Capture core logistics data for a new cargo flow.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-12">

                    {/* Header Info */}
                    <div className="flex flex-wrap gap-8 justify-between items-center pb-10 border-b border-slate-100">
                        <div>
                            <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Generated Tracking ID</label>
                            <div className="text-4xl font-mono font-extrabold text-primary">{formData.tracking_number}</div>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center gap-4">
                            <AlertCircle className="text-slate-400" size={24} />
                            <p className="text-sm font-bold text-slate-500 max-w-[200px]">This ID will be used by the customer for tracking.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Sender Partition */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/10">
                                <User className="text-primary" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-800">Sender Profile</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">Stakeholder Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Official Company or Person Name"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-medium text-black"
                                    value={formData.sender_name}
                                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">Jurisdiction / Origin</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder="City, Country"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-medium text-black"
                                        value={formData.origin}
                                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                    />
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Recipient Partition */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-emerald-500/10">
                                <User className="text-emerald-500" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-800">Consignee Profile</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">Stakeholder Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Official Company or Person Name"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 font-medium text-black"
                                    value={formData.recipient_name}
                                    onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">Jurisdiction / Destination</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder="City, Country"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500/30 font-medium text-black"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    />
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-100">
                        {/* Cargo Metrology */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-blue-500/10">
                                <Package className="text-blue-500" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-800">Cargo Metrology</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400">Net Weight (kg)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="0.0"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 font-medium text-black"
                                            value={formData.weight}
                                            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                        />
                                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-400">Dimensions</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="L x W x H"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500/30 font-medium text-black"
                                            value={formData.dimensions}
                                            onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                                        />
                                        <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operational Status */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-amber-500/10">
                                <Clock className="text-amber-500" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-800">Initial Milestone</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400">Current Status</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500/30 font-bold appearance-none text-black"
                                        value={formData.current_status}
                                        onChange={(e) => setFormData({ ...formData, current_status: e.target.value })}
                                    >
                                        <option value="Pending">Milestone: Pending</option>
                                        <option value="In Transit">Milestone: In Transit</option>
                                        <option value="Out for Delivery">Milestone: Out for Delivery</option>
                                        <option value="Held">Milestone: Held at Customs</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 font-bold">↓</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex justify-end gap-6 items-center">
                        <Link href="/admin/dashboard/shipments" className="text-slate-400 font-bold hover:text-slate-600 transition-colors">Discard Draft</Link>
                        <button
                            type="submit"
                            className="bg-primary hover:bg-primary-dark text-white px-12 py-5 rounded-[24px] font-extrabold transition-all shadow-2xl shadow-primary/30 flex items-center gap-4 text-lg"
                        >
                            <Save size={24} /> Finalize Registration
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
