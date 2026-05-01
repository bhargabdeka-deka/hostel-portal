import { Navigation } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-16 pb-10 px-6 relative overflow-hidden border-t border-slate-800">
      {/* Premium ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-500/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-12">
          <div className="max-w-sm space-y-6">
            <h3 className="text-4xl font-black tracking-[-0.05em] text-white font-jakarta">
              Orion<span className="text-[#C8A96B]">.</span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Building the future leaders of engineering through community, discipline, and a shared legacy since 1982. A sanctuary for excellence at Jorhat Engineering College.
            </p>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <a 
                href="https://maps.app.goo.gl/93zEARsiTheLytSk6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#C8A96B] transition-all duration-500">
                  <Navigation className="w-4 h-4 text-[#C8A96B] group-hover:text-[#0F172A] transition-colors" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-jakarta">Location</p>
                  <p className="text-slate-300 text-sm md:text-base font-medium tracking-tight border-b border-white/5 pb-1 group-hover:border-[#C8A96B]/50 group-hover:text-white transition-all max-w-xs leading-tight font-sans">
                    Jorhat Engineering College, Garmur, Jorhat, Assam, 785007
                  </p>
                </div>
              </a>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-jakarta">Crafted By</p>
              <p className="text-slate-400 text-xs md:text-sm font-bold font-heading tracking-tight">
                Copyright © <span className="text-slate-200">BhargabDeka 2026.</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex justify-center md:justify-start">
          <p className="text-[#C8A96B] text-[10px] font-black tracking-[0.4em] font-jakarta uppercase opacity-80">
            The Orionite Legacy • Established 1982
          </p>
        </div>
      </div>
    </footer>
  );
}
