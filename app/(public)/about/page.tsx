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
      <section className="max-w-7xl mx-auto px-8 pt-32 pb-12 md:pt-40 md:pb-16 lg:pt-48 lg:pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 space-y-10 text-center lg:text-left">
          <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase font-jakarta">
            Established February 1982
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-[#0F172A] tracking-[-0.06em] leading-[1.1] sm:leading-[0.95] font-jakarta">
            A Legacy of <br/><span className="text-[#C8A96B]">Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0 font-sans opacity-90">
            Deeply rooted in the academic excellence of Jorhat Engineering College, Hostel 7—famously known as ORION—has been a cornerstone of student life for over four decades.
          </p>
        </div>
        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
          <div className="aspect-[4/3] rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(15,23,42,0.15)] border border-slate-200/40 relative">
            <Image 
              src="/hostel_about.jpeg" 
              alt="ORION Hostel building — Hostel No 7, Jorhat Engineering College, Assam, established 1982" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {[
            { tag: 'Legacy', icon: <Calendar className="w-6 h-6" />, value: "42+", label: "Years of History", color: 'text-slate-900', bgColor: 'bg-white', borderColor: 'border-slate-100/80', iconBg: 'bg-slate-50' },
            { tag: 'Community', icon: <Users className="w-6 h-6" />, value: "800+", label: "Glorious Alumni", color: 'text-indigo-900', bgColor: 'bg-white', borderColor: 'border-indigo-100/30', iconBg: 'bg-indigo-50/50' },
            { tag: 'Identity', icon: <GraduationCap className="w-6 h-6" />, value: "JEC", label: "Hostel 7 Heritage", color: 'text-[#A38A56]', bgColor: 'bg-white', borderColor: 'border-[#A38A56]/10', iconBg: 'bg-[#A38A56]/5' },
          ].map((stat, i) => (
            <div key={i} className={`group ${stat.bgColor} border ${stat.borderColor} rounded-[4rem] p-10 md:p-14 flex flex-col items-center text-center shadow-[0_40px_80px_-20px_rgba(15,23,42,0.06)] transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_50px_100px_-20px_rgba(15,23,42,0.1)]`}>
              <div className="w-full flex items-center justify-between mb-10">
                <div className={`w-16 h-16 rounded-2xl ${stat.iconBg} flex items-center justify-center ${stat.color} border border-slate-100 shadow-sm group-hover:scale-110 group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-700`}>
                  {stat.icon}
                </div>
                <span className={`text-[10px] font-black ${stat.color} uppercase tracking-[0.2em] font-jakarta opacity-60`}>{stat.tag}</span>
              </div>
              <div className={`text-4xl sm:text-5xl md:text-6xl font-black ${stat.color} mb-3 tracking-tighter font-jakarta`}>{stat.value}</div>
              <div className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] font-jakarta leading-none">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        <div className="bg-white border border-slate-100/80 rounded-[4rem] p-10 md:p-16 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.06)] group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-slate-50 rounded-bl-full -mr-20 -mt-20 group-hover:bg-[#C8A96B]/5 transition-colors duration-1000"></div>
          <div className="flex items-center gap-6 mb-12 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-slate-50/80 flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:scale-110 group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-700">
              <History className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tighter font-jakarta">Our History</h2>
          </div>
          <div className="space-y-8 text-slate-500 leading-relaxed font-medium text-lg font-sans relative z-10 opacity-90">
            <p>
              Established in 1982, Hostel 7 of Jorhat Engineering College was originally known by its birthname, <span className="text-[#0F172A] font-bold underline decoration-[#C8A96B] decoration-2 underline-offset-4">"The North-East House"</span>. Known as "The Maker" of many respected lives, the boarders celebrated the hostel's Silver Jubilee in 2009 in an ornamented fashion.
            </p>
            <p>
              Now carrying the name <span className="text-[#0F172A] font-bold">ORION</span>, the hostel is built upon a practical thought: "Magic is believing in yourself." Whether on the field or in the classroom, the Orionite spirit remains undefeated in its pursuit of excellence.
            </p>
            <p>
              Our collective reflections find a voice in <span className="text-[#0F172A] font-bold">"Arunabh"</span>, the hostel wall magazine. For us, it's more than just a name—it's a race. We are <span className="text-[#0F172A] font-bold uppercase tracking-[0.2em] text-xs">Orionites</span>, the warriors within.
            </p>
          </div>
        </div>

        <div className="bg-[#0F172A] border border-[#0F172A] rounded-[4rem] p-10 md:p-16 shadow-[0_40px_100px_-30px_rgba(15,23,42,0.3)] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full -mr-32 -mt-32 group-hover:bg-white/10 transition-colors duration-1000"></div>
          <div className="flex items-center gap-6 mb-12 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shadow-sm shrink-0 border border-white/10 backdrop-blur-sm group-hover:scale-110 group-hover:bg-[#C8A96B] group-hover:text-[#0F172A] transition-all duration-700">
              <Users2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tighter font-jakarta">The Culture</h2>
          </div>
          <p className="text-white/60 leading-relaxed font-medium mb-12 text-lg font-sans relative z-10">
            Hostel 7 is renowned for its unique "Orionite" culture—a blend of fierce loyalty, intellectual rigor, and celebratory spirit.
          </p>
          <ul className="space-y-8 relative z-10">
            {[
              "Annual 'Phoenix' Festival Participation",
              "Legacy of Inter-Hostel Sports Dominance",
              "Mentorship-driven Senior-Junior relationships"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-5 text-white/90 font-bold text-xs md:text-sm uppercase tracking-[0.2em] font-jakarta group/item">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover/item:bg-[#C8A96B]/20 transition-colors border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-[#C8A96B]" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-white border border-slate-100/80 rounded-[4rem] md:rounded-[5rem] p-12 md:p-24 lg:p-32 relative overflow-hidden shadow-[0_60px_120px_-40px_rgba(15,23,42,0.08)]">
          <div className="max-w-5xl space-y-12 relative z-10">
            <div className="inline-flex items-center px-6 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black tracking-[0.4em] uppercase font-jakarta">
              Infrastructure
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-[#0F172A] tracking-[-0.05em] leading-[1.1] sm:leading-[0.95] font-jakarta">
              A Home Built for <br className="hidden sm:block" /><span className="text-[#C8A96B]">Excellence</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 pt-4">
              <div className="space-y-8 text-slate-500 font-medium leading-relaxed text-base md:text-lg opacity-90">
                <p>
                  Our architectural identity is defined by a distinctive **H-shaped structure** that houses 32 resident rooms, offering a symmetric and balanced environment for focused study and social bonding. 
                </p>
                <p>
                  The heartbeat of Orion is its grand **Common Room**—a space that breathes pride and legacy. Adorned with decades of trophies and commendations, it serves as the prestigious venue for our Freshers' and Farewell ceremonies.
                </p>
              </div>
              <div className="space-y-8 text-slate-500 font-medium leading-relaxed text-base md:text-lg opacity-90">
                <p>
                  We champion a holistic student experience, balancing academic rigor with physical vitality. From our specialized **Gym-cum-Library** to our communal mess, every corner is designed for growth.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Table Tennis", "Chess", "Cricket", "Football", "Volleyball", "Badminton"].map((sport) => (
                    <span key={sport} className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black uppercase text-slate-500 tracking-[0.2em] shadow-sm hover:bg-white hover:text-[#C8A96B] transition-colors cursor-default">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-20">
              {[
                { tag: 'Housing', label: "32 Resident Rooms", sub: "Spacious Living", color: 'text-[#0F172A]', border: 'border-slate-100' },
                { tag: 'Social', label: "Common Room", sub: "Legacy Center", color: 'text-[#0F172A]', border: 'border-slate-100' },
                { tag: 'Health', label: "Gym & Library", sub: "Dual Wellness", color: 'text-[#0F172A]', border: 'border-slate-100' },
                { tag: 'Heritage', label: "Orion Legacy", sub: "Authentic Spirit", color: 'text-[#C8A96B]', border: 'border-slate-100' },
              ].map((item, i) => (
                <div key={i} className={`bg-slate-50/40 p-10 rounded-[3rem] border ${item.border} shadow-sm text-center space-y-8 group transition-all duration-700 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.12)]`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`text-[10px] font-black ${item.color} uppercase tracking-[0.2em] font-jakarta opacity-60`}>{item.tag}</span>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className={`text-lg font-black ${item.color} leading-tight font-jakarta tracking-tight`}>{item.label}</div>
                    <div className={`text-[11px] font-black ${item.color} tracking-[0.2em] uppercase opacity-60 font-jakarta`}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight uppercase">Want to know more?</h2>
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
