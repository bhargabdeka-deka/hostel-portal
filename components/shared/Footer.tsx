import { Navigation } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950/90 backdrop-blur-xl pt-24 pb-12 px-6 relative overflow-hidden border-t border-white/5">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-16">
          <div className="max-w-sm space-y-6">
            <h3 className="text-2xl font-black tracking-tighter text-white uppercase font-heading">
              ORION
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Building the future leaders of engineering through community, discipline, and a shared legacy since 1982. A sanctuary for excellence at Jorhat Engineering College.
            </p>
          </div>
          
          <div className="flex flex-col gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-white fill-white shrink-0 -rotate-45" />
                <p className="text-white text-base md:text-lg font-medium tracking-tight border-b border-white/20 pb-1">
                  Jorhat Engineering College, Garmur, Jorhat, Assam, 785007, India
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-white text-base md:text-lg font-bold">
                Copyright © BhargabDeka 2026.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex justify-center md:justify-start">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Sevenite Legacy • Est. 1982
          </p>
        </div>
      </div>
    </footer>
  );
}
