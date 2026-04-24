import { createClient } from "@/lib/supabase/server";
import { Bell, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from "@/lib/utils";

export default async function AllNoticesPage() {
  const supabase = await createClient();
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <div className="mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Bell className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Official Board</h1>
        </div>
        <p className="text-lg text-slate-500 max-w-2xl">
          Stay informed with the latest updates, event announcements, and official news from the ORION Hostel administration.
        </p>
      </div>

      <div className="space-y-8">
        {notices && notices.length > 0 ? (
          notices.map((notice) => (
            <div key={notice.id} className="premium-card p-10 bg-white group hover:border-blue-200 transition-all duration-500">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 pb-8 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-blue-600"></div>
                  <h2 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    {notice.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(notice.created_at)}
                </div>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </p>
            </div>
          ))
        ) : (
          <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Bell className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-400 uppercase tracking-widest">No Active Notices</h3>
            <p className="text-slate-400 text-sm mt-2">The board is currently clear. Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
