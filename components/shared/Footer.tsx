import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 px-6 relative overflow-hidden">
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
          
          <div className="flex flex-wrap gap-12 md:gap-24">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6">Legal & Privacy</h4>
              <div className="flex flex-col gap-3">
                <Link href="/privacy" className="text-slate-300 hover:text-white text-sm font-medium transition-all hover:translate-x-1 inline-block">Privacy Policy</Link>
                <Link href="/terms" className="text-slate-300 hover:text-white text-sm font-medium transition-all hover:translate-x-1 inline-block">Terms of Service</Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6">Navigation</h4>
              <div className="flex flex-col gap-3">
                <Link href="https://maps.app.goo.gl/oPsdHkdkfGTbJfZ19" target="_blank" className="text-slate-300 hover:text-white text-sm font-medium transition-all hover:translate-x-1 inline-block">Campus Map</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex justify-center md:justify-start">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            © 2024 ORION Hostel 7 • All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
