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
    { 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" fill="#EA4335"/>
          <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" fill="#34A853"/>
          <path d="M12 22C12 22 5 14.25 5 9C5 8.75 5.01 8.5 5.03 8.25L12 16L18.97 8.25C18.99 8.5 19 8.75 19 9C19 14.25 12 22 12 22Z" fill="#FBBC05"/>
          <path d="M12 2C15.87 2 19 5.13 19 9C19 9.25 18.99 9.5 18.97 9.75L12 2L5.03 9.75C5.01 9.5 5 9.25 5 9C5 5.13 8.13 2 12 2Z" fill="#4285F4"/>
        </svg>
      ), 
      title: "Location", 
      detail: "Hostel No 7, JEC Road, Jorhat, Assam 785007", 
      color: "text-[#EA4335]", 
      bgColor: "bg-red-50/50", 
      borderColor: "border-red-100", 
      link: "https://www.google.com/maps/search/?api=1&query=Hostel+No+7+Jorhat+Engineering+College" 
    },
    { 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="instaGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#instaGradient)"/>
        </svg>
      ), 
      title: "Instagram", 
      detail: "@orion_jec", 
      color: "text-[#E4405F]", 
      bgColor: "bg-rose-50/50", 
      borderColor: "border-rose-100", 
      link: "https://www.instagram.com/orion_jec?igsh=azA3enkzZmZ3Y3Fu" 
    },
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
                <div className={cn(
                  "w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-sm border border-slate-100",
                  i === 0 ? "bg-red-50" : "bg-rose-50"
                )}>
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
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-[#0F172A] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-12 md:p-24 lg:p-28 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(15,23,42,0.4)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="flex-1 space-y-12 text-center lg:text-left">
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/40 text-[10px] font-black tracking-[0.4em] uppercase font-jakarta">
                Administrative Leadership
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-[-0.04em] leading-[1.05] font-jakarta">
                Office of the <br/><span className="text-[#C8A96B] font-black italic">Superintendent</span>
              </h2>
              <p className="text-white/50 font-medium leading-relaxed max-w-md mx-auto lg:mx-0 text-base md:text-lg font-sans">
                For official queries, admission approvals, and high-level administrative matters, please contact the Superintendent directly.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="bg-[#1E293B]/30 border border-white/5 rounded-[2.5rem] p-10 md:p-14 min-w-0 md:min-w-[480px] shadow-inner space-y-12">
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-[#C8A96B] uppercase tracking-[0.3em] font-jakarta opacity-60">Current Superintendent</div>
                  <div className="text-3xl md:text-5xl font-black text-white tracking-tighter font-jakarta">Mr. Jiten Borgohain</div>
                </div>
                <a 
                  href="tel:+919101481714" 
                  className="flex items-center justify-center gap-5 py-6 px-8 bg-[#C8A96B] text-[#0F172A] rounded-xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white transition-colors active:scale-95 shadow-[0_20px_40px_-10px_rgba(200,169,107,0.3)]"
                >
                  <Phone className="w-4 h-4 fill-current" />
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
                    className="bg-slate-50/50 p-8 md:p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:bg-white hover:shadow-2xl hover:shadow-slate-300/40 hover:-translate-y-2 transition-all duration-500 group flex flex-col items-center text-center gap-8"
                  >
                    <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-500 shadow-sm border border-slate-50">
                      <User className="w-10 h-10 text-[#0F172A]/20" />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-[12px] font-black text-[#C8A96B] tracking-[0.2em] font-jakarta uppercase">
                        {m.role}
                      </div>
                      <div className="text-2xl font-black text-[#0F172A] tracking-tighter font-jakarta group-hover:text-[#C8A96B] transition-colors leading-tight">
                        {m.name}
                      </div>
                    </div>
                    
                    <div className="w-full pt-8 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-center gap-3 text-slate-600 text-[11px] font-black uppercase tracking-[0.3em] font-jakarta">
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
