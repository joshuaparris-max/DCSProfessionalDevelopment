'use client';

import { useState } from 'react';
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
  const [draftResponses, setDraftResponses] = useState<Record<string, string>>({});
  const [selectedOptionIds, setSelectedOptionIds] = useState<Record<string, string>>({});
  const [completedDrafts, setCompletedDrafts] = useState<Record<string, boolean>>({});

  const previewQuestions = questions.slice(0, 2);

  function getDraftAnswer(question: AssessmentQuestion) {
    if (question.type === 'mcq') {
      const selectedId = selectedOptionIds[question.id];
      return question.options.find((option) => option.id === selectedId)?.label ?? '';
    }

    return draftResponses[question.id] ?? '';
  }

  function markReady(questionId: string) {
    setCompletedDrafts((current) => ({
      ...current,
      [questionId]: true
    }));
  }

  function updateDraft(questionId: string, text: string) {
    setDraftResponses((current) => ({
      ...current,
      [questionId]: text
    }));
  }

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

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Quick practice</div>
              <p className="mt-2 text-sm text-slate-700">
                Draft responses for the first two assessment questions and self-review them before the full session.
              </p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              {previewQuestions.length} questions previewed
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {previewQuestions.map((question) => {
              const answer = getDraftAnswer(question);
              const ready = Boolean(answer.trim());

              return (
                <article key={question.id} className="rounded-3xl bg-white p-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Preview question</div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{question.prompt}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                      {question.type}
                    </span>
                  </div>

                  {'type' in question && question.type === 'mcq' ? (
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {question.options.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedOptionIds((current) => ({ ...current, [question.id]: option.id }))}
                          className={`rounded-2xl border px-4 py-3 text-sm text-left ${
                            selectedOptionIds[question.id] === option.id
                              ? 'border-slate-900 bg-slate-900 text-white'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <textarea
                      value={draftResponses[question.id] ?? ''}
                      onChange={(event) => updateDraft(question.id, event.target.value)}
                      className="mt-4 min-h-24 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
                      placeholder="Draft a concise response or reflection here."
                    />
                  )}

                  {'rubric' in question && question.rubric.length ? (
                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                      <div className="font-semibold text-slate-900">Self-review rubric</div>
                      <ul className="mt-2 space-y-2">
                        {question.rubric.map((criterion) => (
                          <li key={criterion} className="rounded-2xl bg-white px-3 py-2">
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => markReady(question.id)}
                      disabled={!ready}
                      className={`rounded-full px-4 py-2 text-sm ${
                        ready ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-400'
                      }`}
                    >
                      {completedDrafts[question.id] ? 'Reviewed' : 'Mark ready for review'}
                    </button>
                    <span className="text-sm text-slate-600">
                      {completedDrafts[question.id] ? 'Ready to compare with the full session.' : 'Complete the draft to self-check.'}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
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
