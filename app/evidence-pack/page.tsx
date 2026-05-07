'use client';

import { useEffect, useMemo, useState } from 'react';
import { getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import { buildEvidencePackMarkdown } from '../../src/lib/evidencePack';
import EvidencePackPreview from '../../src/components/evidence/EvidencePackPreview';
import PrivacyReminder from '../../src/components/evidence/PrivacyReminder';
import { getMonthKey } from '../../src/lib/pdSummary';

export default function EvidencePackPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  const monthKey = getMonthKey(new Date());
  const markdown = useMemo(() => {
    if (!progress) return '';
    return buildEvidencePackMarkdown(progress, monthKey);
  }, [progress, monthKey]);

  async function handleCopy() {
    if (!markdown) {
      return;
    }

    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Evidence pack export</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Generate a manager-safe PD summary</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Export a privacy-safe Markdown summary of your local professional development activity for review,
            reflection, or portfolio sharing.
          </p>
        </div>
      </section>

      <PrivacyReminder />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <EvidencePackPreview markdown={markdown} />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Export actions</div>
          <div className="mt-5 space-y-4 text-sm text-slate-700">
            <p>Copy the full Markdown export and paste it into a personal report, evidence file, or learning record.</p>
            <button
              onClick={handleCopy}
              disabled={!markdown}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {copied ? 'Copied!' : 'Copy Markdown'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
