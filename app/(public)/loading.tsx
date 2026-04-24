import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex flex-col items-center justify-center transition-all duration-500">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
        {/* Animated Ring */}
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        
        {/* Center Icon/Logo placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600/10 rounded-lg animate-pulse flex items-center justify-center">
             <div className="w-4 h-4 bg-blue-600 rounded-sm rotate-45 animate-bounce"></div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-[0.3em] animate-pulse">
          Loading <span className="text-blue-600">Portal</span>
        </h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">
          Syncing with ORION
        </p>
      </div>

      {/* Progress Line */}
      <div className="mt-12 w-48 h-1 bg-slate-50 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-loading-progress"></div>
      </div>
    </div>
  );
}
