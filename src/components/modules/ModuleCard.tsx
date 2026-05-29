import Link from 'next/link';

export default function ModuleCard({
  id,
  title,
  description,
  domain,
  level,
  estimatedMinutes,
  tags,
  progress,
  careerTrack,
  attributeFocus
}: {
  id: string;
  title: string;
  description: string;
  domain: string;
  level: string;
  estimatedMinutes: number;
  tags: string[];
  progress: number;
  careerTrack?: string;
  attributeFocus?: string;
}) {
  return (
    <Link href={`/modules/${id}`} className="group block rounded-[2.5rem] border border-slate-200 bg-white p-8 transition hover:shadow-xl hover:border-indigo-100 relative overflow-hidden">
      <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <div className="flex gap-2">
          <span className="bg-slate-100 px-2 py-0.5 rounded-full">{domain}</span>
          <span>{level}</span>
        </div>
        {attributeFocus && (
          <span className="text-indigo-500 font-bold">+{attributeFocus}</span>
        )}
      </div>
      <h2 className="mt-5 text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-2">{description}</p>
      
      {careerTrack && (
        <div className="mt-4 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
          {careerTrack}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-1.5">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-slate-50 border border-slate-100 px-3 py-1 text-[10px] font-medium text-slate-500">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xs font-bold text-slate-900">{estimatedMinutes} min</div>
          <div className="h-1 w-1 rounded-full bg-slate-300"></div>
          <div className={`text-xs font-bold ${progress >= 100 ? 'text-emerald-600' : 'text-slate-500'}`}>
            {progress >= 100 ? '✓ Mastered' : `${Math.round(progress)}%`}
          </div>
        </div>
        <div className="text-slate-300 group-hover:translate-x-1 group-hover:text-indigo-400 transition-all">→</div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-50">
        <div 
          className={`h-full transition-all duration-1000 ${progress >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`} 
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} 
        />
      </div>
    </Link>
  );
}
