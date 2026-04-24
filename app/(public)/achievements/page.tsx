import { Calendar, Trophy, Medal, Award } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

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
      <section className="max-w-7xl mx-auto px-6 pt-12 md:pt-24 pb-8 md:pb-16 space-y-4 md:space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-px w-6 md:w-12 bg-white/10"></div>
          <span className="text-[7px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Honoring Excellence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[1.1] font-heading">
          Excellence <span className="text-blue-500 font-sans">&</span> Milestones
        </h1>
        <p className="text-sm md:text-xl text-slate-400 font-medium max-w-2xl leading-relaxed opacity-80">
          A visual legacy of determination and sportsmanship. Explore the milestones that define the collective spirit of ORION Hostel.
        </p>
      </section>

      {/* Achievements Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.4em] mb-8 md:mb-12 flex items-center gap-4 font-heading">
          Major Milestones <div className="h-px flex-1 bg-white/5"></div>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <div key={achievement.id} className="group bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden hover:bg-slate-900 transition-all duration-700 shadow-2xl">
                <div className="p-1.5 md:p-2">
                  <div className="aspect-[16/10] relative overflow-hidden rounded-xl bg-slate-900/50">
                    <img 
                      src={achievement.image_url || "/placeholder-achievement.png"} 
                      alt={achievement.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2">
                      <div className="px-1.5 py-0.5 bg-slate-950/80 backdrop-blur-md text-white text-[5px] md:text-[6px] font-black uppercase tracking-widest rounded-full border border-white/10 flex items-center gap-1">
                        <Award className="w-1.5 h-1.5 md:w-2 md:h-2 text-yellow-400" />
                        <span className="hidden xs:inline">Achievement</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4 pt-0 space-y-1.5 md:space-y-2">
                  <div className="flex items-center gap-1 text-[7px] md:text-[8px] font-black text-blue-400 uppercase tracking-widest">
                    <Calendar className="w-2 md:w-2.5 h-2 md:h-2.5" />
                    {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </div>
                  <h3 className="text-[10px] md:text-base font-black text-white tracking-tight group-hover:text-blue-500 transition-colors leading-tight uppercase line-clamp-1">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-400 text-[8px] md:text-[10px] leading-relaxed line-clamp-2 font-medium opacity-70">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 md:py-40 text-center bg-slate-950/90 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-white/10">
               <Trophy className="w-12 h-12 md:w-16 md:h-16 text-slate-700 mx-auto mb-6" />
               <h3 className="text-lg font-black text-slate-500 uppercase tracking-widest">No achievements yet</h3>
               <p className="text-slate-500 font-medium mt-2">The trophy cabinet is waiting for its first entry.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Trophy Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-[3rem] md:rounded-[4rem] overflow-hidden relative min-h-[400px] md:min-h-[500px] flex items-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 md:via-slate-950/80 to-transparent z-10"></div>
          
          <div className="relative z-20 p-8 md:p-12 lg:p-24 max-w-2xl space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight uppercase font-heading">
              Built on Tradition, <br/><span className="text-blue-400">Forged in Grit</span>
            </h2>
            <p className="text-slate-400 font-medium leading-relaxed text-sm md:text-lg">
              Our trophy cabinet isn't just full of metal and wood; it's filled with stories of early morning practices, late-night strategy sessions, and the unbreakable bond of the ORION family.
            </p>
            <div className="flex gap-8 md:gap-16 pt-4">
              <div>
                <div className="text-3xl md:text-5xl font-black text-white mb-1">15+</div>
                <div className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">Major Titles</div>
              </div>
              <div>
                <div className="text-3xl md:text-5xl font-black text-white mb-1">08+</div>
                <div className="text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">Sports Categories</div>
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 h-full w-full md:w-1/2">
            <img 
              src="/hostel_about.jpeg" 
              alt="Trophy" 
              className="w-full h-full object-cover grayscale-[30%] opacity-40 md:opacity-80"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
