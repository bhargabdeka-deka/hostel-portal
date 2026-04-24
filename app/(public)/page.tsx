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
    <main className="bg-white min-h-screen relative selection:bg-blue-100">
      {/* Premium Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[-10%] w-[45%] h-[45%] bg-slate-100/40 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-50/20 rounded-full blur-[100px]"></div>
        {/* Subtle mesh point */}
        <div className="absolute top-[20%] left-[60%] w-[30%] h-[30%] bg-blue-200/10 rounded-full blur-[160px] animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-hostel.jpeg" 
            alt="Orion Hostel" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center space-y-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
            Hostel No 7 • Jorhat Engineering College
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase">
              ORION
            </h1>
            <p className="text-xl md:text-3xl text-blue-100 font-medium italic opacity-90">
              "We are not known by names but by a race — <span className="text-white font-bold not-italic">ORIONITE</span>"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <Link href="/about" className="bg-white text-slate-900 hover:bg-blue-50 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 group">
              Know About Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spirit Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-12">The Orion Spirit</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {spirits.map((spirit, i) => (
            <div key={i} className={`p-10 ${spirit.bg} rounded-[2rem] text-left space-y-6 transition-transform hover:-translate-y-1`}>
              <div className={`${spirit.text}`}>{spirit.icon}</div>
              <h3 className={`text-xl font-bold ${spirit.text}`}>{spirit.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {spirit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Notices Section */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">Updates & Information</h2>
          <h3 className="text-3xl font-black text-slate-900 flex items-center justify-center gap-3">
            Latest Notices <Megaphone className="w-6 h-6 text-blue-600" />
          </h3>
        </div>
        
        <div className="border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-100/50">
          {notices && notices.length > 0 ? (
            notices.map((notice, i) => (
              <div key={notice.id} className={`p-8 bg-white hover:bg-slate-50 transition-colors ${i !== notices.length - 1 ? 'border-b border-slate-50' : ''}`}>
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {new Date(notice.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h4 className="font-bold text-slate-900 text-lg leading-tight hover:text-blue-600 cursor-pointer transition-colors">
                  {notice.title}
                </h4>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-slate-400 font-medium">No active notices found</div>
          )}
          <Link href="/notices" className="block w-full py-6 bg-slate-900 text-center text-[11px] font-black uppercase tracking-widest text-white hover:bg-slate-800 transition-all">
            Browse All Notices
          </Link>
        </div>
      </section>
    </main>
  );
}
