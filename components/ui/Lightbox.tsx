"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LightboxProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}

export default function Lightbox({ src, alt, children }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scroll when lightbox is open
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
    <>
      <div 
        onClick={() => setIsOpen(true)} 
        className="group relative cursor-pointer overflow-hidden"
      >
        {children}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-500">
                <ZoomIn className="w-6 h-6" />
            </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-[110] border border-white/10 group"
            onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
            }}
          >
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div 
            className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-500"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
              <Image 
                src={src} 
                alt={alt} 
                fill 
                className="object-contain shadow-2xl"
                quality={100}
                priority
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-bold text-lg tracking-tight drop-shadow-lg">{alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
