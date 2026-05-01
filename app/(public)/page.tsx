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
    { tag: 'Legacy', label: 'Established', value: '1982', icon: <Calendar className="w-5 h-5" />, color: 'text-sky-600', bgColor: 'bg-sky-50', borderColor: 'border-sky-100' },
    { tag: 'Community', label: 'Capacity', value: '75', icon: <Users className="w-5 h-5" />, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
    { tag: 'Tradition', label: 'Legacy', value: '40+ Years', icon: <Award className="w-5 h-5" />, color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100' },
  ];

  const spirits = [
    { 
      tag: 'Core Value',
      title: 'Brotherhood', 
      desc: 'More than just roommates, we are a family. The bonds formed within these walls last a lifetime, creating a support system that spans generations.', 
      icon: <Users2 className="w-6 h-6" />,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-100',
    },
    { 
      tag: 'Priority',
      title: 'Academics', 
      desc: 'A legacy of engineering excellence. Orionites consistently rank among the toppers of Jorhat Engineering College, fostering a culture of peer learning.', 
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
    },
    { 
      tag: 'Heritage',
      title: 'Sports Excellence', 
      desc: 'Dominating the field. From the cricket pitch to the football ground, the Orionite grit is unmatched in every inter-hostel competition.', 
      icon: <Trophy className="w-6 h-6" />,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-100',
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
          <div className="absolute inset-0 bg-white/35"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto py-32 text-center space-y-12">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] md:text-[13px] font-bold tracking-tight font-sans">
            Hostel No 7 • Jorhat Engineering College
          </div>
          
          <div className="space-y-10 md:space-y-16">
            <h1 className="text-7xl sm:text-9xl md:text-[14rem] font-bold tracking-tighter leading-none cursor-default bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-800 bg-clip-text text-transparent font-sans">
              ORION
            </h1>
            <p className="text-xl sm:text-2xl md:text-4xl text-slate-900 font-bold italic max-w-4xl mx-auto px-4 leading-tight drop-shadow-sm">
              "We are not known by names but by a race — <span className="text-indigo-700 font-black not-italic tracking-tight">Orionite: warriors within</span>"
            </p>
          </div>


        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={`p-6 md:p-8 ${stat.bgColor} border ${stat.borderColor} rounded-3xl shadow-xl shadow-slate-200/50 flex items-center gap-6 group hover:scale-105 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-4 mb-0.5">
                  <div className={`text-2xl md:text-3xl font-bold ${stat.color} tracking-tight font-sans`}>{stat.value}</div>
                  <span className={`text-[11px] font-bold ${stat.color} tracking-tight font-sans`}>{stat.tag}</span>
                </div>
                <div className="text-[12px] font-bold text-slate-500 tracking-tight font-sans">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spirit Section */}
      <section className="max-w-7xl mx-auto px-6 py-40 text-center">
        <h2 className="text-[11px] md:text-[13px] font-bold text-indigo-600 tracking-tight mb-20 font-sans">The Orion spirit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {spirits.map((spirit, i) => (
            <div 
              key={i} 
              className={`p-6 md:p-14 ${spirit.bgColor} border ${spirit.borderColor} rounded-[3rem] text-left space-y-8 transition-all hover:shadow-2xl hover:shadow-slate-200 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-full -mr-16 -mt-16 group-hover:bg-white/60 transition-colors"></div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className={`${spirit.color} p-4 bg-white rounded-2xl inline-block shadow-sm group-hover:scale-110 transition-transform duration-500`}>{spirit.icon}</div>
                <span className={`text-[11px] md:text-[13px] font-bold ${spirit.color} tracking-tight font-sans`}>{spirit.tag}</span>
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className={`text-3xl font-bold text-slate-900 tracking-tight font-sans`}>{spirit.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed font-medium font-sans">
                  {spirit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Notices Section */}
      <section className="max-w-4xl mx-auto px-6 py-40">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-[11px] md:text-[13px] font-bold text-indigo-600 tracking-tight font-sans text-center">Stay informed</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-slate-900 flex items-center justify-center gap-4 tracking-tighter">
            Bulletin <Megaphone className="w-8 h-8 text-indigo-600" />
          </h3>
        </div>
        
        <div className="border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl bg-white">
          {typedNotices.length > 0 ? (
            typedNotices.map((notice: Notice, i: number) => (
              <div key={notice.id} className={`p-6 md:p-12 hover:bg-slate-50 transition-all cursor-default group ${i !== typedNotices.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 tracking-tight font-sans">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(notice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <span className="text-[9px] md:text-[11px] font-bold text-blue-600 tracking-tight font-sans">Active Notice</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xl md:text-2xl leading-tight group-hover:text-blue-600 transition-colors">
                  {notice.title}
                </h4>
              </div>
            ))
          ) : (
            <div className="p-32 text-center text-slate-400 font-medium italic">No active notices found</div>
          )}
          <Link href="/notices" className="block w-full py-10 bg-slate-900 text-center text-[13px] font-bold tracking-tight text-white hover:bg-slate-800 transition-all font-sans">
            View All Announcements
          </Link>
        </div>
      </section>
    </main>
  );
}
