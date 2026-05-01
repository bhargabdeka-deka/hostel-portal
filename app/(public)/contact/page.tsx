import type { Metadata } from "next";
import { MapPin, Mail, Phone, Clock, User, Shield, Info, Instagram } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Contact Us | ORION Hostel, Jorhat Engineering College",
  description:
    "Get in touch with ORION Hostel administration — Hostel No 7, Jorhat Engineering College, Assam. Contact the Superintendent, Warden, and current monitors. Find our location, phone numbers, and social links.",
  alternates: {
    canonical: "https://www.orionjech7.site/contact",
  },
  openGraph: {
    title: "Contact ORION Hostel | JEC Hostel No 7",
    description:
      "Reach out to ORION Hostel administration for admissions, residency queries, or alumni registration. Hostel No 7, JEC Road, Jorhat, Assam 785007.",
    url: "https://www.orionjech7.site/contact",
  },
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: monitors } = await supabase
    .from('monitors')
    .select('*')
    .order('role', { ascending: true });

  const mainContacts = [
    { icon: <MapPin className="w-5 h-5" />, title: "Location", detail: "Hostel No 7, JEC Road, Jorhat, Assam 785007", color: "text-indigo-600", bgColor: "bg-indigo-50/50", borderColor: "border-indigo-100", link: "https://www.google.com/maps/search/?api=1&query=Hostel+No+7+Jorhat+Engineering+College" },
    { icon: <Instagram className="w-5 h-5" />, title: "Instagram", detail: "@orion_jec", color: "text-pink-600", bgColor: "bg-pink-50/50", borderColor: "border-pink-100", link: "https://www.instagram.com/orion_jec?igsh=azA3enkzZmZ3Y3Fu" },
  ];

  return (
    <main className="bg-transparent min-h-screen selection:bg-rose-500/20 overflow-x-hidden">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-12 md:pb-16 text-center space-y-6">
        <div className="flex items-center justify-center gap-6">
          <div className="h-px w-10 md:w-16 bg-[#C8A96B]/30"></div>
          <span className="text-[11px] md:text-[12px] font-bold text-[#C8A96B] uppercase tracking-[0.3em] font-jakarta">Contact Information</span>
          <div className="h-px w-10 md:w-16 bg-[#C8A96B]/30"></div>
        </div>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#0F172A] tracking-[-0.05em] leading-none font-jakarta">Connect.</h1>
        <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed px-4">
          Have questions about admission or residency? Our administration team and monitors are here to assist you.
        </p>
      </section>

      {/* Main Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {mainContacts.map((c, i) => {
            const Wrapper = c.link ? 'a' : 'div';
            return (
              <Wrapper 
                key={i} 
                href={c.link || undefined}
                target={c.link ? "_blank" : undefined}
                rel={c.link ? "noopener noreferrer" : undefined}
                className={cn(
                  `p-10 md:p-14 bg-white border border-slate-100 rounded-[3rem] shadow-2xl shadow-slate-200/40 hover:-translate-y-2 transition-all duration-500 text-center space-y-8 group block`,
                  c.link && "cursor-pointer active:scale-95"
                )}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-slate-50 flex items-center justify-center mx-auto text-[#0F172A] group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-sm border border-slate-100`}>
                  {c.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-jakarta">{c.title}</h3>
                  <p className="text-lg md:text-xl font-black text-[#0F172A] leading-tight tracking-tight font-jakarta">{c.detail}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Superintendent Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#0F172A] border border-[#0F172A] rounded-[3rem] md:rounded-[5rem] p-10 md:p-20 lg:p-32 relative overflow-hidden shadow-2xl shadow-indigo-900/30">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="inline-flex items-center px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase font-jakarta">
                Administrative Leadership
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1] font-jakarta">Office of the <br/><span className="text-[#C8A96B]">Superintendent</span></h2>
              <p className="text-white/60 font-medium leading-relaxed max-w-md mx-auto lg:mx-0 text-base md:text-lg">
                For official queries, admission approvals, and high-level administrative matters, please contact the Superintendent directly.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 min-w-0 md:min-w-[450px] shadow-2xl space-y-10">
                <div>
                  <div className="text-[10px] font-bold text-[#C8A96B] uppercase tracking-[0.2em] mb-4 font-jakarta">Current Superintendent</div>
                  <div className="text-3xl md:text-4xl font-black text-white tracking-tight font-jakarta">Mr. Jiten Borgohain</div>
                </div>
                <a 
                  href="tel:+919101481714" 
                  className="flex items-center justify-center gap-4 p-6 bg-[#C8A96B] text-[#0F172A] rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all active:scale-95 shadow-xl shadow-[#C8A96B]/10"
                >
                  <Phone className="w-5 h-5" />
                  +91 91014 81714
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white border border-slate-100 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 space-y-12 md:space-y-16 shadow-xl">
          <div className="text-center space-y-6">
            <div className="text-[10px] font-bold text-[#C8A96B] uppercase tracking-[0.4em] font-jakarta">Orion Leadership</div>
            <h2 className="text-3xl md:text-6xl font-black text-[#0F172A] tracking-tighter font-jakarta">Current Monitors</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {monitors && monitors.length > 0 ? (
              monitors.map((m, i) => {
                const colors = [
                  { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
                  { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                  { text: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
                  { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
                ];
                const color = colors[i % colors.length];

                return (
                  <div 
                    key={m.id} 
                    className="bg-white p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center gap-8"
                  >
                    <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-500 shadow-sm border border-slate-50">
                      <User className="w-10 h-10 text-[#0F172A]/20" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-[9px] font-bold text-[#C8A96B] tracking-[0.2em] font-jakarta uppercase">{m.role}</div>
                      <div className="text-2xl font-black text-[#0F172A] tracking-tight font-jakarta group-hover:text-[#C8A96B] transition-colors leading-tight">{m.name}</div>
                    </div>
                    
                    <div className="w-full pt-8 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest font-jakarta">
                        Room {m.room}
                      </div>
                      {m.phone && (
                        <a 
                          href={`tel:${m.phone}`}
                          className="flex items-center justify-center gap-3 text-[#0F172A] text-xs font-bold uppercase tracking-widest hover:text-[#C8A96B] transition-colors font-jakarta"
                        >
                          <Phone className="w-4 h-4" />
                          {m.phone}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center text-slate-500 italic font-medium">
                Leadership roles for the current semester are being finalized.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
