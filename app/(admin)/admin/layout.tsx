import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  UserCheck, 
  Settings, 
  LogOut,
  Search,
  Bell,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { Footer } from '@/components/shared/Footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const menu = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Monitors', href: '/admin/manage-monitors', icon: UserCheck },
    { name: 'Achievements', href: '/admin/manage-achievements', icon: Trophy },
    { name: 'Alumni', href: '/admin/alumni', icon: Users },
    { name: 'Access Control', href: '/admin/manage-users', icon: ShieldCheck },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform border-2 border-white">
              <img src="/hostel_logo.jpeg" alt="ORION Logo" className="w-full h-full object-cover scale-110" />
            </div>
            <div>
              <span className="font-black text-slate-900 tracking-tighter text-xl block leading-none uppercase font-heading">ORION</span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Admin Panel</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {menu.map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <item.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-900">
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-6 space-y-2 border-t border-slate-100">
          <form action="/auth/signout" method="post">
            <button 
              className="w-full flex items-center gap-4 p-4 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-600 transition-all group"
              suppressHydrationWarning
            >
              <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
              Logout
            </button>
          </form>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-white">
               <img src="/hostel_logo.jpeg" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div className="overflow-hidden">
            <div className="text-[11px] font-bold text-slate-900 truncate">Admin User</div>
            <div className="text-[10px] text-slate-400 font-medium truncate uppercase">ORION Admin</div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6 flex-1">
             <div className="text-sm font-bold text-slate-900 uppercase tracking-tight">ORION Admin</div>
             <div className="relative max-w-md w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  className="w-full pl-12 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                  suppressHydrationWarning
                />
             </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              className="relative text-slate-400 hover:text-slate-900 transition-colors"
              suppressHydrationWarning
            >
              <Bell className="w-5 h-5" />
              <div className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></div>
            </button>
            <button 
              className="text-slate-400 hover:text-slate-900 transition-colors"
              suppressHydrationWarning
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100 shadow-sm">
               <img src="/hostel_logo.jpeg" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-10 flex-1">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
