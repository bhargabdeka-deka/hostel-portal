import { createClient } from "../../lib/supabase/server";
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
    { tag: 'Legacy', label: 'Established', value: '1982', icon: <Calendar className="w-5 h-5" />, color: 'text-rose-600', bgColor: 'bg-rose-50', borderColor: 'border-rose-100' },
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
      color: 'text-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-100',
    },
  ];




  return (
    <main className="bg-transparent min-h-screen relative selection:bg-blue-500/20 overflow-x-hidden">
      {/* Background is handled by GridBackground in layout.tsx */}

      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden px-6 bg-slate-50">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-hostel.jpeg" 
            alt="Orion Hostel" 
            fill
            priority
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-white/40"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto py-32 text-center space-y-12">
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            Hostel No 7 • Jorhat Engineering College
          </div>
          
          <div className="space-y-6">
            <h1 className="text-7xl sm:text-9xl md:text-[14rem] font-bold tracking-tighter uppercase leading-none cursor-default text-slate-900 drop-shadow-sm">
              ORION
            </h1>
            <p className="text-xl sm:text-2xl md:text-4xl text-slate-600 font-medium italic max-w-3xl mx-auto px-4 leading-tight">
              "We are not known by names but by a race — <span className="text-blue-600 font-bold not-italic">ORIONITE</span>"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-10">
            <Link href="/about" className="w-full sm:w-auto bg-slate-900 text-white hover:bg-slate-800 px-16 py-6 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-2xl hover:shadow-slate-200 flex items-center justify-center gap-2 group">
              Know About Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
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
                  <div className={`text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-heading`}>{stat.value}</div>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] font-heading">{stat.tag}</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spirit Section */}
      <section className="max-w-7xl mx-auto px-6 py-40 text-center">
        <h2 className="text-[12px] font-bold text-blue-600 uppercase tracking-[0.6em] mb-20 font-heading">The Orion Spirit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {spirits.map((spirit, i) => (
            <div 
              key={i} 
              className={`p-10 md:p-14 ${spirit.bgColor} border ${spirit.borderColor} rounded-[3rem] text-left space-y-8 transition-all hover:shadow-2xl hover:shadow-slate-200 group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-bl-full -mr-16 -mt-16 group-hover:bg-white/60 transition-colors"></div>
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div className={`${spirit.color} p-4 bg-white rounded-2xl inline-block shadow-sm group-hover:scale-110 transition-transform duration-500`}>{spirit.icon}</div>
                <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] font-heading">{spirit.tag}</span>
              </div>
              <div className="space-y-4 relative z-10">
                <h3 className={`text-3xl font-bold text-slate-900 tracking-tight font-heading uppercase`}>{spirit.title}</h3>
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
          <h2 className="text-[12px] font-bold text-blue-600 uppercase tracking-[0.6em] font-heading text-center">Stay Informed</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-slate-900 flex items-center justify-center gap-4 uppercase tracking-tighter">
            Bulletin <Megaphone className="w-8 h-8 text-blue-600" />
          </h3>
        </div>
        
        <div className="border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl bg-white">
          {typedNotices.length > 0 ? (
            typedNotices.map((notice: Notice, i: number) => (
              <div key={notice.id} className={`p-8 md:p-12 hover:bg-slate-50 transition-all cursor-default group ${i !== typedNotices.length - 1 ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-2 tracking-[0.2em] font-heading">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(notice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <span className="text-[8px] md:text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] font-heading">Active Notice</span>
                </div>
                <h4 className="font-bold text-slate-900 text-xl md:text-2xl leading-tight group-hover:text-blue-600 transition-colors">
                  {notice.title}
                </h4>
              </div>
            ))
          ) : (
            <div className="p-32 text-center text-slate-400 font-medium italic">No active notices found</div>
          )}
          <Link href="/notices" className="block w-full py-10 bg-slate-900 text-center text-[12px] font-bold uppercase tracking-[0.4em] text-white hover:bg-slate-800 transition-all">
            View All Announcements
          </Link>
        </div>
      </section>
    </main>
  );
}
