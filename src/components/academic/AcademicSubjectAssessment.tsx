'use client';

import AssessmentSession from '../assessment/AssessmentSession';
import type { AssessmentQuestion } from '../../types/assessment';

export default function AcademicSubjectAssessment({
  subjectCode,
  subjectTitle,
  questions
}: {
  subjectCode: string;
  subjectTitle: string;
  questions: AssessmentQuestion[];
}) {
  if (!questions.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Subject assessment
        </div>
        <p className="mt-4 text-sm text-slate-600">No assessment questions are available for this subject yet.</p>
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Subject assessment</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Practice questions for {subjectTitle}</h2>
          <p className="mt-2 text-sm text-slate-600">
            Answer a mix of multiple-choice and written prompts with live LLM feedback, scoring, and review guidance.
          </p>
        </div>
        <AssessmentSession
          questions={questions}
          source="module-quiz"
          title={`${subjectTitle} assessment`}
          description={`Answer these questions to practice ${subjectCode} learning outcomes.`}
        />
      </div>
    </section>
  );
}
