import Link from 'next/link';
import { academicSubjects } from '../../../src/data/academicSubjects';
import type { DcsArea } from '../../../src/types/academic';

const dcsAreas: DcsArea[] = [
  'DCS Level 1 Support',
  'Networking',
  'Cybersecurity',
  'Programming / Automation',
  'Data / Reporting',
  'M365 / Cloud',
  'Professional Practice'
];

export default function AcademicBridgePage() {
  const bridgeGroups = dcsAreas.map((area) => ({
    area,
    bridges: academicSubjects
      .flatMap((subject) => subject.dcsBridges
        .filter((bridge) => bridge.dcsArea === area)
        .map((bridge) => ({ subject, bridge })))
  }));

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Academic PD Bridge</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">Where academic subjects connect to DCS support</h1>
        <p className="mt-4 text-slate-700">
          This page groups academic subjects by the DCS support areas they best support. Use it to answer,
          “Which subject helps me improve cybersecurity, networking, automation, or professional practice?”
        </p>
      </section>

      <div className="grid gap-6">
        {bridgeGroups.map(({ area, bridges }) => (
          <section key={area} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{area}</h2>
                <p className="text-sm text-slate-500">{bridges.length} academic connection{bridges.length === 1 ? '' : 's'}</p>
              </div>
            </div>

            {bridges.length === 0 ? (
              <p className="mt-4 text-sm text-slate-600">No subjects currently mapped to this area.</p>
            ) : (
              <div className="mt-4 space-y-4">
                {bridges.map(({ subject, bridge }) => (
                  <article key={bridge.id} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/academic-pd/subjects/${subject.code.toLowerCase()}`}
                        className="text-sm font-semibold text-slate-900 hover:text-slate-700"
                      >
                        {subject.code}: {subject.title}
                      </Link>
                      <span className="rounded-full bg-white px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        {bridge.relevance}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{bridge.explanation}</p>
                    {bridge.practicalOutput ? (
                      <p className="mt-3 text-sm text-slate-600">
                        <span className="font-semibold">Practical output: </span>
                        {bridge.practicalOutput}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
