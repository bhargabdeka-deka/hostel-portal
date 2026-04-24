"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  
  if (pathname.startsWith('/admin')) return null;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'Rules', href: '/rules' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100/50 shadow-sm shadow-slate-900/5">
      <div className="max-w-[1440px] mx-auto px-8 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-xl font-black tracking-tighter text-slate-900 group">
          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm">
            <img 
              src="/hostel_logo.jpeg" 
              alt="ORION Hostel Logo" 
              className="w-full h-full object-cover scale-110" 
            />
          </div>
          ORION
        </Link>
        <div className="hidden md:flex gap-10 items-center h-full">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 relative h-full flex items-center group`}
            >
              {pathname === link.href && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-900 rounded-b-full animate-in fade-in slide-in-from-top-2 duration-500"></div>
              )}
              <span className={`${pathname === link.href ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-700'}`}>
                {link.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
