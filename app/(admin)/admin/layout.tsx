"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Trophy, 
  UserCheck, 
  Settings, 
  LogOut,
  Search,
  Bell,
  ShieldCheck,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/shared/Footer';
import { createClient } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch pending alumni count
  useEffect(() => {
    const fetchPendingCount = async () => {
      const supabase = createClient();
      const { count, error } = await supabase
        .from('alumni')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (!error && count !== null) {
        setPendingCount(count);
      }
    };

    fetchPendingCount();
    
    // Set up real-time subscription
    const supabase = createClient();
    const channel = supabase
      .channel('alumni-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alumni' }, () => {
        fetchPendingCount();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Close sidebar on navigation
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const menu = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Monitors', href: '/admin/manage-monitors', icon: UserCheck },
    { name: 'Achievements', href: '/admin/manage-achievements', icon: Trophy },
    { name: 'Alumni', href: '/admin/alumni', icon: Users },
    { name: 'Access Control', href: '/admin/manage-users', icon: ShieldCheck },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg group-hover:scale-105 transition-transform border-2 border-white">
            <img src="/hostel_logo.jpeg" alt="ORION Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <div>
            <span className="font-black text-slate-900 tracking-tighter text-xl block leading-none uppercase">ORION</span>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Admin Panel</span>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                isActive ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" : "hover:bg-slate-50 text-slate-500"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                <span className={cn("text-[10px] font-black uppercase tracking-widest", isActive ? "text-white" : "group-hover:text-slate-900")}>
                  {item.name}
                </span>
                {item.name === 'Alumni' && pendingCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center animate-pulse">
                    {pendingCount}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 space-y-2 border-t border-slate-100">
        <form action="/auth/signout" method="post">
          <button 
            suppressHydrationWarning
            className="w-full flex items-center gap-4 p-4 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-all group"
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
          <div className="text-[10px] text-slate-400 font-black uppercase truncate">ORION Admin</div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[70] w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-500 lg:sticky lg:translate-x-0 lg:h-screen",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Main Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4 lg:gap-6 flex-1">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
             >
               <Menu className="w-6 h-6" />
             </button>
             <div className="hidden sm:block text-sm font-black text-slate-900 uppercase tracking-tight">Admin Page</div>
             <div className="relative max-w-md w-full ml-auto lg:ml-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search records..." 
                  className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
                />
             </div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6 ml-4 relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-slate-900 transition-colors hidden sm:block"
            >
              <Bell className="w-5 h-5" />
              {pendingCount > 0 && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[7px] font-black text-white">{pendingCount}</span>
                </div>
              )}
            </button>

            {/* Notification Dropdown Card */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-100 rounded-3xl shadow-2xl shadow-slate-900/10 animate-in slide-in-from-top-2 duration-300 z-[100] overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
                    <span className="text-[9px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-full">{pendingCount} New</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Recent updates across your portal</p>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {pendingCount > 0 ? (
                    <Link 
                      href="/admin/alumni"
                      onClick={() => setShowNotifications(false)}
                      className="flex items-start gap-4 p-5 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Users className="w-5 h-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-tight">
                          Alumni Registration Notification
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          There are <span className="font-black text-blue-600">{pendingCount}</span> new alumni requests waiting for your approval.
                        </p>
                        <div className="flex items-center gap-1 text-[9px] font-black text-blue-600 uppercase tracking-widest pt-1">
                          Review Now <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="p-12 text-center space-y-3">
                      <Bell className="w-10 h-10 text-slate-100 mx-auto" />
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">All caught up!</p>
                    </div>
                  )}
                </div>
                
                {pendingCount > 0 && (
                  <Link 
                    href="/admin/alumni"
                    onClick={() => setShowNotifications(false)}
                    className="block p-4 bg-slate-50 text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-100 transition-colors border-t border-slate-100"
                  >
                    View All Activity
                  </Link>
                )}
              </div>
            )}

            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100 shadow-sm shrink-0">
              <img src="/hostel_logo.jpeg" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-4 lg:p-10 flex-1">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
