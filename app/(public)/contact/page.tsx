import { MapPin, Mail, Phone, Clock, User, Shield, Info, Instagram } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: monitors } = await supabase
    .from('monitors')
    .select('*')
    .order('role', { ascending: true });

  const mainContacts = [
    { icon: <MapPin className="w-5 h-5" />, title: "Location", detail: "Hostel No 7, JEC Road, Jorhat, Assam 785007", color: "text-blue-600", link: "https://www.google.com/maps/search/?api=1&query=Hostel+No+7+Jorhat+Engineering+College" },
    { icon: <Instagram className="w-5 h-5" />, title: "Instagram", detail: "@orion_jec", color: "text-pink-600", link: "https://www.instagram.com/orion_jec?igsh=azA3enkzZmZ3Y3Fu" },
  ];

  return (
    <main className="bg-transparent min-h-screen selection:bg-blue-500/20 overflow-x-hidden">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-16 text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-8 md:w-12 bg-white/10"></div>
          <span className="text-[8px] md:text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Get in Touch</span>
          <div className="h-px w-8 md:w-12 bg-white/10"></div>
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">Connect.</h1>
        <p className="text-base md:text-xl text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed px-4">
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
                  "p-8 md:p-10 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl hover:bg-slate-900 transition-all duration-500 text-center space-y-6 group block",
                  c.link && "cursor-pointer active:scale-95"
                )}
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform duration-500 shrink-0`}>
                  {c.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{c.title}</h3>
                  <p className="text-base md:text-lg font-black text-white leading-tight uppercase tracking-tight">{c.detail}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Superintendent Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[3rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-20 relative overflow-hidden text-white shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[8px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                Administrative Head
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">Office of the <br/>Superintendent</h2>
              <p className="text-slate-400 font-medium leading-relaxed max-w-md mx-auto lg:mx-0 text-sm md:text-base">
                For official queries, admission approvals, and high-level administrative matters, please contact the Superintendent directly.
              </p>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 min-w-0 md:min-w-[400px] hover:bg-white/10 transition-all duration-500">
                <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Current Superintendent</div>
                <div className="text-2xl md:text-3xl font-black mb-8 uppercase tracking-tight">Mr. Jiten Borgohain</div>
                <a 
                  href="tel:+919101481714" 
                  className="flex items-center justify-center gap-4 p-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95 shadow-2xl"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  +91 91014 81714
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitors Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 space-y-12 md:space-y-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase font-heading">Current Monitors</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {monitors && monitors.length > 0 ? (
              monitors.map((m, i) => {
                const colors = [
                  { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', glow: 'shadow-cyan-500/10' },
                  { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', glow: 'shadow-emerald-500/10' },
                  { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', glow: 'shadow-violet-500/10' },
                  { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', glow: 'shadow-amber-500/10' },
                ];
                const color = colors[i % colors.length];

                return (
                  <div 
                    key={m.id} 
                    className={`bg-slate-950 p-6 rounded-[2rem] border ${color.border} shadow-2xl hover:bg-white/[0.02] transition-all duration-500 group flex flex-col gap-4 animate-float ${color.glow}`}
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl ${color.bg} ${color.text} flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-500`}>
                        <User className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className={`text-[9px] font-black ${color.text} opacity-70 uppercase tracking-widest`}>{m.role}</div>
                        <div className="text-lg font-black text-white tracking-tight font-serif-premium group-hover:text-blue-400 transition-colors leading-tight">{m.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-center gap-2.5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <div className={`w-1.5 h-1.5 rounded-full ${color.bg.replace('/10', '')} shadow-[0_0_10px_currentColor]`}></div>
                        Room {m.room}
                      </div>
                      {m.phone && (
                        <a 
                          href={`tel:${m.phone}`}
                          className={`flex items-center justify-center gap-2.5 ${color.text} text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition-colors`}
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
