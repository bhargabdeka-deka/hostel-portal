import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20",
    secondary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "bg-white border-2 border-slate-100 text-slate-900 hover:border-blue-600 hover:text-blue-600",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
  };

  return (
    <button 
      className={cn(
        "px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2",
        styles[variant],
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
};
