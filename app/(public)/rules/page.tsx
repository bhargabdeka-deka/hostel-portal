import { ShieldAlert, BookOpen, Clock, Users, Coffee, HelpCircle } from 'lucide-react';

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
    <div className="py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          Code of Conduct
        </div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">HOSTEL RULES</h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Maintaining a respectful and organized environment is key to our community success. Please adhere to the following guidelines.
        </p>
      </div>

      <div className="grid gap-8">
        {rules.map((rule, i) => (
          <div key={i} className="group bg-white border border-slate-100 rounded-[2.5rem] p-10 flex gap-8 items-start hover:shadow-2xl hover:border-blue-100 transition-all duration-500">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm flex-none">
              {rule.icon}
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">{rule.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{rule.details}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-blue-50/50 border border-blue-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm flex-none border border-blue-100">
          <HelpCircle className="w-8 h-8" />
        </div>
        <div>
           <h4 className="text-xl font-black text-slate-900 mb-2">Have specific questions?</h4>
           <p className="text-slate-500 font-medium">Contact the warden or superintendent for clarifications regarding any policy.</p>
        </div>
      </div>
    </div>
  );
}
