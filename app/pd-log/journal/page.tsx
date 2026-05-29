"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllJournalEntries, type JournalEntry } from '../../../src/lib/offlineStorage';
import { scenarios } from '../../../src/data/scenarios';
import { modules } from '../../../src/data/modules';

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await getAllJournalEntries();
        // Sort by date descending
        setEntries(data.sort((a, b) => b.createdAtIso.localeCompare(a.createdAtIso)));
      } catch (e) {
        console.error('Failed to load journal entries', e);
      } finally {
        setLoading(false);
      }
    }
    loadEntries();
  }, []);

  function getScenarioTitle(scenarioId: string) {
    // Check scenarios first
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) return scenario.title;

    // Then check interactive labs in modules
    for (const module of modules) {
      const lab = module.interactiveLabs?.find(l => l.id === scenarioId);
      if (lab) return lab.title;
    }

    return scenarioId;
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-slate-500 animate-pulse">Loading journal...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Reflection Journal</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            Personal growth through troubleshooting reflection.
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            This journal records how you felt and what you learned during interactive scenarios. 
            Use these insights to build resilience and improve your L1 triage sequence.
          </p>
          <Link 
            href="/pd-log"
            className="mt-6 inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to PD Log
          </Link>
        </div>
      </header>

      {entries.length === 0 ? (
        <section className="rounded-[2rem] border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-500">No reflections recorded yet. Complete a Scenario Lab to start your journal.</p>
          <Link 
            href="/scenarios"
            className="mt-4 inline-block px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold"
          >
            Browse Scenarios
          </Link>
        </section>
      ) : (
        <div className="grid gap-6">
          {entries.map(entry => (
            <article key={entry.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Scenario Reflection</div>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">{getScenarioTitle(entry.scenarioId)}</h2>
                  <div className="mt-1 text-xs text-slate-400">
                    {new Date(entry.createdAtIso).toLocaleDateString()} at {new Date(entry.createdAtIso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 justify-end max-w-[150px]">
                  {entry.emotions.map(emotion => (
                    <span 
                      key={emotion} 
                      className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-medium text-slate-600"
                    >
                      {emotion}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Thoughts & Takeaways</h3>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Link 
                  href={`/scenarios`} // Ideally link back to the specific scenario
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Review Scenario again
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
