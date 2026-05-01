import type { Metadata } from "next";
import { Calendar, Trophy } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';
import Lightbox from '@/components/ui/Lightbox';

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Gallery & Achievements | ORION Hostel, JEC",
  description:
    "Explore the visual legacy of ORION Hostel — Hostel No 7, Jorhat Engineering College. Browse our gallery of achievements, sports victories, cultural celebrations, and milestone events.",
  alternates: {
    canonical: "https://www.orionjech7.site/achievements",
  },
  openGraph: {
    title: "Gallery & Achievements | ORION Hostel, JEC",
    description:
      "A visual record of 40+ years of the Orionite spirit — sports titles, cultural events, and milestones at Jorhat Engineering College.",
    url: "https://www.orionjech7.site/achievements",
    images: [{ url: "/hostel_about.jpeg", width: 1200, height: 630, alt: "ORION Hostel Gallery — Achievements and Events" }],
  },
};

export default async function AchievementsPage() {
  const supabase = await createClient();
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });

  const { data: gallery } = await supabase
    .from('gallery')
    .select('*')
    .order('year', { ascending: false })
    .order('created_at', { ascending: false });

  return (
    <main className="bg-transparent min-h-screen selection:bg-purple-500/20 overflow-x-hidden">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-8 md:pb-16 space-y-4 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 md:w-12 bg-sky-200"></div>
          <span className="text-[11px] md:text-[13px] font-bold text-sky-600 tracking-tight font-sans">Capturing moments</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter leading-[1.1] font-jakarta">
          Hostel <span className="text-indigo-600">Gallery</span>
        </h1>
        <p className="text-sm md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed font-sans">
          A visual legacy of our history, achievements, and brotherhood. From festive celebrations to major sports titles, explore the spirit of ORION.
        </p>
      </section>
 
      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-[11px] md:text-[13px] font-bold text-rose-600 tracking-tight mb-8 md:mb-12 flex items-center gap-4 font-sans">
          Visual history <div className="h-px flex-1 bg-rose-100"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <div key={achievement.id} className="group bg-white border border-slate-100 rounded-2xl md:rounded-[3rem] overflow-hidden hover:border-blue-100 transition-all duration-500 shadow-xl shadow-slate-200/50">
                <div className="p-3">
                  <Lightbox src={achievement.image_url || "/placeholder-achievement.png"} alt={achievement.title}>
                    <div className="aspect-[16/10] relative overflow-hidden rounded-[2rem] bg-slate-50">
                      <Image 
                        src={achievement.image_url || "/placeholder-achievement.png"} 
                        alt={achievement.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </Lightbox>
                </div>
                <div className="p-4 md:p-6 pt-0 pb-6 md:pb-8">
                  <div className="mb-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-bold text-indigo-600 tracking-tight">
                      <Calendar className="w-3 h-3" />
                      {achievement.year || (achievement.date ? new Date(achievement.date).getFullYear() : 'N/A')}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors leading-snug">
                    {achievement.title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 md:py-40 text-center bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-lg">
               <Trophy className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mx-auto mb-6" />
               <h3 className="text-lg font-black text-slate-500 uppercase tracking-[0.3em] font-jakarta">No entries yet</h3>
               <p className="text-slate-500 font-medium mt-2 opacity-80 font-sans">The gallery is waiting for its first photo.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Trophy Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] md:rounded-[4rem] overflow-hidden relative min-h-[400px] md:min-h-[500px] flex items-center shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 md:via-white/40 to-transparent z-10"></div>
          
          <div className="relative z-20 p-8 md:p-12 lg:p-24 max-w-2xl space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tighter leading-tight font-jakarta">
              A Legacy of <br/><span className="text-indigo-600">Celebrations</span>
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-lg font-sans">
              Our gallery captures the soul of Orion. From the high-octane energy of inter-hostel sports to the vibrant colors of Diwali and Holi, every photo tells a story of brotherhood.
            </p>
            <div className="flex gap-8 md:gap-16 pt-4">
              <div>
                <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-1 font-jakarta">40+</div>
                <div className="text-[10px] font-bold text-indigo-600 tracking-tight">Years of memories</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-1 font-jakarta">100%</div>
                <div className="text-[10px] font-bold text-indigo-600 tracking-tight">Orionite spirit</div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full w-full md:w-2/3">
            <Image 
              src="/hostel_about.jpeg" 
              alt="ORION Hostel celebrations and events — Jorhat Engineering College" 
              fill
              className="object-cover opacity-80 md:opacity-100"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
