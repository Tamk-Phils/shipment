"use client";

import { useState } from "react";
import { ArrowLeft, Save, Package, User, MapPin, Scale, Maximize, AlertCircle, Clock, CreditCard, Tag, FileText, Calendar, Copy, Check, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shipment } from "@/types";
import { supabase } from "@/lib/supabase";

export default function AddShipment() {
    const router = useRouter();
    const [isCopying, setIsCopying] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        tracking_number: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`,
        item_type: "",
        description: "",
        sender_name: "",
        sender_email: "",
        recipient_name: "",
        recipient_address: "",
        recipient_email: "",
        recipient_phone: "",
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

    const handleCopy = () => {
        navigator.clipboard.writeText(formData.tracking_number);
        setIsCopying(true);
        setTimeout(() => setIsCopying(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);

        const newShipment = {
            ...formData,
            weight: parseFloat(formData.weight) || 0,
            estimated_delivery: formData.estimated_delivery ? new Date(formData.estimated_delivery).toISOString() : null,
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

        try {
            const { error: sbError } = await supabase
                .from('shipments')
                .insert([newShipment]);

            if (sbError) throw sbError;

            // Optional: fallback to localStorage for redundancy or if Supabase isn't configured yet
            const existingRaw = localStorage.getItem("trackflow_shipments");
            const existing: any[] = existingRaw ? JSON.parse(existingRaw) : [];
            existing.push({ ...newShipment, id: Math.random().toString(36).substr(2, 9) });
            localStorage.setItem("trackflow_shipments", JSON.stringify(existing));

            alert(`Shipment ${formData.tracking_number} registered successfully!`);
            router.push("/admin/dashboard/shipments");
        } catch (err: any) {
            console.error(err);
            setError(`Database Error: ${err.message || "Failed to save to Supabase. Ensure your environment variables are set."}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-10 max-w-5xl">
            <div className="flex items-center gap-6">
                <Link href="/admin/dashboard/shipments" className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all shadow-sm">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900">Shipment Registration</h1>
                    <p className="text-slate-500 text-lg font-bold">Capture core logistics data for global tracking.</p>
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

                    {/* Tracking ID Display */}
                    <div className="flex flex-wrap gap-8 justify-between items-center pb-10 border-b border-slate-100">
                        <div className="space-y-2 flex-1 min-w-[300px]">
                            <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Generated Logistics ID</p>
                            <div className="flex items-center gap-4">
                                <h2 className="text-4xl font-mono font-extrabold text-slate-900 tracking-tighter">
                                    {formData.tracking_number}
                                </h2>
                                <button
                                    type="button"
                                    onClick={handleCopy}
                                    className={`p-3 rounded-xl transition-all ${isCopying ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`}
                                >
                                    {isCopying ? <Check size={20} /> : <Copy size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 flex items-center gap-6 text-white shadow-2xl">
                            <div className="text-right">
                                <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-[0.2em] mb-1">Security Status</p>
                                <p className="text-xl font-extrabold text-primary">System Encrypted</p>
                            </div>
                            <Package className="text-slate-700" size={40} />
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 resize-none transition-all"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
                                    value={formData.sender_name}
                                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Contact Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="sender@example.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
                                        value={formData.sender_email}
                                        onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Jurisdiction / Origin</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        placeholder="City, Country"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
                                        value={formData.origin}
                                        onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                                    />
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Receiver Partition */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                                <User className="text-slate-900" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-900">Receiver Profile</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Destination Stakeholder Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Full Name / Company"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
                                    value={formData.recipient_name}
                                    onChange={(e) => setFormData({ ...formData, recipient_name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Contact Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        required
                                        placeholder="email@example.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
                                        value={formData.recipient_email}
                                        onChange={(e) => setFormData({ ...formData, recipient_email: e.target.value })}
                                    />
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* New Recipient Detailed Contact Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-10 border-t border-slate-100">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                                <Phone className="text-slate-900" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-900">Direct Contact</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+1 (555) 000-0000"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 transition-all"
                                    value={formData.recipient_phone}
                                    onChange={(e) => setFormData({ ...formData, recipient_phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b-2 border-slate-900/5">
                                <MapPin className="text-slate-900" size={20} />
                                <h3 className="text-xl font-extrabold text-slate-900">Delivery Address</h3>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-500">Full Shipping Address</label>
                                <textarea
                                    required
                                    rows={1}
                                    placeholder="Street, Suite, ZIP, City, Country"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-slate-900 resize-none transition-all"
                                    value={formData.recipient_address}
                                    onChange={(e) => setFormData({ ...formData, recipient_address: e.target.value })}
                                />
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
                                    <label className="text-sm font-bold text-slate-500">Weight (lbs)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-bold text-slate-900 transition-all"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-500">Dimensions</label>
                                    <input
                                        type="text"
                                        placeholder="L x W x H"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 font-bold text-slate-900 transition-all"
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
                                            <option value="Chime">Chime</option>
                                            <option value="Zelle">Zelle</option>
                                            <option value="Apple Pay">Apple Pay</option>
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
                            disabled={isSaving}
                            className={`bg-slate-900 hover:bg-black text-white px-12 py-5 rounded-[24px] font-extrabold transition-all shadow-2xl shadow-slate-900/30 flex items-center gap-4 text-lg disabled:opacity-50`}
                        >
                            {isSaving ? <Clock className="animate-spin" size={24} /> : <Save size={24} />}
                            {isSaving ? "Synchronizing..." : "Finalize Manifest"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
