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
  ChevronRight,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/shared/Footer';
import { createClient } from '@/lib/supabase/client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingAlumniCount, setPendingAlumniCount] = useState(0);
  const [pendingMemoriesCount, setPendingMemoriesCount] = useState(0);
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

  // Fetch pending counts
  useEffect(() => {
    const fetchPendingCounts = async () => {
      const supabase = createClient();
      
      // Alumni
      const { count: alumniCount } = await supabase
        .from('alumni')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (alumniCount !== null) setPendingAlumniCount(alumniCount);

      // Memories
      const { count: memoriesCount } = await supabase
        .from('memories')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (memoriesCount !== null) setPendingMemoriesCount(memoriesCount);
    };

    fetchPendingCounts();
    
    // Set up real-time subscription
    const supabase = createClient();
    const channel = supabase
      .channel('pending-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alumni' }, () => {
        fetchPendingCounts();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'memories' }, () => {
        fetchPendingCounts();
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
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, color: 'text-indigo-500' },
    { name: 'Monitors', href: '/admin/manage-monitors', icon: UserCheck, color: 'text-emerald-500' },
    { name: 'Gallery', href: '/admin/manage-achievements', icon: Trophy, color: 'text-violet-500' },
    { name: 'Alumni', href: '/admin/alumni', icon: Users, color: 'text-amber-500' },
    { name: 'Memories', href: '/admin/memories', icon: Heart, color: 'text-rose-500' },
    { name: 'Access Control', href: '/admin/manage-users', icon: ShieldCheck, color: 'text-sky-500' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg border-2 border-slate-100">
            <img src="/hostel_logo.jpeg" alt="ORION Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <div>
            <span className="font-black text-slate-900 dark:text-white tracking-tighter text-2xl block leading-none font-jakarta">Orion</span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-[0.3em]">Admin</span>
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
                isActive ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/50" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
              )}
            >
              <div className="flex items-center gap-4">
                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-white" : item.color)} />
                <span className={cn("text-[15px] font-bold tracking-tight", isActive ? "text-white" : "group-hover:text-slate-900 dark:group-hover:text-white")}>
                  {item.name}
                </span>
                {item.name === 'Alumni' && pendingAlumniCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center">
                    {pendingAlumniCount}
                  </div>
                )}
                {item.name === 'Memories' && pendingMemoriesCount > 0 && (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center">
                    {pendingMemoriesCount}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 space-y-2 border-t border-slate-200 dark:border-slate-800">
        <form action="/auth/signout" method="post">
          <button 
            suppressHydrationWarning
            className="w-full flex items-center gap-4 p-4 text-[13px] font-bold text-slate-500 hover:text-red-500 transition-all group tracking-tight"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500" />
            Logout
          </button>
        </form>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700">
          <img src="/hostel_logo.jpeg" alt="Admin" className="w-full h-full object-cover" />
        </div>
        <div className="overflow-hidden">
          <div className="text-[13px] font-bold text-slate-900 dark:text-white truncate tracking-tight">Admin User</div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold tracking-tight truncate">Orion Administrator</div>
        </div>
      </div>
    </>
  );

  const bgColors: Record<string, string> = {
    '/admin/dashboard': 'bg-[#fafafc]',
    '/admin/manage-monitors': 'bg-[#fafaf5]',
    '/admin/manage-achievements': 'bg-[#f9f9ff]',
    '/admin/alumni': 'bg-[#fdfdfd]',
    '/admin/manage-users': 'bg-[#fff9f9]',
    '/admin/manage-notices': 'bg-[#fffdf5]',
  };

  const currentBg = bgColors[pathname] || 'bg-white';

  return (
    <div className="flex min-h-screen bg-transparent font-sans selection:bg-blue-500/20">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-[70] w-72 bg-slate-50 dark:bg-[#0F172A] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-500 lg:sticky lg:translate-x-0 lg:h-screen",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </aside>

      {/* Main Area */}
      <main className={cn("flex-1 min-w-0 flex flex-col transition-colors duration-500", currentBg, "dark:bg-[#0F172A]")}>
        {/* Top Header */}
        <header className="h-20 bg-white/40 dark:bg-[#0F172A]/40 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-50">
          <div className="flex items-center gap-4 lg:gap-6 flex-1">
             <button 
               onClick={() => setIsSidebarOpen(true)}
               className="lg:hidden p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-colors"
             >
               <Menu className="w-6 h-6" />
             </button>
             <div className="hidden sm:block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] font-heading">Admin Panel</div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-6 ml-4 relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors hidden sm:block"
            >
              <Bell className="w-5 h-5" />
              {(pendingAlumniCount + pendingMemoriesCount) > 0 && (
                <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-[7px] font-black text-white">{pendingAlumniCount + pendingMemoriesCount}</span>
                </div>
              )}
            </button>

            {/* Notification Dropdown Card */}
            {showNotifications && (
              <div className={cn(
                "absolute right-0 top-full mt-4 w-96 bg-indigo-50/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-indigo-100 overflow-hidden transition-all duration-300 origin-top-right z-50",
                showNotifications ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
              )}>
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">Notifications</h3>
                    <p className="text-[11px] text-slate-600 font-medium">Recent portal updates</p>
                  </div>
                  {(pendingAlumniCount + pendingMemoriesCount) > 0 && (
                    <div className="px-3 py-1 bg-indigo-600 text-white rounded-full text-[10px] font-bold tracking-tight">
                      {pendingAlumniCount + pendingMemoriesCount} New
                    </div>
                  )}
                </div>

                <div className="max-h-[400px] overflow-y-auto">
                  {pendingAlumniCount + pendingMemoriesCount > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {pendingAlumniCount > 0 && (
                        <Link 
                          href="/admin/alumni" 
                          className="flex items-center gap-6 p-8 hover:bg-white/50 transition-colors group"
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 shadow-sm border border-indigo-100">
                            <Users className="w-7 h-7" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="text-sm font-bold text-slate-900 tracking-tight leading-tight">Alumni Request</div>
                            <p className="text-[12px] text-slate-600 font-medium">
                              <span className="font-bold text-indigo-600">{pendingAlumniCount}</span> Pending registrations
                            </p>
                          </div>
                        </Link>
                      )}
                      
                      {pendingMemoriesCount > 0 && (
                        <Link 
                          href="/admin/memories" 
                          className="flex items-center gap-6 p-8 hover:bg-white/50 transition-colors group"
                          onClick={() => setShowNotifications(false)}
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all shrink-0 shadow-sm border border-rose-100">
                            <Heart className="w-7 h-7" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="text-sm font-bold text-slate-900 tracking-tight leading-tight">New Memories</div>
                            <p className="text-[12px] text-slate-600 font-medium">
                              <span className="font-bold text-rose-500">{pendingMemoriesCount}</span> Pending stories
                            </p>
                          </div>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="p-12 text-center space-y-3">
                      <Bell className="w-10 h-10 text-indigo-200 mx-auto" />
                      <p className="text-[11px] font-bold text-slate-400 tracking-tight">All caught up!</p>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-indigo-100/30 text-center border-t border-indigo-50">
                  <button className="text-[11px] font-bold text-indigo-600 hover:text-indigo-900 transition-colors tracking-tight">
                    View all activity
                  </button>
                </div>
              </div>
            )}

            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shadow-sm shrink-0">
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
