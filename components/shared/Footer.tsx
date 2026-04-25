import { Navigation } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-indigo-50 pt-20 pb-12 px-6 relative overflow-hidden">
      {/* Decorative Gradient removed */}
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-12">
          <div className="max-w-sm space-y-6">
            <h3 className="text-2xl font-bold tracking-tighter text-slate-900 font-jakarta">
              Orion
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Building the future leaders of engineering through community, discipline, and a shared legacy since 1982. A sanctuary for excellence at Jorhat Engineering College.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <a 
                href="https://maps.app.goo.gl/93zEARsiTheLytSk6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-3 group cursor-pointer"
              >
                <Navigation className="w-5 h-5 text-slate-900 fill-slate-900 shrink-0 -rotate-45 group-hover:text-indigo-600 group-hover:fill-indigo-600 transition-colors" />
                <p className="text-slate-900 text-base md:text-lg font-medium tracking-tight border-b border-slate-300 pb-1 group-hover:border-indigo-600/50 group-hover:text-indigo-600 transition-all">
                  Jorhat Engineering College, Garmur, Jorhat, Assam, 785007, India
                </p>
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-slate-900 text-sm md:text-base font-bold font-heading tracking-tight">
                Copyright © BhargabDeka 2026.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-indigo-200 flex justify-center md:justify-start">
          <p className="text-indigo-600 text-[12px] font-bold tracking-[0.4em] font-jakarta">
            Orionite legacy .est. 1982
          </p>
        </div>
      </div>
    </footer>
  );
}
