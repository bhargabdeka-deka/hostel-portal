import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { AlumniList } from "@/components/alumni/AlumniList";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Alumni Network | ORION Hostel, Jorhat Engineering College",
  description:
    "Connect with the global ORION Hostel alumni network. 800+ Orionites who graduated from Jorhat Engineering College are now leading professionals worldwide. Register as an alumnus and join our community.",
  alternates: {
    canonical: "https://www.orionjech7.site/alumni",
  },
  openGraph: {
    title: "ORION Alumni Network | 800+ Orionites Worldwide",
    description:
      "The ORION Hostel alumni community — 800+ graduates from JEC Jorhat leading careers globally. Connect, network, and stay connected with the Orionite family.",
    url: "https://www.orionjech7.site/alumni",
    images: [{ url: "/hero-hostel.jpeg", width: 1200, height: 630, alt: "ORION Hostel Alumni Network — Jorhat Engineering College" }],
  },
};

export default async function AlumniPage() {
  const supabase = await createClient();
  
  const { data: alumni } = await supabase
    .from('alumni')
    .select('*')
    .eq('status', 'approved')
    .order('batch', { ascending: false });

  return (
    <main className="bg-transparent min-h-screen selection:bg-indigo-500/20">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-indigo-200"></div>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em]">Our Community</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight uppercase">
          Global <span className="text-blue-600">Alumni</span> Network
        </h1>
        <p className="text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
          The ORION legacy lives on through our residents who are now leading in top global organizations. Connect, network, and grow with the Orionite family.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <AlumniList alumni={alumni || []} />
      </section>
    </main>
  );
}
