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
    <div className="max-w-5xl mx-auto py-16 md:py-24 px-6 overflow-x-hidden">
      <div className="mb-12 md:mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shrink-0">
            <Bell className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase leading-none">Official Board</h1>
        </div>
        <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
          Stay informed with the latest updates, event announcements, and official news from the ORION Hostel administration.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {notices && notices.length > 0 ? (
          notices.map((notice) => (
            <div key={notice.id} className="p-8 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm group hover:border-blue-200 transition-all duration-500">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-slate-50">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-1.5 h-6 bg-blue-600 shrink-0"></div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight truncate">
                    {notice.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full w-fit">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(notice.created_at)}
                </div>
              </div>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed whitespace-pre-wrap font-medium">
                {notice.content}
              </p>
            </div>
          ))
        ) : (
          <div className="py-24 md:py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Bell className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-black text-slate-400 uppercase tracking-widest">No Active Notices</h3>
            <p className="text-slate-400 font-medium text-sm mt-2">The board is currently clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}
