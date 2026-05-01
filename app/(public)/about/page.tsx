import type { Metadata } from "next";
import { Calendar, Users, GraduationCap, History, Users2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

export const revalidate = 86400; // Revalidate once a day

export const metadata: Metadata = {
  title: "About ORION Hostel | History & Legacy Since 1982",
  description:
    "Learn the history of ORION Hostel (Hostel No 7) at Jorhat Engineering College, Assam. Founded in February 1982, our 40+ year legacy of academic excellence, brotherhood, and sports dominance defines the Orionite spirit.",
  alternates: {
    canonical: "https://www.orionjech7.site/about",
  },
  openGraph: {
    title: "About ORION Hostel | 40+ Years of Legacy at JEC",
    description:
      "Discover the rich history and culture of ORION Hostel, Jorhat Engineering College — home to 800+ alumni and a tradition of excellence since 1982.",
    url: "https://www.orionjech7.site/about",
    images: [{ url: "/hostel_about.jpeg", width: 1200, height: 630, alt: "ORION Hostel Building — Jorhat Engineering College, Assam" }],
  },
};

export default function AboutPage() {
  return (
    <main className="bg-transparent min-h-screen selection:bg-amber-500/20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 space-y-8 md:space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase font-jakarta">
            Established February 1982
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#0F172A] tracking-[-0.05em] leading-[1.05] font-jakarta">
            A Legacy of <br/><span className="text-[#C8A96B]">Excellence.</span>
          </h1>
          <p className="text-base md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0 font-sans">
            Deeply rooted in the academic excellence of Jorhat Engineering College, Hostel 7—famously known as ORION—has been a cornerstone of student life for over four decades.
          </p>
        </div>
        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
          <div className="aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 relative">
            <Image 
              src="/hostel_about.jpeg" 
              alt="ORION Hostel building — Hostel No 7, Jorhat Engineering College, Assam, established 1982" 
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { tag: 'Legacy', icon: <Calendar className="w-6 h-6" />, value: "42+", label: "Years of History", color: 'text-[#0F172A]', bgColor: 'bg-white', borderColor: 'border-slate-100' },
            { tag: 'Community', icon: <Users className="w-6 h-6" />, value: "800+", label: "Glorious Alumni", color: 'text-[#0F172A]', bgColor: 'bg-white', borderColor: 'border-slate-100' },
            { tag: 'Identity', icon: <GraduationCap className="w-6 h-6" />, value: "JEC", label: "Hostel 7 Heritage", color: 'text-[#C8A96B]', bgColor: 'bg-white', borderColor: 'border-slate-100' },
          ].map((stat, i) => (
            <div key={i} className={`group ${stat.bgColor} border ${stat.borderColor} rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center text-center shadow-2xl shadow-slate-200/40 transition-all duration-500 hover:-translate-y-2`}>
              <div className="w-full flex items-center justify-between mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  {stat.icon}
                </div>
                <span className={`text-[10px] font-bold ${stat.color} uppercase tracking-[0.2em] font-sans opacity-50`}>{stat.tag}</span>
              </div>
              <div className={`text-4xl md:text-5xl font-black ${stat.color} mb-2 tracking-tighter font-jakarta`}>{stat.value}</div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-jakarta">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* History & Culture */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
              <History className="w-7 h-7 text-[#0F172A]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight font-jakarta">Our History</h2>
          </div>
          <div className="space-y-8 text-slate-600 leading-relaxed font-medium text-base md:text-lg font-sans">
            <p>
              Established in 1982, Hostel 7 of Jorhat Engineering College was originally known by its birthname, <span className="text-[#0F172A] font-bold underline decoration-[#C8A96B] decoration-2 underline-offset-4">"The North-East House"</span>. Known as "The Maker" of many respected lives, the boarders celebrated the hostel's Silver Jubilee in 2009 in an ornamented fashion.
            </p>
            <p>
              Now carrying the name <span className="text-[#0F172A] font-bold">ORION</span>, the hostel is built upon a practical thought: "Magic is believing in yourself." Whether on the field or in the classroom, the Orionite spirit remains undefeated in its pursuit of excellence.
            </p>
            <p>
              Our collective reflections find a voice in <span className="text-[#0F172A] font-bold italic">"Arunabh"</span>, the hostel wall magazine. For us, it's more than just a name—it's a race. We are <span className="text-[#0F172A] font-bold uppercase tracking-widest text-sm">Orionites</span>, the warriors within.
            </p>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-[#0F172A] rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-indigo-900/20 text-white">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shadow-sm shrink-0 border border-white/10 backdrop-blur-sm">
              <Users2 className="w-7 h-7 text-[#C8A96B]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight font-jakarta">The Culture</h2>
          </div>
          <p className="text-white/70 leading-relaxed font-medium mb-12 text-base md:text-lg font-sans">
            Hostel 7 is renowned for its unique "Orionite" culture—a blend of fierce loyalty, intellectual rigor, and celebratory spirit.
          </p>
          <ul className="space-y-6">
            {[
              "Annual 'Phoenix' Festival Participation",
              "Legacy of Inter-Hostel Sports Dominance",
              "Mentorship-driven Senior-Junior relationships"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-white/90 font-bold text-xs md:text-sm uppercase tracking-[0.1em] font-jakarta group">
                <div className="w-8 h-8 rounded-full bg-[#C8A96B]/10 flex items-center justify-center group-hover:bg-[#C8A96B]/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#C8A96B]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities & Infrastructure Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white border border-slate-100 rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 lg:p-32 relative overflow-hidden shadow-2xl shadow-slate-200/50">
          <div className="max-w-4xl space-y-10 relative z-10">
            <div className="inline-flex items-center px-5 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase font-jakarta">
              Hostel infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-[#0F172A] tracking-tighter leading-tight font-jakarta">
              A Home Built for <span className="text-[#C8A96B]">Excellence.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                <p>
                  Our architectural identity is defined by a distinctive **H-shaped structure** that houses 32 resident rooms, offering a symmetric and balanced environment for focused study and social bonding. 
                </p>
                <p>
                  The heartbeat of Orion is its grand **Common Room**—a space that breathes pride and legacy. Adorned with decades of trophies and commendations, it serves as the prestigious venue for our Freshers' and Farewell ceremonies.
                </p>
              </div>
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-sm md:text-base">
                <p>
                  We champion a holistic student experience, balancing academic rigor with physical vitality. From our specialized **Gym-cum-Library** to our communal mess, every corner is designed for growth.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Table Tennis", "Chess", "Cricket", "Football", "Volleyball", "Badminton"].map((sport) => (
                    <span key={sport} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[8px] font-bold uppercase text-slate-500 tracking-widest shadow-sm">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-16">
              {[
                { tag: 'Housing', label: "32 Resident Rooms", sub: "Spacious Living", color: 'text-[#0F172A]', border: 'border-slate-100' },
                { tag: 'Social', label: "Common Room", sub: "Legacy Center", color: 'text-[#0F172A]', border: 'border-slate-100' },
                { tag: 'Health', label: "Gym & Library", sub: "Dual Wellness", color: 'text-[#0F172A]', border: 'border-slate-100' },
                { tag: 'Heritage', label: "Orion Legacy", sub: "Authentic Spirit", color: 'text-[#C8A96B]', border: 'border-slate-100' },
              ].map((item, i) => (
                <div key={i} className={`bg-slate-50/50 p-8 rounded-[2.5rem] border ${item.border} shadow-sm text-center space-y-6 group transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-slate-200`}>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className={`text-[9px] font-bold ${item.color} uppercase tracking-[0.2em] font-jakarta opacity-50`}>{item.tag}</span>
                  </div>
                  <div className="space-y-2 text-left">
                    <div className={`text-base font-bold ${item.color} leading-tight font-jakarta tracking-tight`}>{item.label}</div>
                    <div className={`text-[10px] font-bold ${item.color} tracking-widest uppercase opacity-40`}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight uppercase">Want to know more?</h2>
        <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Reach out to us for any queries regarding admissions, rules, or alumni registration.
        </p>
        <div className="flex justify-center pt-10">
          <Link href="/contact" className="w-full sm:w-auto bg-slate-900 text-white px-16 py-6 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition shadow-2xl hover:shadow-slate-200">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
