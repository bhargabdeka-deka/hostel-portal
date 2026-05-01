import { Navigation } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-24 pb-12 px-6 relative overflow-hidden border-t border-slate-800">
      {/* Premium ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-500/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-12">
          <div className="max-w-sm space-y-6">
            <h3 className="text-3xl font-bold tracking-tighter text-white font-jakarta">
              Orion<span className="text-indigo-500">.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Building the future leaders of engineering through community, discipline, and a shared legacy since 1982. A sanctuary for excellence at Jorhat Engineering College.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <a 
                href="https://maps.app.goo.gl/93zEARsiTheLytSk6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                  <Navigation className="w-5 h-5 text-slate-300 fill-slate-300 shrink-0 -rotate-45 group-hover:text-white group-hover:fill-white transition-colors" />
                </div>
                <p className="text-slate-200 text-base md:text-lg font-medium tracking-tight border-b border-slate-800 pb-1 group-hover:border-indigo-500/50 group-hover:text-white transition-all max-w-sm leading-tight">
                  Jorhat Engineering College, Garmur, Jorhat, Assam, 785007, India
                </p>
              </a>
            </div>

            <div className="space-y-2">
              <p className="text-slate-400 text-sm md:text-base font-bold font-heading tracking-tight">
                Copyright © <span className="text-slate-200">BhargabDeka 2026.</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex justify-center md:justify-start">
          <p className="text-indigo-500 text-[10px] font-black tracking-[0.4em] font-sans uppercase">
            The Orionite Legacy • Established 1982
          </p>
        </div>
      </div>
    </footer>
  );
}
