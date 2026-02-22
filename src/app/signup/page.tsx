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
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 sm:p-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[48px] shadow-2xl shadow-primary/10 border border-slate-100 p-8 sm:p-12"
            >
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary/10 text-primary mb-6 shadow-inner">
                        <UserPlus size={40} />
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h1>
                    <p className="text-slate-500 font-bold">Join TrackFlow to access priority support and advanced tracking.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                        {error}
                    </div>
                )}

                {success ? (
                    <div className="text-center space-y-4 py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">Check your email!</h2>
                        <p className="text-slate-500 font-bold">We've sent you a verification link. Please confirm your email to continue.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-extrabold text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[24px] py-4 px-6 pl-14 focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-black"
                                    placeholder="Your Full Name"
                                />
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                            </div>
                        </div>

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
                                    minLength={6}
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
                                    Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                    <p className="text-slate-500 font-bold text-sm mb-4">Already have an account?</p>
                    <Link href="/login" className="inline-flex items-center gap-2 text-primary hover:underline font-extrabold">
                        <LogIn size={18} /> Sign In Here
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
