"use client";

import { useState, useEffect } from 'react';
import type { AssessmentQuestion, AssessmentAttempt } from '../types/assessment';
import { createAssessmentAttempt } from '../lib/scoring';
import { trackUsageInteraction } from '../hooks/useUsageTracking';

type PracticeExamProps = {
  questions: AssessmentQuestion[];
  title: string;
};

export function PracticeExam({ questions, title }: PracticeExamProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | undefined>(undefined);
  const [examComplete, setExamComplete] = useState(false);
  const [results, setResults] = useState<{ score: number; total: number; attempts: AssessmentAttempt[] }>({
    score: 0,
    total: 0,
    attempts: []
  });

  const currentQuestion = questions[currentIndex];

  function handleNext() {
    if (!currentQuestion || selectedOptionId === undefined) return;

    const attempt = createAssessmentAttempt({
      question: currentQuestion,
      response: {
        questionId: currentQuestion.id,
        confidence: 3,
        selectedOptionId,
        reasoning: 'Exam mode',
        judgement: 'Exam mode'
      },
      selfRating: { correctness: 2, reasoning: 2, judgement: 2 },
      source: 'module-quiz'
    });

    const isCorrect = currentQuestion.type === 'mcq' && selectedOptionId === currentQuestion.correctOptionId;
    
    setResults(prev => ({
      ...prev,
      score: prev.score + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      attempts: [...prev.attempts, attempt]
    }));

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(undefined);
    } else {
      setExamComplete(true);
      trackUsageInteraction({
        eventType: 'quiz_completed',
        route: '/practice-exam',
        label: title,
        contentType: 'other',
        activityCategory: 'quiz',
        completed: true,
        score: (results.score + (isCorrect ? 1 : 0)) / questions.length,
        metadata: { source: 'built-in' }
      });
    }
  }

  if (examComplete) {
    const percentage = Math.round((results.score / questions.length) * 100);
    return (
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm text-center">
        <h2 className="text-3xl font-semibold text-slate-900">{title} Complete</h2>
        <div className="mt-6 text-6xl font-bold text-slate-900">{percentage}%</div>
        <p className="mt-4 text-slate-600">You scored {results.score} out of {questions.length} questions correctly.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-8 rounded-full bg-slate-900 px-8 py-3 text-white font-semibold"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-900">{title} (Internal Study Mode)</h2>
        <span className="text-sm text-slate-500">Question {currentIndex + 1} of {questions.length}</span>
      </div>

      <div className="mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800" role="note">
        <strong>Notice:</strong> This is a free internal study tool for professional development. It is NOT an official certification exam. Completing this does not grant a CompTIA or ITIL credential.
        <div className="mt-2 text-[10px] text-amber-600 italic">
          Privacy Note: Study area only. Do not enter real student, staff, or school-sensitive information.
        </div>
      </div>

      <div className="mb-8" aria-live="polite">
        <h3 className="text-2xl font-medium text-slate-900 mb-6">{currentQuestion.prompt}</h3>
        {currentQuestion.type === 'mcq' && (
          <div className="space-y-4" role="radiogroup" aria-label={currentQuestion.prompt}>
            {currentQuestion.options.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedOptionId(option.id)}
                aria-pressed={selectedOptionId === option.id}
                className={`w-full p-4 rounded-2xl border text-left transition-all outline-none focus:ring-2 focus:ring-slate-900 ${
                  selectedOptionId === option.id 
                    ? 'border-slate-900 bg-slate-900 text-white' 
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={selectedOptionId === undefined}
          className={`rounded-full px-8 py-3 font-semibold transition-all ${
            selectedOptionId !== undefined 
              ? 'bg-slate-900 text-white' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentIndex === questions.length - 1 ? 'Finish Exam' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
