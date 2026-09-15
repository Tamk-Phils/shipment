"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Logo from "./Logo";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;
        
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (isMounted) setUser(session?.user ?? null);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) setUser(session?.user ?? null);
        });

        return () => {
            isMounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Professional Top Bar */}
            <div className="bg-[#1A1A1A] text-white py-2 px-4 text-[10px] font-bold uppercase tracking-[0.2em]">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <span className="opacity-70 hidden sm:inline">National Financial Credit Tracking</span>
                        <span className="text-primary">Support: +1 (239) 373 0487</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <Link href="/about" className="hover:text-primary transition-colors lowercase">Career</Link>
                        <Link href="/contact" className="hover:text-primary transition-colors lowercase">Contact</Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="bg-white border-b border-border shadow-sm">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-4 group">
                        <Logo className="w-12 h-12" />
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tight text-[#1A1A1A] group-hover:text-primary transition-colors leading-none uppercase">Nexus</span>
                            <span className="text-[10px] font-black tracking-[0.3em] text-primary uppercase">Tracking</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        <Link href="/tracking" className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] hover:text-primary transition-colors">Track Shipment</Link>
                        <Link href="/about" className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] hover:text-primary transition-colors">Services</Link>
                        <Link href="/about" className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] hover:text-primary transition-colors">Corporate</Link>
                        <Link href="/contact" className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] hover:text-primary transition-colors">E-Tracking</Link>

                        {user ? (
                            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <User size={16} />
                                    </div>
                                    <span className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider max-w-[120px] truncate">
                                        {user.user_metadata?.full_name || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut size={18} />
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-[#1A1A1A] text-white px-8 py-3 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all shadow-md flex items-center gap-2"
                            >
                                <LogIn size={14} />
                                Client Portal
                            </Link>
                        )}
                    </nav>

                    {/* Mobile Toggle */}
                    <button className="md:hidden p-2 text-[#1A1A1A]" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden p-8 bg-white border-b border-border animate-in slide-in-from-top duration-300 shadow-2xl">
                    <nav className="flex flex-col gap-6">
                        <Link href="/" onClick={() => setIsOpen(false)} className="font-black text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-primary">Home</Link>
                        <Link href="/tracking" onClick={() => setIsOpen(false)} className="font-black text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-primary">Tracking</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="font-black text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-primary">Services</Link>
                        <Link href="/contact" onClick={() => setIsOpen(false)} className="font-black text-xs uppercase tracking-widest text-[#1A1A1A] hover:text-primary">Contact</Link>

                        <div className="mt-4 pt-6 border-t border-slate-100">
                            {user ? (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <User size={20} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-black text-[#1A1A1A] uppercase tracking-wider truncate">
                                                {user.user_metadata?.full_name || 'My Account'}
                                            </span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{user.email}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                        className="p-3 text-primary bg-primary/5 rounded-lg"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full bg-[#1A1A1A] text-white py-5 rounded-md text-center text-[11px] font-black uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                                >
                                    <LogIn size={18} />
                                    Access Portal
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
