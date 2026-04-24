import { MapPin, Mail, Phone, Clock, User, Shield, Info } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: monitors } = await supabase
    .from('monitors')
    .select('*')
    .order('role', { ascending: true });

  const mainContacts = [
    { icon: <MapPin className="w-5 h-5" />, title: "Location", detail: "Hostel No 7, JEC Road, Jorhat, Assam 785007", color: "text-blue-600" },
    { icon: <Mail className="w-5 h-5" />, title: "Official Email", detail: "info@orionhostel.jec.ac.in", color: "text-green-600" },
  ];

  return (
    <main className="bg-background min-h-screen selection:bg-blue-500/20 overflow-x-hidden">
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
          {mainContacts.map((c, i) => (
            <div key={i} className="p-8 md:p-10 bg-white/5 border border-white/5 rounded-[2.5rem] shadow-2xl hover:bg-white/10 transition-all duration-500 text-center space-y-6 group">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto text-blue-400 group-hover:scale-110 transition-transform duration-500 shrink-0`}>
                {c.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{c.title}</h3>
                <p className="text-base md:text-lg font-black text-white leading-tight uppercase tracking-tight">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Superintendent Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-[#020617] border border-white/5 rounded-[3rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-20 relative overflow-hidden text-white shadow-2xl">
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
        <div className="bg-white/5 border border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 space-y-12 md:space-y-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase italic">Current Monitors</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {monitors && monitors.length > 0 ? (
              monitors.map((m) => (
                <div key={m.id} className="bg-[#020617] p-5 rounded-3xl border border-white/5 shadow-2xl hover:bg-white/5 transition-all group flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[8px] font-black text-blue-400 uppercase tracking-widest truncate">{m.role}</div>
                      <div className="text-sm font-black text-white tracking-tight truncate uppercase">{m.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                      <Shield className="w-3 h-3" />
                      Room {m.room}
                    </div>
                    {m.phone && (
                      <a 
                        href={`tel:${m.phone}`}
                        className="flex items-center gap-2 text-blue-400 text-[9px] font-black uppercase tracking-widest hover:text-blue-300 transition-colors"
                      >
                        <Phone className="w-3 h-3" />
                        {m.phone}
                      </a>
                    )}
                  </div>
                </div>
              ))
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
