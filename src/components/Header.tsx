"use client";

import Link from "next/link";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-105">
                        <Package size={24} />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-foreground">Track<span className="text-primary">Flow</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">Home</Link>
                    <Link href="/about" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">About Us</Link>
                    <Link href="/privacy" className="text-sm font-semibold text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link>
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden p-4 bg-white border-b border-border animate-in slide-in-from-top duration-300">
                    <nav className="flex flex-col gap-4">
                        <Link href="/" onClick={() => setIsOpen(false)} className="px-4 py-2 font-medium">Home</Link>
                        <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-2 font-medium">About Us</Link>
                        <Link href="/privacy" onClick={() => setIsOpen(false)} className="px-4 py-2 font-medium">Privacy Policy</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
