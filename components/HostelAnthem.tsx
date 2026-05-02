"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn, Music2 } from 'lucide-react';

export default function HostelAnthem() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <section className="max-w-7xl mx-auto px-8 py-20 text-center">
      {/* Section Label and Headers */}
      <div className="flex flex-col items-center justify-center space-y-6 mb-16">
        <div className="flex items-center justify-center gap-6 sm:gap-10 opacity-80 sm:opacity-60">
          <div className="h-px w-16 sm:w-24 bg-slate-300"></div>
          <h2 className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-jakarta whitespace-nowrap">HOSTEL IDENTITY</h2>
          <div className="h-px w-16 sm:w-24 bg-slate-300"></div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0F172A] tracking-[-0.05em] font-jakarta leading-[1.1]">Orion Hostel Anthem</h3>
          <p className="text-[#C8A96B] font-bold tracking-tight text-lg sm:text-2xl font-jakarta">Lyrics & Composition by Our Respected Super Senior</p>
        </div>

        <p className="max-w-3xl mx-auto text-slate-500 text-base sm:text-lg md:text-xl leading-relaxed font-medium font-sans mt-8 px-4 opacity-90">
          “Our hostel anthem reflects the pride, unity, discipline, brotherhood, and enduring legacy of Orion. Written by our respected super senior, it embodies the spirit of generations of Orionites and stands as a symbol of our shared identity.”
        </p>
      </div>

      {/* Preview Card Section */}
      <div className="max-w-2xl mx-auto px-4">
        <div 
          className="relative bg-white p-6 sm:p-8 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.08)] overflow-hidden group transition-all duration-700 hover:-translate-y-2"
        >
          {/* Subtle Decorative Accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8A96B]/5 rounded-bl-full -mr-24 -mt-24 transition-colors duration-1000 group-hover:bg-[#C8A96B]/10 pointer-events-none"></div>
          
          <div 
            className="relative aspect-[3/4.5] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-white border border-slate-100 cursor-pointer shadow-inner"
            onClick={() => setIsOpen(true)}
          >
            <Image 
              src="/hostel_song.png" 
              alt="Orion Hostel Anthem Lyrics Preview" 
              fill 
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-all duration-700 flex items-center justify-center opacity-0 group-hover:opacity-100">
               <div className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md border border-white/40 flex items-center justify-center text-[#0F172A] scale-90 group-hover:scale-100 transition-all duration-500 shadow-xl">
                  <ZoomIn className="w-8 h-8" />
               </div>
            </div>
          </div>
          
          <div className="mt-10 sm:mt-16 relative z-10">
            <button 
              className="inline-flex items-center gap-4 px-10 sm:px-16 py-5 sm:py-6 bg-[#0F172A] text-white rounded-full text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] hover:bg-[#1E293B] hover:shadow-2xl hover:shadow-[#0F172A]/30 transition-all duration-500 group/btn font-jakarta"
              onClick={() => setIsOpen(true)}
            >
              <Music2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-500" />
              <span>VIEW FULL LYRICS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Premium Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-500"
          onClick={() => setIsOpen(false)}
        >
          {/* Floating Close Button */}
          <button 
            className="fixed top-6 right-6 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110] border border-white/10 group backdrop-blur-xl"
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
            }}
            aria-label="Close lyrics"
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          {/* Scrollable Container for Long Lyrics */}
          <div 
            className="w-full h-full flex flex-col items-center animate-in zoom-in-95 duration-700 overflow-y-auto selection:bg-[#C8A96B]/30 custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container with Paper Aesthetic */}
            <div className="w-full max-w-4xl py-8 sm:py-16 md:py-20 px-4 sm:px-8 flex flex-col items-center">
              <div className="relative w-full bg-white shadow-[0_30px_100px_rgba(0,0,0,0.6)] rounded-sm overflow-hidden ring-1 ring-white/10">
                <img 
                  src="/hostel_song.png" 
                  alt="Orion Hostel Anthem Official Lyrics" 
                  className="w-full h-auto block object-contain"
                />
              </div>
              
              <div className="mt-12 text-center pb-8 opacity-40">
                <p className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] font-jakarta">Official Orion Hostel Anthem • Hostel Identity</p>
                <p className="text-white/60 text-[9px] mt-2 font-medium font-sans">© Orion Hostel — All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
