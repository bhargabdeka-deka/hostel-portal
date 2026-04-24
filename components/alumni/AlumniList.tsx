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
          <Link href="/alumni/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition shadow-xl active:scale-95">
            <Users className="w-4 h-4" />
            Join Directory
          </Link>
        </div>

        <div className="flex items-stretch gap-2 bg-slate-50 p-2 md:p-4 rounded-3xl md:rounded-[2.5rem] border border-slate-100">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search by name or batch..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
              className="w-full pl-10 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 bg-white border border-slate-200 rounded-2xl md:rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-slate-700 text-sm md:text-base placeholder:text-slate-300 placeholder:font-medium"
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
              <div key={person.id} className="bg-white border border-slate-100 rounded-[2rem] p-6 space-y-6 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xs border border-slate-100 shrink-0">
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-black text-slate-900 truncate uppercase tracking-tight">{person.name}</h3>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                      Batch {person.batch}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                   <div className="space-y-1">
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Briefcase className="w-2.5 h-2.5" />
                        Occupation
                      </div>
                      <div className="text-[11px] font-bold text-slate-700 truncate">{person.job}</div>
                   </div>
                   <div className="space-y-1 text-right">
                      <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1.5">
                        <Phone className="w-2.5 h-2.5" />
                        Contact
                      </div>
                      <div className="text-[11px] font-bold text-slate-700">{person.phone || 'N/A'}</div>
                   </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                   {person.social_link ? (
                      <a 
                        href={person.social_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg"
                      >
                        <LinkIcon className="w-3 h-3" />
                        LinkedIn
                      </a>
                   ) : (
                      <div className="flex-1 py-3 bg-slate-50 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-slate-100 italic">
                        Private Profile
                      </div>
                   )}
                </div>
              </div>
            )
          })
        ) : (
          <div className="py-20 text-center bg-slate-50 rounded-[2rem] border border-slate-100">
            <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <h3 className="text-sm font-black text-slate-300 uppercase tracking-widest">No matching alumni</h3>
          </div>
        )}
      </div>

      {/* Desktop View: Table Layout */}
      <div className="hidden lg:block overflow-hidden bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-900/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Sevenite Identity</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Graduation</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Communication</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Professional Info</th>
                <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center">Portfolio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAlumni && filteredAlumni.length > 0 ? (
                filteredAlumni.map((person) => {
                  const initials = person.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <tr key={person.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xs border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 shrink-0">
                            {initials}
                          </div>
                          <span className="font-black text-slate-900 uppercase tracking-tight text-base">{person.name}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                          Batch {person.batch}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <span className="text-sm font-bold text-slate-600 tracking-tight">{person.phone || 'N/A'}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-slate-900 uppercase tracking-tight">{person.job}</span>
                          <span className="text-xs text-slate-400 font-medium italic">at {person.company}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-center">
                        {person.social_link ? (
                          <a 
                            href={person.social_link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white hover:bg-blue-600 rounded-xl transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10"
                          >
                            <LinkIcon className="w-3 h-3" />
                            LinkedIn
                          </a>
                        ) : (
                          <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest italic">Private</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="py-40 text-center">
                    <Users className="w-20 h-20 text-slate-100 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-200 uppercase tracking-[0.3em]">No alumni records found</h3>
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
