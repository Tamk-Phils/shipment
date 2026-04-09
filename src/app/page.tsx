"use client";

import { MoveRight, ShieldCheck, Globe, Zap, Star, ChevronDown, CheckCircle2, TrendingUp, Boxes, Briefcase, Camera, Play, Layers, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import TrackingSearch from "@/components/TrackingSearch";
import Logo from "@/components/Logo";

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
      <MorphingBlob className="w-[600px] h-[600px] -top-60 -left-60 bg-blue-500/30" />
      <MorphingBlob className="w-[500px] h-[500px] top-1/4 -right-40 bg-indigo-500/20" delay={2} />
      <MorphingBlob className="w-[800px] h-[800px] bottom-1/4 left-1/4 bg-purple-500/10" delay={5} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-700 px-4 py-2 rounded-full text-sm font-bold border border-blue-600/20 backdrop-blur-md">
                <ShieldCheck size={16} />
                <span>Certified Global Logistics Intelligence</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tighter text-slate-900">
                Data-driven <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Freights</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                The nervous system of global trade. We process millions of shipping events daily to bring you absolute visibility from port to porch.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/tracking" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-primary-dark transition-all shadow-2xl shadow-primary/30 group">
                  Track Your Shipment <MoveRight size={22} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/about" className="inline-flex items-center gap-3 bg-white text-slate-900 px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-slate-50 transition-all border border-slate-200 shadow-xl">
                  Our Solutions
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 pt-4 items-center text-slate-700">
                <div className="flex items-center gap-2 font-bold bg-white/60 px-4 py-2 rounded-xl backdrop-blur-md border border-white/50 shadow-sm">
                  <Globe size={20} className="text-blue-600" />
                  180+ Countries
                </div>
                <div className="flex items-center gap-2 font-bold bg-white/60 px-4 py-2 rounded-xl backdrop-blur-md border border-white/50 shadow-sm">
                  <Zap size={20} className="text-indigo-600" />
                  Sub-second Latency
                </div>
              </div>
            </motion.div>

            <div className="relative h-[600px] w-full hidden lg:block">
              {/* Main Image Grid */}
              <div className="grid grid-cols-2 gap-6 h-full p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative h-[350px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50"
                >
                  <Image src="/images/hero-ship.png" alt="Maritime Logistics" fill className="object-cover hover:scale-110 transition-transform duration-1000" />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="relative h-[250px] mt-24 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50"
                >
                  <Image src="/images/hero-plane.png" alt="Air Freight" fill className="object-cover hover:scale-110 transition-transform duration-1000" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="relative h-[250px] -mt-12 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50"
                >
                  <Image src="/images/hero-warehouse.png" alt="Smart Warehousing" fill className="object-cover hover:scale-110 transition-transform duration-1000" />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="relative h-[300px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/50"
                >
                  <Image src="/images/hero-tech.png" alt="Logistics Tech" fill className="object-cover hover:scale-110 transition-transform duration-1000" />
                </motion.div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-4 bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/40 z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Growth</p>
                    <p className="text-xl font-black text-slate-900">+42% Efficient</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 -left-10 bg-slate-900 p-6 rounded-3xl shadow-2xl border border-white/10 z-20 flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <CheckCircle2 size={24} />
                </div>
                <div className="text-white">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Status</p>
                    <p className="text-xl font-black">All Systems Optimal</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Showcase Section */}
      <section className="py-32 bg-slate-900 relative overflow-hidden text-white rounded-[60px] mx-4 lg:mx-10 mb-20 shadow-2xl shadow-blue-900/20">
        <MorphingBlob className="w-[800px] h-[800px] top-0 left-0 bg-blue-500/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 z-0 mask-image:linear-gradient(to_left,black,transparent)">
            <Image 
                src="/images/tech-control.png" 
                alt="Technology Network" 
                fill 
                className="object-cover"
            />
        </div>

        <div className="container mx-auto px-10 relative z-10">
           <div className="mb-20 max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                 Unmatched global <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">infrastructure.</span>
              </h2>
              <p className="text-slate-400 text-xl font-medium leading-relaxed">
                 NexusTrack doesn&apos;t just read APIs. We integrate at the hardware level with terminal scanners, ship transponders, and automated warehouse robotics.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-colors">
                 <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-8 border-4 border-white/10">
                    <Image src="/images/hero-warehouse.png" alt="Warehouse Operation" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                 </div>
                 <h3 className="text-2xl font-bold mb-3">Smart Warehousing</h3>
                 <p className="text-slate-400 font-medium">Deep integration with automated fulfillment centers provides precision location data within centimeters.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-colors">
                 <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-8 border-4 border-white/10">
                    <Image src="/images/tech-control.png" alt="Data Analytics" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                 </div>
                 <h3 className="text-2xl font-bold mb-3">Predictive AI Analytics</h3>
                 <p className="text-slate-400 font-medium">Our machine learning models predict delays 48 hours before they happen using weather and traffic patterns.</p>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] hover:bg-white/10 transition-colors">
                 <div className="relative w-full h-64 rounded-3xl overflow-hidden mb-8 border-4 border-white/10">
                    <Image src="/images/delivery-van.png" alt="Last Mile Delivery" fill className="object-cover hover:scale-110 transition-transform duration-700" />
                 </div>
                 <h3 className="text-2xl font-bold mb-3">Last-Mile Perfection</h3>
                 <p className="text-slate-400 font-medium">Real-time driver telemetry ensures the end customer knows exactly when the package will hit their porch.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 font-primary tracking-tighter">
                The Core Engine
            </h2>
            <p className="text-slate-500 text-xl font-bold leading-relaxed">
              We combine cutting-edge technology with decade-long expertise to deliver a tracking
              experience that&apos;s as reliable as it is precise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Total Shield", desc: "Military-grade data protection for every shipment record." },
              { icon: Layers, title: "API First", desc: "GraphQL architecture meaning instantaneous responses." },
              { icon: Briefcase, title: "B2B Ready", desc: "Designed for massive throughput and high SLAs." },
              { icon: CheckCircle2, title: "Smart Audit", desc: "Automated verify of carrier data for 100% accuracy." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white hover:bg-blue-600 hover:-translate-y-2 p-10 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100 transition-all duration-500 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-600 mb-8 border border-slate-100 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed group-hover:text-blue-100 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review & Testimonials Section */}
      <section className="bg-slate-900 py-32 overflow-hidden relative mx-4 lg:mx-10 rounded-[60px] mb-20 shadow-2xl shadow-indigo-900/20">
        <MorphingBlob className="w-96 h-96 -bottom-20 -right-20 bg-indigo-500/30" />
        
        <div className="container mx-auto px-10 relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tighter">Industry Leaders Trust Us</h2>
              <div className="flex justify-center gap-1 mb-6 text-yellow-400">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={28} fill="currentColor" />)}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Robert Chen",
                role: "Director of Logistics",
                company: "Global Port Solutions",
                image: "/testimonial_3.png",
                quote: "NexusTrack has completely transformed how we handle international freight. The precision is unmatched."
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
                quote: "Security and stability were our top priorities. NexusTrack delivered on both fronts beyond our expectations."
              }
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[40px] shadow-2xl hover:scale-105 transition-transform duration-500"
              >
                <div className="mb-6 flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed text-lg mb-8">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-5 pt-8 border-t border-slate-100">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-slate-100 flex items-center justify-center bg-slate-100">
                    {t.image ? (
                      <Image src={t.image} alt={t.name} fill className="object-cover" />
                    ) : (
                      <span className="text-xl font-bold text-blue-600">{t.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-lg">{t.name}</h4>
                    <p className="text-slate-500 text-sm font-medium">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-20 bg-slate-50">
         <div className="container mx-auto px-4">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                 <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tighter">Global Operations in Action</h2>
                 <p className="text-slate-500 font-bold max-w-sm mt-4 md:mt-0 text-right">Inside the massive infrastructure powering NexusTrack.</p>
             </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 auto-rows-[250px]">
                 <div className="col-span-2 row-span-2 relative rounded-[40px] overflow-hidden group">
                     <Image src="/images/hero-ship.png" fill className="object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="Gallery 1" />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border-2 border-white/40 cursor-pointer hover:bg-white hover:text-slate-900 transition-colors">
                             <Camera size={32} />
                         </div>
                     </div>
                 </div>
                 <div className="relative rounded-[32px] overflow-hidden group">
                     <Image src="/images/hero-warehouse.png" fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Gallery 2" />
                 </div>
                 <div className="relative rounded-[32px] overflow-hidden group">
                     <Image src="/images/delivery-van.png" fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Gallery 3" />
                 </div>
                 <div className="col-span-2 relative rounded-[32px] overflow-hidden group bg-blue-600 flex items-center justify-center text-white">
                     <div className="text-center p-8 absolute inset-0 flex flex-col justify-center items-center z-10">
                         <Play size={48} className="mb-4 opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
                         <span className="font-extrabold text-xl">Watch Facility Tour</span>
                     </div>
                     <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity mix-blend-overlay">
                         <Image src="/images/hero-tech.png" fill className="object-cover" alt="Video cover" />
                     </div>
                 </div>
             </div>
         </div>
      </section>

      {/* World Map / Global Reach Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tighter">
              A Nervous System for <br />
              <span className="text-primary">Global Trade</span>
            </h2>
            <p className="text-xl text-slate-500 font-bold leading-relaxed">
              Our infrastructure spans every continent, connecting terminal management systems and 
              vessel transponders into a single, cohesive source of truth.
            </p>
          </div>

          <div className="relative aspect-[21/9] w-full max-w-7xl mx-auto overflow-hidden bg-slate-900 rounded-[40px] border border-white/5 shadow-2xl">
            {/* User-Provided World Map Image */}
            <div className="absolute inset-0 z-0">
               <img 
                 src="/world-map.jpeg" 
                 alt="World Map" 
                 className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale contrast-125"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900 opacity-80" />
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
                
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 px-4 py-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none scale-0 group-hover:scale-100 origin-bottom border border-slate-100">
                   <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{node.country}</p>
                   <p className="text-sm font-black">{node.city}</p>
                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-slate-100" />
                </div>
              </motion.div>
            ))}

            {/* Global Connectivity Paths (Curved Lines) */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none overflow-visible">
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
                     stroke="rgba(59, 130, 246, 0.1)"
                     strokeWidth="1"
                     fill="none"
                   />
                   <motion.path 
                     d={path.d}
                     stroke={`#3b82f6`}
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
                className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 rounded-[32px] shadow-2xl min-w-[300px]"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Secure Uplink: Active</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">0.42ms Latency</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-black uppercase text-white/40 mb-1">Active Global Routes</p>
                      <h4 className="text-2xl font-black text-white">4,812</h4>
                    </div>
                    <div className="flex gap-1 h-8 items-end pb-1">
                      {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                        <motion.div 
                          key={i}
                          animate={{ height: [`${h}%`, `${h+10}%`, `${h}%`] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                          className="w-1 bg-primary rounded-full opacity-60"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-white/60">Data Stream Alpha</span>
                      <span className="text-emerald-400">84.2 GB/s</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         animate={{ x: ["-100%", "100%"] }}
                         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                         className="w-1/3 h-full bg-gradient-to-r from-transparent via-primary to-transparent" 
                       />
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="text-white/60">Neural Engine Load</span>
                      <span className="text-indigo-400">12%</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-end">
                <div className="bg-primary px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 flex items-center gap-2 border border-white/10">
                   <Activity size={12} />
                   Live Telemetry Overlay
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
             {[
               { label: "Active Nodes", val: "1,240+" },
               { label: "Transit Hubs", val: "48" },
               { label: "Data Centers", val: "12" },
               { label: "Ports Integrated", val: "650+" }
             ].map((stat, i) => (
               <div key={i} className="text-center">
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-3xl font-black text-slate-900">{stat.val}</p>
               </div>
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
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tighter">
                Frequently Asked <br />
                <span className="text-blue-600">Questions</span>
              </h2>
              <p className="text-slate-500 text-xl font-medium mb-10 leading-relaxed">
                Everything you need to know about our tracking system, security protocols, and integration options.
              </p>
              <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                <p className="font-extrabold text-slate-900 mb-2 text-xl">Ready to deploy?</p>
                <p className="text-slate-500 font-medium mb-8 text-lg">Our engineering team is ready to onboard your fleet.</p>
                <Link href="/contact" className="inline-flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-xl">
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
                 answer="Yes. NexusTrack supports air, sea, rail, and road freight. We automatically switch tracking protocols based on the current leg of the journey to ensure uninterrupted visibility."
               />
               <FAQItem
                 question="How do I integrate this into our existing ERP?"
                 answer="We offer a robust GraphQL API and pre-built connectors for major ERPs like SAP, Oracle, and Microsoft Dynamics. Integration typically takes less than 48 hours."
               />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
