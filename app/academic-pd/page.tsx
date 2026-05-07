import Link from 'next/link';
import { academicAssessmentSummaryList } from '../../src/data/academicAssessmentSummaries';
import { academicSubjects } from '../../src/data/academicSubjects';

const implementationPhases = [
  {
    title: 'Phase 1: Foundation',
    weeks: 'Weeks 1-4',
    tasks: [
      'Set up subject module structure in DCSPrep.',
      'Define the academic subject, weekly topic, and assessment data model.',
      'Implement basic Academic PD navigation.'
    ]
  },
  {
    title: 'Phase 2: Content Development',
    weeks: 'Weeks 5-12',
    tasks: [
      'Develop weekly learning blocks for Year 1 subjects.',
      'Create assessment prompts, practical outputs, and rubrics.',
      'Curate official and relevant external learning resources.'
    ]
  },
  {
    title: 'Phase 3: Advanced Features',
    weeks: 'Weeks 13-20',
    tasks: [
      'Connect subject progress to existing DCSPrep tracking.',
      'Plan certificate/evidence-pack wording without overstating formal credit.',
      'Add richer media/resource players where the content justifies it.'
    ]
  },
  {
    title: 'Phase 4: Testing and Deployment',
    weeks: 'Weeks 21-24',
    tasks: [
      'Test the Academic PD flow with IT staff workflows.',
      'Review content against SLGs and update gaps.',
      'Prepare deployment and training notes.'
    ]
  }
];

export default function AcademicPdPage() {
  const academicSubjectCodes = new Set(academicSubjects.map((subject) => subject.code.toLowerCase()));

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Academic PD Track</p>
            <h1 className="text-3xl font-semibold text-slate-900">Academic support growth, not a full LMS</h1>
          </div>
          <p className="text-slate-700">
            This section maps RBC and SMITB academic subjects into practical DCS support growth. It is designed as a lightweight bridge layer,
            not a replacement for a full course management system.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/academic-pd/bridge"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 transition hover:bg-slate-100"
            >
              View DCS Bridge by area
            </Link>
            <Link
              href="/academic-pd/subjects/cse1iit"
              className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 transition hover:bg-slate-100"
            >
              Start with CSE1IIT
            </Link>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Implementation roadmap</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">24-week Academic PD build plan</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {implementationPhases.map((phase) => (
            <article key={phase.title} className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{phase.weeks}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{phase.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {phase.tasks.map((task) => (
                  <li key={task} className="rounded-2xl bg-white px-4 py-2">
                    {task}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">SLG assessment map</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Assessment and feedback summaries extracted</h2>
          </div>
          <p className="text-sm text-slate-500">{academicAssessmentSummaryList.length} subject assessment plans</p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {academicAssessmentSummaryList.map((summary) => {
            const subjectHref = `/academic-pd/subjects/${summary.subjectCode.toLowerCase()}`;
            const hasSubjectPage = academicSubjectCodes.has(summary.subjectCode.toLowerCase());
            const totalWeight = summary.tasks.reduce((total, task) => total + task.weight, 0);

            return (
              <article key={summary.subjectCode} className="rounded-3xl bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{summary.sourceLabel}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">{summary.subjectCode}</h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                    {totalWeight}% mapped
                  </span>
                </div>
                {summary.sourceNote ? <p className="mt-3 text-sm text-slate-600">{summary.sourceNote}</p> : null}
                <div className="mt-4 space-y-2">
                  {summary.tasks.map((task) => (
                    <div key={task.id} className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-slate-200">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-slate-900">{task.assessmentType}</span>
                        <span className="text-slate-500">{task.weight}%</span>
                        <span className="text-slate-500">{task.timing}</span>
                      </div>
                      <p className="mt-1 text-slate-600">{task.dcsPrepIntegration}</p>
                    </div>
                  ))}
                </div>
                {hasSubjectPage ? (
                  <Link
                    href={subjectHref}
                    className="mt-5 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Open subject assessment plan
                  </Link>
                ) : (
                  <p className="mt-5 text-sm text-slate-500">
                    Assessment plan extracted; full subject page still needs to be added.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Subjects</p>
            <h2 className="text-2xl font-semibold text-slate-900">Academic subjects available</h2>
          </div>
          <p className="text-sm text-slate-500">This is a curriculum map, not a course player.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {academicSubjects.map((subject) => (
            <article key={subject.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{subject.track} • {subject.provider}</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{subject.code}</h3>
                  <p className="text-sm text-slate-600">{subject.title}</p>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  {subject.yearLevel ?? 'Academic subject'}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-700">{subject.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {subject.dcsBridges.slice(0, 2).map((bridge) => (
                  <span
                    key={bridge.id}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600"
                  >
                    {bridge.dcsArea}
                  </span>
                ))}
              </div>
              <Link
                href={`/academic-pd/subjects/${subject.code.toLowerCase()}`}
                className="mt-6 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                View subject
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
