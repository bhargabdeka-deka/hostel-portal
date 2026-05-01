import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { MemoriesList } from "@/components/memories/MemoriesList";
import { MemorySubmissionForm } from "@/components/memories/MemorySubmissionForm";
import { BookHeart, Plus } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Memories | ORION Hostel, Jorhat Engineering College",
  description:
    "Stories of brotherhood, hostel life, unforgettable experiences, and the legacy of ORION. Read and share your hostel memories.",
  alternates: {
    canonical: "https://www.orionjech7.site/memories",
  },
  openGraph: {
    title: "ORION Memories | Stories of Brotherhood & Legacy",
    description:
      "A collection of stories and experiences shared by Orionites over four decades. From late-night sessions to cultural fests, explore the legacy of ORION Hostel.",
    url: "https://www.orionjech7.site/memories",
    images: [{ url: "/hero-hostel.jpeg", width: 1200, height: 630, alt: "ORION Hostel Memories — Jorhat Engineering College" }],
  },
};

export default async function MemoriesPage() {
  const supabase = await createClient();
  
  const { data: memories } = await supabase
    .from('memories')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  return (
    <main className="bg-transparent min-h-screen selection:bg-indigo-500/20 pb-40">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 lg:pt-48 pb-16 space-y-10 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-6">
          <div className="h-px w-12 bg-indigo-200"></div>
          <span className="text-[11px] font-black text-indigo-500 uppercase tracking-[0.4em] font-jakarta">The Orion Spirit</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-8">
            <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black text-slate-900 tracking-[-0.07em] leading-[0.8] font-jakarta">
              Memories<span className="text-indigo-600">.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed font-sans opacity-90">
              Stories of brotherhood, hostel life, and the legacy of ORION. A digital archive shared by Orionites across generations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 space-y-24">
        <div className="w-full">
          <MemoriesList memories={memories || []} />
        </div>
        
        {/* Submission Section - Now below the list, wider layout */}
        <div className="max-w-7xl mx-auto w-full space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            <div className="lg:col-span-2 bg-[#0F172A] rounded-[3.5rem] p-10 md:p-16 text-slate-50 shadow-2xl shadow-indigo-100/10 relative overflow-hidden group flex flex-col justify-center border border-slate-800">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 group-hover:rotate-45 transition-transform duration-1000 text-indigo-400">
                <BookHeart className="w-64 h-64" />
              </div>
              <div className="relative z-10 space-y-10">
                <h3 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[0.95] font-jakarta">Your story is part of ORION's history.</h3>
                <p className="text-slate-400 font-medium text-lg md:text-xl leading-relaxed max-w-md opacity-80">
                  Every Orionite has a unique story. Share your late-night memories and hostel victories with the world.
                </p>
                <div className="pt-8 flex items-center gap-6">
                  <div className="h-px w-20 bg-indigo-500/30" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-400">Contribute to the legacy</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <MemorySubmissionForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
