"use client"
import { useState } from 'react';
import { Search, GraduationCap, Link as LinkIcon, Users } from 'lucide-react';
import Link from 'next/link';

interface AlumniProps {
  alumni: any[];
}

export function AlumniList({ alumni }: AlumniProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlumni = alumni?.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16">
      {/* Actions Bar */}
      <div className="space-y-4">
        <div className="flex justify-end">
          <Link href="/alumni/register" className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-slate-800 transition shadow-lg active:scale-95">
            <Users className="w-3 h-3 md:w-4 md:h-4" />
            Register
          </Link>
        </div>

        <div className="flex items-stretch gap-2 bg-slate-50 p-2 md:p-4 rounded-2xl md:rounded-[2.5rem] border border-slate-100">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 md:pl-14 pr-4 md:pr-6 py-3 md:py-4 bg-white border border-slate-200 rounded-xl md:rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700 text-sm md:text-base"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-100 active:scale-95 flex items-center justify-center gap-2 min-w-[80px] md:min-w-[140px]">
            <Search className="w-3 h-3 md:w-4 md:h-4" />
            <span className="hidden xs:inline">Search</span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Alumni</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Batch</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Occupation</th>
                <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredAlumni && filteredAlumni.length > 0 ? (
                filteredAlumni.map((person) => {
                  const initials = person.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
                  return (
                    <tr key={person.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center font-bold text-xs border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {initials}
                          </div>
                          <span className="font-bold text-slate-900">{person.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-xs text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
                          {person.batch}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-medium text-slate-600">{person.phone || 'N/A'}</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{person.job}</span>
                          <span className="text-xs text-slate-400 italic">at {person.company}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        {person.social_link ? (
                          <a 
                            href={person.social_link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white rounded-xl transition-all text-[10px] font-bold uppercase tracking-widest"
                          >
                            <LinkIcon className="w-3 h-3" />
                            LinkedIn
                          </a>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-200 uppercase tracking-widest italic">Not Provided</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <Users className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-300 uppercase tracking-widest">No results found</h3>
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
