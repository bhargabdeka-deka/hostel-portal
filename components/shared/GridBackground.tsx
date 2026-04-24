"use client"

export function GridBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#020617]">
      {/* 3D Perspective Container */}
      <div className="absolute inset-0 [perspective:1000px]">
        {/* The "Floor" Grid */}
        <div 
          className="absolute inset-0 [transform:rotateX(60deg)] origin-bottom opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(204, 51, 255, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(204, 51, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'linear-gradient(to top, black, transparent)'
          }}
        />

        {/* Vertical Glow Lines (Left Section - Red/Orange) */}
        <div className="absolute inset-0 flex">
          <div className="w-[30%] h-full relative">
            <div className="absolute left-[20%] top-0 w-[2px] h-full bg-[#ff4d4d] shadow-[0_0_15px_#ff4d4d] opacity-30"></div>
            <div className="absolute left-[50%] top-0 w-[2px] h-full bg-[#ff9933] shadow-[0_0_15px_#ff9933] opacity-20"></div>
            <div className="absolute left-[80%] top-0 w-[2px] h-full bg-[#ff4d4d] shadow-[0_0_15px_#ff4d4d] opacity-30"></div>
            
            {/* Horizontal Crossings */}
            <div className="absolute top-[30%] left-0 w-full h-[2px] bg-[#ff4d4d] shadow-[0_0_15px_#ff4d4d] opacity-20"></div>
            <div className="absolute top-[60%] left-0 w-full h-[2px] bg-[#ff9933] shadow-[0_0_15px_#ff9933] opacity-10"></div>
          </div>

          {/* Center/Right Section (Green/Teal) */}
          <div className="flex-1 h-full relative">
            <div className="absolute left-[40%] top-0 w-[3px] h-full bg-[#00ffff] shadow-[0_0_20px_#00ffff] opacity-40"></div>
            <div className="absolute left-[40.5%] top-0 w-[1px] h-full bg-white shadow-[0_0_10px_white] opacity-50"></div>
            
            <div className="absolute left-[80%] top-0 w-[2px] h-full bg-[#33ff77] shadow-[0_0_15px_#33ff77] opacity-20"></div>

            {/* Horizontal Crossings */}
            <div className="absolute top-[20%] left-0 w-full h-[2px] bg-[#33ff77] shadow-[0_0_15px_#33ff77] opacity-20"></div>
            <div className="absolute top-[65%] left-0 w-full h-[3px] bg-[#00ffff] shadow-[0_0_20px_#00ffff] opacity-30"></div>
          </div>
        </div>
      </div>

      {/* Atmospheric Fog/Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]/80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]"></div>
    </div>
  );
}
