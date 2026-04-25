import { createClient } from "@/lib/supabase/server";
import { AlumniList } from "@/components/alumni/AlumniList";

export const revalidate = 3600; // Revalidate every hour

export default async function AlumniPage() {
  const supabase = await createClient();
  
  const { data: alumni } = await supabase
    .from('alumni')
    .select('*')
    .eq('status', 'approved')
    .order('batch', { ascending: false });

  return (
    <main className="bg-transparent min-h-screen selection:bg-blue-500/20">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-12 bg-slate-200"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Our Community</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight uppercase">
          Global <span className="text-blue-600">Alumni</span> Network
        </h1>
        <p className="text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
          The ORION legacy lives on through our residents who are now leading in top global organizations. Connect, network, and grow with the Sevenite family.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <AlumniList alumni={alumni || []} />
      </section>
    </main>
  );
}
