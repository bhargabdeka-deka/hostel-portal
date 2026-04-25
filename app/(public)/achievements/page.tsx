import { Calendar, Trophy, Medal, Award } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

export const revalidate = 3600; // Revalidate every hour

export default async function AchievementsPage() {
  const supabase = await createClient();
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*')
    .order('date', { ascending: false });

  const { data: gallery } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="bg-transparent min-h-screen selection:bg-blue-500/20 overflow-x-hidden">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-8 md:pb-16 space-y-4 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 md:w-12 bg-slate-200"></div>
          <span className="text-[7px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Honoring Excellence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-slate-900 tracking-tighter uppercase leading-[1.1] font-heading">
          Excellence <span className="text-blue-600 font-sans">&</span> Milestones
        </h1>
        <p className="text-sm md:text-xl text-slate-600 font-medium max-w-2xl leading-relaxed">
          A visual legacy of determination and sportsmanship. Explore the milestones that define the collective spirit of ORION Hostel.
        </p>
      </section>

      {/* Achievements Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-8 md:mb-12 flex items-center gap-4 font-heading">
          Major Milestones <div className="h-px flex-1 bg-slate-100"></div>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <div key={achievement.id} className="group bg-white border border-slate-100 rounded-2xl md:rounded-[2.5rem] overflow-hidden hover:border-blue-100 transition-all duration-300 shadow-lg">
                <div className="p-2">
                  <div className="aspect-[16/10] relative overflow-hidden rounded-2xl bg-slate-50">
                    <Image 
                      src={achievement.image_url || "/placeholder-achievement.png"} 
                      alt={achievement.title}
                      fill
                      className="object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="p-3 md:p-4 pt-0 pb-6 md:pb-8">
                  <h3 className="text-[10px] md:text-base font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight uppercase line-clamp-2">
                    {achievement.title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 md:py-40 text-center bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 shadow-lg">
               <Trophy className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mx-auto mb-6" />
               <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">No achievements yet</h3>
               <p className="text-slate-400 font-medium mt-2">The trophy cabinet is waiting for its first entry.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Trophy Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-slate-50 border border-slate-200 rounded-[3rem] md:rounded-[4rem] overflow-hidden relative min-h-[400px] md:min-h-[500px] flex items-center shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 md:via-white/80 to-transparent z-10"></div>
          
          <div className="relative z-20 p-8 md:p-12 lg:p-24 max-w-2xl space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tighter leading-tight uppercase font-heading">
              Built on Tradition, <br/><span className="text-blue-600">Forged in Grit</span>
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed text-sm md:text-lg">
              Our trophy cabinet isn't just full of metal and wood; it's filled with stories of early morning practices, late-night strategy sessions, and the unbreakable bond of the ORION family.
            </p>
            <div className="flex gap-8 md:gap-16 pt-4">
              <div>
                <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-1">15+</div>
                <div className="text-[8px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest">Major Titles</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-bold text-slate-900 mb-1">08+</div>
                <div className="text-[8px] md:text-[10px] font-bold text-blue-600 uppercase tracking-widest">Sports Categories</div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full w-full md:w-1/2">
            <Image 
              src="/hostel_about.jpeg" 
              alt="Trophy" 
              fill
              className="object-cover opacity-30 md:opacity-50"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
