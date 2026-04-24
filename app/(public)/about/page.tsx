import { Calendar, Users, GraduationCap, History, Users2, ShieldCheck, Waves, HeartPulse, Zap, CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="bg-background selection:bg-blue-500/20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
            Established Feb 1982
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.1] uppercase">
            A Legacy of Excellence: <br/><span className="text-blue-500">The Orion Story</span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
            Deeply rooted in the academic excellence of Jorhat Engineering College, Hostel 7—famously known as ORION—has been a cornerstone of student life for over four decades.
          </p>
        </div>
        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
          <div className="aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/5">
            <img 
              src="/hostel_about.jpeg" 
              alt="ORION Hostel" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { icon: <Calendar className="w-6 h-6 text-blue-400" />, value: "42+", label: "Years of History" },
            { icon: <Users className="w-6 h-6 text-green-400" />, value: "800+", label: "Glorious Alumni" },
            { icon: <GraduationCap className="w-6 h-6 text-purple-400" />, value: "JEC", label: "Hostel 7 Identity" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-2xl hover:bg-white/10 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* History & Culture */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
              <History className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Our History</h2>
          </div>
          <div className="space-y-6 text-slate-400 leading-relaxed font-medium text-sm md:text-base">
            <p>
              In February 1982, ORION opened its doors to the brightest minds of the region. Founded on the principles of discipline and camaraderie, the hostel was named after the prominent constellation, symbolizing a beacon of light.
            </p>
            <p>
              Throughout the decades, Hostel 7 has evolved into a vibrant ecosystem of learning, sports, and cultural festivals that define the Jorhat Engineering College experience.
            </p>
          </div>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] p-8 md:p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shadow-sm shrink-0">
              <Users2 className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase">The Culture</h2>
          </div>
          <p className="text-slate-400 leading-relaxed font-medium mb-8 text-sm md:text-base">
            Hostel 7 is renowned for its unique "Sevenite" culture—a blend of fierce loyalty, intellectual rigor, and celebratory spirit.
          </p>
          <ul className="space-y-4">
            {[
              "Annual 'Phoenix' Festival Participation",
              "Legacy of Inter-Hostel Sports Dominance",
              "Mentorship-driven Senior-Junior relationships"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300 font-black text-xs md:text-sm uppercase tracking-tight">
                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities & Infrastructure Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-white/5 border border-white/5 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 relative overflow-hidden">
          <div className="max-w-4xl space-y-8 relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
              Hostel Infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase leading-tight">
              A Home Built for <span className="text-blue-500">Excellence.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
              <div className="space-y-6 text-slate-400 font-medium leading-relaxed text-sm md:text-base">
                <p>
                  Our architectural identity is defined by a distinctive **H-shaped structure** that houses 32 resident rooms, offering a symmetric and balanced environment for focused study and social bonding. 
                </p>
                <p>
                  The heartbeat of Orion is its grand **Common Room**—a space that breathes pride and legacy. Adorned with decades of trophies and commendations, it serves as the prestigious venue for our Freshers' and Farewell ceremonies.
                </p>
              </div>
              <div className="space-y-6 text-slate-400 font-medium leading-relaxed text-sm md:text-base">
                <p>
                  We champion a holistic student experience, balancing academic rigor with physical vitality. From our specialized **Gym-cum-Library** to our communal mess, every corner is designed for growth.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Table Tennis", "Chess", "Cricket", "Football", "Volleyball", "Badminton"].map((sport) => (
                    <span key={sport} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black uppercase text-slate-500 tracking-widest shadow-sm">
                      {sport}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {[
                { label: "32 Resident Rooms", sub: "Spacious Living" },
                { label: "Common Room", sub: "Legacy Center" },
                { label: "Gym & Library", sub: "Dual Wellness" },
                { label: "Modern Facilities", sub: "Hygiene Focused" },
              ].map((item, i) => (
                <div key={i} className="bg-[#020617] p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl text-center space-y-2 group hover:bg-white/5 transition-all duration-500">
                  <div className="text-sm md:text-base font-black text-white leading-tight">{item.label}</div>
                  <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">Want to know more?</h2>
        <p className="text-slate-500 font-medium text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Reach out to us for any queries regarding admissions, rules, or alumni registration.
        </p>
        <div className="flex justify-center pt-6">
          <Link href="/contact" className="w-full sm:w-auto bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition shadow-2xl active:scale-95">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
