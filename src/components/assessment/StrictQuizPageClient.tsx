'use client';

import { useMemo, useState } from 'react';
import { getStrictQuizQuestions } from '../../data/questions';
import AssessmentSession from './AssessmentSession';

type StrictQuizPageClientProps = {
  weakTopic: string | null;
};

export default function StrictQuizPageClient({ weakTopic }: StrictQuizPageClientProps) {
  const [questionCount, setQuestionCount] = useState<8 | 12 | 16>(12);

  const questions = useMemo(() => getStrictQuizQuestions(weakTopic, questionCount), [questionCount, weakTopic]);

  return (
    <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Strict quiz</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Focused assessment practice</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {weakTopic
            ? `Review weak-topic items in ${weakTopic}, then prove transfer in mixed-context questions from other domains.`
            : 'Practice a weighted DCS-focused quiz with mixed question styles and review feedback.'}
        </p>
      </div>

      <div className="rounded-3xl bg-slate-50 p-6">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quiz setup</div>
        <div className="mt-3 flex flex-wrap gap-3">
          {[8, 12, 16].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setQuestionCount(size as 8 | 12 | 16)}
              className={`rounded-full px-4 py-2 text-sm ${
                questionCount === size ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              {size} questions
            </button>
          ))}
        </div>
      </div>

      <AssessmentSession
        key={`${weakTopic ?? 'all'}-${questionCount}`}
        questions={questions}
        source="strict-quiz"
        title="Strict quiz session"
        description="Includes MCQ, short-answer, order-steps, scenario-response, and explain-it-simply prompts."
      />
    </div>
  );
}
