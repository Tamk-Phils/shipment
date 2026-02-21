"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    const sections = [
        {
            title: "Introduction",
            content: "At TrackFlow, we take your privacy seriously. This policy describes how we collect, use, and handle your data when you use our shipment tracking services."
        },
        {
            title: "Information We Collect",
            content: "We collect information you provide directly to us when you register a shipment, contact us, or otherwise use our services. This includes tracking numbers, sender/recipient names, and logistics data."
        },
        {
            title: "How We Use Information",
            content: "We use the information we collect to provide, maintain, and improve our services, to process shipments, and to communicate with you about your logistics flow."
        },
        {
            title: "Data Security",
            content: "We implement enterprise-grade security measures to protect against unauthorized access, alteration, or destruction of data. This includes encryption at rest and in transit."
        },
        {
            title: "Your Rights",
            content: "You have the right to access, correct, or delete your shipment information at any time through our administrative interfaces or by contacting our support team."
        }
    ];

    return (
        <main className="container mx-auto px-4 py-24 max-w-4xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-5xl font-extrabold mb-4 text-slate-900 text-center">Privacy Policy</h1>
                <p className="text-slate-500 mb-12 italic text-center">Last Updated: February 21, 2026</p>

                <div className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-12">
                    {sections.map((section, i) => (
                        <section key={i} className="space-y-4 border-l-4 border-primary/20 pl-8">
                            <h2 className="text-2xl font-extrabold text-slate-900">{section.title}</h2>
                            <p className="text-slate-700 leading-relaxed font-medium text-lg">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>

                <div className="mt-24 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
                    <p className="text-slate-500">If you have any questions about this Privacy Policy, please contact us at:</p>
                    <p className="text-primary font-bold mt-2 text-xl">privacy@trackflow.logistics</p>
                </div>
            </motion.div>
        </main>
    );
}
