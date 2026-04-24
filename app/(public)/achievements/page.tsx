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
    <main className="bg-white min-h-screen selection:bg-blue-100 overflow-x-hidden">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-16 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px w-8 md:w-12 bg-slate-200"></div>
          <span className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Honoring Excellence</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-slate-900 tracking-tight uppercase leading-[1.1]">
          Excellence <span className="text-blue-600">&</span> Milestones
        </h1>
        <p className="text-base md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">
          A visual legacy of determination and sportsmanship. Explore the milestones that define the collective spirit of ORION Hostel.
        </p>
      </section>

      {/* Achievements Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em] mb-12 flex items-center gap-4">
          Major Milestones <div className="h-px flex-1 bg-slate-100"></div>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <div key={achievement.id} className="group bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-700">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={achievement.image_url || "/placeholder-achievement.png"} 
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute top-6 right-6 md:top-8 md:right-8">
                    <div className="px-4 py-1.5 md:px-5 md:py-2 bg-slate-900/80 backdrop-blur-md text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest rounded-full border border-white/20 flex items-center gap-2">
                      <Award className="w-3 h-3 text-yellow-400" />
                      Achievement
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-8 md:p-10 space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight uppercase">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 md:py-40 text-center bg-slate-50/50 rounded-[2rem] md:rounded-[3rem] border border-slate-100">
               <Trophy className="w-12 h-12 md:w-16 md:h-16 text-slate-200 mx-auto mb-6" />
               <h3 className="text-lg font-black text-slate-400 uppercase tracking-widest">No achievements yet</h3>
               <p className="text-slate-400 font-medium mt-2">The trophy cabinet is waiting for its first entry.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Trophy Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-slate-900 rounded-[3rem] md:rounded-[4rem] overflow-hidden relative min-h-[400px] md:min-h-[500px] flex items-center shadow-3xl shadow-slate-200">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 md:via-slate-900/80 to-transparent z-10"></div>
          
          <div className="relative z-20 p-8 md:p-12 lg:p-24 max-w-2xl space-y-6 md:space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight uppercase">
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
