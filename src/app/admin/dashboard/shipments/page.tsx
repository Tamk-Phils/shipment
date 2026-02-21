"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Filter, Edit2, Trash2, ArrowUpRight, Package, RefreshCw, X, Save, MapPin, Clock } from "lucide-react";
import Link from "next/link";

import { Shipment, ShipmentUpdate } from "@/types";

export default function ShipmentsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleted, setShowDeleted] = useState(false);

    // Status Update Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingShipment, setEditingShipment] = useState<Shipment | null>(null);
    const [newUpdate, setNewUpdate] = useState({
        status: "Pending",
        location: "",
        description: ""
    });

    const loadShipments = () => {
        setIsLoading(true);
        if (typeof window === "undefined") return;

        const saved = localStorage.getItem("trackflow_shipments");
        if (saved) {
            setShipments(JSON.parse(saved));
        } else {
            // Default initial data if none exists
            const initialData: Shipment[] = [
                {
                    id: "1",
                    tracking_number: "TRK123456789",
                    shipment_name: "Global Express Alpha",
                    item_type: "Electronics",
                    description: "High-value electronic components",
                    sender_name: "John Logist",
                    recipient_name: "Emma Receive",
                    origin: "New York, USA",
                    destination: "London, UK",
                    current_status: "In Transit",
                    weight: 2.5,
                    dimensions: "30x20x15 cm",
                    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
                    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
                    updates: [
                        { id: "u1", shipment_id: "TRK123456789", status: "In Transit", location: "Paris, FR", description: "Package is on its way to the destination.", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
                        { id: "u2", shipment_id: "TRK123456789", status: "Processing", location: "New York, USA", description: "Package has been processed at the sorting facility.", created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
                        { id: "u3", shipment_id: "TRK123456789", status: "Pending", location: "New York, USA", description: "Shipment info received.", created_at: new Date(Date.now() - 3600000 * 48).toISOString() },
                    ]
                }
            ];
            localStorage.setItem("trackflow_shipments", JSON.stringify(initialData));
            setShipments(initialData);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadShipments();
    }, []);

    const handleDelete = (id: string) => {
        if (!confirm(`Are you sure you want to mark shipment ${id} as hidden? It will remain in the database but will be invisible to customers.`)) return;

        const updated = shipments.map(s => {
            if (s.tracking_number === id) {
                return { ...s, is_deleted: true, updated_at: new Date().toISOString() };
            }
            return s;
        });

        localStorage.setItem("trackflow_shipments", JSON.stringify(updated));
        setShipments(updated);
    };

    const handleRestore = (id: string) => {
        const updated = shipments.map(s => {
            if (s.tracking_number === id) {
                return { ...s, is_deleted: false, updated_at: new Date().toISOString() };
            }
            return s;
        });

        localStorage.setItem("trackflow_shipments", JSON.stringify(updated));
        setShipments(updated);
        alert(`Shipment ${id} has been restored successfully.`);
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

    const handleUpdateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingShipment) return;

        const updateRecord: ShipmentUpdate = {
            id: Math.random().toString(36).substr(2, 9),
            shipment_id: editingShipment.tracking_number,
            status: newUpdate.status,
            location: newUpdate.location,
            description: newUpdate.description,
            created_at: new Date().toISOString()
        };

        const updatedShipments = shipments.map(s => {
            if (s.tracking_number === editingShipment.tracking_number) {
                return {
                    ...s,
                    current_status: newUpdate.status as any,
                    updates: [updateRecord, ...(s.updates || [])]
                };
            }
            return s;
        });

        setShipments(updatedShipments);
        localStorage.setItem("trackflow_shipments", JSON.stringify(updatedShipments));
        setIsModalOpen(false);
        setEditingShipment(null);
        alert(`Status for ${editingShipment.tracking_number} updated successfully!`);
    };

    const filteredShipments = shipments.filter(s => {
        const matchesSearch =
            s.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.recipient_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.shipment_name || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesVisibility = showDeleted ? s.is_deleted : !s.is_deleted;

        return matchesSearch && matchesVisibility;
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-wrap gap-6 justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Shipment Management</h1>
                    <p className="text-slate-600 text-lg font-bold">Search, monitor, and manage the complete logistics pipeline.</p>
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
                            placeholder="Query by Shipment ID or Recipient Name..."
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
                        <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Filter size={18} /> Advanced Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 font-bold">Synchronizing with logistics database...</div>
                    ) : (
                        <>
                            {/* Shipments Table */}
                            <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-900 text-white border-b border-slate-800">
                                                <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest">Cargo Reference</th>
                                                <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest hidden md:table-cell">Logistics Path</th>
                                                <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest">Current Milestone</th>
                                                <th className="px-8 py-6 text-xs font-extrabold uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 font-medium">
                                            {filteredShipments.length > 0 ? (
                                                filteredShipments.map((shipment, i) => (
                                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                                        <td className="px-8 py-8">
                                                            <div className="flex items-center gap-4">
                                                                <div className="p-3 bg-slate-100 rounded-xl text-slate-400">
                                                                    <Package size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-slate-900 font-extrabold text-lg">{shipment.shipment_name || 'Legacy Shipment'}</p>
                                                                    <p className="text-primary font-mono text-sm font-bold tracking-tight">{shipment.tracking_number}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-8 hidden md:table-cell">
                                                            <div className="flex items-center gap-3">
                                                                <div className="text-slate-900 font-bold">{shipment.origin}</div>
                                                                <ArrowUpRight size={14} className="text-slate-300" />
                                                                <div className="text-slate-900 font-bold">{shipment.destination}</div>
                                                            </div>
                                                            <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">{shipment.item_type || 'General Cargo'}</p>
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
                                                                    title="Edit Shipment"
                                                                >
                                                                    <Edit2 size={18} />
                                                                </button>
                                                                {shipment.is_deleted ? (
                                                                    <button
                                                                        onClick={() => handleRestore(shipment.tracking_number)}
                                                                        className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-md active:scale-95"
                                                                        title="Restore Shipment"
                                                                    >
                                                                        <RefreshCw size={18} />
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleDelete(shipment.tracking_number)}
                                                                        className="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all shadow-md active:scale-95"
                                                                        title="Archive Shipment"
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
                                                        <div className="flex flex-col items-center gap-4">
                                                            <div className="p-6 bg-slate-50 rounded-full text-slate-300">
                                                                <Search size={48} />
                                                            </div>
                                                            <p className="text-slate-400 font-bold text-lg">No shipment records found matching your filters.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                                <p className="text-sm font-extrabold text-slate-600">Displaying {filteredShipments.length} active shipment records</p>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-400 font-bold text-sm disabled:opacity-50" disabled>Previous</button>
                                    <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50">Next Page</button>
                                </div>
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
                                <h3 className="text-xl font-extrabold text-slate-900">Update Shipment Status</h3>
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
                                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Current Milestone</label>
                                <div className="relative">
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-bold appearance-none text-black"
                                        value={newUpdate.status}
                                        onChange={(e) => setNewUpdate({ ...newUpdate, status: e.target.value })}
                                        required
                                    >
                                        <option value="Pending">Milestone: Pending</option>
                                        <option value="In Transit">Milestone: In Transit</option>
                                        <option value="Out for Delivery">Milestone: Out for Delivery</option>
                                        <option value="Delivered">Milestone: Delivered</option>
                                        <option value="Held">Milestone: Held at Customs</option>
                                        <option value="Postponed">Milestone: Postponed</option>
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
                                        placeholder="e.g. Sorting Facility, London, UK"
                                        value={newUpdate.location}
                                        onChange={(e) => setNewUpdate({ ...newUpdate, location: e.target.value })}
                                        required
                                    />
                                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest ml-1">Public Description</label>
                                <textarea
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 font-medium text-black min-h-[100px]"
                                    placeholder="Provide details about this milestone for the customer..."
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
                                    <Save size={20} /> Save Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
