import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-x-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[15%] w-[2px] h-full bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent"></div>
        <div className="absolute top-0 left-[50%] w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent"></div>
        <div className="absolute top-0 left-[85%] w-[2px] h-full bg-gradient-to-b from-transparent via-slate-500/20 to-transparent"></div>
        
        {/* Soft background glows */}
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] bg-indigo-50/15 blur-[120px] rounded-full"></div>
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-blue-50/15 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />
      <main className="flex-1 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
