"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Search, Filter, MoreVertical, Mail, Shield, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function UserManagement() {
    const [users, setUsers] = useState([
        { id: 1, name: "Admin User", email: "admin@nexustrack.com", role: "Super Admin", status: "Active", lastLogin: "2 mins ago" },
        { id: 2, name: "Sarah Jenkins", email: "s.jenkins@swift.com", role: "Customer", status: "Active", lastLogin: "1 hour ago" },
        { id: 3, name: "Robert Chen", email: "r.chen@globalport.com", role: "Manager", status: "Inactive", lastLogin: "3 days ago" },
        { id: 4, name: "Michael Torres", email: "m.torres@apex.com", role: "Customer", status: "Active", lastLogin: "5 hours ago" },
    ]);

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">User Directory</h1>
                    <p className="text-slate-600 text-lg font-bold">Manage administrative access and customer accounts.</p>
                </div>
                <button className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all">
                    <UserPlus size={20} /> Add New User
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Users", val: "1,280", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Active Now", val: "42", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "Pending Verification", val: "15", icon: Shield, color: "text-amber-600", bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-slate-900">{stat.val}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative flex-1 w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        <input 
                            type="text" 
                            placeholder="Search by name, email or role..." 
                            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-6 pl-12 font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 text-slate-500 font-bold hover:text-primary transition-colors">
                            <Filter size={18} /> Filters
                        </button>
                        <div className="h-4 w-[1px] bg-slate-100" />
                        <span className="text-sm font-bold text-slate-400">Showing 4 of 1,280 users</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Identiy</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Role</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Access Status</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Last Auth</th>
                                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{user.name}</p>
                                                <p className="text-sm text-slate-400 font-medium">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-600">{user.role}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                            <span className={`text-sm font-bold ${user.status === 'Active' ? 'text-emerald-600' : 'text-slate-400'}`}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-slate-500">{user.lastLogin}</p>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
