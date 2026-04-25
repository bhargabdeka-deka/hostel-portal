import { cn } from "@/lib/utils"

interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Card = ({ title, children, footer, className }: CardProps) => (
  <div className={cn("bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-blue-100", className)}>
    <div className="p-10">
      {title && <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">{title}</h3>}
      {children}
    </div>
    {footer && <div className="bg-slate-50/50 px-10 py-6 border-t border-slate-100 flex items-center justify-between">{footer}</div>}
  </div>
);
