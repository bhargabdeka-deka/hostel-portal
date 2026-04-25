import { Calendar, Users, GraduationCap, History, Users2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

export const revalidate = 86400; // Revalidate once a day

export default function AboutPage() {
  return (
    <main className="bg-[#fffcf5] min-h-screen selection:bg-amber-500/20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold tracking-tight">
            Established February 1982
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-[1.1] font-jakarta">
            A Legacy of Excellence: <br/><span className="text-indigo-600">The Orion Story</span>
          </h1>
          <p className="text-base md:text-xl text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
            Deeply rooted in the academic excellence of Jorhat Engineering College, Hostel 7—famously known as ORION—has been a cornerstone of student life for over four decades.
          </p>
        </div>
        <div className="flex-1 w-full max-w-2xl lg:max-w-none">
          <div className="aspect-[4/3] rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 relative">
            <Image 
              src="/hostel_about.jpeg" 
              alt="ORION Hostel" 
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
            { tag: 'Legacy', icon: <Calendar className="w-6 h-6" />, value: "42+", label: "Years of History", color: 'text-sky-600', bgColor: 'bg-sky-50', borderColor: 'border-sky-100' },
            { tag: 'Community', icon: <Users className="w-6 h-6" />, value: "800+", label: "Glorious Alumni", color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
            { tag: 'Branding', icon: <GraduationCap className="w-6 h-6" />, value: "JEC", label: "Hostel 7 Identity", color: 'text-violet-600', bgColor: 'bg-violet-50', borderColor: 'border-violet-100' },
          ].map((stat, i) => (
            <div key={i} className={`group ${stat.bgColor} border ${stat.borderColor} rounded-3xl p-8 md:p-10 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:scale-105`}>
              <div className="w-full flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-white flex items-center justify-center ${stat.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  {stat.icon}
                </div>
                <span className={`text-[11px] font-bold ${stat.color} tracking-tight font-sans`}>{stat.tag}</span>
              </div>
              <div className={`text-4xl font-bold ${stat.color} mb-1 tracking-tight font-sans`}>{stat.value}</div>
              <div className="text-[12px] font-bold text-slate-900 tracking-tight font-jakarta">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* History & Culture */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-blue-50/50 border border-blue-100 rounded-[2.5rem] p-8 md:p-12 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
              <History className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-heading">Our History</h2>
          </div>
          <div className="space-y-6 text-slate-600 leading-relaxed font-medium text-sm md:text-base">
            <p>
              In February 1982, ORION opened its doors to the brightest minds of the region. Founded on the principles of discipline and camaraderie, the hostel was named after the prominent constellation, symbolizing a beacon of light.
            </p>
            <p>
              Throughout the decades, Hostel 7 has evolved into a vibrant ecosystem of learning, sports, and cultural festivals that define the Jorhat Engineering College experience.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50/50 border border-emerald-100 rounded-[2.5rem] p-8 md:p-12 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
              <Users2 className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-heading">The Culture</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium mb-8 text-sm md:text-base">
            Hostel 7 is renowned for its unique "Sevenite" culture—a blend of fierce loyalty, intellectual rigor, and celebratory spirit.
          </p>
          <ul className="space-y-4">
            {[
              "Annual 'Phoenix' Festival Participation",
              "Legacy of Inter-Hostel Sports Dominance",
              "Mentorship-driven Senior-Junior relationships"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-bold text-xs md:text-sm uppercase tracking-tight">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Facilities & Infrastructure Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 relative overflow-hidden">
          <div className="max-w-4xl space-y-8 relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-600 text-[10px] font-bold tracking-tight">
              Hostel infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tighter leading-tight font-sans">
              A Home Built for <span className="text-indigo-600">Excellence.</span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-12">
              {[
                { tag: 'Housing', label: "32 Resident Rooms", sub: "Spacious Living", color: 'text-blue-600', border: 'border-blue-100' },
                { tag: 'Social', label: "Common Room", sub: "Legacy Center", color: 'text-amber-600', border: 'border-amber-100' },
                { tag: 'Health', label: "Gym & Library", sub: "Dual Wellness", color: 'text-rose-600', border: 'border-rose-100' },
                { tag: 'Standard', label: "Modern Facilities", sub: "Hygiene Focused", color: 'text-teal-600', border: 'border-teal-100' },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-6 md:p-8 rounded-3xl border ${item.border} shadow-lg text-center space-y-4 group transition-all duration-300 hover:scale-105`}>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className={`text-[10px] font-bold ${item.color} tracking-tight font-sans`}>{item.tag}</span>
                    <CheckCircle2 className={`w-4 h-4 ${item.color} opacity-20 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <div className="space-y-1">
                    <div className={`text-base font-bold ${item.color} leading-tight font-sans`}>{item.label}</div>
                    <div className={`text-[10px] font-bold ${item.color} tracking-tight font-sans`}>{item.sub}</div>
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
