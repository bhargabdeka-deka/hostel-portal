"use client"
import { useState } from 'react';
import { Search, Filter, BookOpen, User, Calendar, Quote, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Memory {
  id: string;
  full_name: string;
  batch: string;
  room_number?: string;
  title: string;
  story: string;
  category: string;
  created_at: string;
}

export function MemoriesList({ memories }: { memories: Memory[] }) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div className="space-y-12">
      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8">
        {memories.length > 0 ? (
          memories.map((memory) => (
            <div 
              key={memory.id} 
              className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-6 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Quote className="w-24 h-24 rotate-12" />
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-end">
                  <div className="text-[10px] font-bold text-slate-400 flex items-center gap-2 tracking-tight">
                    <Calendar className="w-3 h-3" />
                    {new Date(memory.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {memory.title}
                </h3>
                
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3 italic">
                  "{memory.story}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-50 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    {memory.full_name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-900 tracking-tight">{memory.full_name}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Batch {memory.batch}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMemory(memory)}
                  className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  <BookOpen className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-6 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-slate-100">
              <BookOpen className="w-8 h-8 text-slate-200" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">No memories found</h4>
              <p className="text-slate-400 font-medium text-xs italic tracking-tight">Be the first one to share a story!</p>
            </div>
          </div>
        )}
      </div>

      {/* Full Memory Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedMemory(null)} />
          <div className="relative bg-white w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 md:p-16 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedMemory(null)}
              className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter leading-[1.1]">
                  {selectedMemory.title}
                </h2>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-slate-900 tracking-tight">{selectedMemory.full_name}</span>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Batch {selectedMemory.batch}</span>
                    </div>
                  </div>
                  {selectedMemory.room_number && (
                    <div className="h-10 w-px bg-slate-100" />
                  )}
                  {selectedMemory.room_number && (
                    <div className="flex flex-col">
                      <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Room</span>
                      <span className="text-[15px] font-bold text-slate-900 tracking-tight">{selectedMemory.room_number}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed italic whitespace-pre-wrap">
                  "{selectedMemory.story}"
                </p>
              </div>

              <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 tracking-tight">
                  <Calendar className="w-4 h-4" />
                  Submitted on {new Date(selectedMemory.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Part of the ORION Legacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

