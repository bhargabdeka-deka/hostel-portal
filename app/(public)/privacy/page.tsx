import { Lock, Eye, Fingerprint, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <main className="bg-white selection:bg-blue-100 selection:text-blue-900 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-50 border-b border-slate-100 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest">
            Data Integrity
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight font-heading">
            Privacy Policy
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            Your privacy is of utmost importance to us. We are committed to protecting the personal data of our residents and alumni.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-6 py-20 space-y-16">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Information We Collect</h2>
          </div>
          <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
            <p>
              To provide a seamless administrative experience, we collect essential information including:
            </p>
            <ul className="space-y-4">
              {[
                "Basic identification: Name, Email, and Room Number.",
                "Academic data: Branch, Batch, and Roll Number.",
                "Communication data: Contact numbers for emergency alerts."
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
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Data Security</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            We employ industry-standard encryption and security protocols to protect your data from unauthorized access. The portal is hosted on secure infrastructure with continuous monitoring for any potential vulnerabilities.
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
              <Eye className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-heading">Information Usage</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            Your data is strictly used for hostel-related administrative purposes, such as broadcasting notices, managing alumni connections, and maintaining the resident roster. We <span className="text-slate-900 font-bold underline decoration-blue-500 decoration-2">never</span> sell or share your information with third-party marketing entities.
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
