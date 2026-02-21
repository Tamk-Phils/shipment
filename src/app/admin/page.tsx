"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck, Home } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Hardcoded demo auth match from PDF
        setTimeout(() => {
            if (username === "admin" && password === "admin123") {
                router.push("/admin/dashboard");
            } else {
                alert("Verification failed. Please check your administrative credentials.");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6 bg-slate-50/50">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white p-12 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100"
            >
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-8 shadow-inner">
                        <ShieldCheck size={40} />
                    </div>
                    <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Gatekeeper</h2>
                    <p className="text-slate-500 font-medium">Logistics Management Portal</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1">Administrative Identity</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pl-14 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-black"
                                placeholder="Username"
                                required
                            />
                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-1">Secure Passkey</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pl-14 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all font-bold text-black"
                                placeholder="••••••••"
                                required
                            />
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-900 hover:bg-black text-white py-5 rounded-[24px] font-extrabold transition-all shadow-xl shadow-slate-300 flex items-center justify-center gap-3 group text-lg"
                        >
                            {isLoading ? "Verifying..." : (
                                <>
                                    Authorize Access <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-sm">
                        <Home size={16} /> Return to Public Tracking
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
