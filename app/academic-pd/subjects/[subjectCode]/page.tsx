import dynamic from 'next/dynamic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { academicSubjects, getAcademicSubjectByCode } from '../../../../src/data/academicSubjects';
import type { AcademicSubject, AcademicWeeklyModule } from '../../../../src/types/academic';

const AcademicSubjectAssessment = dynamic(
  () => import('../../../../src/components/academic/AcademicSubjectAssessment'),
  {
    ssr: false
  }
);

type Params = {
  subjectCode: string;
};

export function generateStaticParams() {
  return academicSubjects.map((subject) => ({
    subjectCode: subject.code.toLowerCase()
  }));
}

function getFallbackWeeklyModules(subject: AcademicSubject): AcademicWeeklyModule[] {
  const relatedDcsModuleIds = Array.from(new Set(subject.dcsBridges.flatMap((bridge) => bridge.relatedDcsModuleIds)));

  return subject.silos.map((silo, index) => ({
    id: `${subject.id}-topic-${silo.number}`,
    week: index + 1,
    topicNumber: index + 1,
    title: `SILO ${silo.number} planning block`,
    deliveryMode: 'DCSPrep topic block',
    sourceDetail: 'Generated from SILO mapping until exact weekly SLG topic rows are added.',
    summary: silo.text,
    dcsPrepFocus: silo.plainEnglish,
    linkedSiloIds: [silo.id],
    relatedDcsModuleIds,
    resources: [],
    assessment: {
      id: `${subject.id}-topic-${silo.number}-assessment`,
      title: `SILO ${silo.number} reflection check`,
      prompt: silo.quizItems[0] ?? `Explain how SILO ${silo.number} connects to DCS support practice.`,
      questionType: 'reflection',
      rubric: [
        'Explains the academic concept in plain English.',
        'Connects the concept to a real DCS support task.',
        'Includes safe escalation or documentation judgement.'
      ],
      evidenceOutput: 'A short reflection note linked to this SILO.'
    }
  }));
}

export default function AcademicSubjectPage({ params }: { params: Params }) {
  const subject = getAcademicSubjectByCode(params.subjectCode);

  if (!subject) {
    notFound();
  }

  const weeklyModules = subject.weeklyModules?.length ? subject.weeklyModules : getFallbackWeeklyModules(subject);
  const assessmentSections = subject.assessmentSections ?? [
    {
      id: `${subject.id}-generated-assessment`,
      title: 'SILO reflection checks',
      timing: 'Use alongside each topic block',
      purpose: 'Convert subject outcomes into short DCSPrep assessment evidence.',
      tasks: [
        'Answer the assessment prompt inside each topic block.',
        'Connect the response to at least one DCS support scenario.',
        'Keep examples privacy-safe and free of live school incident details.'
      ],
      rubric: [
        'Correctly explains the subject outcome.',
        'Uses a practical school IT example.',
        'Shows safe judgement, documentation, or escalation behaviour.'
      ],
      relatedWeekIds: weeklyModules.map((module) => module.id)
    }
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {subject.track}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {subject.provider}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
              {subject.yearLevel ?? 'Academic subject'}
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-slate-900">{subject.code}: {subject.title}</h1>
          <p className="text-slate-700">{subject.summary}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Source</p>
              <p className="mt-2 text-sm text-slate-600">
                {subject.sourceType} from {subject.sourceFileName ?? 'source file'}
              </p>
            </div>
            {subject.recommendedNextAction ? (
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Recommended action</p>
                <p className="mt-2 text-sm text-slate-600">{subject.recommendedNextAction}</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Weekly topic modules</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Week-by-week learning boxes</h2>
          </div>
          <p className="text-sm text-slate-500">
            {weeklyModules.length} topic block{weeklyModules.length === 1 ? '' : 's'} with integrated assessment
          </p>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-2">
          {weeklyModules.map((topic) => (
            <article key={topic.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  Week {topic.week} - Topic {topic.topicNumber}
                </span>
                {topic.dateLabel ? (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 ring-1 ring-slate-200">
                    {topic.dateLabel}
                  </span>
                ) : null}
              </div>

              <h3 className="mt-4 text-xl font-semibold text-slate-900">{topic.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{topic.deliveryMode}{topic.contactHours ? ` - ${topic.contactHours} hrs` : ''}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{topic.summary}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                <span className="font-semibold text-slate-900">DCSPrep focus: </span>
                {topic.dcsPrepFocus}
              </p>

              <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Source row</p>
                <p className="mt-2 text-sm text-slate-600">{topic.sourceDetail}</p>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">DCSPrep links</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {topic.relatedDcsModuleIds.map((moduleId) => (
                      <Link
                        key={moduleId}
                        href={`/modules/${moduleId}`}
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                      >
                        {moduleId}
                      </Link>
                    ))}
                    {topic.relatedScenarioIds?.map((scenarioId) => (
                      <Link
                        key={scenarioId}
                        href="/scenarios"
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                      >
                        scenario: {scenarioId}
                      </Link>
                    ))}
                  </div>
                </div>

                {topic.resources.length ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">External resources</p>
                    <div className="mt-2 grid gap-2">
                      {topic.resources.map((resource) => (
                        <a
                          key={resource.id}
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
                        >
                          <span className="font-semibold text-slate-900">{resource.title}</span>
                          <span className="ml-2 text-xs uppercase tracking-[0.18em] text-slate-500">{resource.provider}</span>
                          <span className="mt-1 block text-slate-600">{resource.description}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="mt-5 rounded-3xl bg-white p-5 ring-1 ring-slate-200">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Integrated assessment</p>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">{topic.assessment.title}</h4>
                <p className="mt-2 text-sm leading-7 text-slate-700">{topic.assessment.prompt}</p>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Evidence output: </span>
                  {topic.assessment.evidenceOutput}
                </p>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {topic.assessment.rubric.map((criterion) => (
                    <li key={criterion} className="rounded-2xl bg-slate-50 px-4 py-2">
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {subject.slgAssessmentSummary ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Assessment and feedback summary</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">SLG assessment plan translated into DCSPrep</h2>
            </div>
            <p className="text-sm text-slate-500">{subject.slgAssessmentSummary.sourceLabel}</p>
          </div>

          {subject.slgAssessmentSummary.lmsRubricNote || subject.slgAssessmentSummary.sourceNote || subject.slgAssessmentSummary.hurdleSummary ? (
            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              {subject.slgAssessmentSummary.lmsRubricNote ? (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">LMS rubric note: </span>
                  {subject.slgAssessmentSummary.lmsRubricNote}
                </div>
              ) : null}
              {subject.slgAssessmentSummary.sourceNote ? (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Source note: </span>
                  {subject.slgAssessmentSummary.sourceNote}
                </div>
              ) : null}
              {subject.slgAssessmentSummary.hurdleSummary ? (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Hurdle: </span>
                  {subject.slgAssessmentSummary.hurdleSummary}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            {subject.slgAssessmentSummary.tasks.map((task) => (
              <article key={task.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    {task.weight}%
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 ring-1 ring-slate-200">
                    {task.timing}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{task.assessmentType}</h3>
                <p className="mt-2 text-sm text-slate-600">Due: {task.dueDate}</p>
                <p className="mt-2 text-sm text-slate-600">Feedback: {task.feedbackMethod}</p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  <span className="font-semibold text-slate-900">DCSPrep integration: </span>
                  {task.dcsPrepIntegration}
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">Evidence output: </span>
                  {task.evidenceOutput}
                </p>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Source criteria</p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    {task.sourceCriteria.map((criterion) => (
                      <li key={criterion} className="rounded-2xl bg-white px-4 py-2">
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {task.silosAssessed.map((silo) => (
                    <span key={silo} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                      SILO {silo}
                    </span>
                  ))}
                  {task.relatedDcsModuleIds.map((moduleId) => (
                    <Link
                      key={moduleId}
                      href={`/modules/${moduleId}`}
                      className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-100"
                    >
                      {moduleId}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Assessment sections</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">How assessment is integrated</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {assessmentSections.map((section) => (
            <article key={section.id} className="rounded-3xl bg-slate-50 p-5">
              <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{section.timing}</p>
              <p className="mt-3 text-sm leading-7 text-slate-700">{section.purpose}</p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Tasks</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {section.tasks.map((task) => (
                    <li key={task} className="rounded-2xl bg-white px-4 py-2">{task}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rubric</p>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  {section.rubric.map((criterion) => (
                    <li key={criterion} className="rounded-2xl bg-white px-4 py-2">{criterion}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">SILOs</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Curriculum prompts</h2>
              </div>
            </div>
            <div className="mt-6 space-y-6">
              {subject.silos.map((silo) => (
                <article key={silo.id} className="rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-900">SILO {silo.number}</p>
                  <p className="mt-2 text-sm text-slate-700">{silo.text}</p>
                  <p className="mt-3 text-sm text-slate-600">{silo.plainEnglish}</p>
                  <div className="mt-3 space-y-2">
                    {silo.practicePrompts.map((prompt, index) => (
                      <p key={index} className="text-sm text-slate-600">
                        • {prompt}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quiz items</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Reflection prompts</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-700">
              {subject.silos.flatMap((silo) => silo.quizItems).map((item, index) => (
                <li key={`${item}-${index}`} className="rounded-2xl bg-slate-50 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">DCS relevance</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">How this subject helps DCS</h2>
            <div className="mt-6 space-y-5">
              {subject.dcsBridges.map((bridge) => (
                <div key={bridge.id} className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{bridge.dcsArea}</p>
                  <p className="mt-2 text-sm text-slate-700">{bridge.explanation}</p>
                  {bridge.practicalOutput ? (
                    <p className="mt-3 text-sm text-slate-600">Practical output: {bridge.practicalOutput}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {bridge.relatedDcsModuleIds.map((moduleId) => (
                      <Link
                        key={moduleId}
                        href={`/modules/${moduleId}`}
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-100"
                      >
                        {moduleId}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">More academic PD</p>
            <Link
              href="/academic-pd"
              className="mt-5 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Back to Academic PD home
            </Link>
          </div>
        </aside>
      </section>

      {subject.assessmentQuestions ? (
        <section className="space-y-6">
          <AcademicSubjectAssessment
            subjectCode={subject.code}
            subjectTitle={subject.title}
            questions={subject.assessmentQuestions}
          />
        </section>
      ) : null}
    </div>
  );
}
