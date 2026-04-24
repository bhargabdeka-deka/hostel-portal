"use client"

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-20">
      {/* Base Grid */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Neon Accents (The "Coloring Lines") */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent 0%, rgba(20, 184, 166, 0.2) 50%, transparent 100%),
            linear-gradient(to bottom, transparent 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)
          `,
          backgroundSize: '100% 400px, 400px 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '0 20%, 30% 0'
        }}
      />

      {/* Additional Colored Lines for depth */}
      <div className="absolute top-[15%] left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
      <div className="absolute top-[45%] left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
      <div className="absolute top-[75%] left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="absolute left-[20%] top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"></div>
      <div className="absolute left-[50%] top-0 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute left-[80%] top-0 w-px h-full bg-gradient-to-b from-transparent via-rose-500/20 to-transparent"></div>

      {/* Radial Vignette to keep it dark in corners */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
    </div>
  );
}
