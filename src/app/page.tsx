"use client";

import { MoveRight, ShieldCheck, Globe, Zap, Star, ChevronDown, CheckCircle2, TrendingUp, Boxes, Briefcase, Camera, Play, Layers, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import TrackingSearch from "@/components/TrackingSearch";
import Logo from "@/components/Logo";

// FAQ Item Component
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left group"
      >
        <span className="text-xl font-extrabold text-slate-800 group-hover:text-red-700 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-slate-400 group-hover:text-red-700 transition-colors"
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

      {/* High-Contrast Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-40 lg:pt-48 lg:pb-64 bg-white">
        {/* Subtle Branding Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1A1A1A] hidden lg:block skew-x-[-12deg] translate-x-32" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-12"
            >
              <div className="inline-flex items-center gap-3 bg-primary/5 text-primary px-5 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.25em] border-l-4 border-primary">
                <ShieldCheck size={14} />
                <span>Institutional Grade Logistics</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black leading-[0.95] tracking-tighter text-[#1A1A1A]">
                Precision <br />
                <span className="text-primary italic">Intelligence.</span>
              </h1>
              
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-bold uppercase tracking-tight">
                The official tracking infrastructure for National Financial Credit. Absolute visibility for high-value transits across 180+ global nodes.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <Link href="/tracking" className="inline-flex items-center gap-4 bg-[#1A1A1A] text-white px-12 py-6 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl shadow-black/20 group">
                  Start Tracking <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/login" className="inline-flex items-center gap-4 bg-white text-[#1A1A1A] px-12 py-6 rounded-sm font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all border-2 border-[#1A1A1A] shadow-xl">
                  Client Portal
                </Link>
              </div>

              <div className="flex gap-12 pt-10 border-t border-slate-100 items-center">
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Network Nodes</p>
                    <p className="text-3xl font-black text-[#1A1A1A]">1,240+</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Daily Events</p>
                    <p className="text-3xl font-black text-[#1A1A1A]">42.5M</p>
                 </div>
              </div>
            </motion.div>

            <div className="relative h-[700px] w-full hidden lg:block">
              {/* Massive Image Showcase */}
              <div className="absolute inset-0 bg-[#1A1A1A] rounded-sm overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                 <Image 
                   src="/images/hero-ship.png" 
                   alt="NFC Global Logistics" 
                   fill 
                   className="object-cover opacity-80 mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-1000" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#1A1A1A] via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating Performance Metric */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 -left-20 bg-primary p-10 rounded-sm shadow-3xl z-20 text-white min-w-[300px]"
              >
                <div className="flex items-center gap-6 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <TrendingUp size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">Latency Score</p>
                        <p className="text-4xl font-black tracking-tighter">0.42ms</p>
                    </div>
                </div>
                <div className="h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "94%" }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-full bg-white" 
                    />
                </div>
              </motion.div>

              {/* Data Stream Overlay */}
              <div className="absolute top-10 -right-10 bg-white p-8 rounded-sm shadow-2xl border border-slate-100 z-20 flex flex-col gap-4 max-w-[200px]">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Live Stream Alpha</span>
                 </div>
                 <div className="space-y-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                animate={{ x: ["-100%", "100%"] }}
                                transition={{ duration: 2 + i, repeat: Infinity, ease: "linear" }}
                                className="w-1/2 h-full bg-slate-300" 
                            />
                        </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Showcase Section */}
      <section className="py-40 bg-[#1A1A1A] relative overflow-hidden text-white rounded-sm mx-4 lg:mx-6 mb-20 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 z-0">
            <Image 
                src="/images/tech-control.png" 
                alt="NFC Technology" 
                fill 
                className="object-cover grayscale"
            />
        </div>

        <div className="container mx-auto px-10 relative z-10">
           <div className="mb-24 max-w-3xl">
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter uppercase">
                 UNMATCHED <br/> <span className="text-primary italic">FINANCIAL LOGISTICS.</span>
              </h2>
              <p className="text-slate-400 text-xl font-bold uppercase tracking-tight leading-relaxed max-w-2xl">
                 Integrating directly with terminal scanners and automated transponders to ensure absolute transaction security and real-time transit verification.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:bg-white/10 transition-colors group">
                 <div className="relative w-full h-72 rounded-sm overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image src="/images/hero-warehouse.png" alt="Operational Excellence" fill className="object-cover" />
                 </div>
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-primary">01. Smart Operations</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-tight text-sm">Deep integration with global fulfillment centers provides centimeter-level precision for every high-value asset.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:bg-white/10 transition-colors group">
                 <div className="relative w-full h-72 rounded-sm overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image src="/images/tech-control.png" alt="Data Integrity" fill className="object-cover" />
                 </div>
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-primary">02. Verified Analytics</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-tight text-sm">Our machine learning models predict global delays 48 hours in advance using proprietary weather and traffic telemetry.</p>
              </div>

              <div className="bg-white/5 border border-white/10 p-10 rounded-sm hover:bg-white/10 transition-colors group">
                 <div className="relative w-full h-72 rounded-sm overflow-hidden mb-8 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image src="/images/delivery-van.png" alt="Last Mile Security" fill className="object-cover" />
                 </div>
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-primary">03. Last-Mile Perfection</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-tight text-sm">Real-time driver telemetry ensures institutional clients have full chain-of-custody visibility until the final handover.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 relative bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-8 uppercase tracking-tighter">
                THE CORE <span className="text-primary italic">ENGINE.</span>
            </h2>
            <p className="text-slate-500 text-xl font-bold uppercase tracking-tight leading-relaxed">
              Combining institutional expertise with cutting-edge telemetry to deliver a tracking
              experience that defines global banking standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "TOTAL SHIELD", desc: "Military-grade data protection for every high-value shipment record." },
              { icon: Layers, title: "API FIRST", desc: "Enterprise GraphQL architecture providing sub-millisecond responses." },
              { icon: Briefcase, title: "INSTITUTIONAL", desc: "Designed for massive throughput and rigorous financial SLAs." },
              { icon: CheckCircle2, title: "SMART AUDIT", desc: "Automated verification of carrier data for 100% audit accuracy." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 hover:bg-[#1A1A1A] p-12 rounded-sm border border-slate-100 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-sm bg-white flex items-center justify-center text-primary mb-10 border border-slate-100 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <item.icon size={32} />
                </div>
                <h3 className="text-xs font-black text-[#1A1A1A] mb-4 group-hover:text-white transition-colors uppercase tracking-[0.2em]">{item.title}</h3>
                <p className="text-slate-500 font-bold text-sm leading-relaxed group-hover:text-slate-400 transition-colors uppercase tracking-tight">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review & Testimonials Section */}
      <section className="bg-white py-32 overflow-hidden relative">
        <div className="container mx-auto px-10 relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-8 tracking-tighter uppercase">INSTITUTIONAL <span className="text-primary italic">TRUST.</span></h2>
              <div className="flex justify-center gap-1 mb-8 text-primary">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={24} fill="currentColor" />)}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Robert Chen",
                role: "Director of Logistics",
                company: "Global Port Solutions",
                image: "/testimonial_3.png",
                quote: "The NFC tracking infrastructure has defined a new standard for our international freight operations. Precision is absolute."
              },
              {
                name: "Sarah Jenkins",
                role: "Operations Manager",
                company: "Swift delivery Inc.",
                image: "/testimonial_2.png",
                quote: "A professional interface with real-time telemetry that actually delivers. This is the nervous system of our supply chain."
              },
              {
                name: "Michael Torres",
                role: "Supply Chain Lead",
                company: "Apex Manufacturing",
                image: "/testimonial_1.png",
                quote: "Security and stability were paramount. National Financial Credit delivered beyond our expectations on both fronts."
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 p-12 rounded-sm border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="mb-8 flex text-primary">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="text-[#1A1A1A] font-bold leading-relaxed text-lg mb-10 uppercase tracking-tight italic">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-6 pt-10 border-t border-slate-200">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-slate-200 grayscale">
                    {t.image ? (
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    ) : (
                      <span className="text-xl font-black text-primary">{t.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-[#1A1A1A] text-xs uppercase tracking-widest">{t.name}</h4>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-32 bg-slate-50">
         <div className="container mx-auto px-4">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                 <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter uppercase">OPERATIONS <span className="text-primary italic">IN ACTION.</span></h2>
                 <p className="text-slate-500 font-bold max-w-sm mt-4 md:mt-0 text-right uppercase tracking-tight">Inside the infrastructure powering the National Financial Credit gateway.</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[300px]">
                 <div className="col-span-2 row-span-2 relative rounded-sm overflow-hidden group">
                     <Image src="/images/hero-ship.png" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Gallery 1" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/40 cursor-pointer hover:bg-primary hover:border-primary transition-colors">
                             <Camera size={32} />
                         </div>
                     </div>
                 </div>
                 <div className="relative rounded-sm overflow-hidden group">
                     <Image src="/images/hero-warehouse.png" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Gallery 2" />
                 </div>
                 <div className="relative rounded-sm overflow-hidden group">
                     <Image src="/images/delivery-van.png" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Gallery 3" />
                 </div>
                 <div className="col-span-2 relative rounded-sm overflow-hidden group bg-[#1A1A1A] flex items-center justify-center text-white">
                     <div className="text-center p-12 absolute inset-0 flex flex-col justify-center items-center z-10 bg-black/60 group-hover:bg-black/40 transition-colors">
                         <Play size={48} className="mb-6 text-primary group-hover:scale-110 transition-transform cursor-pointer" />
                         <span className="font-black text-xs uppercase tracking-[0.3em]">SECURE FACILITY TOUR</span>
                     </div>
                     <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                         <Image src="/images/hero-tech.png" fill className="object-cover grayscale" alt="Video cover" />
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* World Map / Global Reach Section */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24">
            <h2 className="text-6xl md:text-8xl font-black text-[#1A1A1A] mb-8 tracking-tighter uppercase leading-[0.9]">
              A NERVOUS SYSTEM FOR <br />
              <span className="text-primary italic">FINANCIAL LOGISTICS.</span>
            </h2>
            <p className="text-xl text-slate-500 font-bold uppercase tracking-tight leading-relaxed">
              Our infrastructure spans every continent, connecting terminal management systems and 
              high-security transponders into a single, cohesive source of truth.
            </p>
          </div>

          <div className="relative aspect-square md:aspect-[21/9] w-full max-w-7xl mx-auto overflow-hidden bg-[#1A1A1A] rounded-sm shadow-3xl">
            {/* User-Provided World Map Image */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="/world-map.jpeg" 
                 alt="World Map" 
                 className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale contrast-125"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-90" />
            </div>

            {/* Glowing Technical Hubs */}
            {[
              { top: "32%", left: "45%", city: "Berlin", country: "Germany" },
              { top: "42%", left: "46%", city: "Munich", country: "Germany" },
              { top: "25%", left: "43%", city: "Hamburg", country: "Germany" },
              { top: "35%", left: "40%", city: "Frankfurt", country: "Germany" },
              { top: "38%", left: "38%", city: "Cologne", country: "Germany" },
              { top: "45%", left: "42%", city: "Stuttgart", country: "Germany" },
              { top: "40%", left: "35%", city: "Dusseldorf", country: "Germany" },
              { top: "31%", left: "47%", city: "Leipzig", country: "Germany" },
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="absolute w-4 h-4 z-20 group cursor-pointer"
                style={{ top: node.top, left: node.left }}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                <div className="absolute inset-0 rounded-full bg-primary border-2 border-white shadow-lg" />
                
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-[#1A1A1A] px-5 py-2.5 rounded-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none scale-0 group-hover:scale-100 origin-bottom border border-slate-100">
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-1">{node.country}</p>
                   <p className="text-xs font-black uppercase tracking-widest">{node.city}</p>
                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-slate-100" />
                </div>
              </motion.div>
            ))}

            {/* Global Connectivity Paths (Curved Lines) */}
            <svg viewBox="0 0 1000 428" className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
               {[
                 { d: "M 150 160 Q 300 80 480 135", delay: 0 },
                 { d: "M 480 135 Q 600 145 750 175", delay: 2 },
                 { d: "M 480 135 Q 500 200 500 360", delay: 4 },
                 { d: "M 280 340 Q 400 350 480 280", delay: 1 },
                 { d: "M 750 175 Q 800 240 800 390", delay: 3 },
               ].map((path, i) => (
                 <g key={i}>
                   <path 
                     d={path.d}
                     stroke="rgba(227, 6, 19, 0.1)"
                     strokeWidth="1"
                     fill="none"
                   />
                   <motion.path 
                     d={path.d}
                     stroke={`#E30613`}
                     strokeWidth="2"
                     fill="none"
                     strokeDasharray="0 500"
                     initial={{ strokeDasharray: "0 500" }}
                     whileInView={{ strokeDasharray: "150 500" }}
                     transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: path.delay }}
                   />
                 </g>
               ))}
            </svg>

            {/* Sophisticated Live Logistics Monitor Hub */}
            <div className="absolute top-8 right-8 z-30 flex flex-col gap-4">
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-[#1A1A1A]/80 backdrop-blur-2xl border border-white/10 p-8 rounded-sm shadow-3xl min-w-[320px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(227,6,19,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">SECURE UPLINK: VERIFIED</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary">INSTITUTIONAL GRADE</span>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase text-white/40 mb-2 tracking-widest">ACTIVE PORTALS</p>
                      <h4 className="text-3xl font-black text-white tracking-tighter">4,812</h4>
                    </div>
                    <div className="flex gap-1.5 h-10 items-end pb-1">
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: [`${h}%`, `${h+10}%`, `${h}%`] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1 bg-primary rounded-sm opacity-80"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-white/60">GATEWAY STREAM</span>
                      <span className="text-primary">84.2 GB/S</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         animate={{ x: ["-100%", "100%"] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent" 
                       />
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-end">
                <div className="bg-primary px-8 py-3 rounded-sm text-[10px] font-black uppercase tracking-widest text-white shadow-2xl shadow-primary/30 flex items-center gap-3 border border-white/10">
                   <Activity size={14} />
                   Live Telemetry Stream
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24">
             {[
               { label: "Active Nodes", val: "1,240+" },
               { label: "Transit Hubs", val: "48" },
               { label: "Data Centers", val: "12" },
               { label: "Integrated Ports", val: "650+" }
             ].map((stat, i) => (
               <div key={i} className="text-center border-l-2 border-slate-100 pl-8 first:border-0 first:pl-0">
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                 <p className="text-4xl font-black text-[#1A1A1A] tracking-tighter">{stat.val}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black text-[#1A1A1A] mb-8 leading-tight tracking-tighter uppercase">
                FREQUENTLY ASKED <br />
                <span className="text-primary italic">QUESTIONS.</span>
              </h2>
              <p className="text-slate-500 text-xl font-bold mb-12 leading-relaxed uppercase tracking-tight">
                Institutional guidance on security protocols, telemetry integration, and high-value transit insurance.
              </p>
              <div className="p-10 bg-white border border-slate-100 rounded-sm shadow-sm">
                <p className="font-black text-[#1A1A1A] mb-4 text-xl uppercase tracking-widest">READY TO ONBOARD?</p>
                <p className="text-slate-500 font-bold mb-10 text-sm uppercase tracking-tight">Our technical engineering team is standing by to integrate your fleet into the NFC gateway.</p>
                <Link href="/contact" className="inline-flex items-center gap-4 bg-[#1A1A1A] text-white px-10 py-5 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-xl">
                  Contact Support <MoveRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <FAQItem
                question="HOW ACCURATE IS THE REAL-TIME TELEMETRY?"
                answer="Our gateway syncs directly with terminal management systems (TMS) and high-frequency GPS transponders. Institutional clients can expect sub-second latency for all status changes."
              />
              <FAQItem
                 question="DOES THE GATEWAY SUPPORT MULTI-MODAL TRANSITS?"
                 answer="Yes. The NFC infrastructure supports air, sea, rail, and road freight. Protocol switching is automated at every terminal handover point."
               />
               <FAQItem
                 question="WHAT ARE THE SECURITY PROTOCOLS FOR DATA INTEGRITY?"
                 answer="All transit data is encrypted using military-grade AES-256 standards with multi-factor authentication required for all portal access points."
               />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
