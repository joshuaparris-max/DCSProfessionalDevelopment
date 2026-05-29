"use client";

import { useState } from 'react';
import { UserProgress, saveProgress } from '../lib/progress';

type ProgressBackupProps = {
  progress: UserProgress;
  onRestore: (newProgress: UserProgress) => void;
};

export function ProgressBackup({ progress, onRestore }: ProgressBackupProps) {
  const [restoreError, setRestoreError] = useState<string | null>(null);
  const [restoreSuccess, setRestoreSuccess] = useState(false);

  function handleExport() {
    const data = JSON.stringify(progress, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `supportops-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        
        // Basic validation
        if (!parsed.schemaVersion || !parsed.modules) {
          throw new Error('Invalid backup file format.');
        }

        if (window.confirm('This will overwrite your current progress. Continue?')) {
          onRestore(parsed);
          setRestoreSuccess(true);
          setRestoreError(null);
          setTimeout(() => setRestoreSuccess(false), 3000);
        }
      } catch (err) {
        setRestoreError(err instanceof Error ? err.message : 'Failed to restore backup.');
        setRestoreSuccess(false);
      }
    };
    reader.readAsText(file);
  }

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Backup & Portability</div>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">Download My Progress</h2>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        Export your learning history, reflections, and achievements to a JSON file. 
        This is useful for moving between devices or keeping a personal record of your professional development.
      </p>

      <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
        <strong>Privacy Note:</strong> Your backup contains your personal learning reflections. 
        Store this file securely and avoid sharing it publicly.
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={handleExport}
          className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition"
        >
          Export Progress (JSON)
        </button>
        
        <label className="relative cursor-pointer rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
          <span>Restore from Backup</span>
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </label>
      </div>

      {restoreSuccess && (
        <p className="mt-4 text-sm font-semibold text-emerald-600">✓ Progress restored successfully!</p>
      )}
      {restoreError && (
        <p className="mt-4 text-sm font-semibold text-rose-600">⚠ {restoreError}</p>
      )}
    </section>
  );
}
