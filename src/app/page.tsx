import TrackingSearch from "@/components/TrackingSearch";
import { MoveRight, ShieldCheck, Globe, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:py-24">
        {/* Mobile Background Image - only visible on small screens */}
        <div className="absolute inset-0 z-0 lg:hidden opacity-20">
          <Image
            src="/hero.png"
            alt="Logistics Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary-dark px-4 py-2 rounded-full text-sm font-bold border border-primary/20">
                <ShieldCheck size={16} />
                <span>Certified Professional Logistics</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-900">
                Track your cargo <br />
                <span className="text-primary">with precision</span>
              </h1>
              <p className="text-xl text-slate-700 leading-relaxed max-w-xl font-medium">
                Real-time monitoring for global shipments. Trusted by thousands of logistics managers worldwide for accuracy and reliability.
              </p>

              <TrackingSearch />

              <div className="flex flex-wrap gap-8 pt-4 items-center text-slate-500">
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
            </div>

            <div className="hidden lg:block relative h-[600px] rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-8 border-white">
              <Image
                src="/hero.png"
                alt="Professional Logistics Center"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="text-xs font-bold text-white/70 mb-1 tracking-widest uppercase">Active Network</p>
                  <p className="text-2xl font-bold">24,500+ Shipments Monthly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 border-y border-border py-24">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Logistics Experts Choose TrackFlow</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Our platform provides the tools you need to manage complex supply chains with confidence.</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Real-time Tracking", desc: "Never lose sight of your packages with our GPS-integrated monitoring system." },
            { title: "Secure Data", desc: "Your shipping information is protected with enterprise-grade encryption." },
            { title: "Smart Analytics", desc: "Gain insights into your delivery performance with our built-in dashboards." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <MoveRight size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold italic">TF</div>
            <span className="font-bold">TrackFlow</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p className="text-slate-400 text-sm">© 2026 TrackFlow Next. Built for professionals.</p>
        </div>
      </footer>
    </main>
  );
}
