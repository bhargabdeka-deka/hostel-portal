import { Calendar, Users, GraduationCap, History, Users2, ShieldCheck, Waves, HeartPulse, Zap, CheckCircle2, Download } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
            Established Feb 1982
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] font-heading">
            A Legacy of Excellence: <br/><span className="text-blue-600">The Orion Story</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
            Deeply rooted in the academic excellence of Jorhat Engineering College, Hostel 7—famously known as ORION—has been a cornerstone of student life for over four decades.
          </p>
        </div>
        <div className="flex-1 w-full">
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="/hero-hostel.jpeg" 
              alt="ORION Hostel" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Calendar className="w-6 h-6 text-blue-600" />, value: "42+", label: "Years of History" },
            { icon: <Users className="w-6 h-6 text-green-600" />, value: "5000+", label: "Glorious Alumni" },
            { icon: <GraduationCap className="w-6 h-6 text-purple-600" />, value: "JEC", label: "Hostel 7 Identity" },
          ].map((stat, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-10 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* History & Culture */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-8">
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
              <History className="w-6 h-6 text-slate-900" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-heading">Our History</h2>
          </div>
          <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
            <p>
              In February 1982, ORION opened its doors to the brightest minds of the region. Founded on the principles of discipline and camaraderie, the hostel was named after the prominent constellation, symbolizing a beacon of light.
            </p>
            <p>
              Throughout the decades, Hostel 7 has evolved into a vibrant ecosystem of learning, sports, and cultural festivals that define the Jorhat Engineering College experience.
            </p>
          </div>
        </div>

        <div className="bg-blue-50/50 border border-blue-100/50 rounded-[2.5rem] p-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Users2 className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight font-heading">The Culture</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium mb-8">
            Hostel 7 is renowned for its unique "Sevenite" culture—a blend of fierce loyalty, intellectual rigor, and celebratory spirit.
          </p>
          <ul className="space-y-4">
            {[
              "Annual 'Phoenix' Festival Participation",
              "Legacy of Inter-Hostel Sports Dominance",
              "Mentorship-driven Senior-Junior relationships"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Administration Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden text-white shadow-3xl shadow-slate-200">
          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight font-heading">Administration</h2>
              <p className="text-slate-400 font-medium leading-relaxed max-w-md text-lg">
                Under the visionary guidance of our Superintendent, ORION Hostel maintains the highest standards of safety and academic environment.
              </p>
              
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 max-w-sm">
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Superintendent</div>
                <div className="text-3xl font-bold mb-4">Mr. Jiten Borgohain</div>
                <div className="text-slate-300 font-bold flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">📞</span>
                  +91 9101481714
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <ShieldCheck />, label: "24/7 Security" },
                { icon: <Waves />, label: "Hygiene First" },
                { icon: <HeartPulse />, label: "Health Care" },
                { icon: <Zap />, label: "Full Power Backup" },
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-3xl flex flex-col items-center justify-center text-center group hover:bg-white/10 transition-all duration-300">
                  <div className="mb-4 text-slate-400 group-hover:text-blue-400 transition-colors scale-125">{item.icon}</div>
                  <div className="text-sm font-bold tracking-tight uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 text-center space-y-8">
        <h2 className="text-5xl font-bold text-slate-900 tracking-tight font-heading">Want to know more?</h2>
        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          Reach out to us for any queries regarding admissions, rules, or alumni registration.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <Link href="/contact" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition shadow-2xl active:scale-95">
            Contact Us
          </Link>
          <button className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition active:scale-95 flex items-center gap-3">
            <Download className="w-4 h-4" />
            Download Hostel Manual
          </button>
        </div>
      </section>
    </main>
  );
}
