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
    { tag: 'Heritage', label: 'Established', value: '1982', icon: <Calendar className="w-5 h-5" />, color: 'text-slate-600', bgColor: 'bg-white', borderColor: 'border-slate-100' },
    { tag: 'Residency', label: 'Residents', value: '75', icon: <Users className="w-5 h-5" />, color: 'text-slate-600', bgColor: 'bg-white', borderColor: 'border-slate-100' },
    { tag: 'Legacy', label: 'History', value: '40+ Years', icon: <Award className="w-5 h-5" />, color: 'text-[#C8A96B]', bgColor: 'bg-white', borderColor: 'border-slate-100' },
  ];

  const spirits = [
    { 
      tag: 'Foundation',
      title: 'Brotherhood', 
      desc: 'More than just roommates, we are a family. The bonds formed within these walls last a lifetime, creating a support system that spans generations.', 
      icon: <Users2 className="w-6 h-6" />,
      color: 'text-indigo-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-100',
    },
    { 
      tag: 'Excellence',
      title: 'Academics', 
      desc: 'A legacy of engineering excellence. Orionites consistently rank among the toppers of Jorhat Engineering College, fostering a culture of peer learning.', 
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'text-indigo-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-100',
    },
    { 
      tag: 'Resilience',
      title: 'Sports Heritage', 
      desc: 'Dominating the field. From the cricket pitch to the football ground, the Orionite grit is unmatched in every inter-hostel competition.', 
      icon: <Trophy className="w-6 h-6" />,
      color: 'text-indigo-900',
      bgColor: 'bg-white',
      borderColor: 'border-slate-100',
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
            quality={85}
            sizes="100vw"
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-[#0F172A]/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#0F172A]/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto py-32 lg:py-40 text-center">
          <div className="inline-flex items-center px-7 py-3 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-white/60 text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase font-jakarta mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Hostel No 7 • Jorhat Engineering College
          </div>
          
          <div className="space-y-10 md:space-y-12">
            <h1 className="text-8xl sm:text-[10rem] md:text-[13rem] lg:text-[15rem] font-black tracking-[-0.07em] leading-[0.85] cursor-default bg-gradient-to-b from-white via-white/90 to-white/40 bg-clip-text text-transparent font-jakarta animate-in fade-in zoom-in-95 duration-1000 delay-200">
              ORION
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/50 font-medium max-w-3xl mx-auto px-6 leading-[1.4] font-jakarta tracking-tight animate-in fade-in slide-in-from-top-4 duration-1000 delay-500">
              "We are not known by names but by a race — <br/><span className="text-[#C8A96B] font-black italic">Orionite: warriors within</span>"
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 -mt-24 md:-mt-32 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`p-10 md:p-14 ${stat.bgColor} border border-slate-100/80 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(15,23,42,0.12)] flex items-center gap-10 group hover:-translate-y-2 transition-all duration-700 hover:shadow-[0_60px_120px_-20px_rgba(15,23,42,0.18)]`}
            >
              <div className={`w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center shrink-0 ${stat.color} border border-slate-100 group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-700`}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className={`text-4xl md:text-5xl font-black ${stat.color} tracking-tighter font-jakarta`}>{stat.value}</div>
                  <span className={`text-[10px] font-black ${stat.color} tracking-[0.2em] font-jakarta uppercase opacity-60`}>{stat.tag}</span>
                </div>
                <div className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] font-jakarta leading-none">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8 pt-20 pb-10">
          <div className="h-px w-24 bg-slate-100"></div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">The Orionite Way</div>
          <div className="h-px w-24 bg-slate-100"></div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="flex items-center justify-center gap-10 py-24 opacity-20">
          <div className="h-px w-32 bg-slate-200"></div>
          <h2 className="text-[11px] font-black text-[#0F172A] uppercase tracking-[1em] font-jakarta pl-4">The Spirit</h2>
          <div className="h-px w-32 bg-slate-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {spirits.map((spirit, i) => (
            <div 
              key={i} 
              className={`p-12 md:p-16 bg-white border border-slate-100/80 rounded-[4rem] text-left space-y-12 transition-all duration-700 hover:shadow-[0_60px_120px_-30px_rgba(15,23,42,0.1)] group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-slate-50 rounded-bl-full -mr-24 -mt-24 group-hover:bg-[#C8A96B]/5 transition-colors duration-1000"></div>
              <div className="flex items-center justify-between mb-10 relative z-10">
                <div className={`${spirit.color} p-6 bg-slate-50/50 rounded-[2rem] inline-block border border-slate-100 group-hover:scale-110 group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-1000 shadow-sm`}>{spirit.icon}</div>
                <span className={`text-[11px] font-black ${spirit.color} tracking-[0.3em] font-jakarta uppercase opacity-60`}>{spirit.tag}</span>
              </div>
              <div className="space-y-8 relative z-10">
                <h3 className={`text-3xl md:text-5xl font-black text-[#0F172A] tracking-tighter font-jakarta leading-[0.95]`}>{spirit.title}</h3>
                <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium font-sans opacity-90">
                  {spirit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      <section className="max-w-4xl mx-auto px-8 py-32 lg:py-40">
        <div className="text-center space-y-10 mb-20">
          <div className="inline-flex items-center px-8 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-[#C8A96B] text-[10px] font-black tracking-[0.6em] uppercase font-jakarta">
            Institutional Bulletin
          </div>
          <h3 className="text-5xl md:text-8xl font-black text-[#0F172A] flex items-center justify-center gap-8 tracking-tighter font-jakarta">
            Notices <Megaphone className="w-12 h-12 lg:w-16 lg:h-16 text-[#C8A96B] opacity-20" />
          </h3>
        </div>
        
        <div className="border border-slate-200/80 rounded-[4rem] md:rounded-[5rem] overflow-hidden shadow-[0_40px_100px_-30px_rgba(15,23,42,0.08)] bg-white">
          {typedNotices.length > 0 ? (
            typedNotices.map((notice: Notice, i: number) => (
              <div key={notice.id} className={`p-10 md:p-16 hover:bg-slate-50/50 transition-all cursor-default group ${i !== typedNotices.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="text-[10px] font-black text-slate-400 flex items-center gap-4 tracking-[0.25em] uppercase font-jakarta">
                    <Calendar className="w-4 h-4 opacity-50" />
                    {new Date(notice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C8A96B]/30 group-hover:bg-[#C8A96B] transition-colors"></div>
                </div>
                <h4 className="font-black text-[#0F172A] text-2xl md:text-4xl leading-[1.05] group-hover:text-[#C8A96B] transition-colors font-jakarta tracking-tighter">
                  {notice.title}
                </h4>
              </div>
            ))
          ) : (
            <div className="py-40 px-10 text-center space-y-8">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto text-slate-300 border border-slate-100/80">
                <Megaphone className="w-10 h-10" />
              </div>
              <div className="space-y-3">
                <p className="text-[#0F172A] font-black text-2xl md:text-3xl tracking-tighter font-jakarta leading-none">No Active Announcements.</p>
                <p className="text-slate-400 font-medium text-lg font-sans max-w-sm mx-auto leading-relaxed">The legacy is quiet for a moment. Stay tuned for upcoming ORION updates.</p>
              </div>
            </div>
          )}
          <Link href="/notices" className="block w-full py-16 bg-[#0F172A] text-center text-[11px] font-black uppercase tracking-[0.8em] text-white hover:bg-[#1E293B] transition-all font-jakarta border-t border-slate-800 group/link">
            <span className="group-hover:tracking-[1em] transition-all duration-700">View Archives</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
