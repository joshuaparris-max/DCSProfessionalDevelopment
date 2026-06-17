import Link from 'next/link';
import {
  mspEvidenceBridge,
  mspRoadmapItems,
  mspThirtyDayPlan,
  mspTicketNoteCriteria
} from '../../src/data/mspTransition';

export default function MspTransitionPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">MSP transition</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Avance MSP readiness cockpit
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Shift the app from DCS-first practice into client-facing MSP support readiness. DCS work remains useful
            as transferable evidence, but the next learning focus is ticket quality, client communication,
            Microsoft 365 support, endpoint triage, backups, security alerts, and clean escalation.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Next upgrades</div>
          <div className="mt-5 grid gap-4">
            {mspRoadmapItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-400 hover:bg-white"
              >
                <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Outcome: {item.outcome}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Ticket note standard</div>
          <h2 className="mt-3 text-2xl font-semibold">MSP-quality notes</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The strongest first upgrade is a note coach that scores support notes against MSP expectations.
          </p>
          <ul className="mt-5 space-y-3">
            {mspTicketNoteCriteria.map((criterion) => (
              <li key={criterion} className="rounded-2xl bg-white/10 p-3 text-sm leading-6 text-slate-100">
                {criterion}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">First 30 days</div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {mspThirtyDayPlan.map((block) => (
            <div key={block.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">{block.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{block.focus}</p>
              <ul className="mt-4 space-y-2">
                {block.drills.map((drill) => (
                  <li key={drill} className="text-sm leading-6 text-slate-700">
                    - {drill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          DCS-to-MSP evidence bridge
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {mspEvidenceBridge.map((item) => (
            <div key={item.dcsExperience} className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Transferable experience
              </div>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">{item.dcsExperience}</h2>
              <p className="mt-2 text-sm font-semibold text-blue-700">{item.mspCapability}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.evidencePrompt}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">Privacy boundary</div>
        <p className="mt-3 text-sm leading-7 text-amber-950">
          Use fictional clients and generic support patterns. Do not enter real DCS, Avance, client, student, staff,
          credential, ticket, IP, endpoint, private record, internal URL, or confidential procedure details.
        </p>
      </section>
    </div>
  );
}
