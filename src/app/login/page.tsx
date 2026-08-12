"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowRight, Loader2, UserPlus } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 sm:p-10 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-white rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row"
            >
                <div className="md:w-1/3 bg-[#1A1A1A] p-10 flex flex-col justify-between text-white relative">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                         <div className="absolute inset-0 bg-gradient-to-br from-primary to-transparent" />
                    </div>
                    <div className="relative z-10">
                        <LogIn size={48} className="text-primary mb-8" />
                        <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight">SECURE <br/>GATEWAY</h2>
                    </div>
                    <div className="relative z-10 pt-10 border-t border-white/10">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">National Financial Credit</p>
                    </div>
                </div>

                <div className="md:w-2/3 p-10 sm:p-16">
                    <div className="mb-12">
                        <h1 className="text-3xl font-black text-[#1A1A1A] mb-3 uppercase tracking-tighter">CLIENT AUTHENTICATION</h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">Please enter your institutional credentials to proceed to the secure portal.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-6 bg-red-50 border-l-4 border-primary text-primary text-[11px] font-black uppercase tracking-widest animate-shake">
                            AUTHENTICATION FAILURE: {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Institutional Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-none py-5 px-6 pl-14 focus:outline-none focus:border-primary transition-all font-bold text-black uppercase text-xs tracking-widest"
                                    placeholder="CLIENT@NFC-BANK.COM"
                                />
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Passkey</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-none py-5 px-6 pl-14 focus:outline-none focus:border-primary transition-all font-bold text-black uppercase text-xs tracking-widest"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1A1A1A] hover:bg-primary text-white py-6 rounded-none font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-4 group"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>
                                    VERIFY ACCESS <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Unauthorized access is monitored.</p>
                        <Link href="/signup" className="inline-flex items-center gap-2 text-primary hover:text-[#1A1A1A] font-black text-[10px] uppercase tracking-widest transition-colors">
                            <UserPlus size={14} /> REGISTER ACCOUNT
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
