"use client"
import { useState } from 'react';
import { Search, Filter, BookOpen, User, Calendar, Quote, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Memory {
  id: string;
  full_name: string;
  batch: string;
  branch: string;
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
      {/* Rows */}
      <div className="flex flex-col gap-6 md:gap-8">
        {memories.length > 0 ? (
          memories.map((memory) => (
            <div 
              key={memory.id} 
              onClick={() => setSelectedMemory(memory)}
              className="cursor-pointer group bg-white border border-slate-100/80 rounded-[3.5rem] p-10 md:p-14 shadow-2xl shadow-slate-200/20 hover:shadow-indigo-100/30 hover:-translate-y-1.5 transition-all duration-700 relative overflow-hidden flex flex-col md:flex-row md:items-center gap-10 md:gap-16"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.06] transition-all duration-1000">
                <Quote className="w-48 h-48 text-[#0F172A]" />
              </div>

              {/* Date Column */}
              <div className="flex-none flex md:flex-col items-center justify-center md:w-32 md:border-r border-slate-100/60 md:pr-16">
                <div className="text-center">
                  <span className="block text-4xl font-black text-[#0F172A] leading-none font-jakarta tracking-[-0.08em]">
                    {new Date(memory.created_at).toLocaleDateString('en-US', { day: '2-digit' })}
                  </span>
                  <span className="block text-[11px] font-black text-[#C8A96B] uppercase tracking-[0.4em] mt-3 font-jakarta">
                    {new Date(memory.created_at).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4 relative z-10">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-[-0.04em] leading-tight group-hover:text-[#C8A96B] transition-all duration-500 line-clamp-2 font-jakarta">
                  {memory.title}
                </h3>
                <div className="space-y-3">
                  <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed line-clamp-2 font-sans">
                    {memory.story}
                  </p>
                  {memory.story.length > 120 && (
                    <span className="text-[#C8A96B] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 group-hover:gap-4 transition-all font-jakarta">
                      Read full story <ChevronRight className="w-4 h-4 opacity-50" />
                    </span>
                  )}
                </div>
              </div>

              {/* Author & Action Column */}
              <div className="flex flex-row md:flex-row items-center justify-between md:justify-end gap-8 md:gap-14 pt-8 md:pt-0 border-t md:border-0 border-slate-100">
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block">
                    <span className="block text-base font-black text-[#0F172A] tracking-tight font-jakarta leading-none">{memory.full_name}</span>
                    <span className="block text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-2 font-jakarta opacity-80">
                      {memory.batch} {memory.branch && ` • ${memory.branch}`}
                    </span>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-black text-base border border-slate-100 group-hover:bg-[#0F172A] group-hover:text-white transition-all duration-700 shadow-sm font-jakarta">
                    {memory.full_name.charAt(0)}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMemory(memory)}
                  className="p-5 bg-slate-50 text-[#0F172A] rounded-2xl hover:bg-[#C8A96B] hover:text-white transition-all duration-500 shadow-sm border border-slate-50"
                >
                  <BookOpen className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center space-y-6 bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem]">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm border border-slate-100">
              <BookOpen className="w-8 h-8 text-slate-200" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">No memories found</h4>
              <p className="text-slate-400 font-medium text-xs tracking-tight font-sans">Be the first one to share a story!</p>
            </div>
          </div>
        )}
      </div>

      {/* Full Memory Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedMemory(null)} />
          <div className="relative bg-white border w-full max-w-4xl max-h-[80vh] overflow-y-auto rounded-[3rem] shadow-2xl p-8 md:p-16 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelectedMemory(null)}
              className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-[1.1]">
                  {selectedMemory.title}
                </h2>
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center shadow-lg shadow-slate-200">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-bold text-slate-900 tracking-tight">{selectedMemory.full_name}</span>
                      <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                        Batch {selectedMemory.batch} {selectedMemory.branch && ` • ${selectedMemory.branch}`}
                      </span>
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
                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedMemory.story}
                </p>
              </div>

              <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 tracking-tight">
                  <Calendar className="w-4 h-4" />
                  Submitted on {new Date(selectedMemory.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2">
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

