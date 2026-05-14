"use client";

import { useEffect, useState } from 'react';
import { modules } from '../../src/data/modules';
import type { MCQAssessmentQuestion } from '../../src/types/assessment';

function getDailyChallenge(): MCQAssessmentQuestion | null {
  const today = new Date().toISOString().slice(0, 10);
  const seed = today.split('-').reduce((sum, part) => sum + parseInt(part, 10), 0);

  const allQuestions = modules
    .flatMap((module) => module.quiz || [])
    .filter((question): question is MCQAssessmentQuestion => question.type === 'mcq');
  if (allQuestions.length === 0) {
    return null;
  }

  const index = seed % allQuestions.length;
  return allQuestions[index];
}

export function DailyChallenge() {
  const [question, setQuestion] = useState<MCQAssessmentQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setQuestion(getDailyChallenge());
  }, []);

  if (!question) {
    return null;
  }

  const handleSubmit = () => {
    setShowResult(true);
  };

  const isCorrect = selectedOption === question.correctOptionId;

  return (
    <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">Daily challenge</div>
      <h2 className="mt-3 text-lg font-semibold text-slate-900">1-minute MCQ</h2>
      <p className="mt-2 text-sm leading-7 text-slate-700">
        Test your knowledge with today&apos;s random question. Resets daily.
      </p>

      <div className="mt-5 rounded-3xl bg-white p-5">
        <div className="text-sm font-semibold text-slate-900">{question.prompt}</div>

        {!showResult ? (
          <div className="mt-4 space-y-2">
            {question.options.map((option) => (
              <label key={option.id} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="daily-challenge"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="text-blue-600"
                />
                <span className="text-sm text-slate-700">{option.label}</span>
              </label>
            ))}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="mt-4 rounded-full bg-blue-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              Check answer
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div className={`text-sm font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {isCorrect ? 'Correct!' : 'Not quite.'}
            </div>
            <p className="mt-2 text-sm text-slate-600">{question.explanation}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedOption(null);
                setShowResult(false);
              }}
              className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
