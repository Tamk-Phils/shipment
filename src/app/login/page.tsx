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
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 sm:p-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[48px] shadow-2xl shadow-primary/10 border border-slate-100 p-8 sm:p-12"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-6 shadow-inner">
                        <LogIn size={40} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
                    <p className="text-slate-500 font-bold">Sign in to access live support and track your shipments.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-[24px] py-4 px-6 pl-14 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-black"
                                placeholder="name@example.com"
                            />
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-2">Safe Passkey</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-[24px] py-4 px-6 pl-14 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-black"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-[24px] font-extrabold transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 group"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>
                                Sign In Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                    <p className="text-slate-500 font-bold text-sm mb-4">New here?</p>
                    <Link href="/signup" className="inline-flex items-center gap-2 text-primary hover:underline font-extrabold">
                        <UserPlus size={18} /> Create a Secure Account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
