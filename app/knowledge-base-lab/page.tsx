"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const templates = [
  {
    title: 'Parent / community reader article',
    body: `## What this solves\n- **Audience:** parents / carers\n- **Symptom bucket:** \n- **First safe checks:** \n- **When to escalate:** \n- **Privacy reminder:** no passwords, student legal names, or ticket screenshots with identifiers.\n`
  },
  {
    title: 'Staff “quick steps” article',
    body: `## Topic\n- **Who this helps:** staff\n- **Before you log a ticket:** \n- **If it still fails, include in your ticket:** room/device, exact error text, time, who else affected.\n- **Escalation boundary:** \n`
  },
  {
    title: 'Filtering / unblock justification draft',
    body: `## Site / resource\n- **Exact URL(s):** \n- **Learning purpose:** year level + curriculum link\n- **Class timeframe:** \n- **Supervision context:** \n- **Screenshot / category message:** describe without oversharing student faces.\n`
  }
];

const rubric = [
  'Title matches what a stressed reader would search for',
  'Opening sentence states outcome + audience in plain language',
  'Steps are numbered, reversible, and Level 1-safe',
  'Escalation boundary is explicit',
  'Privacy line reminds readers what not to paste into tickets or chats'
];

export default function KnowledgeBaseLabPage() {
  const [draftTitle, setDraftTitle] = useState('');
  const [draftBody, setDraftBody] = useState(templates[0].body);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const storageKey = 'dcsPrep:knowledgeBaseDraft';

  const markdownExport = useMemo(() => {
    const checks = rubric.map((item, idx) => `- [${checklist[idx] ? 'x' : ' '}] ${item}`).join('\n');
    return `# ${draftTitle || 'Untitled draft'}\n\n${draftBody}\n\n## Rubric self-check\n${checks}\n`;
  }, [checklist, draftBody, draftTitle]);

  function applyTemplate(index: number) {
    setDraftBody(templates[index].body);
    setChecklist({});
  }

  function copyMarkdown() {
    void navigator.clipboard.writeText(markdownExport);
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return;
    }
    try {
      const parsed = JSON.parse(raw) as {
        draftTitle?: string;
        draftBody?: string;
        checklist?: Record<number, boolean>;
      };
      setDraftTitle(parsed.draftTitle ?? '');
      setDraftBody(parsed.draftBody ?? templates[0].body);
      setChecklist(parsed.checklist ?? {});
    } catch {
      // ignore corrupt draft cache
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        draftTitle,
        draftBody,
        checklist,
        updatedAtIso: new Date().toISOString()
      })
    );
  }, [checklist, draftBody, draftTitle]);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl space-y-3">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Knowledge Base Lab</div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Draft OurDCS-ready support articles</h1>
          <p className="text-sm leading-7 text-slate-600">
            Turn recurring ticket themes into short, privacy-safe articles. Everything stays in your browser until you copy it
            into the authorised publishing workflow.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/modules" className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
              Pull ideas from modules
            </Link>
            <Link href="/error-log" className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700">
              Review error themes
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" htmlFor="kb-title">
              Working title
            </label>
            <input
              id="kb-title"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900"
              placeholder="e.g., Follow-Me printing release stuck at copier"
            />
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Starter templates</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {templates.map((template, index) => (
                <button
                  key={template.title}
                  type="button"
                  onClick={() => applyTemplate(index)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700"
                >
                  {template.title}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500" htmlFor="kb-body">
              Draft body (Markdown-friendly)
            </label>
            <textarea
              id="kb-body"
              value={draftBody}
              onChange={(event) => setDraftBody(event.target.value)}
              rows={18}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm text-slate-900"
            />
          </div>
          <button
            type="button"
            onClick={copyMarkdown}
            className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Copy Markdown bundle
          </button>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Article-quality rubric</h2>
            <p className="mt-2 text-sm text-slate-600">Tick items as you revise—copied export mirrors these boxes.</p>
            <ul className="mt-4 space-y-3">
              {rubric.map((item, index) => (
                <li key={item} className="flex gap-3 text-sm text-slate-800">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300"
                    checked={Boolean(checklist[index])}
                    onChange={() =>
                      setChecklist((current) => ({
                        ...current,
                        [index]: !current[index]
                      }))
                    }
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-5 text-sm leading-7 text-emerald-900">
            Privacy guardrail: never paste live passwords, student identifiers, network diagrams, or internal-only URLs that are
            not approved for community visibility.
          </div>
        </aside>
      </section>
    </div>
  );
}
