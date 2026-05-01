export default function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-24 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col items-center text-center space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-[-0.04em] font-jakarta">ORION</h2>
            <div className="h-px w-12 bg-[#C8A96B] mx-auto opacity-30"></div>
          </div>
          
          <div className="space-y-6">
            <p className="text-[10px] md:text-[11px] font-black text-white/40 uppercase tracking-[0.5em] font-jakarta leading-relaxed">
              Jorhat Engineering College <span className="mx-4 text-white/10">•</span> Hostel No. 7
            </p>
            <p className="text-sm md:text-base text-white/30 font-medium italic font-jakarta max-w-lg mx-auto opacity-80">
              "We are not known by names but by a race — ORIONITE"
            </p>
          </div>

          <div className="pt-10 border-t border-white/5 w-full">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] font-jakarta">
              &copy; {new Date().getFullYear()} ORION Portal <span className="mx-3">•</span> Legacy Since 1982
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
