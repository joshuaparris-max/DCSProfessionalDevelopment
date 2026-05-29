"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { trackUsageInteraction } from '../../hooks/useUsageTracking';
import { createAssessmentAttempt, getDefaultSelfRating } from '../../lib/scoring';
import type {
  AssessmentAttempt,
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentSelfRating,
  ConfidenceLevel
} from '../../types/assessment';
import { useRouter } from 'next/navigation';
import { triggerXPGain } from '../XPToast';

type AssessmentSessionProps = {
  questions: AssessmentQuestion[];
  source: 'strict-quiz' | 'module-quiz';
  title: string;
  description?: string;
  onRecordAttempt?: (attempt: AssessmentAttempt) => void;
  onSessionComplete?: (attempts: AssessmentAttempt[]) => void;
};

type DraftResponse = AssessmentResponse & {
  selfRating: AssessmentSelfRating;
};

type LiveFeedback = {
  overall: 'strong' | 'partial' | 'off-track';
  summary: string;
  missingPoints: string[];
  suggestedNextEdit: string;
  coachingTip: string;
  encouragement: string;
  nextSteps: string[];
};

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildInitialDraft(question: AssessmentQuestion): DraftResponse {
  return {
    questionId: question.id,
    confidence: 1,
    answerText: '',
    selectedOptionId: undefined,
    orderedStepIds: question.type === 'order-steps' ? shuffle(question.steps.map((step) => step.id)) : [],
    reasoning: '',
    judgement: '',
    selfRating: getDefaultSelfRating(question)
  };
}

function confidenceLabel(level: ConfidenceLevel) {
  if (level === 1) {
    return 'Low confidence';
  }

  if (level === 2) {
    return 'Some confidence';
  }

  return 'High confidence';
}

function selfRatingLabel(value: number) {
  if (value === 0) {
    return 'Not close';
  }

  if (value === 1) {
    return 'Partly there';
  }

  return 'Strong match';
}

function weakestTopicText(attempts: AssessmentAttempt[]) {
  const sorted = [...attempts].sort((left, right) => left.scoreBreakdown.total - right.scoreBreakdown.total);
  return sorted[0]?.domain || 'No data yet';
}

export default function AssessmentSession({
  questions,
  source,
  title,
  description,
  onRecordAttempt,
  onSessionComplete
}: AssessmentSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draft, setDraft] = useState<DraftResponse | null>(questions[0] ? buildInitialDraft(questions[0]) : null);
  const [reviewMode, setReviewMode] = useState(false);
  const router = useRouter();
  const [sessionAttempts, setSessionAttempts] = useState<AssessmentAttempt[]>([]);
  const [liveFeedbackEnabled, setLiveFeedbackEnabled] = useState(true);
  const [liveFeedback, setLiveFeedback] = useState<LiveFeedback | null>(null);
  const [liveFeedbackStatus, setLiveFeedbackStatus] = useState<'idle' | 'typing' | 'loading' | 'error'>('idle');
  const [liveFeedbackError, setLiveFeedbackError] = useState<string | null>(null);
  const liveFeedbackAbortRef = useRef<AbortController | null>(null);
  const quizStartedRef = useRef(false);

  const isBossBattle = source === 'strict-quiz';
  const question = questions[currentIndex];
  const sessionComplete = currentIndex >= questions.length;
  const averageScore = sessionAttempts.length
    ? Math.round(
        (sessionAttempts.reduce((sum, attempt) => sum + attempt.scoreBreakdown.total, 0) / sessionAttempts.length) *
          100
      )
    : 0;
  const isVictory = averageScore >= 70;

  // Trigger XP gain once when session completes
  useEffect(() => {
    if (sessionComplete) {
      if (isBossBattle && isVictory) {
        triggerXPGain(100, 'Boss Defeated: ' + title);
      } else if (isVictory) {
        triggerXPGain(50, 'Quest Victory: ' + title);
      } else {
        triggerXPGain(20, 'Combat Experience: ' + title);
      }
    }
  }, [sessionComplete, isBossBattle, isVictory, title]);

  const supportsLiveFeedback = Boolean(question);

  useEffect(() => {
    if (quizStartedRef.current) {
      return;
    }

    quizStartedRef.current = true;
    trackUsageInteraction({
      eventType: 'quiz_started',
      route: source === 'strict-quiz' ? '/strict-quiz' : '/modules',
      label: title,
      contentType: source === 'module-quiz' ? 'module' : 'other',
      activityCategory: 'quiz',
      metadata: { source: 'built-in' }
    });
  }, [source, title]);

  const liveFeedbackPayload = useMemo(() => {
    if (!supportsLiveFeedback || !question || !draft) {
      return null;
    }

    return {
      question: {
        id: question.id,
        type: question.type,
        prompt: question.prompt,
        modelAnswer: question.modelAnswer,
        explanation: question.explanation,
        rubric: 'rubric' in question ? question.rubric : [],
        commonMistakes: question.commonMistakes,
        dcsContext: question.dcsContext
      },
      draft: {
        answerText: draft.answerText ?? '',
        selectedOptionText:
          question.type === 'mcq'
            ? question.options.find((option) => option.id === draft.selectedOptionId)?.label ?? ''
            : '',
        orderedStepsText:
          question.type === 'order-steps'
            ? (draft.orderedStepIds ?? [])
                .map((id) => question.steps.find((step) => step.id === id)?.label)
                .filter(Boolean)
                .join(' -> ')
            : '',
        reasoning: draft.reasoning ?? '',
        judgement: draft.judgement ?? ''
      }
    };
  }, [draft, question, supportsLiveFeedback]);

  useEffect(() => {
    if (!supportsLiveFeedback || !liveFeedbackEnabled || reviewMode || !liveFeedbackPayload) {
      return;
    }

    const totalText =
      (liveFeedbackPayload.draft.answerText?.trim() ?? '') +
      (liveFeedbackPayload.draft.selectedOptionText?.trim() ?? '') +
      (liveFeedbackPayload.draft.orderedStepsText?.trim() ?? '') +
      (liveFeedbackPayload.draft.reasoning?.trim() ?? '') +
      (liveFeedbackPayload.draft.judgement?.trim() ?? '');

    if (totalText.trim().length < 25) {
      setLiveFeedback(null);
      setLiveFeedbackStatus(totalText.trim().length ? 'typing' : 'idle');
      setLiveFeedbackError(null);
      return;
    }

    setLiveFeedbackStatus('typing');
    setLiveFeedbackError(null);

    const timeout = window.setTimeout(async () => {
      try {
        liveFeedbackAbortRef.current?.abort();
        const controller = new AbortController();
        liveFeedbackAbortRef.current = controller;

        setLiveFeedbackStatus('loading');
        const response = await fetch('/api/ai/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(liveFeedbackPayload),
          signal: controller.signal
        });

        if (!response.ok) {
          const json = await response.json().catch(() => null);
          const message =
            typeof json?.error === 'string'
              ? json.error
              : `Live feedback failed (${response.status}).`;
          setLiveFeedback(null);
          setLiveFeedbackStatus('error');
          setLiveFeedbackError(message);
          return;
        }

        const json = (await response.json()) as LiveFeedback;
        setLiveFeedback(json);
        setLiveFeedbackStatus('idle');
        setLiveFeedbackError(null);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setLiveFeedback(null);
        setLiveFeedbackStatus('error');
        setLiveFeedbackError('Live feedback failed.');
      }
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [liveFeedbackEnabled, liveFeedbackPayload, reviewMode, supportsLiveFeedback]);

  useEffect(() => {
    if (!question) {
      return;
    }

    setDraft(buildInitialDraft(question));
    setReviewMode(false);
    setLiveFeedback(null);
    setLiveFeedbackStatus('idle');
    setLiveFeedbackError(null);
  }, [currentIndex, question]);

  if (!questions.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
        No questions are available for this session yet.
      </div>
    );
  }

  if (sessionComplete) {
    const revisitCount = sessionAttempts.filter((attempt) => attempt.shouldRevisit).length;

    return (
      <div className={`space-y-6 rounded-[2rem] border p-8 shadow-lg transition-all ${
        isBossBattle && isVictory 
          ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-amber-100' 
          : 'border-slate-200 bg-white'
      }`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              {isBossBattle ? 'Boss Battle Result' : 'Session Complete'}
            </div>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              {isBossBattle && isVictory ? '🏆 Boss Defeated!' : isBossBattle ? '💀 Boss Escaped...' : `${title} Complete`}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Average score <span className="font-bold text-slate-900">{averageScore}%</span>. 
              Weakest focus: <span className="font-semibold text-indigo-600">{weakestTopicText(sessionAttempts)}</span>.
            </p>
          </div>
          {isBossBattle && isVictory && (
            <div className="text-5xl animate-bounce">👹</div>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white/50 border border-slate-100 p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">XP Earned</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              +{isVictory ? 100 : 20} <span className="text-sm font-medium text-slate-400">XP</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/50 border border-slate-100 p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Marked to Revisit</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">{revisitCount}</div>
          </div>
          <div className="rounded-2xl bg-white/50 border border-slate-100 p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Status</div>
            <div className="mt-2">
              {isVictory ? (
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  VICTORY
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  COMPLETED
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setSessionAttempts([]);
              setDraft(buildInitialDraft(questions[0]));
              setReviewMode(false);
            }}
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 transition-all active:scale-95"
          >
            Run Session Again 🔄
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95"
          >
            Back to Dashboard 🏠
          </button>
        </div>
      </div>
    );
  }

  if (!question || !draft) {
    return null;
  }

  const attemptPreview = createAssessmentAttempt({
    question,
    response: draft,
    selfRating: draft.selfRating,
    source
  });

  const isAnswerReady =
    Boolean(draft.confidence) &&
    (question.type === 'mcq'
      ? Boolean(draft.selectedOptionId)
      : question.type === 'order-steps'
      ? Boolean(draft.orderedStepIds?.length)
      : Boolean(draft.answerText?.trim())) &&
    Boolean(draft.reasoning.trim()) &&
    Boolean(draft.judgement.trim());

  function moveStep(stepId: string, direction: -1 | 1) {
    if (question.type !== 'order-steps' || !draft) {
      return;
    }

    const currentOrder = draft.orderedStepIds || [];
    const currentPosition = currentOrder.findIndex((value) => value === stepId);
    const nextPosition = currentPosition + direction;

    if (currentPosition < 0 || nextPosition < 0 || nextPosition >= currentOrder.length) {
      return;
    }

    const nextOrder = [...currentOrder];
    const [item] = nextOrder.splice(currentPosition, 1);
    nextOrder.splice(nextPosition, 0, item);

    setDraft({
      ...draft,
      orderedStepIds: nextOrder
    });
  }

  function advanceWithAttempt() {
    if (!draft) {
      return;
    }

    const finalAttempt = createAssessmentAttempt({
      question,
      response: draft,
      selfRating: draft.selfRating,
      source
    });
    const nextAttempts = [...sessionAttempts, finalAttempt];

    onRecordAttempt?.(finalAttempt);
    trackUsageInteraction({
      eventType: 'quiz_answered',
      route: source === 'strict-quiz' ? '/strict-quiz' : '/modules',
      label: title,
      contentType: source === 'module-quiz' ? 'module' : 'other',
      activityCategory: 'quiz',
      completed: true,
      score: finalAttempt.scoreBreakdown.total,
      metadata: {
        domain: finalAttempt.domain,
        weakTopic: finalAttempt.weakTopic,
        source: 'built-in'
      }
    });
    setSessionAttempts(nextAttempts);

    if (currentIndex === questions.length - 1) {
      onSessionComplete?.(nextAttempts);
      trackUsageInteraction({
        eventType: 'quiz_completed',
        route: source === 'strict-quiz' ? '/strict-quiz' : '/modules',
        label: title,
        contentType: source === 'module-quiz' ? 'module' : 'other',
        activityCategory: 'quiz',
        completed: true,
        score: nextAttempts.reduce((sum, attempt) => sum + attempt.scoreBreakdown.total, 0) / nextAttempts.length,
        metadata: { source: 'built-in' }
      });
      setCurrentIndex(questions.length);
      return;
    }

    setCurrentIndex(currentIndex + 1);
  }

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</div>
          <h3 className="mt-2 text-2xl font-semibold text-slate-900">{question.prompt}</h3>
          {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
        </div>
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
          Question {currentIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Confidence first</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[1, 2, 3].map((value) => {
            const level = value as ConfidenceLevel;
            const active = draft.confidence === level;
            return (
              <button
                key={value}
                onClick={() => setDraft({ ...draft, confidence: level })}
                className={`rounded-full px-4 py-2 text-sm ${
                  active ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
                aria-label={`Confidence level ${value}: ${confidenceLabel(level)}`}
                aria-pressed={active}
              >
                {value} - {confidenceLabel(level)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-[10px] text-slate-400 italic mt-2">
        Privacy Note: Practice area only. Do not enter real student, staff, or school-sensitive information.
      </div>
      <div className="grid gap-4">
        {question.type === 'mcq' ? (
          <div className="grid gap-3">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={`rounded-2xl border p-4 text-sm ${
                  draft.selectedOptionId === option.id
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  className="sr-only"
                  checked={draft.selectedOptionId === option.id}
                  onChange={() => setDraft({ ...draft, selectedOptionId: option.id })}
                />
                {option.label}
              </label>
            ))}
          </div>
        ) : null}

        {question.type === 'short-answer' || question.type === 'scenario-response' || question.type === 'explain-it-simply' ? (
          <textarea
            value={draft.answerText}
            onChange={(event) => setDraft({ ...draft, answerText: event.target.value })}
            className="min-h-32 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
            placeholder={
              question.type === 'explain-it-simply'
                ? 'Explain it simply, as if you were speaking to a non-technical staff member.'
                : 'Write your answer in plain English.'
            }
          />
        ) : null}

        {supportsLiveFeedback ? (
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Live AI feedback</div>
                <div className="mt-2 text-sm text-slate-700">
                  Debounced feedback while you type (works for MCQ, order-steps, and text answers; keep content privacy-safe).
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLiveFeedbackEnabled((value) => !value)}
                className={`rounded-full px-4 py-2 text-sm ${
                  liveFeedbackEnabled ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {liveFeedbackEnabled ? 'On' : 'Off'}
              </button>
            </div>

            {liveFeedbackEnabled ? (
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {liveFeedbackStatus === 'typing' ? (
                  <div className="rounded-2xl bg-white p-4 text-slate-600">Keep typing for feedback…</div>
                ) : null}
                {liveFeedbackStatus === 'loading' ? (
                  <div className="rounded-2xl bg-white p-4 text-slate-600">Checking your draft…</div>
                ) : null}
                {liveFeedbackStatus === 'error' ? (
                  <div className="rounded-2xl bg-rose-50 p-4 text-rose-900">
                    {liveFeedbackError ?? 'Live feedback failed.'}
                  </div>
                ) : null}
                {liveFeedback ? (
                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="font-semibold text-slate-900">Draft feedback</div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          liveFeedback.overall === 'strong'
                            ? 'bg-emerald-100 text-emerald-900'
                            : liveFeedback.overall === 'partial'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {liveFeedback.overall}
                      </span>
                    </div>
                    <p className="mt-3">{liveFeedback.summary}</p>
                    {liveFeedback.encouragement ? (
                      <div className="mt-3 rounded-2xl bg-emerald-50 p-3">
                        <div className="text-emerald-800">{liveFeedback.encouragement}</div>
                      </div>
                    ) : null}
                    {liveFeedback.coachingTip ? (
                      <div className="mt-3 rounded-2xl bg-blue-50 p-3">
                        <div className="font-semibold text-blue-900">Coaching tip</div>
                        <p className="mt-1 text-blue-800">{liveFeedback.coachingTip}</p>
                      </div>
                    ) : null}
                    {liveFeedback.missingPoints?.length ? (
                      <div className="mt-3">
                        <div className="font-semibold text-slate-900">Missing points</div>
                        <ul className="mt-2 space-y-1 text-slate-700">
                          {liveFeedback.missingPoints.slice(0, 5).map((point) => (
                            <li key={point}>- {point}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {liveFeedback.nextSteps?.length ? (
                      <div className="mt-3">
                        <div className="font-semibold text-slate-900">Next steps</div>
                        <ul className="mt-2 space-y-1 text-slate-700">
                          {liveFeedback.nextSteps.slice(0, 3).map((step) => (
                            <li key={step}>- {step}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <div className="mt-3 rounded-2xl bg-slate-50 p-4">
                      <div className="font-semibold text-slate-900">Suggested next edit</div>
                      <p className="mt-2 text-slate-700">{liveFeedback.suggestedNextEdit}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        ) : null}

        {question.type === 'order-steps' ? (
          <div className="space-y-3">
            {(draft.orderedStepIds || []).map((stepId, index) => {
              const step = question.steps.find((item) => item.id === stepId);
              if (!step) {
                return null;
              }

              return (
                <div
                  key={stepId}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                >
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</div>
                    <div className="mt-1">{step.label}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveStep(stepId, -1)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700"
                    >
                      Up
                    </button>
                    <button
                      onClick={() => moveStep(stepId, 1)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700"
                    >
                      Down
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        <textarea
          value={draft.reasoning}
          onChange={(event) => setDraft({ ...draft, reasoning: event.target.value })}
          className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
          placeholder="Why this answer? Name the mechanism, not just the symptom."
        />

        <textarea
          value={draft.judgement}
          onChange={(event) => setDraft({ ...draft, judgement: event.target.value })}
          className="min-h-24 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 outline-none focus:border-slate-900"
          placeholder="What risk, sequencing point, privacy concern, or escalation judgement matters here?"
        />
      </div>

      {!reviewMode ? (
        <div className="flex justify-end">
          <button
            onClick={() => setReviewMode(true)}
            disabled={!isAnswerReady}
            className={`rounded-full px-4 py-2 text-sm ${
              isAnswerReady ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            Check answer
          </button>
        </div>
      ) : (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Model answer</div>
            <p className="mt-2 text-sm text-slate-700">{question.modelAnswer}</p>
            <p className="mt-3 text-sm text-slate-600">{question.explanation}</p>
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">DCS context:</span> {question.dcsContext}
            </p>
            <div className="mt-3 rounded-2xl bg-white p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">Common misses</div>
              <ul className="mt-2 space-y-1">
                {question.commonMistakes.map((mistake) => (
                  <li key={mistake}>- {mistake}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {(
              [
                ['correctness', 'Correctness', question.type === 'mcq' || question.type === 'order-steps'],
                ['reasoning', 'Reasoning', false],
                ['judgement', 'Judgement', false]
              ] as const
            ).map(([key, label, autoMarked]) => (
              <div key={key} className="rounded-2xl bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">{label}</div>
                <div className="mt-2 text-xs text-slate-500">
                  {autoMarked ? 'Auto-marked from the answer or sequence.' : 'Self-rate against the model answer.'}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[0, 1, 2].map((value) => (
                    <button
                      key={value}
                      onClick={() =>
                        setDraft({
                          ...draft,
                          selfRating: {
                            ...draft.selfRating,
                            [key]: value
                          }
                        })
                      }
                      disabled={autoMarked}
                      className={`rounded-full px-3 py-1 text-xs ${
                        draft.selfRating[key] === value
                          ? 'bg-slate-900 text-white'
                          : 'border border-slate-200 bg-slate-50 text-slate-700'
                      } ${autoMarked ? 'cursor-not-allowed opacity-60' : ''}`}
                    >
                      {selfRatingLabel(value)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Correctness</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(attemptPreview.scoreBreakdown.correctness * 100)}%
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Reasoning</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(attemptPreview.scoreBreakdown.reasoning * 100)}%
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Judgement</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {Math.round(attemptPreview.scoreBreakdown.judgement * 100)}%
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <div className="text-sm text-slate-500">Next review</div>
              <div className="mt-2 text-lg font-semibold text-slate-900">{attemptPreview.nextReviewDateIso}</div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Feedback</div>
            <p className="mt-2">{attemptPreview.feedback.correctness}</p>
            <p className="mt-2">{attemptPreview.feedback.reasoning}</p>
            <p className="mt-2">{attemptPreview.feedback.judgement}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => setReviewMode(false)}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
            >
              Edit answer
            </button>
            <button onClick={advanceWithAttempt} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
              Save and continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
