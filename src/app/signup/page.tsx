"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, UserPlus, ArrowRight, Loader2, User, LogIn } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
        } else {
            setSuccess(true);
            setIsLoading(false);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 sm:p-10 bg-slate-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white rounded-sm shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row"
            >
                <div className="md:w-1/3 bg-[#1A1A1A] p-10 flex flex-col justify-between text-white relative">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                         <div className="absolute inset-0 bg-gradient-to-br from-primary to-transparent" />
                    </div>
                    <div className="relative z-10">
                        <UserPlus size={48} className="text-primary mb-8" />
                        <h2 className="text-2xl font-black uppercase tracking-tighter leading-tight">PORTAL <br/>REGISTRATION</h2>
                    </div>
                    <div className="relative z-10 pt-10 border-t border-white/10">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">National Financial Credit</p>
                    </div>
                </div>

                <div className="md:w-2/3 p-10 sm:p-16">
                    <div className="mb-12">
                        <h1 className="text-3xl font-black text-[#1A1A1A] mb-3 uppercase tracking-tighter">INSTITUTIONAL IDENTITY</h1>
                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-relaxed">Establish your secure node within the National Financial Credit logistics network.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-6 bg-red-50 border-l-4 border-primary text-primary text-[11px] font-black uppercase tracking-widest animate-shake">
                            REGISTRATION ERROR: {error}
                        </div>
                    )}

                    {success ? (
                        <div className="text-center space-y-6 py-12 bg-slate-50 border border-slate-100">
                            <div className="w-16 h-16 bg-primary text-white flex items-center justify-center mx-auto mb-6 rotate-45">
                                <div className="-rotate-45">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-black text-[#1A1A1A] uppercase tracking-widest">VERIFICATION REQUIRED</h2>
                            <p className="text-slate-500 font-bold text-xs uppercase tracking-tight">A secure verification link has been dispatched to your institutional inbox. Please authenticate to activate your node.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSignup} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Legal Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-none py-5 px-6 pl-14 focus:outline-none focus:border-primary transition-all font-bold text-black uppercase text-xs tracking-widest"
                                        placeholder="CLIENT NAME"
                                    />
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                </div>
                            </div>

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
                                        minLength={6}
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
                                        ESTABLISH NODE <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Compliance standards apply.</p>
                        <Link href="/login" className="inline-flex items-center gap-2 text-primary hover:text-[#1A1A1A] font-black text-[10px] uppercase tracking-widest transition-colors">
                            <LogIn size={14} /> ACCOUNT VERIFICATION
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
