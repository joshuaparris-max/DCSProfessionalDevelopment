"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { MindfulnessPause } from '../MindfulnessPause';
import { trackUsageInteraction } from '../../hooks/useUsageTracking';
import { useOfflineDownload } from '../../hooks/useOfflineDownload';
import { LabRunner } from '../LabRunner';
import { getModuleCompletion } from '../../lib/moduleMath';
import {
  getStoredProgressSnapshot,
  saveProgress,
  type UserProgress,
  updateModulePracticalOutput,
  updateModuleSectionProgress,
  updateModuleLabProgress
} from '../../lib/progress';
import type { AssessmentQuestion } from '../../types/assessment';
import type { TrainingModule } from '../../types/training';
import { triggerXPGain } from '../XPToast';

const AssessmentSession = dynamic(() => import('../assessment/AssessmentSession'), {
  loading: () => (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600">
      Loading assessment tools…
    </div>
  ),
  ssr: false
});

function renderMarkdownParagraphs(markdown: string) {
  return markdown.split(/\n\n+/).map((paragraph, index) => (
    <p key={index} className="mt-4 leading-7 text-slate-700">
      {paragraph}
    </p>
  ));
}

export default function ModuleDetail({
  moduleData,
  quizQuestions
}: {
  moduleData: TrainingModule;
  quizQuestions: AssessmentQuestion[];
}) {
  const [activeTab, setActiveTab] = useState<'Start Here' | 'Learn' | 'Review' | 'Assessment'>('Start Here');
  const [diagnosticResponses, setDiagnosticResponses] = useState<Record<string, string>>({});
  const [revealedDiagnostics, setRevealedDiagnostics] = useState<Record<string, boolean>>({});
  const [activeRecallRevealed, setActiveRecallRevealed] = useState(false);
  const [feynmanRubric, setFeynmanRubric] = useState({ clarity: 0, correctness: 0, relevance: 0 });
  const [progress, setProgress] = useState<UserProgress>(() => getStoredProgressSnapshot([moduleData]));
  const [hasHydratedProgress, setHasHydratedProgress] = useState(false);
  const { isDownloaded, isDownloading, toggleDownload } = useOfflineDownload(moduleData);
  const questions = quizQuestions;
  const contentTopRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    if (contentTopRef.current) {
      contentTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    // Scroll to top of content when tab changes
    if (hasHydratedProgress) {
      scrollToContent();
    }
  }, [activeTab, hasHydratedProgress]);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot([moduleData]));
    setHasHydratedProgress(true);
    trackUsageInteraction({
      eventType: 'module_open',
      route: `/modules/${moduleData.id}`,
      label: moduleData.title,
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory: 'reading',
      metadata: { domain: moduleData.domain, level: moduleData.level, source: 'built-in' }
    });
  }, [moduleData]);

  useEffect(() => {
    trackUsageInteraction({
      eventType: 'module_section_view',
      route: `/modules/${moduleData.id}`,
      label: activeTab,
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory:
        activeTab === 'Assessment'
          ? 'quiz'
          : activeTab === 'Review'
          ? 'retrieval'
          : activeTab === 'Learn'
          ? 'reading'
          : 'retrieval',
      metadata: { domain: moduleData.domain, level: moduleData.level, source: 'built-in' }
    });
  }, [activeTab, moduleData.domain, moduleData.id, moduleData.level]);

  useEffect(() => {
    if (!hasHydratedProgress) {
      return;
    }

    saveProgress(progress);
  }, [hasHydratedProgress, progress]);

  const moduleProgress = progress.modules[moduleData.id] ?? {
    sectionsRead: {},
    flashcards: {},
    practicalOutputs: {}
  };

  const moduleCompletion = Math.round(getModuleCompletion(moduleData.id, progress, moduleData));

  function toggleSectionRead(sectionId: string, autoScroll = false) {
    const currentRead = Boolean(progress.modules[moduleData.id]?.sectionsRead?.[sectionId]);
    if (!currentRead) {
      triggerXPGain(20, 'Module Section Mastered');
    }
    setProgress((current) => updateModuleSectionProgress(current, moduleData.id, sectionId, !currentRead));

    if (autoScroll && !currentRead) {
      // Find the next section to scroll to
      const currentIndex = moduleData.sections.findIndex(s => s.id === sectionId);
      if (currentIndex < moduleData.sections.length - 1) {
        const nextId = moduleData.sections[currentIndex + 1].id;
        setTimeout(() => {
          const nextEl = document.getElementById(`section-${nextId}`);
          if (nextEl) nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        // If it's the last section, scroll to labs or flashcards
        setTimeout(() => {
          const labsEl = document.getElementById('module-labs');
          if (labsEl) labsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  function togglePracticalOutput(outputId: string) {
    const currentCompleted = Boolean(progress.modules[moduleData.id]?.practicalOutputs?.[outputId]);
    if (!currentCompleted) {
      triggerXPGain(150, 'Practical Output Evidence Created');
    }
    trackUsageInteraction({
      eventType: 'section_view',
      route: `/modules/${moduleData.id}`,
      label: 'Module practical output',
      contentType: 'module',
      contentId: moduleData.id,
      activityCategory: 'building',
      completed: !currentCompleted,
      metadata: { domain: moduleData.domain, source: 'built-in' }
    });
    setProgress((current) => updateModulePracticalOutput(current, moduleData.id, outputId, !currentCompleted));
  }

  const hasAssessment = questions.length > 0;
  const diagnosticQuestions = questions.slice(0, Math.min(2, questions.length));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const key = `module-study-technique:${moduleData.id}`;
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as { feynmanRubric?: { clarity: number; correctness: number; relevance: number } };
      if (parsed.feynmanRubric) {
        setFeynmanRubric(parsed.feynmanRubric);
      }
    } catch {
      // ignore invalid cache entries
    }
  }, [moduleData.id]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const key = `module-study-technique:${moduleData.id}`;
    window.localStorage.setItem(
      key,
      JSON.stringify({
        feynmanRubric,
        updatedAtIso: new Date().toISOString()
      })
    );
  }, [feynmanRubric, moduleData.id]);

  return (
    <div className="space-y-6 relative">
      {/* Quest Status Bar */}
      <div className="sticky top-0 z-50 -mx-4 px-4 py-3 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between shadow-sm lg:rounded-full lg:mx-0 lg:px-6 lg:mb-6">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
            Q
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Active Quest</div>
            <div className="text-sm font-bold text-slate-900 truncate max-w-[150px] sm:max-w-none">{moduleData.title}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Progress</div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 rounded-full bg-slate-200 overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500" 
                  style={{ width: `${moduleCompletion}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-700">{moduleCompletion}%</span>
            </div>
          </div>
          {moduleCompletion === 100 && (
            <div className="flex items-center gap-2 animate-bounce">
              <span className="text-xl">🏆</span>
            </div>
          )}
        </div>
      </div>

      {moduleCompletion === 100 && (
        <div className="rounded-[2rem] bg-gradient-to-br from-indigo-600 to-blue-700 p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl">🎉</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold">Quest Complete: {moduleData.title}</h2>
              <p className="mt-2 text-indigo-100">
                You&apos;ve mastered all sections, completed the practical evidence, and finished the labs for this module. 
                Your IT Career attributes have been permanently increased.
              </p>
            </div>
            <Link 
              href="/"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all active:scale-95"
            >
              Claim Rewards & Return 🏠
            </Link>
          </div>
        </div>
      )}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Module detail</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{moduleData.title}</h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">{moduleData.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1">{moduleData.domain}</span>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1">{moduleData.level}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
              {moduleData.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className={`rounded-3xl px-5 py-4 text-sm font-bold transition-all ${
              moduleCompletion > 0 ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-700'
            }`}>
              Estimated {moduleData.estimatedMinutes} minutes · {moduleCompletion}% complete
            </div>
            <button
              onClick={toggleDownload}
              disabled={isDownloading}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                isDownloaded 
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                  : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {isDownloading ? 'Downloading...' : isDownloaded ? 'Available Offline' : 'Download for Offline'}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm" ref={contentTopRef}>
        <div className="flex flex-wrap gap-3">
          {(['Start Here', 'Learn', 'Review', 'Assessment'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                if (activeTab === tab) {
                  scrollToContent();
                } else {
                  setActiveTab(tab);
                }
              }}
              className={`rounded-full px-4 py-2 text-sm transition-all ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              } ${tab === 'Assessment' && !hasAssessment ? 'cursor-not-allowed opacity-60' : ''}`}
              disabled={tab === 'Assessment' && !hasAssessment}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          {activeTab === 'Start Here'
            ? 'Begin with a short diagnostic before reading so the module starts with retrieval, not passive content.'
            : activeTab === 'Learn'
            ? 'Explore module learning outcomes, sections, flashcards, and practical outputs.'
            : activeTab === 'Review'
            ? 'Review the module with flashcards, prompts, and progress-oriented notes.'
            : 'Answer module-specific questions to lock in learning and capture review strength.'}
        </p>
      </section>

      {activeTab === 'Start Here' ? (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Diagnostic first</div>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Start with what you would do</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Attempt the prompt first, then reveal the guided answer. This keeps the module question-first even when
                the explanation content sits later in the flow.
              </p>
              <button 
                onClick={() => {
                  const firstPrompt = document.getElementById('diagnostic-prompt-0');
                  if (firstPrompt) firstPrompt.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg active:scale-95 transition-all"
              >
                <span>Begin First Prompt</span>
                <span className="text-xs opacity-50">↓</span>
              </button>
            </div>

            {diagnosticQuestions.length ? (
              diagnosticQuestions.map((question, index) => {
                const isRevealed = Boolean(revealedDiagnostics[question.id]);

                return (
                  <article key={question.id} id={`diagnostic-prompt-${index}`} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm scroll-mt-24 transition-all">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Prompt {index + 1}
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">{question.prompt}</h3>
                    <textarea
                      value={diagnosticResponses[question.id] ?? ''}
                      onChange={(event) =>
                        setDiagnosticResponses((current) => ({
                          ...current,
                          [question.id]: event.target.value
                        }))
                      }
                      placeholder="Write your first response before revealing the guided answer."
                      className="mt-4 min-h-32 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
                    />
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setRevealedDiagnostics((current) => ({
                            ...current,
                            [question.id]: !current[question.id]
                          }))
                        }
                        className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                      >
                        {isRevealed ? 'Hide guided answer' : 'Reveal guided answer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('Learn')}
                        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
                      >
                        Continue to learn tab
                      </button>
                    </div>
                    {isRevealed ? (
                      <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                        <div className="font-semibold text-slate-900">Guided answer</div>
                        <p className="mt-2 leading-7">{question.modelAnswer}</p>
                        <div className="mt-4 font-semibold text-slate-900">Why it matters</div>
                        <p className="mt-2 leading-7">{question.dcsContext}</p>
                      </div>
                    ) : null}
                  </article>
                );
              })
            ) : (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                This module does not yet include diagnostic prompts. Use the assessment tab once questions are added.
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Start here checklist</div>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li className="rounded-3xl bg-slate-50 p-4">Attempt the question before reading.</li>
                <li className="rounded-3xl bg-slate-50 p-4">Reveal the guided answer only after you commit to a response.</li>
                <li className="rounded-3xl bg-slate-50 p-4">Move into Learn once you know what you missed.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick links</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('Learn')}
                  className="block w-full rounded-3xl bg-slate-50 px-4 py-3 text-left"
                >
                  Open learning content
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('Assessment')}
                  className="block w-full rounded-3xl bg-slate-50 px-4 py-3 text-left disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={!hasAssessment}
                >
                  {hasAssessment ? 'Start module assessment' : 'Assessment unavailable'}
                </button>
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
              </div>
            </div>
          </aside>
        </section>
      ) : activeTab === 'Learn' ? (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">What you will learn</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          {moduleData.learningObjectives.map((objective) => (
            <li key={objective} className="rounded-3xl bg-slate-50 p-4">
              {objective}
            </li>
          ))}
        </ul>
        <button 
          onClick={() => {
            const firstSection = document.getElementById(`section-${moduleData.sections[0].id}`);
            if (firstSection) firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg active:scale-95 transition-all"
        >
          <span>Start Reading Sections</span>
          <span className="text-xs opacity-50">↓</span>
        </button>
      </section>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Why this matters in DCS</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.dcsRelevance.map((point) => (
                  <li key={point} className="rounded-3xl bg-slate-50 p-4">
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {moduleData.sourceSubjects?.length ? (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900">Linked subject outcomes</h2>
                <div className="mt-4 space-y-4 text-sm text-slate-700">
                  {moduleData.sourceSubjects.map((subject) => (
                    <article key={subject.code} className="rounded-3xl bg-slate-50 p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          {subject.code}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">
                          {subject.course}
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-slate-900">{subject.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{subject.alignmentNote}</p>
                      <p className="mt-2 text-xs text-slate-500">{subject.slgCurrency}</p>
                      <ul className="mt-4 space-y-2">
                        {subject.silos.map((silo) => (
                          <li key={silo} className="rounded-2xl bg-white px-4 py-3 text-slate-700">
                            {silo}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Module sections</h2>
              <p className="mt-2 text-sm text-slate-600 mb-6">
                Read each section carefully. Click &quot;Complete &amp; Continue&quot; to move to the next objective and earn XP.
              </p>
              <div className="mt-4 space-y-8 text-sm text-slate-700">
                {moduleData.sections.map((section, index) => {
                  const isRead = Boolean(moduleProgress.sectionsRead?.[section.id]);
                  return (
                    <article 
                      key={section.id} 
                      id={`section-${section.id}`}
                      className={`rounded-3xl p-8 border transition-all scroll-mt-24 ${
                        isRead 
                          ? 'bg-emerald-50/50 border-emerald-100 opacity-80' 
                          : 'bg-slate-50 border-transparent shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            isRead ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                          }`}>
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                        </div>
                        {isRead && (
                          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Section Mastered
                          </span>
                        )}
                      </div>
                      
                      <div className="prose prose-slate max-w-none">
                        {renderMarkdownParagraphs(section.bodyMarkdown)}
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-200/60">
                        <button
                          onClick={() => toggleSectionRead(section.id, true)}
                          className={`w-full sm:w-auto px-8 py-3 rounded-full text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                            isRead 
                              ? 'bg-white border border-emerald-200 text-emerald-700 hover:bg-emerald-50' 
                              : 'bg-slate-900 text-white shadow-lg hover:bg-slate-800'
                          }`}
                        >
                          {isRead ? (
                            <>
                              <span>✓ Section Completed</span>
                            </>
                          ) : (
                            <>
                              <span>Complete & Continue</span>
                              <span className="text-xs opacity-50">→</span>
                            </>
                          )}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {moduleData.interactiveLabs?.length ? (
              <div id="module-labs" className="space-y-6 scroll-mt-24">
                <div className="rounded-[2rem] border border-blue-100 bg-blue-50/30 p-6 shadow-sm">
                  <h2 className="text-2xl font-semibold text-slate-900">Interactive Practice</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Apply what you&apos;ve learned in these DCS-specific scenarios.
                  </p>
                </div>
                {moduleData.interactiveLabs.map((lab) => (
                  <LabRunner 
                    key={lab.id} 
                    lab={lab} 
                    onComplete={() => {
                      setProgress(current => updateModuleLabProgress(current, moduleData.id, lab.id, true));
                    }}
                  />
                ))}
              </div>
            ) : null}

            <div id="module-flashcards" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm scroll-mt-24">
              <h2 className="text-2xl font-semibold text-slate-900">Flashcards</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.flashcards.map((card) => (
                  <div key={card.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{card.front}</div>
                    <div className="mt-2 text-slate-600">{card.back}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Quick links</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
                <Link href="/strict-quiz" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Retake quiz
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveTab('Assessment')}
                  className="w-full rounded-3xl bg-slate-50 px-4 py-3 text-left text-sm text-slate-700"
                  disabled={!hasAssessment}
                >
                  {hasAssessment ? 'Start module assessment' : 'Assessment unavailable'}
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Scenario prompts</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.scenarioPrompts.map((prompt) => (
                  <li key={prompt.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{prompt.title}</div>
                    <div className="mt-2 text-slate-600">{prompt.prompt}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Practical outputs</h2>
              <p className="mt-2 text-sm text-slate-600">
                Mark each practical output when you have completed the task or drafted the evidence artifact.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.practicalOutputs.map((output) => {
                  const completed = Boolean(moduleProgress.practicalOutputs?.[output.id]);
                  return (
                    <li key={output.id} className="rounded-3xl bg-slate-50 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-slate-900">{output.title}</div>
                          <div className="mt-2 text-slate-600">{output.description}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => togglePracticalOutput(output.id)}
                          className={`rounded-full px-4 py-2 text-sm ${
                            completed
                              ? 'bg-emerald-900 text-white'
                              : 'border border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {completed ? 'Completed' : 'Mark completed'}
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </section>
      ) : activeTab === 'Review' ? (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Review this module</h2>
              <p className="mt-3 text-sm text-slate-600">
                Revisit core concepts and practice recall with module-specific review tools.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Flashcard review</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.flashcards.map((card) => (
                  <div key={card.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{card.front}</div>
                    <div className="mt-2 text-slate-600">{card.back}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Scenario review</h2>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.scenarioPrompts.map((prompt) => (
                  <li key={prompt.id} className="rounded-3xl bg-slate-50 p-4">
                    <div className="font-semibold text-slate-900">{prompt.title}</div>
                    <div className="mt-2 text-slate-600">{prompt.prompt}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">What to revisit</h2>
              <p className="mt-3 text-sm text-slate-700">
                Review the module’s core themes: questions, judgement, and safe escalation.
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {moduleData.learningObjectives.map((objective) => (
                  <li key={objective} className="rounded-3xl bg-slate-50 p-4">{objective}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Feynman explain-back</h2>
              <p className="mt-3 text-sm text-slate-700">
                Explain this module as if teaching a new L1 tech in under 90 seconds: what it is, when it appears in
                school support, and what to escalate.
              </p>
              <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                Prompt: “If {moduleData.title} fails during class time, what are the first safe checks, what evidence
                should be captured, and when should you escalate?”
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveRecallRevealed((current) => !current)}
                  className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
                >
                  {activeRecallRevealed ? 'Hide rubric hints' : 'Reveal rubric hints'}
                </button>
              </div>
              {activeRecallRevealed ? (
                <div className="mt-4 rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-900">
                  Active Recall mode: keep hints hidden until after your first attempt, then score your response.
                </div>
              ) : null}
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {(
                  [
                    ['clarity', 'Clarity'],
                    ['correctness', 'Correctness'],
                    ['relevance', 'Practical relevance']
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
                    <div className="font-semibold text-slate-900">{label}</div>
                    <select
                      value={feynmanRubric[key]}
                      onChange={(event) =>
                        setFeynmanRubric((current) => ({
                          ...current,
                          [key]: Number(event.target.value)
                        }))
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                    >
                      <option value={0}>Needs work</option>
                      <option value={1}>Developing</option>
                      <option value={2}>Strong</option>
                    </select>
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Concept-sorting drill</h2>
              <p className="mt-3 text-sm text-slate-700">
                Sort these categories before opening tools: <strong>System</strong>, <strong>Symptom</strong>,{' '}
                <strong>Owner</strong>, <strong>Escalation boundary</strong>.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="rounded-2xl bg-slate-50 px-4 py-3">System: Which platform or service is involved?</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Symptom: What exactly is observable?</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Owner: Who has authority to change this safely?</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">
                  Escalation: What evidence tells you to hand off now?
                </li>
              </ul>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Memory tools (mnemonic + sheet)</h2>
              <p className="mt-3 text-sm text-slate-700">
                Build a short mnemonic for this module and capture a one-page memory sheet with commands, checks, and
                escalation phrases.
              </p>
              <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                Template: Trigger phrase / First checks / Do-not-do actions / Escalation sentence.
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Cornell + SQ3R reflection</h2>
              <p className="mt-3 text-sm text-slate-700">
                Use Cornell notes on the left for cues and questions, right side for key ideas, and finish with a
                3-line summary. For source reading: Survey, Question, Read, Recite, Review.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Survey: Scan the section titles and key terms.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Question: Write 3 retrieval questions before reading.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Read + Recite: Answer from memory, then check.</li>
                <li className="rounded-2xl bg-slate-50 px-4 py-3">Review: Tag weak points for strict quiz revisit.</li>
              </ul>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Review actions</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveTab('Assessment')}
                  className="block w-full rounded-3xl bg-slate-50 px-4 py-3 text-left text-sm text-slate-700"
                  disabled={!hasAssessment}
                >
                  {hasAssessment ? 'Go to assessment' : 'Assessment unavailable'}
                </button>
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
                <Link href="/strict-quiz" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Retake strict quiz
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Review notes</h2>
              <p className="mt-3 text-sm text-slate-600">
                Focus on the module’s key actions and judgement patterns rather than memorizing every detail.
              </p>
            </div>
          </aside>
        </section>
      ) : (
        <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Module assessment</h2>
              <p className="mt-3 text-sm text-slate-600">
                Practice with module-specific questions that map back to the same topics and judgement style used in DCS review.
              </p>
            </div>

            {hasAssessment ? (
              <AssessmentSession
                questions={questions}
                source="module-quiz"
                title={`${moduleData.title} assessment`}
                description="Answer each prompt, review the model response, and use self-rating to capture weakness for later review."
              />
            ) : (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                This module does not yet include assessment questions.
              </div>
            )}

            <div className="mt-6">
              <MindfulnessPause />
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Module quick actions</div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <Link href="/due-today" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Review due items
                </Link>
                <Link href="/strict-quiz" className="block rounded-3xl bg-slate-50 px-4 py-3">
                  Retake strict quiz
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Assessment notes</h2>
              <p className="mt-3 text-sm text-slate-600">
                The assessment experience is built to help you reflect on risk, judgement, and technical reasoning for this module.
              </p>
            </div>
          </aside>
        </section>
      )}
    </div>
  );
}
