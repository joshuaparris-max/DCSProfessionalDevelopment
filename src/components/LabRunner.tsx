"use client";

import { useState } from 'react';
import type { InteractiveLab } from '../types/training';
import { ReflectionJournal } from './ReflectionJournal';
import { saveJournalEntry } from '../lib/offlineStorage';
import { triggerXPGain } from '../lib/xpEvents';

type LabRunnerProps = {
  lab: InteractiveLab;
  onComplete?: () => void;
};

export function LabRunner({ lab, onComplete }: LabRunnerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowResult] = useState(false);
  const [labStep, setLabStep] = useState<'decision' | 'dcs' | 'retrieval' | 'reflection' | 'complete'>('decision');

  const currentDecision = lab.decisionPoints[currentStep];

  async function handleSaveReflection(entry: { content: string; emotions: string[] }) {
    await saveJournalEntry({
      id: `journal-${Date.now()}`,
      scenarioId: lab.id,
      content: entry.content,
      emotions: entry.emotions,
      createdAtIso: new Date().toISOString()
    });
    triggerXPGain(50, 'Mission Accomplished: ' + lab.title);
    setLabStep('complete');
    if (onComplete) {
      onComplete();
    }
  }

  function handleOptionSelect(optionId: string) {
    setSelectedOption(optionId);
    setShowResult(true);
  }

  function nextStep() {
    if (currentStep < lab.decisionPoints.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setLabStep('dcs');
    }
  }

  return (
    <div className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-blue-600">Interactive Lab</div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">DCS WORKFLOW</span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2">{lab.title}</h3>
      <div className="text-[10px] text-slate-400 italic mb-4">
        Privacy Note: This is a practice lab. Do not enter real student, staff, or school-sensitive data.
      </div>

      <div aria-live="polite" className="mt-4">
        {labStep === 'decision' && (
          <div className="space-y-4">
            <p className="text-sm text-slate-700 leading-relaxed italic border-l-4 border-blue-300 pl-4 py-1">
            &quot;{lab.scenario}&quot;
          </p>
            
            <div className="mt-6">
              <h4 className="text-md font-semibold text-slate-900 mb-4">{currentDecision.question}</h4>
              <div className="grid gap-3" role="radiogroup" aria-label={currentDecision.question}>
                {currentDecision.options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => !showFeedback && handleOptionSelect(option.id)}
                    disabled={showFeedback}
                    aria-pressed={selectedOption === option.id}
                    className={`w-full p-4 rounded-2xl text-left text-sm transition-all border outline-none focus:ring-2 focus:ring-blue-500 ${
                      showFeedback 
                        ? option.isCorrect 
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-900' 
                          : selectedOption === option.id 
                            ? 'bg-rose-100 border-rose-500 text-rose-900 opacity-100'
                            : 'bg-white border-slate-100 opacity-50'
                        : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{option.label}</span>
                      {showFeedback && option.isCorrect && <span className="text-emerald-600 font-bold" aria-hidden="true">✓</span>}
                    </div>
                    {showFeedback && selectedOption === option.id && (
                      <div className="mt-2 text-xs font-medium border-t border-current pt-2">
                        {option.feedback}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {showFeedback && (
              <button
                onClick={nextStep}
                className="mt-6 w-full py-3 rounded-full bg-blue-900 text-white font-bold hover:bg-blue-800 transition focus:ring-2 focus:ring-blue-500"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {labStep === 'dcs' && (
          <div className="space-y-4">
            <h4 className="text-md font-bold text-slate-900">DCS Application</h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-white/50 p-4 rounded-2xl border border-blue-100">
              {lab.dcsApplication}
            </p>
            <button
              onClick={() => setLabStep('retrieval')}
              className="mt-4 w-full py-3 rounded-full bg-blue-900 text-white font-bold focus:ring-2 focus:ring-blue-500"
            >
              I understand, next
            </button>
          </div>
        )}

        {labStep === 'retrieval' && (
          <div className="space-y-4">
            <h4 className="text-md font-bold text-slate-900">Quick Retrieval</h4>
            <label htmlFor={`retrieval-${lab.id}`} className="text-sm text-slate-700 font-medium mb-4 block">
              {lab.retrievalQuestion}
            </label>
            <div className="p-4 rounded-2xl bg-white border border-blue-100">
              <textarea 
                id={`retrieval-${lab.id}`}
                placeholder="Recall the answer from memory..."
                className="w-full text-sm bg-transparent outline-none min-h-20 focus:ring-2 focus:ring-blue-500 rounded-lg"
              />
            </div>
            <button
              onClick={() => setLabStep('reflection')}
              className="mt-4 w-full py-3 rounded-full bg-blue-900 text-white font-bold focus:ring-2 focus:ring-blue-500"
            >
              Check Reflection
            </button>
          </div>
        )}

        {labStep === 'reflection' && (
          <div className="space-y-6">
            <ReflectionJournal 
              scenarioId={lab.id} 
              onSave={handleSaveReflection}
            />
          </div>
        )}

        {labStep === 'complete' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold">
              Lab Complete! You have successfully applied this concept to a DCS workflow and recorded your reflection.
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Ticket Note Example</h5>
              <div className="text-[10px] text-slate-400 italic mb-2">
                Privacy Note: Practice area only. Do not enter real names or credentials.
              </div>
              <p className="text-xs text-slate-600 font-mono leading-relaxed">
                Triage: {lab.title} for staff at [LOCATION].<br/>
                Symptom: [SYMPTOM SUMMARY].<br/>
                Checks: [SAFE CHECKS PERFORMED].<br/>
                Status: [RESOLVED / ESCALATED TO PAUL].
              </p>
            </div>
            <div className="mt-2 text-[10px] text-slate-400 italic">
              Privacy Reminder: Do not enter real student, staff, parent, credential, or network-sensitive information in your notes or reflections.
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() => {
                  const flashcardsEl = document.getElementById('module-flashcards');
                  if (flashcardsEl) {
                    flashcardsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.scrollTo({ top: window.scrollY + 300, behavior: 'smooth' });
                  }
                }}
                className="flex-1 py-3 rounded-full bg-blue-900 text-white font-bold hover:bg-blue-800 transition shadow-lg active:scale-95"
              >
                Continue to Flashcards →
              </button>
              <button
                onClick={() => {
                  setLabStep('decision');
                  setCurrentStep(0);
                  setSelectedOption(null);
                  setShowResult(false);
                }}
                className="px-6 py-3 rounded-full border border-slate-200 bg-white text-slate-600 text-sm font-bold hover:bg-slate-50 transition active:scale-95"
              >
                Restart Lab
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
