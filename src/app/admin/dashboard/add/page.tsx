"use client";

import { useState } from "react";
import { ArrowLeft, Save, Package, User, MapPin, Scale, Maximize, AlertCircle, Clock, CreditCard, Tag, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shipment } from "@/types";

export default function AddShipment() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        tracking_number: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`,
        shipment_name: "",
        item_type: "",
        description: "",
        sender_name: "",
        recipient_name: "",
        origin: "",
        destination: "",
        weight: "",
        dimensions: "",
        current_status: "Pending",
        payment_method: "Bank Transfer",
        payment_status: "Pending",
        estimated_delivery: ""
    });

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Uniqueness validation for shipment_name
        const existingRaw = localStorage.getItem("trackflow_shipments");
        const existing: Shipment[] = existingRaw ? JSON.parse(existingRaw) : [];

        const isDuplicate = existing.some(s => s.shipment_name.toLowerCase() === formData.shipment_name.toLowerCase());

        if (isDuplicate) {
            setError(`The shipment name "${formData.shipment_name}" is already in use. Please choose a unique reference name.`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const newShipment: any = {
            ...formData,
            id: Math.random().toString(36).substr(2, 9),
            status: formData.current_status,
            weight: parseFloat(formData.weight) || 0,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            updates: [
                {
                    id: Math.random().toString(36).substr(2, 9),
                    status: formData.current_status,
                    location: formData.origin,
                    description: `Shipment registered: ${formData.description || 'Initial registration'}. Item: ${formData.item_type}`,
                    created_at: new Date().toISOString()
                }
            ]
        };

        existing.push(newShipment);
        localStorage.setItem("trackflow_shipments", JSON.stringify(existing));

        alert(`Shipment ${formData.shipment_name} (${formData.tracking_number}) registered successfully!`);
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
                    <p className="text-slate-500 text-lg font-bold">Capture core logistics data for a new cargo flow.</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-2 border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-600 animate-in fade-in slide-in-from-top-4">
                    <AlertCircle size={24} />
                    <p className="font-bold">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 space-y-12">

                    {/* Header Info */}
                    <div className="flex flex-wrap gap-8 justify-between items-center pb-10 border-b border-slate-100">
                        <div className="space-y-2 flex-1 min-w-[300px]">
                            <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Shipment Reference Name (Must be unique)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Q1 Global Electronics Batch"
                                    className="w-full text-2xl font-extrabold text-slate-900 bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-6 focus:outline-none focus:border-primary/50 transition-all"
                                    value={formData.shipment_name}
                                    onChange={(e) => setFormData({ ...formData, shipment_name: e.target.value })}
                                />
                                <Tag className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                            </div>
                        </div>
                        <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex items-center gap-6 text-white shadow-2xl">
                            <div>
                                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-1">Generated ID</p>
                                <p className="text-2xl font-mono font-extrabold text-primary">{formData.tracking_number}</p>
                            </div>
                            <Package className="text-slate-700" size={32} />
                        </div>
                    </div>

                    {/* Item Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                            <Package className="text-slate-900" size={20} />
                            <h3 className="text-xl font-extrabold text-slate-900">Cargo Specifics</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">What is being shipped?</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Industrial Textiles, Microchips"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900"
                                    value={formData.item_type}
                                    onChange={(e) => setFormData({ ...formData, item_type: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Estimated Delivery Time</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900"
                                        value={formData.estimated_delivery}
                                        onChange={(e) => setFormData({ ...formData, estimated_delivery: e.target.value })}
                                    />
                                    <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-500">Cargo Description</label>
                            <div className="relative">
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="Provide a detailed overview of the shipment contents and special handling instructions..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                                <FileText className="absolute left-4 top-6 text-slate-300" size={20} />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Sender Partition */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                                <User className="text-slate-900" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-900">Sender Profile</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Origin Stakeholder Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Company or Individual"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900"
                                    value={formData.sender_name}
                                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Jurisdiction / Origin</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder="City, Country"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900"
                                        value={formData.origin}
                                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                    />
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Recipient Partition */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                                <User className="text-slate-900" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-900">Consignee Profile</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Destination Stakeholder Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Company or Individual"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900"
                                    value={formData.recipient_name}
                                    onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Jurisdiction / Destination</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder="City, Country"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                    />
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metrology & Operations */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10 border-t border-slate-100">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                                <Scale className="text-slate-900" size={20} />
                                <h3 className="text-lg font-extrabold text-slate-900">Metrology</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500">Weight (kg)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-bold text-slate-900"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500">Dimensions</label>
                                    <input
                                        type="text"
                                        placeholder="L x W x H"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-bold text-slate-900"
                                        value={formData.dimensions}
                                        onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 md:col-span-2">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                                <CreditCard className="text-slate-900" size={20} />
                                <h3 className="text-lg font-extrabold text-slate-900">Financials & Milestones</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500">Payment Method</label>
                                        <select
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-bold appearance-none text-slate-900"
                                            value={formData.payment_method}
                                            onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                                        >
                                            <option value="Bank Transfer">Bank Transfer</option>
                                            <option value="Credit Card">Credit Card</option>
                                            <option value="PayPal">PayPal</option>
                                            <option value="Cash">Cash / COD</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500">Payment Status</label>
                                        <select
                                            className="w-full bg-slate-100 border border-slate-200 rounded-xl py-4 px-6 font-bold text-slate-900"
                                            value={formData.payment_status}
                                            onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Partially Paid">Partially Paid</option>
                                            <option value="Paid">Fully Paid</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-500">Initial Status</label>
                                        <select
                                            className="w-full bg-slate-900 text-white border border-slate-800 rounded-xl py-4 px-6 font-extrabold appearance-none"
                                            value={formData.current_status}
                                            onChange={(e) => setFormData({ ...formData, current_status: e.target.value })}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="In Transit">In Transit</option>
                                            <option value="Out for Delivery">Out for Delivery</option>
                                            <option value="Held">Held at Customs</option>
                                            <option value="Postponed">Postponed</option>
                                        </select>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                        <p className="text-xs font-bold text-slate-400 leading-relaxed">
                                            The status and financial information will be locked specifically to this cargo manifest.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-slate-100 flex justify-end gap-6 items-center">
                        <Link href="/admin/dashboard/shipments" className="text-slate-400 font-bold hover:text-slate-600 transition-colors">Discard Manifesto</Link>
                        <button
                            type="submit"
                            className="bg-slate-900 hover:bg-black text-white px-12 py-5 rounded-[24px] font-extrabold transition-all shadow-2xl shadow-slate-900/30 flex items-center gap-4 text-lg"
                        >
                            <Save size={24} /> Finalize Manifest
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
