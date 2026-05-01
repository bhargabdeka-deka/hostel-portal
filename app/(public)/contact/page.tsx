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
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-8 md:w-12 bg-indigo-200"></div>
          <span className="text-[11px] md:text-[13px] font-bold text-indigo-600 tracking-tight font-sans">Contact information</span>
          <div className="h-px w-8 md:w-12 bg-indigo-200"></div>
        </div>
        <h1 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight leading-none font-jakarta">Connect.</h1>
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
                  `p-8 md:p-10 ${c.bgColor} border ${c.borderColor} rounded-[2.5rem] shadow-lg hover:border-indigo-100 transition-all duration-300 text-center space-y-6 group block`,
                  c.link && "cursor-pointer active:scale-95 shadow-slate-200/50"
                )}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white flex items-center justify-center mx-auto ${c.color} group-hover:scale-105 transition-transform duration-300 shrink-0 shadow-sm`}>
                  {c.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-[11px] font-bold text-indigo-600 tracking-tight font-sans">{c.title}</h3>
                  <p className="text-base md:text-lg font-bold text-slate-900 leading-tight tracking-tight font-sans">{c.detail}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Superintendent Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-20 relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-600 text-[11px] font-bold tracking-tight font-sans">
                Administrative leadership
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight font-jakarta">Office of the <br/>Superintendent</h2>
              <p className="text-slate-600 font-medium leading-relaxed max-w-md mx-auto lg:mx-0 text-sm md:text-base">
                For official queries, admission approvals, and high-level administrative matters, please contact the Superintendent directly.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 min-w-0 md:min-w-[400px] shadow-lg shadow-indigo-200/20">
                <div className="text-[11px] font-bold text-indigo-600 tracking-tight mb-4 font-sans">Current superintendent</div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight font-sans">Mr. Jiten Borgohain</div>
                <a 
                  href="tel:+919101481714" 
                  className="flex items-center justify-center gap-4 p-5 bg-indigo-600 text-white rounded-2xl font-bold text-xs tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  +91 91014 81714
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitors Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white border border-slate-100 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 space-y-12 md:space-y-16 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tighter font-jakarta">Current monitors</h2>
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
                    className={`${color.bg} p-6 md:p-8 rounded-[2.5rem] border ${color.border} shadow-md hover:border-blue-200 transition-all duration-300 group flex flex-col items-center text-center gap-6`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                      <User className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className={`text-[11px] font-bold ${color.text} tracking-tight font-sans uppercase`}>{m.role}</div>
                      <div className="text-xl font-bold text-slate-900 tracking-tight font-sans group-hover:text-indigo-600 transition-colors leading-tight">{m.name}</div>
                    </div>
                    
                    <div className="w-full pt-6 border-t border-black/5 space-y-3">
                      <div className="flex items-center justify-center gap-2 text-indigo-600 text-[11px] font-bold tracking-tight font-sans">
                        Room {m.room}
                      </div>
                      {m.phone && (
                        <a 
                          href={`tel:${m.phone}`}
                          className={`flex items-center justify-center gap-2.5 ${color.text} text-[11px] font-bold uppercase tracking-tight hover:opacity-80 transition-colors font-sans`}
                        >
                          <Phone className="w-3.5 h-3.5" />
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
