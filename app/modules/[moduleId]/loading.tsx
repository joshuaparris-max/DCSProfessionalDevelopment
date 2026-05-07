export default function ModuleDetailLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading module">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200" />
        <div className="mt-4 h-9 max-w-xl animate-pulse rounded-lg bg-slate-200" />
        <div className="mt-3 h-4 max-w-2xl animate-pulse rounded bg-slate-100" />
        <div className="mt-3 h-4 max-w-lg animate-pulse rounded bg-slate-100" />
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-28 animate-pulse rounded-full bg-slate-100" />
          ))}
        </div>
        <div className="mt-6 h-64 animate-pulse rounded-3xl bg-slate-50" />
      </div>
    </div>
  );
}
