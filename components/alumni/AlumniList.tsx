"use client"
import { useState } from 'react';
import { Search, GraduationCap, Link as LinkIcon, Users, Briefcase, Phone, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AlumniProps {
  alumni: any[];
}

export function AlumniList({ alumni }: AlumniProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlumni = alumni?.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.branch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.job?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLinkLabel = (url: string) => {
    if (!url) return 'Not Shared';
    const lowercaseUrl = url.toLowerCase();
    if (lowercaseUrl.includes('linkedin.com')) return 'LinkedIn';
    if (lowercaseUrl.includes('github.com')) return 'GitHub';
    if (lowercaseUrl.includes('behance.net') || lowercaseUrl.includes('dribbble.com')) return 'Portfolio';
    if (lowercaseUrl.includes('twitter.com') || lowercaseUrl.includes('x.com')) return 'Twitter';
    return 'Website';
  };

  return (
    <div className="space-y-8 md:space-y-16">
      {/* Actions Bar */}
      <div className="space-y-4">
        <div className="flex justify-end">
          <Link href="/alumni/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-[#0F172A] text-white px-10 py-5 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-[#C8A96B] hover:text-[#0F172A] transition-all duration-500 shadow-2xl active:scale-95 font-jakarta">
            <Users className="w-4 h-4" />
            Register as an Alumni
          </Link>
        </div>

        <div className="flex items-stretch gap-4 bg-white p-3 md:p-6 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 md:left-8 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-slate-300 group-focus-within:text-[#C8A96B] transition-colors duration-500" />
            <input 
              type="text" 
              placeholder="Search by name, batch, or professional keywords..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-14 md:pl-20 pr-6 md:pr-10 py-5 md:py-8 bg-slate-50 border border-slate-50 rounded-[2rem] md:rounded-[2.5rem] outline-none focus:ring-4 focus:ring-[#C8A96B]/5 focus:border-[#C8A96B]/20 transition-all font-black text-[#0F172A] text-sm md:text-lg placeholder:text-slate-300 placeholder:font-bold font-jakarta"
            />
          </div>
        </div>
      </div>

      {/* Mobile View: Card Layout */}
      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredAlumni && filteredAlumni.length > 0 ? (
          filteredAlumni.map((person) => {
            const initials = person.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
            return (
              <div key={person.id} className="bg-white border border-slate-100 rounded-[2rem] p-5 space-y-4 shadow-lg group hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-[1.25rem] flex items-center justify-center font-black text-sm border border-slate-50 shrink-0">
                    {initials}
                  </div>
                  <div className="overflow-hidden space-y-1">
                    <h3 className="font-black text-[#0F172A] break-words uppercase tracking-tight text-lg font-jakarta">{person.name}</h3>
                    <span className="text-[9px] font-black text-[#C8A96B] uppercase tracking-[0.2em] bg-slate-50 px-3 py-1.5 rounded-full whitespace-nowrap font-jakarta">
                      {person.batch.replace(/(\d{4})-(\d{2})(\d{2})/, '$1-$3')} • {person.branch}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div className="space-y-1">
                       <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                         <Briefcase className="w-2.5 h-2.5" />
                         Professional Role
                       </div>
                       <div className="text-[11px] font-bold text-slate-600 break-words">
                         {!person.job && !person.company ? (
                           <span className="text-slate-400 italic font-medium">Career details not shared</span>
                         ) : (
                           <>
                             {person.job}
                             {person.job && person.company && <span className="text-slate-400 font-medium lowercase"> at </span>}
                             {person.company}
                           </>
                         )}
                       </div>
                    </div>
                    <div className="space-y-1 text-right">
                       <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1.5">
                         <Phone className="w-2.5 h-2.5" />
                         Contact
                       </div>
                       <div className="text-[11px] font-bold text-slate-600">{person.phone || 'N/A'}</div>
                    </div>
                 </div>

                 <div className="flex items-center justify-between gap-4 pt-4">
                     {person.social_link ? (
                        <a 
                          href={person.social_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex-1 flex items-center justify-center gap-3 py-5 bg-[#0F172A] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#C8A96B] hover:text-[#0F172A] transition-all duration-500 font-jakarta"
                        >
                          <LinkIcon className="w-4 h-4" />
                          {getLinkLabel(person.social_link)}
                        </a>
                     ) : (
                        <div className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-[0.1em] text-center border border-slate-100 font-jakarta opacity-60">
                          Not Shared
                        </div>
                     )}
                 </div>
                 </div>
               </div>
             )
           })
         ) : (
           <div className="py-20 text-center bg-white rounded-[2rem] border border-slate-100 shadow-lg">
             <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching alumni</h3>
           </div>
         )}
       </div>

       <div className="hidden lg:block overflow-hidden bg-white border border-slate-200 rounded-[3rem] shadow-xl">
         <div className="overflow-x-auto">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="bg-slate-50 border-b border-slate-100">
                 <th className="px-10 py-8 text-[10px] font-black text-[#0F172A] uppercase tracking-[0.3em] font-jakarta">Identity</th>
                 <th className="px-10 py-8 text-[10px] font-black text-[#0F172A] uppercase tracking-[0.3em] font-jakarta">Graduation</th>
                 <th className="px-10 py-8 text-[10px] font-black text-[#0F172A] uppercase tracking-[0.3em] font-jakarta">Communication</th>
                 <th className="px-10 py-8 text-[10px] font-black text-[#C8A96B] uppercase tracking-[0.3em] font-jakarta">Professional Info</th>
                 <th className="px-10 py-8 text-[10px] font-black text-[#0F172A] uppercase tracking-[0.3em] font-jakarta text-center">Portfolio</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
               {filteredAlumni && filteredAlumni.length > 0 ? (
                 filteredAlumni.map((person) => {
                   const initials = person.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                   return (
                     <tr key={person.id} className="hover:bg-slate-50 even:bg-slate-50/40 transition-all duration-300 group relative border-b border-slate-50 last:border-0 overflow-hidden">
                       <td className="px-10 py-5 relative z-10">
                         <div className="flex items-center gap-5">
                           <div className="w-14 h-14 bg-slate-50 text-slate-300 rounded-[1.25rem] flex items-center justify-center font-black text-sm border border-slate-50 group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-500 shrink-0">
                             {initials}
                           </div>
                           <span className="font-black text-[#0F172A] uppercase tracking-tight text-lg font-jakarta">{person.name}</span>
                         </div>
                       </td>
                       <td className="px-10 py-8 relative z-10">
                         <span className="text-[10px] text-[#C8A96B] font-black uppercase tracking-[0.2em] bg-slate-50 px-4 py-2 rounded-full border border-slate-50 whitespace-nowrap font-jakarta">
                           {person.batch.replace(/(\d{4})-(\d{2})(\d{2})/, '$1-$3')} • {person.branch}
                         </span>
                       </td>
                       <td className="px-10 py-5 relative z-10">
                         <span className="text-sm font-bold text-slate-600 tracking-tight">{person.phone || 'N/A'}</span>
                       </td>
                       <td className="px-10 py-5 relative z-10">
                         <div className="flex flex-col">
                           {!person.job && !person.company ? (
                             <span className="text-sm font-bold text-slate-400 italic">Career details not shared</span>
                           ) : (
                             <>
                               {person.job && <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{person.job}</span>}
                               {person.company && <span className="text-xs text-slate-400 font-medium">{person.job ? `at ${person.company}` : person.company}</span>}
                             </>
                           )}
                         </div>
                       </td>
                      <td className="px-10 py-8 relative z-10 text-center">
                        {person.social_link ? (
                          <a 
                            href={person.social_link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-3 px-6 py-4 bg-[#0F172A] text-white hover:bg-[#C8A96B] hover:text-[#0F172A] rounded-xl transition-all duration-500 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl font-jakarta"
                          >
                            <LinkIcon className="w-4 h-4" />
                            {getLinkLabel(person.social_link)}
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] font-jakarta opacity-60">Not Shared</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-40 text-center">
                    <Users className="w-20 h-20 text-slate-100 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-300 uppercase tracking-[0.3em]">No alumni records found</h3>
                    <p className="text-slate-400 font-medium mt-2">Try adjusting your search filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
