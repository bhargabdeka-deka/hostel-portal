"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (pathname.startsWith('/admin')) return null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/achievements' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Memories', href: '/memories' },
    { name: 'Rules', href: '/rules' },
    { name: 'Contact', href: '/contact' },
  ];

  const isHome = pathname === '/';

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-[100] transition-all duration-500">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16 h-20 md:h-28 flex items-center justify-between gap-6 md:gap-8">
          <Link href="/" className={cn(
            "flex items-center gap-3 sm:gap-4 text-2xl md:text-3xl font-black tracking-[-0.05em] group font-jakarta transition-colors duration-300 relative z-[101]",
            (isHome && !isOpen) ? "text-white" : "text-[#0F172A]"
          )}>
            <div className={cn(
              "w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-all duration-500 relative shadow-xl border-2",
              (isHome && !isOpen) ? "border-white ring-4 ring-indigo-50/10" : "border-slate-100 ring-4 ring-slate-50"
            )}>
              <Image 
                src="/hostel_logo.jpeg" 
                alt="Orion Hostel Logo" 
                fill
                className="object-cover scale-110" 
              />
            </div>
            <span className={cn(
              "tracking-[-0.04em] transition-all duration-500 text-lg sm:text-xl md:text-2xl lg:text-3xl",
              (isHome && !isOpen) ? "bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent drop-shadow-sm" : "text-[#0F172A]"
            )}>
              Orion
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-10 xl:gap-14 items-center h-full">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 relative h-full flex items-center group font-jakarta"
              >
                {(pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) && (
                  <div className="absolute bottom-8 left-0 right-0 h-px bg-[#C8A96B] shadow-[0_0_8px_rgba(200,169,107,0.4)]"></div>
                )}
                <span className={cn(
                  "transition-all duration-500",
                  (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) 
                    ? 'text-[#C8A96B]' 
                    : (isHome && !isOpen) ? 'text-white/60 group-hover:text-white group-hover:scale-105' : 'text-slate-500 group-hover:text-[#0F172A] group-hover:scale-105'
                )}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:hidden relative z-[101]">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-3 rounded-2xl transition-all duration-300 outline-none",
                (isHome && !isOpen) ? "text-white hover:bg-white/10" : "text-[#0F172A] hover:bg-slate-100"
              )}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[90] bg-white/98 backdrop-blur-2xl lg:hidden transition-all duration-500 flex flex-col items-center justify-center space-y-8",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        {navLinks.map((link, i) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-2xl font-bold tracking-[0.1em] transition-all duration-500",
                pathname === link.href ? "text-indigo-600 scale-110" : "text-slate-500",
                isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );
}
