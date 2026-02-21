"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Package, PlusCircle, LogOut, ArrowLeft, Menu, X, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useState } from "react";

interface MenuItem {
    label: string;
    icon: LucideIcon;
    href: string;
}

const SidebarContent = ({
    pathname,
    router,
    setIsSidebarOpen,
    menuItems
}: {
    pathname: string;
    router: AppRouterInstance;
    setIsSidebarOpen: (open: boolean) => void;
    menuItems: MenuItem[];
}) => (
    <div className="h-full flex flex-col p-6">
        <div className="flex items-center justify-between mb-12 px-2">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 font-bold italic">
                    TF
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900 text-nowrap">Admin Panel</span>
            </div>
            <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 text-slate-400 hover:text-slate-600"
            >
                <X size={24} />
            </button>
        </div>

        <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold ${isActive
                            ? "bg-primary text-white shadow-md shadow-primary/10"
                            : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                            }`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
            <button
                onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-bold text-nowrap"
            >
                <ArrowLeft size={20} />
                Back to Site
            </button>
            <button
                onClick={() => {
                    setIsSidebarOpen(false);
                    router.push("/admin");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-nowrap"
            >
                <LogOut size={20} />
                Sign Out
            </button>
        </div>
    </div>
);

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const menuItems: MenuItem[] = [
        { label: "Overview", icon: LayoutDashboard, href: "/admin/dashboard" },
        { label: "Active Shipments", icon: Package, href: "/admin/dashboard/shipments" },
        { label: "Add Shipment", icon: PlusCircle, href: "/admin/dashboard/add" },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col shadow-sm sticky top-0 h-screen shrink-0">
                <SidebarContent
                    pathname={pathname}
                    router={router}
                    setIsSidebarOpen={setIsSidebarOpen}
                    menuItems={menuItems}
                />
            </aside>

            {/* Mobile Sidebar / Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl lg:hidden"
                        >
                            <SidebarContent
                                pathname={pathname}
                                router={router}
                                setIsSidebarOpen={setIsSidebarOpen}
                                menuItems={menuItems}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Header */}
                <header className="lg:hidden h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold italic text-sm">
                            TF
                        </div>
                        <span className="font-bold text-slate-900">Admin Dashboard</span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-10 overflow-x-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
