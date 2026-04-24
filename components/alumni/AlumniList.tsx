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
    person.job?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 md:space-y-16">
      {/* Actions Bar */}
      <div className="space-y-4">
        <div className="flex justify-end">
          <Link href="/alumni/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-blue-50 transition shadow-2xl active:scale-95">
            <Users className="w-4 h-4" />
            Join Directory
          </Link>
        </div>

        <div className="flex items-stretch gap-2 bg-white/5 p-2 md:p-4 rounded-3xl md:rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or batch..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-10 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-bold text-white text-sm md:text-base placeholder:text-slate-600 placeholder:font-medium"
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
              <div key={person.id} className="bg-white/5 border border-white/5 rounded-[2rem] p-6 space-y-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xs border border-white/5 shrink-0">
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-black text-white truncate uppercase tracking-tight">{person.name}</h3>
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">
                      Batch {person.batch}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                   <div className="space-y-1">
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Briefcase className="w-2.5 h-2.5" />
                        Occupation
                      </div>
                      <div className="text-[11px] font-bold text-slate-300 truncate">{person.job}</div>
                   </div>
                   <div className="space-y-1 text-right">
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-end gap-1.5">
                        <Phone className="w-2.5 h-2.5" />
                        Contact
                      </div>
                      <div className="text-[11px] font-bold text-slate-300">{person.phone || 'N/A'}</div>
                   </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                   {person.social_link ? (
                      <a 
                        href={person.social_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-50 transition-all"
                      >
                        <LinkIcon className="w-3 h-3" />
                        LinkedIn
                      </a>
                   ) : (
                      <div className="flex-1 py-3 bg-white/5 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-white/5 italic">
                        Private Profile
                      </div>
                   )}
                </div>
              </div>
            )
          })
        ) : (
          <div className="py-20 text-center bg-white/5 rounded-[2rem] border border-white/5">
            <Users className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">No matching alumni</h3>
          </div>
        )}
      </div>

      {/* Desktop View: Table Layout */}
      <div className="hidden lg:block overflow-hidden bg-white/5 border border-white/5 rounded-[3rem] shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Sevenite Identity</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Graduation</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Communication</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Professional Info</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] text-center">Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredAlumni && filteredAlumni.length > 0 ? (
                filteredAlumni.map((person) => {
                  const initials = person.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <tr key={person.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/5 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xs border border-white/5 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 shrink-0">
                            {initials}
                          </div>
                          <span className="font-black text-white uppercase tracking-tight text-base">{person.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-400/20">
                          Batch {person.batch}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-sm font-bold text-slate-400 tracking-tight">{person.phone || 'N/A'}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-white uppercase tracking-tight">{person.job}</span>
                          <span className="text-xs text-slate-500 font-medium italic">at {person.company}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        {person.social_link ? (
                          <a 
                            href={person.social_link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 hover:bg-blue-600 hover:text-white rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shadow-2xl"
                          >
                            <LinkIcon className="w-3 h-3" />
                            LinkedIn
                          </a>
                        ) : (
                          <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic">Private</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-40 text-center">
                    <Users className="w-20 h-20 text-slate-800 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-700 uppercase tracking-[0.3em]">No alumni records found</h3>
                    <p className="text-slate-600 font-medium mt-2">Try adjusting your search filters.</p>
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
