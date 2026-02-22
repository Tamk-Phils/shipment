"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 transition-transform group-hover:scale-105">
                        <Image
                            src="/logo.png"
                            alt="TrackFlow Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-foreground underline-offset-4 group-hover:underline">Track<span className="text-primary">Flow</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">Home</Link>
                    <Link href="/about" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">About Us</Link>
                    <Link href="/privacy" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">Privacy</Link>

                    {user ? (
                        <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <User size={16} />
                                </div>
                                <span className="text-sm font-bold text-slate-700 max-w-[120px] truncate">
                                    {user.user_metadata?.full_name || user.email}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                title="Sign Out"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-primary text-white px-6 py-2.5 rounded-2xl text-sm font-extrabold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                        >
                            <LogIn size={16} />
                            Login
                        </Link>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden p-6 bg-white border-b border-border animate-in slide-in-from-top duration-300 shadow-xl">
                    <nav className="flex flex-col gap-4">
                        <Link href="/" onClick={() => setIsOpen(false)} className="px-4 py-2 font-bold text-slate-700 hover:text-primary">Home</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-2 font-bold text-slate-700 hover:text-primary">About Us</Link>
                        <Link href="/privacy" onClick={() => setIsOpen(false)} className="px-4 py-2 font-bold text-slate-700 hover:text-primary">Privacy Policy</Link>

                        <div className="mt-4 pt-4 border-t border-slate-100">
                            {user ? (
                                <div className="flex items-center justify-between px-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 truncate">
                                                {user.user_metadata?.full_name || 'My Account'}
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{user.email}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="p-2 text-red-500 bg-red-50 rounded-xl"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-primary text-white py-4 rounded-2xl text-center font-extrabold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    <LogIn size={20} />
                                    Login to Account
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
