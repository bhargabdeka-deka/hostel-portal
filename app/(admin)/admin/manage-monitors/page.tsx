import { createClient } from "@/lib/supabase/server";
import MonitorForm from "@/components/admin/MonitorForm";

export const dynamic = 'force-dynamic';

export default async function ManageMonitors() {
  const supabase = await createClient();
  const { data: monitors, error } = await supabase
    .from('monitors')
    .select('*')
    .order('role', { ascending: true });

  if (error) {
    console.error("Supabase Error (Monitors):", error);
  }

  return (
    <div className="p-12 lg:p-20 space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight font-jakarta">Monitor Management</h1>
          <p className="text-slate-600 mt-2 font-medium">Update current student leadership and room assignments.</p>
        </div>
      </div>

      {error && (
        <div className="p-6 bg-red-50 border-2 border-red-100 rounded-[2rem] text-red-600">
          <p className="font-black uppercase tracking-widest text-[10px] mb-2">Database Error</p>
          <p className="font-bold">{error.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {monitors?.map((monitor, index) => (
          <MonitorForm key={monitor.id} monitor={monitor} index={index} />
        ))}
      </div>
    </div>
  );
}
