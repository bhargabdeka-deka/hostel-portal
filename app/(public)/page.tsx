import { createClient } from "@/lib/supabase/server";
import Link from 'next/link';
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

export default async function HomePage() {
  const supabase = await createClient();
  
  // Fetch Latest Data for Notices
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4);

  const stats = [
    { label: 'Established', value: '1982', icon: <Calendar className="w-5 h-5 text-blue-600" /> },
    { label: 'Capacity', value: '75', icon: <Users className="w-5 h-5 text-green-600" /> },
    { label: 'Legacy', value: '40+ Years', icon: <Award className="w-5 h-5 text-purple-600" /> },
  ];

  const spirits = [
    { 
      title: 'Brotherhood', 
      desc: 'More than just roommates, we are a family. The bonds formed within these walls last a lifetime, creating a support system that spans generations.', 
      icon: <Users2 className="w-6 h-6" />,
      bg: 'bg-blue-50',
      text: 'text-blue-700'
    },
    { 
      title: 'Academics', 
      desc: 'A legacy of engineering excellence. Orionites consistently rank among the toppers of Jorhat Engineering College, fostering a culture of peer learning.', 
      icon: <GraduationCap className="w-6 h-6" />,
      bg: 'bg-green-50',
      text: 'text-green-700'
    },
    { 
      title: 'Sports Excellence', 
      desc: 'Dominating the field. From the cricket pitch to the football ground, the Orionite grit is unmatched in every inter-hostel competition.', 
      icon: <Trophy className="w-6 h-6" />,
      bg: 'bg-purple-50',
      text: 'text-purple-700'
    },
  ];

  const alumni = [
    {
      name: 'Dr. Arnab Baruah',
      role: 'Batch of 1988 | Senior VP, TechCorp',
      quote: "Orion didn't just give me a room, it gave me the character to lead teams globally.",
      image: '/alumni-arnab.png'
    },
    {
      name: 'Siddharth Saikia',
      role: 'Batch of 2005 | IAS Officer',
      quote: "The discipline and brotherhood of Hostel 7 are what I carry into my public service every day.",
      image: '/alumni-siddharth.png'
    },
    {
      name: 'Rajdeep Gogoi',
      role: 'Batch of 2012 | Founder, BuildSmart',
      quote: "My first startup idea was born in the common room of Orion.",
      image: '/alumni-rajdeep.png'
    }
  ];

  return (
    <main className="bg-background min-h-screen relative selection:bg-blue-500/20 overflow-x-hidden">
      {/* Background is handled by GridBackground in layout.tsx */}

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img src="/hero-hostel.jpeg" alt="Orion Hostel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#020617]/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto py-24 text-center space-y-8 md:space-y-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[8px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
            Hostel No 7 • Jorhat Engineering College
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none">
              ORION
            </h1>
            <p className="text-lg sm:text-xl md:text-3xl text-blue-100 font-medium italic opacity-90 max-w-2xl mx-auto px-4 leading-tight">
              "We are not known by names but by a race — <span className="text-white font-bold not-italic">ORIONITE</span>"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <Link href="/about" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-blue-50 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-2 group">
              Know About Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 md:p-8 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spirit Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-16">The Orion Spirit</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {spirits.map((spirit, i) => (
            <div key={i} className={`p-8 md:p-10 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] text-left space-y-6 transition-all hover:-translate-y-2 hover:bg-slate-900 group`}>
              <div className="text-blue-400 group-hover:scale-110 transition-transform">{spirit.icon}</div>
              <h3 className={`text-xl font-black text-white uppercase tracking-tight`}>{spirit.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {spirit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Notices Section */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Updates & Information</h2>
          <h3 className="text-3xl md:text-4xl font-black text-white flex items-center justify-center gap-3 uppercase tracking-tighter">
            Latest Notices <Megaphone className="w-6 h-6 text-blue-500" />
          </h3>
        </div>
        
        <div className="border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl bg-slate-950/90 backdrop-blur-xl">
          {notices && notices.length > 0 ? (
            notices.map((notice, i) => (
              <div key={notice.id} className={`p-6 md:p-8 hover:bg-white/5 transition-colors ${i !== notices.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div className="text-[10px] font-black text-slate-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
                  <Calendar className="w-3 h-3" />
                  {new Date(notice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h4 className="font-bold text-white text-base md:text-lg leading-tight hover:text-blue-400 cursor-pointer transition-colors">
                  {notice.title}
                </h4>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-slate-500 font-medium italic">No active notices found</div>
          )}
          <Link href="/notices" className="block w-full py-6 bg-white text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 hover:bg-slate-100 transition-all">
            Browse All Notices
          </Link>
        </div>
      </section>
    </main>
  );
}
