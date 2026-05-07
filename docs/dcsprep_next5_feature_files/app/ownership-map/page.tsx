import { ownershipAreas } from '../../src/data/supportCoach';

export default function OwnershipMapPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">System ownership map</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Who owns what?</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use this to avoid over-owning admin systems, production settings, sensitive access, or vendor-level faults.
            Josh&apos;s strongest Level 1 lane is triage, evidence capture, safe first checks, and clean escalation.
          </p>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {ownershipAreas.map((area) => (
          <article key={area.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">{area.primaryOwner}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Ownership boundary</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{area.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{area.joshRole}</p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">Examples</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {area.examples.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4">
                <div className="font-semibold text-slate-900">Capture before escalation</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {area.captureBeforeEscalation.map((item) => <li key={item}>- {item}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4">
              <div className="font-semibold text-amber-950">Avoid</div>
              <ul className="mt-2 space-y-1 text-sm text-amber-950">
                {area.avoid.map((item) => <li key={item}>- {item}</li>)}
              </ul>
            </div>

            <div className="mt-4 rounded-3xl bg-slate-900 p-4 text-sm leading-7 text-white">
              <div className="font-semibold">Safe escalation wording</div>
              <p className="mt-2 text-slate-100">{area.escalationWording}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
