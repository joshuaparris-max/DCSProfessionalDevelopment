export default function EvidencePackPreview({ markdown }: { markdown: string }) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Evidence pack</div>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Export manager-safe summary</h2>
        </div>
      </div>
      <textarea
        readOnly
        value={markdown}
        className="mt-5 min-h-[320px] w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-900"
      />
    </section>
  );
}
