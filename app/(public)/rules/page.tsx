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
    <div className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 max-w-5xl mx-auto overflow-x-hidden min-h-screen">
      <div className="text-center mb-16 md:mb-20">
        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-6 text-blue-600">
          Code of Conduct
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4 uppercase">HOSTEL RULES</h1>
        <p className="text-base md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
          Maintaining a respectful and organized environment is key to our community success. Please adhere to the following guidelines.
        </p>
      </div>

      <div className="grid gap-6 md:gap-8">
        {rules.map((rule, i) => (
          <div key={i} className="group bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col sm:flex-row gap-6 md:gap-8 items-start hover:shadow-lg hover:border-blue-100 transition-all duration-300">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
              {rule.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight uppercase">{rule.title}</h3>
              <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">{rule.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 md:mt-20 p-8 md:p-12 bg-slate-50 border border-slate-200 rounded-[2rem] md:rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 md:gap-10">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-md shrink-0 border border-slate-200">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div className="text-center md:text-left">
           <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2 uppercase">Have specific questions?</h4>
           <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">Contact the warden or superintendent for clarifications regarding any policy.</p>
        </div>
      </div>
    </div>
  );
}
