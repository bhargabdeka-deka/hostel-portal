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
      <section className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-12 space-y-4 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-4">
          <div className="h-px w-12 bg-indigo-200"></div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em]">The Orion Spirit</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tighter uppercase leading-[0.9]">
              Memories<span className="text-blue-600">.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
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
        
        {/* Submission Section - Now below the list */}
        <div className="max-w-4xl mx-auto w-full space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                <BookHeart className="w-40 h-40" />
              </div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-4xl font-bold tracking-tight leading-tight">Your story is part of ORION's history.</h3>
                <p className="text-indigo-100 font-medium text-base leading-relaxed">
                  Every Orionite has a unique story. Whether it's about a late-night session, a sports victory, or a lifelong friendship, share it with the world.
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <div className="h-px w-12 bg-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Contribute to the legacy</span>
                </div>
              </div>
            </div>
            
            <MemorySubmissionForm />
          </div>
        </div>
      </section>
    </main>
  );
}
