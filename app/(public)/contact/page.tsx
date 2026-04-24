import { MapPin, Mail, Phone, Clock, User, Shield, Info } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: monitors } = await supabase
    .from('monitors')
    .select('*')
    .order('role', { ascending: true });

  const mainContacts = [
    { icon: <MapPin className="w-5 h-5" />, title: "Location", detail: "Hostel No 7, JEC Road, Jorhat, Assam 785007", color: "text-blue-600" },
    { icon: <Mail className="w-5 h-5" />, title: "Official Email", detail: "info@orionhostel.jec.ac.in", color: "text-green-600" },
    { icon: <Phone className="w-5 h-5" />, title: "Superintendent", detail: "+91 91014 81714", color: "text-purple-600" },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-slate-200"></div>
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">Get in Touch</span>
          <div className="h-px w-12 bg-slate-200"></div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight uppercase">Connect.</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Have questions about admission or residency? Our administration team and monitors are here to assist you.
        </p>
      </section>

      {/* Main Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {mainContacts.map((c, i) => (
            <div key={i} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 text-center space-y-6 group">
              <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto ${c.color} group-hover:scale-110 transition-transform duration-500`}>
                {c.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.title}</h3>
                <p className="text-lg font-bold text-slate-900 leading-tight">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Monitors Section (Phase 3.5) */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Student Leadership</h2>
            <p className="text-slate-500 font-medium">The current year monitors ensuring discipline and welfare.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monitors && monitors.length > 0 ? (
              monitors.map((m) => (
                <div key={m.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{m.role}</div>
                      <div className="text-lg font-bold text-slate-900 tracking-tight">{m.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-medium border-t border-slate-50 pt-4">
                    <Shield className="w-4 h-4" />
                    Room: {m.room}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 italic">
                Leadership roles for the current semester are being finalized.
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
