import { ShieldAlert, BookOpen, Clock, Users, Coffee, HelpCircle } from 'lucide-react';

export const revalidate = 86400; // Revalidate once a day

export default function RulesPage() {
  const rules = [
    { 
      icon: <Clock />, 
      title: "Curfew Hours", 
      details: "Main gate closes at 10:00 PM on weekdays and 11:00 PM on weekends. Late entry requires prior permission from the Superintendent." 
    },
    { 
      icon: <Users />, 
      title: "Visitor Policy", 
      details: "Guests are allowed only in the common area until 8:00 PM. No overnight stay of visitors is permitted without written consent." 
    },
    { 
      icon: <Coffee />, 
      title: "Mess Timings", 
      details: "Breakfast: 7:30-9:00 AM | Lunch: 1:00-2:30 PM | Dinner: 8:00-9:30 PM. No food allowed inside personal rooms." 
    },
    { 
      icon: <ShieldAlert />, 
      title: "Discipline", 
      details: "Any form of ragging, substance abuse, or vandalism will result in immediate expulsion as per the JEC Board of Conduct." 
    }
  ];

  return (
    <main className="bg-[#fffbf2] min-h-screen selection:bg-amber-500/20">
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-5xl mx-auto overflow-x-hidden">
      <div className="text-center mb-16 md:mb-20">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-bold tracking-widest mb-6 text-indigo-600 font-jakarta">
          Code of conduct
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4 font-jakarta">Hostel rules</h1>
        <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Maintaining a respectful and organized environment is key to our community success. Please adhere to the following guidelines.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {rules.map((rule, i) => {
          const colors = [
            { bg: 'bg-sky-50/50', border: 'border-sky-100', iconBg: 'bg-sky-100/50', iconText: 'text-sky-600' },
            { bg: 'bg-emerald-50/50', border: 'border-emerald-100', iconBg: 'bg-emerald-100/50', iconText: 'text-emerald-600' },
            { bg: 'bg-violet-50/50', border: 'border-violet-100', iconBg: 'bg-violet-100/50', iconText: 'text-violet-600' },
            { bg: 'bg-rose-50/50', border: 'border-rose-100', iconBg: 'bg-rose-100/50', iconText: 'text-rose-600' },
          ];
          const color = colors[i % colors.length];
          return (
            <div key={i} className={`group ${color.bg} border ${color.border} rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col sm:flex-row gap-6 md:gap-8 items-start hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500`}>
              <div className={`w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center ${color.iconText} shadow-sm shrink-0 transition-transform duration-500 group-hover:scale-110`}>
                {rule.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-jakarta">{rule.title}</h3>
                <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed font-sans">{rule.details}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-16 md:mt-20 p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 md:gap-10">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-md shrink-0 border border-slate-200">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="text-center md:text-left">
           <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2 font-jakarta">Have specific questions?</h4>
           <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">Contact the warden or superintendent for clarifications regarding any policy.</p>
        </div>
      </div>
    </div>
    </main>
  );
}
