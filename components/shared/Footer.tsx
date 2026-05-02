import { Navigation } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-24 pb-12 px-6 relative overflow-hidden border-t border-slate-800">
      {/* Premium ambient glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-16 md:gap-24">
          {/* LEFT: Branding & Mission */}
          <div className="max-w-md space-y-10">
            <h3 className="text-5xl font-black tracking-[-0.06em] text-white font-jakarta">
              Orion<span className="text-[#C8A96B]"></span>
            </h3>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-medium font-sans opacity-80">
              Building the future leaders of engineering through community, discipline, and a shared legacy since 1982. A sanctuary for excellence at Jorhat Engineering College.
            </p>
          </div>
          
          {/* RIGHT: Info & Legal */}
          <div className="flex flex-col gap-12 md:text-right md:items-end">
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] font-jakarta">Location</p>
              <a 
                href="https://maps.app.goo.gl/93zEARsiTheLytSk6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-slate-200 text-sm md:text-base font-medium tracking-tight hover:text-[#C8A96B] transition-colors max-w-xs md:ml-auto leading-relaxed font-sans"
              >
                Jorhat Engineering College, Garmur,<br/>Jorhat, Assam, 785007
              </a>
            </div>

            <div className="pt-4">
              <p className="text-slate-500 text-[10px] md:text-xs font-bold tracking-tight font-sans">
                Copyright © BhargabDeka 2026.
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[#C8A96B]/80 text-[10px] font-black tracking-[0.3em] sm:tracking-[0.6em] font-jakarta uppercase text-center md:text-left">
            The Orionite Legacy • Established 1982
          </p>
          <div className="hidden md:flex items-center gap-4 text-white/20">
             <div className="h-px w-24 bg-white/5" />
             <div className="w-1 h-1 rounded-full bg-indigo-500/30" />
             <div className="h-px w-24 bg-white/5" />
          </div>
        </div>
      </div>
    </footer>
  );
}
