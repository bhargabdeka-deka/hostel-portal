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
      <nav className="absolute top-0 left-0 right-0 z-[100] transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-20 h-24 md:h-32 flex items-center justify-between gap-4">
          <Link href="/" className={cn(
            "flex items-center gap-4 text-2xl md:text-3xl font-black tracking-[-0.05em] group font-jakarta transition-colors duration-300 relative z-[101]",
            (isHome && !isOpen) ? "text-white" : "text-[#0F172A]"
          )}>
            <div className={cn(
              "w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-all duration-500 relative shadow-xl border-2",
              (isHome && !isOpen) ? "border-white ring-4 ring-indigo-50" : "border-slate-100 ring-4 ring-slate-50"
            )}>
              <Image 
                src="/hostel_logo.jpeg" 
                alt="Orion Hostel Logo" 
                fill
                className="object-cover scale-110" 
              />
            </div>
            <span className={cn(
              "drop-shadow-lg transition-all duration-300",
              (isHome && !isOpen) ? "bg-gradient-to-br from-white via-white/80 to-white/60 bg-clip-text text-transparent" : "text-[#0F172A]"
            )}>
              Orion
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-6 xl:gap-12 items-center h-full">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative h-full flex items-center group font-jakarta"
              >
                {(pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) && (
                  <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-[#C8A96B] rounded-full shadow-[0_0_10px_rgba(200,169,107,0.5)]"></div>
                )}
                <span className={cn(
                  "transition-all duration-300 drop-shadow-sm",
                  (pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))) 
                    ? 'text-[#C8A96B]' 
                    : isHome ? 'text-white/80 group-hover:text-white' : 'text-slate-500 group-hover:text-[#0F172A]'
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
                "p-2 rounded-xl transition-all duration-300",
                (isHome && !isOpen) ? "text-white hover:bg-white/10" : "text-[#0F172A] hover:bg-slate-100"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                "text-2xl font-bold tracking-widest transition-all duration-500",
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
