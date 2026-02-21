"use client";

import { MoveRight, ShieldCheck, Globe, Zap, Star, ChevronDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import TrackingSearch from "@/components/TrackingSearch";

// Morphing Blob Component
const MorphingBlob = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    className={`absolute blur-3xl opacity-20 pointer-events-none ${className}`}
    animate={{
      borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"],
      scale: [1, 1.1, 1],
      rotate: [0, 90, 180, 270, 360],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
    style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
  />
);

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left group"
      >
        <span className="text-xl font-extrabold text-slate-800 group-hover:text-primary transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-slate-400 group-hover:text-primary transition-colors"
        >
          <ChevronDown size={28} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-600 font-medium text-lg leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  return (
    <main className="relative bg-slate-50 min-h-screen overflow-hidden">
      {/* Global Background Blobs */}
      <MorphingBlob className="w-[600px] h-[600px] -top-60 -left-60 bg-primary/30" />
      <MorphingBlob className="w-[500px] h-[500px] top-1/2 -right-40 bg-primary/20" delay={2} />
      <MorphingBlob className="w-[400px] h-[400px] bottom-0 left-1/4 bg-primary/10" delay={5} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-24">
        {/* Mobile Background Image */}
        <div className="absolute inset-0 z-0 lg:hidden opacity-70">
          <Image
            src="/hero.png"
            alt="Logistics Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-transparent to-slate-50/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/20">
                <ShieldCheck size={16} />
                <span>Certified Professional Logistics</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                Track your cargo <br />
                <span className="text-primary">with precision</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-bold">
                Real-time monitoring for global shipments. Trusted by thousands of logistics managers worldwide for accuracy and reliability.
              </p>

              <TrackingSearch />

              <div className="flex flex-wrap gap-8 pt-4 items-center text-slate-600">
                <div className="flex items-center gap-2 font-bold">
                  <Globe size={20} className="text-primary" />
                  Global Network
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <Zap size={20} className="text-primary" />
                  Instant Updates
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck size={20} className="text-primary" />
                  Secure Logic
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:block relative h-[600px] rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white group"
            >
              <Image
                src="/hero.png"
                alt="Professional Logistics Center"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:bg-transparent transition-colors" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-xs font-bold text-white/70 mb-1 tracking-widest uppercase">Active Network</p>
                  <p className="text-2xl font-bold">24,500+ Shipments Monthly</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 font-primary">
                The New Standard in <br />
                <span className="text-primary">Global Logistics Management</span>
              </h2>
              <p className="text-slate-500 text-xl font-bold leading-relaxed">
                We combine cutting-edge technology with decade-long expertise to deliver a tracking
                experience that&apos;s as reliable as it is precise.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Total Shield", desc: "Military-grade data protection for every shipment record." },
              { icon: Globe, title: "180+ Countries", desc: "Deep integration with global port and customs databases." },
              { icon: Zap, title: "Instant Sync", desc: "Status updates hit your dashboard in under 5 seconds." },
              { icon: CheckCircle2, title: "Smart Audit", desc: "Automated verification of carrier data for 100% accuracy." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50/50 backdrop-blur-sm p-10 rounded-[40px] border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary mb-8 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review & Testimonials Section */}
      <section className="bg-slate-900 py-32 overflow-hidden relative">
        <MorphingBlob className="w-96 h-96 -bottom-20 -right-20 bg-primary/30" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Verified Industry Reviews</h2>
              <div className="flex justify-center gap-1 mb-6 text-amber-400">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={24} fill="currentColor" />)}
              </div>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto font-bold">
                Rated <span className="text-white">4.9/5 stars</span> based on 2,400+ reviews from verified managers.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: "Robert Chen",
                role: "Director of Logistics",
                company: "Global Port Solutions",
                image: "/testimonial_3.png",
                quote: "TrackFlow has completely transformed how we handle international freight. The precision is unmatched."
              },
              {
                name: "Sarah Jenkins",
                role: "Operations Manager",
                company: "Swift delivery Inc.",
                image: "/testimonial_2.png",
                quote: "The interface is intuitive and the real-time updates are actually real-time. A game-changer for our team."
              },
              {
                name: "Michael Torres",
                role: "Supply Chain Lead",
                company: "Apex Manufacturing",
                image: "/testimonial_1.png",
                quote: "Security and stability were our top priorities. TrackFlow delivered on both fronts beyond our expectations."
              },
              {
                name: "David Vance",
                role: "CEO",
                company: "Vance Logistics",
                initials: "DV",
                quote: "The API integration was effortless. We synchronized our entire fleet data in less than a day."
              },
              {
                name: "Elena Rodriguez",
                role: "Customs Specialist",
                company: "Intercontinental Freight",
                initials: "ER",
                quote: "Tracking complex multi-modal shipments has never been this clear. The mobile UI is especially impressive."
              },
              {
                name: "Marcus Thorne",
                role: "Fleet Supervisor",
                company: "Thorne Distribution",
                initials: "MT",
                quote: "Real-time updates that are actually accurate. It's saved us hundreds of man-hours in manual status checks."
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] shadow-2xl hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors flex items-center justify-center bg-slate-800">
                    {t.image ? (
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-primary">{t.initials}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold text-lg">{t.name}</h4>
                    <p className="text-primary text-sm font-bold">{t.role}</p>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{t.company}</p>
                  </div>
                </div>
                <div className="mb-4 flex text-amber-400">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                </div>
                <p className="text-slate-300 italic font-medium leading-relaxed text-lg">&quot;{t.quote}&quot;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">
                Frequently Asked <br />
                <span className="text-primary">Questions</span>
              </h2>
              <p className="text-slate-500 text-xl font-bold mb-10 leading-relaxed">
                Everything you need to know about our tracking system, security protocols, and integration options.
              </p>
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <p className="font-extrabold text-slate-900 mb-2 text-lg">Still have questions?</p>
                <p className="text-slate-500 font-bold mb-6">Our support team is available 24/7 for tailored assistance.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-extrabold hover:underline">
                  Contact Support <MoveRight size={20} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white"
            >
              <FAQItem
                question="How accurate is the 'Real-Time' tracking?"
                answer="Our system syncs directly with terminal management systems (TMS) and GPS transponders. You can expect sub-5 second latency between a status change in the field and the update appearing on your dashboard."
              />
              <FAQItem
                question="Can I track multi-modal shipments?"
                answer="Yes. TrackFlow supports air, sea, rail, and road freight. We automatically switch tracking protocols based on the current leg of the journey to ensure uninterrupted visibility."
              />
              <FAQItem
                question="How do I integrate this into our existing ERP?"
                answer="We offer a robust GraphQL API and pre-built connectors for major ERPs like SAP, Oracle, and Microsoft Dynamics. Integration typically takes less than 48 hours."
              />
              <FAQItem
                question="What security measures protect our cargo data?"
                answer="Every tracking link is encrypted with AES-256. We also implement IP-based access controls and multi-factor authentication for admin accounts to prevent unauthorized access."
              />
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="TrackFlow Logo" fill className="object-contain" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">TrackFlow</span>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-sm font-extrabold text-slate-600">
            <Link href="/about" className="hover:text-primary transition-colors">About System</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Usage Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Global Support</Link>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm font-bold">© 2026 TrackFlow Next. All rights reserved.</p>
            <p className="text-slate-300 text-xs font-bold uppercase tracking-widest mt-1">Enterprise Logistics Suite</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
