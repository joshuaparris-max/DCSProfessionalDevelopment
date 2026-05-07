export default function SupportToolsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Support-quality outputs</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Quick-reference guides and checklists for common DCS support scenarios.
          </p>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Printer symptom-to-cause matrix</h3>
          <p className="mt-2 text-sm text-slate-600">
            Map printer symptoms to likely causes and quick fixes.
          </p>
          <a
            href="/support-tools/printer-matrix"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View matrix
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">ViewBoard quick-fix flow</h3>
          <p className="mt-2 text-sm text-slate-600">
            Step-by-step troubleshooting for ViewBoard display issues.
          </p>
          <a
            href="/support-tools/viewboard-flow"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View flow
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Wi-Fi triage checklist</h3>
          <p className="mt-2 text-sm text-slate-600">
            Systematic approach to Wi-Fi connectivity problems.
          </p>
          <a
            href="/support-tools/wifi-checklist"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View checklist
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Login/password support checklist</h3>
          <p className="mt-2 text-sm text-slate-600">
            Safe steps for account access issues.
          </p>
          <a
            href="/support-tools/login-checklist"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View checklist
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">New user access checklist</h3>
          <p className="mt-2 text-sm text-slate-600">
            Checklist for onboarding new staff or students.
          </p>
          <a
            href="/support-tools/new-user-checklist"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View checklist
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Website unblock request checklist</h3>
          <p className="mt-2 text-sm text-slate-600">
            Information needed for filtering requests.
          </p>
          <a
            href="/support-tools/unblock-checklist"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View checklist
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Teams/SharePoint/OneDrive triage guide</h3>
          <p className="mt-2 text-sm text-slate-600">
            Troubleshooting Microsoft 365 file access issues.
          </p>
          <a
            href="/support-tools/m365-triage"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View guide
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Escalation note examples</h3>
          <p className="mt-2 text-sm text-slate-600">
            Templates for clean handoffs to Level 2 or vendors.
          </p>
          <a
            href="/support-tools/escalation-templates"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View templates
          </a>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">&quot;What system owns this issue?&quot; decision tree</h3>
          <p className="mt-2 text-sm text-slate-600">
            Route issues to the correct support team.
          </p>
          <a
            href="/support-tools/system-ownership-tree"
            className="mt-4 inline-block rounded-3xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View tree
          </a>
        </div>
      </div>
    </div>
  );
}