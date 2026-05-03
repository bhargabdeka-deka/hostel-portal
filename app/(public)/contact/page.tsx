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
    { 
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.624 1.435h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ), 
      title: "WHATSAPP CHANNEL", 
      detail: "Join Orion Updates", 
      color: "text-[#25D366]", 
      bgColor: "bg-emerald-50", 
      borderColor: "border-emerald-100", 
      link: "https://whatsapp.com/channel/0029VbBol5G4CrfkSWzytN05" 
    },
  ];


  return (
    <main className="bg-transparent min-h-screen selection:bg-rose-500/20 overflow-x-hidden">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-12 md:pb-16 text-center space-y-12">
        <div className="flex items-center justify-center gap-6">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-indigo-600 text-[10px] md:text-[11px] font-black tracking-[0.15em] uppercase font-jakarta">
            Contact Information
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-[#0F172A] tracking-[-0.06em] leading-[1.1] sm:leading-[0.95] font-jakarta">Connect</h1>
        <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed px-4">
          Have questions about admission or residency? Our administration team and monitors are here to assist you.
        </p>
      </section>

      {/* Main Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
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
                  c.link && "cursor-pointer active:scale-95",
                  c.title === "WHATSAPP CHANNEL" && "hover:shadow-emerald-200/50"
                )}
              >
                <div className={cn(
                  "w-16 h-16 md:w-20 md:h-20 rounded-[2rem] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shrink-0 shadow-sm border border-slate-100",
                  c.title === "Location" ? "bg-red-50" : c.title === "Instagram" ? "bg-rose-50" : "bg-emerald-50"
                )}>
                  {c.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.12em] font-jakarta">{c.title}</h3>
                  <p className="text-lg md:text-xl font-black text-[#0F172A] leading-tight tracking-tight font-jakarta">{c.detail}</p>
                  
                  {c.title === "WHATSAPP CHANNEL" && (
                    <div className="pt-2">
                      <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#25D366] text-white text-[10px] font-black uppercase tracking-widest group-hover:bg-[#20bd5a] transition-all duration-300 shadow-lg shadow-emerald-200/50 group-hover:scale-105 active:scale-95">
                        Join Now
                      </div>
                    </div>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="bg-[#0F172A] border border-slate-800 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-16 lg:p-20 relative overflow-hidden shadow-xl">
          {/* Subtle Institutional Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
            <div className="flex-1 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-400 text-[9px] sm:text-[10px] font-bold tracking-[0.1em] sm:tracking-[0.15em] uppercase font-jakarta">
                Administration
              </div>
              <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2] sm:leading-tight font-jakarta">
                Office of the <br className="hidden sm:block" /><span className="text-indigo-400">Superintendent</span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed max-w-md mx-auto lg:mx-0 text-sm sm:text-base md:text-lg opacity-80">
                Official queries regarding admissions, hostel residency, and administrative matters should be directed to the Superintendent's office.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="bg-slate-900/40 border border-slate-800 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-12 min-w-0 md:min-w-[450px] shadow-lg space-y-8 sm:space-y-10">
                <div className="space-y-2 sm:space-y-3">
                  <div className="text-[9px] sm:text-[10px] font-bold text-indigo-400 uppercase tracking-[0.1em] sm:tracking-[0.12em] font-jakarta">Current Superintendent</div>
                  <div className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-jakarta leading-tight">Mr. Jiten Borgohain</div>
                </div>
                
                <div className="h-px w-full bg-slate-800/50" />
                
                <a 
                  href="tel:+919101481714" 
                  className="flex items-center justify-center gap-3 sm:gap-4 py-4 sm:py-5 px-4 sm:px-8 bg-indigo-600 text-white rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.12em] hover:bg-indigo-700 transition-colors active:scale-95 shadow-lg shadow-indigo-900/20 w-full whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">+91 91014 81714</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white border border-slate-100 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 space-y-12 md:space-y-16 shadow-xl">
          <div className="text-center space-y-6">
            <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.15em] font-jakarta">Orion Leadership</div>
            <h2 className="text-3xl sm:text-5xl lg:text-8xl font-black text-[#0F172A] tracking-[-0.06em] leading-[1.1] sm:leading-[0.95] font-jakarta">Current Monitors</h2>
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
                      <div className={cn("text-[12px] font-black tracking-[0.1em] font-jakarta uppercase", color.text)}>
                        {m.role}
                      </div>
                      <div className="text-2xl font-black text-[#0F172A] tracking-tighter font-jakarta group-hover:text-[#C8A96B] transition-colors leading-tight">
                        {m.name}
                      </div>
                    </div>
                    
                    <div className="w-full pt-8 border-t border-slate-100 space-y-4">
                      <div className="flex items-center justify-center gap-3 text-slate-600 text-[11px] font-black uppercase tracking-[0.12em] font-jakarta">
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
              <div className="col-span-full py-12 text-center text-slate-500 font-medium">
                Leadership roles for the current semester are being finalized.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
