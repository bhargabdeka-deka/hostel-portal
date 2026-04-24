import { Shield, Scale, ScrollText, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <main className="bg-white selection:bg-blue-100 selection:text-blue-900 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-50 border-b border-slate-100 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
            Legal Framework
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight font-heading">
            Terms of Service
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            Please read these terms carefully before using the ORION Resident Portal. By accessing the portal, you agree to abide by these regulations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-20 space-y-16">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Portal Usage</h2>
          </div>
          <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
            <p>
              The ORION Resident Portal is designed exclusively for the residents and administration of Hostel 7, Jorhat Engineering College. Unauthorized access is strictly prohibited and may result in disciplinary action.
            </p>
            <ul className="space-y-4">
              {[
                "Maintain the confidentiality of your login credentials.",
                "Ensure all information provided is accurate and up to date.",
                "Abstain from any activity that disrupts portal services."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Hostel Regulations</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            The portal acts as a digital extension of the physical hostel. All rules outlined in the official "Hostel Manual" apply here. This includes reporting grievances honestly and respecting the administrative decisions made by the Superintendent.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <ScrollText className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Notice Board</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Notices broadcasted through the portal are considered official communications. It is the responsibility of every resident to stay updated with the digital notice board to ensure compliance with hostel deadlines and events.
          </p>
        </div>

        <div className="pt-10 border-t border-slate-100">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            Last Updated: April 2024 • ORION Hostel Administration
          </p>
        </div>
      </section>
    </main>
  )
}
