"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Search, Filter, MoreVertical, Mail, Shield, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { notifyDirectEmail } from "@/app/actions/email";

export default function UserManagement() {
    const [users] = useState([
        { id: 1, name: "Admin User", email: "admin@nexustrack.com", role: "Super Admin", status: "Active", lastLogin: "2 mins ago" },
        { id: 2, name: "Sarah Jenkins", email: "s.jenkins@swift.com", role: "Customer", status: "Active", lastLogin: "1 hour ago" },
        { id: 3, name: "Robert Chen", email: "r.chen@globalport.com", role: "Manager", status: "Inactive", lastLogin: "3 days ago" },
        { id: 4, name: "Michael Torres", email: "m.torres@apex.com", role: "Customer", status: "Active", lastLogin: "5 hours ago" },
    ]);
    const [composeTarget, setComposeTarget] = useState<{ name: string; email: string } | null>(null);
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sendResult, setSendResult] = useState<string | null>(null);

    const openComposer = (name: string, email: string) => {
        setComposeTarget({ name, email });
        setRecipientName(name);
        setRecipientEmail(email);
        setSubject(`Message from Global Nexus Tracker`);
        setMessage("");
        setSendResult(null);
    };

    const openBlankComposer = () => {
        setComposeTarget({ name: "", email: "" });
        setRecipientName("");
        setRecipientEmail("");
        setSubject(`Message from Global Nexus Tracker`);
        setMessage("");
        setSendResult(null);
    };

    const closeComposer = () => {
        if (isSending) return;
        setComposeTarget(null);
        setRecipientName("");
        setRecipientEmail("");
        setSubject("");
        setMessage("");
        setSendResult(null);
    };

    const handleSendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipientEmail.trim() || !subject.trim() || !message.trim()) return;

        setIsSending(true);
        setSendResult(null);

        try {
            const result = await notifyDirectEmail({
                to: recipientEmail.trim(),
                subject: subject.trim(),
                message: message.trim(),
                recipientName: recipientName.trim() || undefined,
                senderName: "Global Nexus Tracker Admin"
            });

            if (!result.success) {
                throw new Error(typeof result.error === "string" ? result.error : "Failed to send email");
            }

            setSendResult(`Sent to ${recipientName || recipientEmail} at ${recipientEmail}`);
            setMessage("");
        } catch (error: unknown) {
            setSendResult(error instanceof Error ? error.message : "Failed to send email");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="space-y-10 relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-2">User Directory</h1>
                    <p className="text-slate-600 text-lg font-bold">Manage administrative access and customer accounts.</p>
                </div>
                <button
                    onClick={openBlankComposer}
                    className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 transition-all"
                >
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
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openComposer(user.name, user.email)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all"
                                            >
                                                <Mail size={16} />
                                                Email
                                            </button>
                                            <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                                <MoreVertical size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {composeTarget && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50">
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Direct Email</p>
                                <h2 className="text-3xl font-extrabold text-slate-900">
                                    {composeTarget.name ? `Message ${composeTarget.name}` : "Message recipient"}
                                </h2>
                                {composeTarget.email && <p className="text-slate-500 font-medium mt-2">{composeTarget.email}</p>}
                            </div>
                            <button onClick={closeComposer} className="p-2 rounded-xl hover:bg-slate-200 text-slate-500 transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSendEmail} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Recipient email</label>
                                <input
                                    type="email"
                                    value={recipientEmail}
                                    onChange={(e) => setRecipientEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="recipient@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Recipient name</label>
                                <input
                                    type="text"
                                    value={recipientName}
                                    onChange={(e) => setRecipientName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Optional display name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                    placeholder="Enter email subject"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Message</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={7}
                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3 font-semibold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                                    placeholder="Write your message here"
                                />
                            </div>

                            {sendResult && (
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
                                    {sendResult}
                                </div>
                            )}

                            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500">
                                Sender: support@globalnexustracker.com
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeComposer}
                                    className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="px-6 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isSending ? "Sending..." : "Send Email"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
