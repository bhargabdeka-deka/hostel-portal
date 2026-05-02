import type { Metadata } from "next";
import { ShieldAlert, BookOpen, Clock, Users, Coffee, HelpCircle, ShieldCheck } from 'lucide-react';

export const revalidate = 86400; // Revalidate once a day

export const metadata: Metadata = {
  title: "Hostel Rules & Code of Conduct | ORION Hostel, JEC",
  description:
    "Official rules and regulations for residents of ORION Hostel (Hostel No 7), Jorhat Engineering College. Curfew timings, visitor policy, mess schedule, and disciplinary code of conduct.",
  alternates: {
    canonical: "https://www.orionjech7.site/rules",
  },
  openGraph: {
    title: "Hostel Rules | ORION Hostel Code of Conduct",
    description:
      "Hostel rules and regulations for ORION Hostel residents — curfew hours, visitor policy, mess timings, and discipline guidelines at Jorhat Engineering College.",
    url: "https://www.orionjech7.site/rules",
  },
};

export default function RulesPage() {
  const rules = [
    { 
      icon: <Clock />, 
      title: "Curfew Hours", 
      details: "Main gate closes at 10:00 PM on weekdays and 11:00 PM on weekends. Late entry requires prior permission from the Superintendent." 
    },
    { 
      icon: <Users />, 
      title: "Visitor Policy", 
      details: "Guests are allowed only in the common area until 8:00 PM. No overnight stay of visitors is permitted without written consent." 
    },
    { 
      icon: <Coffee />, 
      title: "Mess Timings", 
      details: "Breakfast: 7:30-9:00 AM | Lunch: 12:30-2:00 PM | Dinner: 9:00-10:30 PM. No food allowed inside personal rooms." 
    },
    { 
      icon: <ShieldAlert />, 
      title: "Discipline", 
      details: "Any form of ragging, substance abuse, or vandalism will result in immediate expulsion as per the JEC Board of Conduct." 
    }
  ];

  return (
    <main className="bg-transparent min-h-screen selection:bg-amber-500/20">
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-5xl mx-auto overflow-x-hidden">
      <div className="text-center mb-24 md:mb-32">
        <div className="flex items-center justify-center gap-6">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-indigo-600 text-[10px] md:text-[11px] font-black tracking-[0.15em] uppercase font-jakarta">
            Institutional Code of Conduct
          </div>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-[#0F172A] tracking-[-0.06em] leading-[1.1] sm:leading-[0.95] mt-10 mb-8 font-jakarta">Hostel Rules</h1>
        <p className="text-base md:text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed px-4 font-sans">
          Maintaining a respectful and organized environment is key to our community success. Please adhere to the following guidelines.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {rules.map((rule, i) => {
          const colors = [
            { bg: 'bg-sky-50/50', border: 'border-sky-100', iconBg: 'bg-sky-100/50', iconText: 'text-sky-600' },
            { bg: 'bg-emerald-50/50', border: 'border-emerald-100', iconBg: 'bg-emerald-100/50', iconText: 'text-emerald-600' },
            { bg: 'bg-violet-50/50', border: 'border-violet-100', iconBg: 'bg-violet-100/50', iconText: 'text-violet-600' },
            { bg: 'bg-rose-50/50', border: 'border-rose-100', iconBg: 'bg-rose-100/50', iconText: 'text-rose-600' },
          ];
          const color = colors[i % colors.length];
          return (
            <div key={i} className="group bg-white border border-slate-100 rounded-[3rem] p-10 md:p-14 flex flex-col sm:flex-row gap-10 md:gap-14 items-start hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-1">
              <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-[#0F172A] shadow-sm shrink-0 transition-transform duration-500 group-hover:scale-110 border border-slate-50">
                {rule.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-[-0.04em] font-jakarta leading-tight">{rule.title}</h3>
                <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed font-sans">{rule.details}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-24 md:mt-32 p-10 md:p-20 bg-[#0F172A] border border-[#0F172A] rounded-[3rem] md:rounded-[4rem] flex flex-col md:flex-row items-center gap-12 shadow-2xl shadow-indigo-900/30">
        <div className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-full flex items-center justify-center text-[#C8A96B] shadow-2xl shrink-0 border border-white/10">
          <HelpCircle className="w-10 h-10" />
        </div>
        <div className="text-center md:text-left space-y-3">
           <h4 className="text-xl md:text-2xl font-black text-white font-jakarta">Have specific questions?</h4>
           <p className="text-base md:text-lg text-white/60 font-medium leading-relaxed font-sans max-w-lg">Contact the warden or superintendent for clarifications regarding any policy.</p>
        </div>
      </div>
    </div>
    </main>
  );
}
