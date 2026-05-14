"use client";

import { useState } from 'react';

type ReflectionJournalProps = {
  scenarioId: string;
  onSave: (entry: { content: string; emotions: string[] }) => void;
};

const EMOTION_OPTIONS = [
  'Confident', 'Stressed', 'Curious', 'Frustrated', 
  'Empathetic', 'Overwhelmed', 'Satisfied', 'Neutral'
];

export function ReflectionJournal({ scenarioId, onSave }: ReflectionJournalProps) {
  const [content, setContent] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  function toggleEmotion(emotion: string) {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion) 
        : [...prev, emotion]
    );
  }

  function handleSave() {
    if (!content.trim()) return;
    onSave({ content, emotions: selectedEmotions });
    setIsSaved(true);
  }

  if (isSaved) {
    return (
      <div className="rounded-3xl bg-emerald-50 p-6 border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-900">Reflection Saved</h3>
        <p className="mt-2 text-sm text-emerald-800">
          Your thoughts and emotions for this scenario have been recorded in your local journal.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Reflection Journal</div>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">How did that scenario feel?</h2>
      <div className="text-[10px] text-slate-400 italic mt-1">
        Privacy Note: Reflection area only. Do not enter real student, staff, or school-sensitive information.
      </div>
      <p className="mt-2 text-sm text-slate-600">
        Recording your emotional state and thoughts after a troubleshooting session helps build professional resilience.
      </p>

      <div className="mt-6" role="group" aria-labelledby="emotion-label">
        <label id="emotion-label" className="block text-sm font-medium text-slate-700 mb-2">
          What emotions did you notice during this scenario?
        </label>
        <div className="flex flex-wrap gap-2">
          {EMOTION_OPTIONS.map(emotion => (
            <button
              key={emotion}
              onClick={() => toggleEmotion(emotion)}
              aria-pressed={selectedEmotions.includes(emotion)}
              className={`px-4 py-2 rounded-full text-sm transition-all outline-none focus:ring-2 focus:ring-slate-900 ${
                selectedEmotions.includes(emotion)
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {emotion}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor={`takeaways-${scenarioId}`} className="block text-sm font-medium text-slate-700 mb-2">
          Key takeaways or thoughts:
        </label>
        <textarea
          id={`takeaways-${scenarioId}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What would you do differently next time? What felt most challenging?"
          className="w-full min-h-32 p-4 rounded-2xl border border-slate-200 text-sm text-slate-800 outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-400"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            content.trim() 
              ? 'bg-slate-900 text-white' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          Save Reflection
        </button>
      </div>
    </div>
  );
}
