import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Bell, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Official Notice Board | ORION Hostel, JEC",
  description:
    "Stay updated with the latest official announcements, event notices, and administrative updates from ORION Hostel (Hostel No 7), Jorhat Engineering College, Assam.",
  alternates: {
    canonical: "https://www.orionjech7.site/notices",
  },
  openGraph: {
    title: "Notice Board | ORION Hostel Announcements",
    description:
      "Official notices and announcements from ORION Hostel administration — Hostel No 7, Jorhat Engineering College, Assam.",
    url: "https://www.orionjech7.site/notices",
  },
};

export default async function AllNoticesPage() {
  const supabase = await createClient();
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-5xl mx-auto pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-x-hidden">
      <div className="mb-12 md:mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold text-[11px] tracking-tight mb-8 transition-colors font-sans">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
            <Bell className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-none font-sans">Official notice board</h1>
        </div>
        <p className="text-base md:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
          Stay informed with the latest updates, event announcements, and official news from the ORION Hostel administration.
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {notices && notices.length > 0 ? (
          notices.map((notice) => (
            <div key={notice.id} className="p-6 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm group hover:border-blue-200 transition-all duration-500">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-slate-50">
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
                  <div className="w-1.5 h-6 bg-indigo-600 shrink-0"></div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight truncate flex-1">
                    {notice.title}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 tracking-tight bg-indigo-50 px-4 py-2 rounded-full w-fit font-sans shrink-0">
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
            <h3 className="text-lg md:text-xl font-bold text-slate-400 tracking-tight font-sans">No current announcements</h3>
            <p className="text-slate-400 font-medium text-sm mt-2 font-sans">The board is currently clear.</p>
          </div>
        )}
      </div>
    </div>
  );
}
