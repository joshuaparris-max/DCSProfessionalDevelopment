import Link from 'next/link';

export default function ModuleCard({
  id,
  title,
  description,
  domain,
  level,
  estimatedMinutes,
  tags,
  progress
}: {
  id: string;
  title: string;
  description: string;
  domain: string;
  level: string;
  estimatedMinutes: number;
  tags: string[];
  progress: number;
}) {
  return (
    <Link href={`/modules/${id}`} className="group block rounded-[2rem] border border-slate-200 bg-white p-6 transition hover:shadow-lg">
      <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
        <span>{domain}</span>
        <span>{level}</span>
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full border border-slate-200 px-3 py-1">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-700">
        <span>{estimatedMinutes} min</span>
        <span>{Math.round(progress)}% complete</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-900" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
      </div>
    </Link>
  );
}
