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
    { name: 'Rules', href: '/rules' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-[100] transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-20 h-20 md:h-28 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 text-2xl md:text-3xl font-black tracking-tighter text-slate-900 group font-heading">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-all duration-500 relative shadow-lg border-2 border-white">
              <Image 
                src="/hostel_logo.jpeg" 
                alt="ORION Hostel Logo" 
                fill
                className="object-cover scale-110" 
              />
            </div>
            ORION
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-12 items-center h-full">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-[15px] font-semibold tracking-tight transition-all duration-300 relative h-full flex items-center group font-jakarta"
              >
                {pathname === link.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-700 rounded-full"></div>
                )}
                <span className={cn(
                  "transition-all duration-300 drop-shadow-sm",
                  pathname === link.href ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                )}>
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[90] bg-white/98 backdrop-blur-2xl md:hidden transition-all duration-500 flex flex-col items-center justify-center space-y-8",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
      )}>
        {navLinks.map((link, i) => (
          <Link 
            key={link.href} 
            href={link.href}
            className={cn(
              "text-2xl font-bold uppercase tracking-widest transition-all duration-500",
              pathname === link.href ? "text-blue-600 scale-110" : "text-slate-500",
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
