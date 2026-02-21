"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Filter, Edit2, Trash2, ArrowUpRight, Package, RefreshCw, X, Save, MapPin, Clock } from "lucide-react";
import Link from "next/link";

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
    created_at: string;
    updates: ShipmentUpdate[];
}

export default function ShipmentsList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
                    tracking_number: "TRK123456789",
                    sender_name: "John Logist",
                    recipient_name: "Emma Receive",
                    origin: "New York, USA",
                    destination: "London, UK",
                    current_status: "In Transit",
                    weight: 2.5,
                    dimensions: "30x20x15 cm",
                    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
                    updates: [
                        { status: "In Transit", location: "Paris, FR", description: "Package is on its way to the destination.", created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
                        { status: "Processing", location: "New York, USA", description: "Package has been processed at the sorting facility.", created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
                        { status: "Pending", location: "New York, USA", description: "Shipment info received.", created_at: new Date(Date.now() - 3600000 * 48).toISOString() },
                    ]
                }
            ];
            localStorage.setItem("trackflow_shipments", JSON.stringify(initialData));
            setShipments(initialData);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        // Load shipments on mount
        const timer = setTimeout(() => {
            const saved = localStorage.getItem("trackflow_shipments");
            if (saved) {
                setShipments(JSON.parse(saved));
            }
            setIsLoading(false);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = (id: string) => {
        if (!confirm(`Are you sure you want to remove shipment ${id}?`)) return;

        const updated = shipments.filter(s => s.tracking_number !== id);
        localStorage.setItem("trackflow_shipments", JSON.stringify(updated));
        setShipments(updated);
    };

    const handleEditClick = (shipment: Shipment) => {
        setEditingShipment(shipment);
        setNewUpdate({
            status: shipment.current_status || shipment.status || "Pending",
            location: "",
            description: ""
        });
        setIsModalOpen(true);
    };

    const handleUpdateStatus = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingShipment) return;

        const updatedShipments = shipments.map(s => {
            if (s.tracking_number === editingShipment.tracking_number) {
                const update: ShipmentUpdate = {
                    ...newUpdate,
                    created_at: new Date().toISOString()
                };
                return {
                    ...s,
                    current_status: newUpdate.status,
                    status: newUpdate.status, // Update legacy field for compatibility
                    updates: [update, ...(s.updates || [])]
                };
            }
            return s;
        });

        localStorage.setItem("trackflow_shipments", JSON.stringify(updatedShipments));
        setShipments(updatedShipments);
        setIsModalOpen(false);
        setEditingShipment(null);
        alert(`Status for ${editingShipment.tracking_number} updated successfully!`);
    };

    const filteredShipments = shipments.filter(s =>
        s.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.recipient_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all text-sm font-bold shadow-sm">
                            <Filter size={18} /> Advanced Filters
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-20 text-center text-slate-400 font-bold">Synchronizing with logistics database...</div>
                    ) : filteredShipments.length === 0 ? (
                        <div className="p-20 text-center">
                            <Package className="mx-auto text-slate-200 mb-4" size={64} />
                            <p className="text-slate-400 font-bold text-xl">No shipments found</p>
                            <p className="text-slate-300 mt-2">Start by registering a new shipment to see it here.</p>
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-slate-500 uppercase text-xs tracking-widest font-extrabold border-b border-slate-100">
                                    <th className="px-8 py-6">Identity</th>
                                    <th className="px-8 py-6">Stakeholders</th>
                                    <th className="px-8 py-6">Logistics Path</th>
                                    <th className="px-8 py-6">Current Status</th>
                                    <th className="px-8 py-6 text-right">Administrative</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredShipments.map((shipment) => (
                                    <tr key={shipment.tracking_number} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                                                    <Package size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-mono font-bold text-primary text-lg tracking-tight">{shipment.tracking_number}</p>
                                                    <p className="text-xs font-extrabold text-slate-500">Registered {new Date(shipment.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-slate-700">
                                            {shipment.recipient_name}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-600">
                                                <span className="text-slate-500">{shipment.origin.split(',')[0]}</span>
                                                <ArrowUpRight size={14} className="text-slate-400" />
                                                <span className="text-slate-900">{shipment.destination.split(',')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold border ${shipment.current_status === "Delivered" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                shipment.current_status === "In Transit" ? "bg-blue-50 text-blue-600 border-blue-100" :
                                                    shipment.current_status === "Out for Delivery" ? "bg-primary/5 text-primary-dark border-primary/10" :
                                                        "bg-amber-50 text-amber-600 border-amber-100"
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${shipment.current_status === "Delivered" ? "bg-emerald-500" :
                                                    shipment.current_status === "In Transit" ? "bg-blue-500" :
                                                        "bg-primary"
                                                    }`} />
                                                {shipment.current_status || shipment.status || "Pending"}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleEditClick(shipment)}
                                                    className="p-3 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(shipment.tracking_number)}
                                                    className="p-3 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 hover:shadow-lg hover:shadow-red-500/5 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-sm font-extrabold text-slate-600">Displaying {filteredShipments.length} active shipment records</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-400 font-bold text-sm disabled:opacity-50" disabled>Previous</button>
                        <button className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50">Next Page</button>
                    </div>
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
