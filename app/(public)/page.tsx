import type { Metadata } from "next";
import { createClient } from "../../lib/supabase/server";

export const metadata: Metadata = {
  title: "ORION — Jorhat Engineering College Hostel 7",
  description:
    "Welcome to ORION — Jorhat Engineering College, Assam. Established in 1982, home to 75 residents, 800+ alumni, and a 40-year legacy of brotherhood, academics, and sports excellence.",
  alternates: {
    canonical: "https://www.orionjech7.site",
  },
  openGraph: {
    title: "ORION — Jorhat Engineering College Hostel 7",
    description:
      "The official portal for ORION, JEC. Explore our notices, achievements, alumni network, and the Orionite legacy since 1982.",
    url: "https://www.orionjech7.site",
    images: [{ url: "/hero-hostel.jpeg", width: 1200, height: 630, alt: "ORION — Jorhat Engineering College" }],
  },
};
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Award, 
  Users2, 
  GraduationCap, 
  Trophy, 
  Megaphone 
} from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch Latest Data for Notices
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  interface Notice {
    id: string;
    title: string;
    created_at: string;
  }

  const typedNotices = (notices || []) as Notice[];

  const stats = [
    { 
      value: '1982', 
      icon: <Calendar className="w-6 h-6" />, 
      color: 'text-slate-900', 
      bgColor: 'bg-white', 
      iconBg: 'bg-slate-50',
    },
    { 
      value: '800+', 
      icon: <Users className="w-6 h-6" />, 
      color: 'text-indigo-900', 
      bgColor: 'bg-white', 
      iconBg: 'bg-indigo-50/50',
    },
    { 
      value: 'JEC', 
      icon: <Award className="w-6 h-6" />, 
      color: 'text-[#A38A56]', 
      bgColor: 'bg-white', 
      iconBg: 'bg-[#A38A56]/5',
    },
  ];

  const spirits = [
    { 
      tag: 'Foundation',
      title: 'Brotherhood', 
      desc: 'More than just roommates, we are a family. The bonds formed within these walls last a lifetime, creating a support system that spans generations.', 
      icon: <Users2 className="w-6 h-6" />,
      accent: 'text-[#0F172A]',
      tagColor: 'text-slate-400',
      iconBg: 'bg-slate-50',
      hoverIcon: 'group-hover:bg-[#0F172A]',
    },
    { 
      tag: 'Excellence',
      title: 'Academics', 
      desc: 'A legacy of engineering excellence. Orionites consistently rank among the toppers of Jorhat Engineering College, fostering a culture of peer learning.', 
      icon: <GraduationCap className="w-6 h-6" />,
      accent: 'text-indigo-950',
      tagColor: 'text-indigo-400',
      iconBg: 'bg-indigo-50/50',
      hoverIcon: 'group-hover:bg-indigo-950',
    },
    { 
      tag: 'Resilience',
      title: 'Sports Heritage', 
      desc: 'Dominating the field. From the cricket pitch to the football ground, the Orionite grit is unmatched in every inter-hostel competition.', 
      icon: <Trophy className="w-6 h-6" />,
      accent: 'text-[#C8A96B]',
      tagColor: 'text-[#C8A96B]',
      iconBg: 'bg-[#C8A96B]/5',
      hoverIcon: 'group-hover:bg-[#C8A96B]',
    },
  ];




  return (
    <main className="bg-transparent min-h-screen relative selection:bg-blue-500/20 overflow-x-hidden">
      {/* Background is handled by GridBackground in layout.tsx */}

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-hostel.jpeg" 
            alt="ORION Hostel — Hostel No 7, Jorhat Engineering College, Assam" 
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover scale-105" 
          />
          <div className="absolute inset-0 bg-[#0F172A]/75 sm:bg-[#0F172A]/65 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/40 via-transparent to-[#0F172A]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto pt-24 pb-32 sm:pt-32 sm:pb-48 md:pt-40 md:pb-60 text-center">
          <div className="inline-flex items-center px-7 py-3 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-white/90 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase font-jakarta mb-6 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Hostel No 7 • Jorhat Engineering College
          </div>
          
          <div className="space-y-8 sm:space-y-12">
            <h1 className="text-[clamp(3.5rem,18vw,15rem)] font-black tracking-[-0.08em] leading-[0.8] cursor-default bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent font-jakarta animate-in fade-in zoom-in-95 duration-1000 delay-200 select-none px-4">
              ORION
            </h1>
            <p className="text-base sm:text-xl md:text-2xl lg:text-[1.75rem] text-white/60 font-medium max-w-2xl mx-auto px-6 leading-[1.6] font-jakarta tracking-tight animate-in fade-in slide-in-from-top-4 duration-1000 delay-500 text-balance">
              "We are not known by names <br className="block sm:hidden" /> but by a race — <br/>
              <span className="text-[#C8A96B] font-black tracking-wide">Orionite: warriors within</span>"
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 -mt-24 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 xl:gap-12">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={cn(
                "px-8 py-8 sm:px-10 sm:py-12 md:px-14 md:py-16 border rounded-[2.5rem] sm:rounded-[3.5rem] flex items-center justify-center gap-6 sm:gap-10 group hover:-translate-y-2 transition-all duration-700 ease-out",
                stat.bgColor,
                i === 1 ? "border-indigo-100/50 shadow-[0_40px_100px_-20px_rgba(15,23,42,0.1)]" : 
                i === 2 ? "border-[#C8A96B]/10 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.08)]" :
                "border-slate-100 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.08)]"
              )}
            >
              <div className={cn("w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-[1.25rem] flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0F172A] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-sm", stat.color, stat.iconBg)}>
                {stat.icon}
              </div>
              <div className={cn("text-4xl sm:text-5xl md:text-7xl font-black tracking-[-0.08em] font-jakarta leading-none select-none", stat.color)}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8 pt-16 sm:pt-24 pb-8 sm:pb-12">
          <div className="h-px w-16 sm:w-24 bg-slate-200/80"></div>
          <div className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] sm:tracking-[0.6em] font-jakarta">The Orionite Way</div>
          <div className="h-px w-16 sm:w-24 bg-slate-200/80"></div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="flex items-center justify-center gap-6 sm:gap-10 py-16 sm:py-24 opacity-80 sm:opacity-60">
          <div className="h-px w-20 sm:w-32 bg-slate-300"></div>
          <h2 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.4em] sm:tracking-[1em] font-jakarta pl-4 whitespace-nowrap">The Spirit</h2>
          <div className="h-px w-20 sm:w-32 bg-slate-300"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-14">
          {spirits.map((spirit, i) => (
            <div 
              key={i} 
              className={`p-8 sm:p-10 md:p-14 bg-white border border-slate-100/80 rounded-[2.5rem] md:rounded-[3rem] text-left space-y-8 sm:space-y-10 transition-all duration-700 hover:shadow-[0_50px_100px_-20px_rgba(15,23,42,0.08)] group relative overflow-hidden hover:-translate-y-2`}
            >
              <div className={cn("absolute top-0 right-0 w-48 h-48 rounded-bl-full -mr-24 -mt-24 transition-colors duration-1000", 
                i === 0 ? "bg-slate-50 group-hover:bg-slate-100" : 
                i === 1 ? "bg-indigo-50/30 group-hover:bg-indigo-50/50" : 
                "bg-[#C8A96B]/5 group-hover:bg-[#C8A96B]/10"
              )}></div>
              <div className="flex items-center justify-between mb-6 sm:mb-8 relative z-10">
                <div className={cn(spirit.accent, spirit.iconBg, "p-4 sm:p-5 rounded-[1.25rem] sm:rounded-[1.5rem] inline-block border border-slate-100 group-hover:scale-110 group-hover:text-white transition-all duration-1000 shadow-sm", spirit.hoverIcon)}>{spirit.icon}</div>
                <span className={cn("text-[10px] font-black tracking-[0.3em] font-jakarta uppercase opacity-80", spirit.tagColor)}>{spirit.tag}</span>
              </div>
              <div className="space-y-4 sm:space-y-6 relative z-10">
                <h3 className={`text-2xl sm:text-3xl lg:text-5xl font-black text-[#0F172A] tracking-[-0.05em] font-jakarta leading-[1.1] break-words`}>{spirit.title}</h3>
                <p className="text-slate-500 text-base sm:text-lg md:text-[1.1rem] leading-relaxed font-medium font-sans opacity-90">
                  {spirit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-20 sm:py-32 lg:py-40">
        <div className="text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16 px-4">
          <h3 className="text-3xl sm:text-6xl lg:text-8xl font-black text-[#0F172A] flex items-center justify-center gap-6 sm:gap-8 tracking-[-0.06em] font-jakarta">
            Notices <Megaphone className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#C8A96B] opacity-10 shrink-0" />
          </h3>
        </div>
        
        <div className="border border-slate-200/80 rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-30px_rgba(15,23,42,0.06)] bg-white">
          {typedNotices.length > 0 ? (
            typedNotices.map((notice: Notice, i: number) => (
              <div key={notice.id} className={`p-8 sm:p-14 hover:bg-slate-50/50 transition-all cursor-default group ${i !== typedNotices.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-[10px] font-black text-slate-400 flex items-center gap-4 tracking-[0.25em] uppercase font-jakarta">
                    <Calendar className="w-3.5 h-3.5 opacity-40" />
                    {new Date(notice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#C8A96B]/20 group-hover:bg-[#C8A96B] transition-colors"></div>
                </div>
                <h4 className="font-black text-[#0F172A] text-xl sm:text-[2.25rem] leading-[1.2] group-hover:text-[#C8A96B] transition-colors font-jakarta tracking-[-0.05em] break-words">
                  {notice.title}
                </h4>
              </div>
            ))
          ) : (
            <div className="py-20 sm:py-32 px-10 text-center space-y-6">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-300 border border-slate-100/80">
                <Megaphone className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <p className="text-[#0F172A] font-black text-xl sm:text-3xl tracking-tight font-jakarta leading-none">No Active Announcements</p>
              </div>
            </div>
          )}
          <Link href="/notices" className="block w-full py-10 sm:py-12 bg-[#0F172A] text-center text-[10px] font-black uppercase tracking-[0.6em] sm:tracking-[1em] text-white hover:bg-[#1E293B] transition-all font-jakarta border-t border-slate-800 group/link">
            <span className="group-hover:tracking-[1.2em] transition-all duration-700">View Archives</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
