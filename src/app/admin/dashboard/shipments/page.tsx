"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Filter, Edit2, Trash2, ArrowUpRight, Package, RefreshCw, X, Save, MapPin, Clock, Copy, Check } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Shipment, ShipmentUpdate } from "@/types";

export default function ShipmentsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleted, setShowDeleted] = useState(false);
    const [copyId, setCopyId] = useState<string | null>(null);

    // Status Update Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
    const [newUpdate, setNewUpdate] = useState({
        status: "Pending",
        location: "",
        description: ""
    });

    const handleCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopyId(id);
        setTimeout(() => setCopyId(null), 2000);
    };

    const loadShipments = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('shipments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data && data.length > 0) {
                setShipments(data as Shipment[]);
            } else {
                // Fallback to localStorage if Supabase is empty or not yet configured
                const saved = localStorage.getItem("trackflow_shipments");
                if (saved) {
                    setShipments(JSON.parse(saved) as Shipment[]);
                }
            }
        } catch (err) {
            const errorObj = err as { message?: string };
            console.error("Supabase Load Error:", errorObj);
            // Graceful fallback to localStorage
            const saved = localStorage.getItem("trackflow_shipments");
            if (saved) setShipments(JSON.parse(saved) as Shipment[]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadShipments();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm(`Are you sure you want to mark shipment ${id} as hidden? It will remain in the database but will be invisible to customers.`)) return;

        try {
            const { error } = await supabase
                .from('shipments')
                .update({ is_deleted: true, updated_at: new Date().toISOString() })
                .eq('tracking_number', id);

            if (error) throw error;

            // Update local state and localStorage for consistency
            const updated = shipments.map(s => {
                if (s.tracking_number === id) return { ...s, is_deleted: true, updated_at: new Date().toISOString() };
                return s;
            });
            setShipments(updated);
            localStorage.setItem("trackflow_shipments", JSON.stringify(updated));
        } catch (err) {
            console.error(err);
            alert("Failed to archive shipment. Please check your database connection.");
        }
    };

    const handleRestore = async (id: string) => {
        try {
            const { error } = await supabase
                .from('shipments')
                .update({ is_deleted: false, updated_at: new Date().toISOString() })
                .eq('tracking_number', id);

            if (error) throw error;

            const updated = shipments.map(s => {
                if (s.tracking_number === id) return { ...s, is_deleted: false, updated_at: new Date().toISOString() };
                return s;
            });
            setShipments(updated);
            localStorage.setItem("trackflow_shipments", JSON.stringify(updated));
            alert(`Shipment ${id} has been restored successfully.`);
        } catch (err) {
            console.error(err);
            alert("Failed to restore shipment.");
        }
    };

    const handleEditClick = (shipment: Shipment) => {
        setEditingShipment(shipment);
        setNewUpdate({
            status: shipment.current_status || "Pending",
            location: "",
            description: ""
        });
        setIsModalOpen(true);
    };

    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingShipment) return;

        const updateRecord = {
            id: Math.random().toString(36).substr(2, 9),
            shipment_id: editingShipment.tracking_number,
            status: newUpdate.status,
            location: newUpdate.location,
            description: newUpdate.description,
            created_at: new Date().toISOString()
        };

        const updatedUpdates = [updateRecord, ...(editingShipment.updates || [])];

        try {
            const { error } = await supabase
                .from('shipments')
                .update({
                    current_status: newUpdate.status,
                    updates: updatedUpdates,
                    updated_at: new Date().toISOString()
                })
                .eq('tracking_number', editingShipment.tracking_number);

            if (error) throw error;

            const updatedShipments = shipments.map(s => {
                if (s.tracking_number === editingShipment.tracking_number) {
                    return {
                        ...s,
                        current_status: newUpdate.status as any,
                        updates: updatedUpdates,
                        updated_at: new Date().toISOString()
                    };
                }
                return s;
            });

            setShipments(updatedShipments);
            localStorage.setItem("trackflow_shipments", JSON.stringify(updatedShipments));
            setIsModalOpen(false);
            setEditingShipment(null);
            alert(`Status for ${editingShipment.tracking_number} updated successfully!`);
        } catch (err) {
            console.error(err);
            alert("Failed to update status.");
        }
    };

    const filteredShipments = shipments.filter(s => {
        const matchesSearch =
            s.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.recipient_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.item_type || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesVisibility = showDeleted ? s.is_deleted : !s.is_deleted;

        return matchesSearch && matchesVisibility;
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-wrap gap-6 justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Shipment Management</h1>
                    <p className="text-slate-600 text-lg font-bold">Synchronized logistics monitoring across all devices.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={loadShipments}
                        className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all shadow-sm"
                        title="Refresh Data"
                    >
                        <RefreshCw size={24} className={isLoading ? "animate-spin" : ""} />
                    </button>
                    <Link
                        href="/admin/dashboard/add"
                        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
                    >
                        <Plus size={22} /> Register Shipment
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm">
                <div className="p-8 border-b border-slate-100 flex flex-wrap gap-6 justify-between items-center bg-slate-50/50">
                    <div className="relative w-full max-w-lg">
                        <input
                            type="text"
                            placeholder="Query by Shipment ID or Receiver..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 pl-14 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-black placeholder:text-slate-400"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowDeleted(!showDeleted)}
                            className={`flex items-center gap-2 px-6 py-4 rounded-2xl border transition-all text-sm font-bold shadow-sm ${showDeleted
                                ? "bg-amber-50 border-amber-200 text-amber-700"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <Trash2 size={18} /> {showDeleted ? "Viewing Hidden" : "View Hidden Archives"}
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 font-bold">Connecting to global logistics database...</div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-900 text-white border-b border-slate-800">
                                            <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest">Tracking Number</th>
                                            <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest hidden md:table-cell">Receiver & Route</th>
                                            <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest">Status</th>
                                            <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 font-medium text-black">
                                        {filteredShipments.length > 0 ? (
                                            filteredShipments.map((shipment, i) => (
                                                <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-8 py-8">
                                                        <div className="flex items-center gap-4">
                                                            <div className="p-3 bg-slate-100 rounded-xl text-slate-400">
                                                                <Package size={20} />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-2">
                                                                    <p className="text-primary font-mono text-lg font-extrabold tracking-tight">{shipment.tracking_number}</p>
                                                                    <button
                                                                        onClick={() => handleCopy(shipment.tracking_number)}
                                                                        className={`p-1.5 rounded-lg transition-all ${copyId === shipment.tracking_number ? 'bg-emerald-500 text-white' : 'text-slate-300 hover:text-slate-600 hover:bg-slate-100'}`}
                                                                    >
                                                                        {copyId === shipment.tracking_number ? <Check size={14} /> : <Copy size={14} />}
                                                                    </button>
                                                                </div>
                                                                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">{shipment.item_type || 'General Cargo'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-8 hidden md:table-cell">
                                                        <p className="font-extrabold text-slate-900">{shipment.recipient_name}</p>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-slate-400 text-xs font-bold">{shipment.origin}</span>
                                                            <ArrowUpRight size={12} className="text-slate-300" />
                                                            <span className="text-slate-400 text-xs font-bold">{shipment.destination}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-8">
                                                        <span className={`px-4 py-2 rounded-full text-xs font-extrabold shadow-sm ${shipment.current_status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                                                            shipment.current_status === 'Held' ? 'bg-red-100 text-red-700' :
                                                                shipment.current_status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                                    shipment.current_status === 'Postponed' ? 'bg-slate-200 text-slate-700' :
                                                                        'bg-primary/10 text-primary'
                                                            }`}>
                                                            {shipment.current_status}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-8 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button
                                                                onClick={() => handleEditClick(shipment)}
                                                                className="p-3 bg-slate-900 text-white rounded-xl hover:bg-black transition-all shadow-md active:scale-95"
                                                                title="Update Progress"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            {shipment.is_deleted ? (
                                                                <button
                                                                    onClick={() => handleRestore(shipment.tracking_number)}
                                                                    className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-md active:scale-95"
                                                                    title="Restore"
                                                                >
                                                                    <RefreshCw size={18} />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleDelete(shipment.tracking_number)}
                                                                    className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md active:scale-95"
                                                                    title="Archive"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-20 text-center">
                                                    <p className="text-slate-400 font-bold text-lg">No shipment records found.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                                <p className="text-sm font-extrabold text-slate-600">Showing {filteredShipments.length} active global records</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Status Update Modal */}
            {isModalOpen && editingShipment && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900">Push Global Update</h3>
                                <p className="text-sm font-bold text-primary mt-1">ID: {editingShipment.tracking_number}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-xl hover:bg-white hover:shadow-sm text-slate-400 hover:text-slate-600 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateStatus} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">New Milestone</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold appearance-none text-black"
                                        value={newUpdate.status}
                                        onChange={(e) => setNewUpdate({ ...newUpdate, status: e.target.value })}
                                        required
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Transit">In Transit</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Held">Held at Customs</option>
                                        <option value="Postponed">Postponed</option>
                                    </select>
                                    <Clock className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={20} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Current Location</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold text-black"
                                        placeholder="e.g. Heathrow Airport, UK"
                                        value={newUpdate.location}
                                        onChange={(e) => setNewUpdate({ ...newUpdate, location: e.target.value })}
                                        required
                                    />
                                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Logistics Note</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-medium text-black min-h-[100px]"
                                    placeholder="Enter descriptive update for tracking info..."
                                    value={newUpdate.description}
                                    onChange={(e) => setNewUpdate({ ...newUpdate, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="pt-4 flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all"
                                >
                                    <Save size={20} /> Sync Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
