import Link from 'next/link';
import { modules } from '../../src/data/modules';

const alignedModules = modules.filter((module) => module.sourceSubjects?.length);

const subjectCount = new Set(alignedModules.flatMap((module) => module.sourceSubjects?.map((subject) => subject.code) ?? []))
  .size;

export default function RbcPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">RBC + SMITB</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              Academic-aligned professional development
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              These modules translate RBC and SMITB subject outcomes into practical school IT support habits. The
              alignment is used for professional development context, not as a formal credit claim.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            {alignedModules.length} modules mapped to {subjectCount} source subjects.
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {alignedModules.map((module) => (
          <Link
            key={module.id}
            href={`/modules/${module.id}`}
            className="block rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div className="flex flex-wrap gap-2">
              {module.sourceSubjects?.map((subject) => (
                <span key={subject.code} className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                  {subject.code}
                </span>
              ))}
              <span className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                {module.level}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{module.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{module.description}</p>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {module.sourceSubjects?.map((subject) => (
                <div key={`${module.id}-${subject.code}`} className="rounded-3xl bg-slate-50 p-4">
                  <div className="font-semibold text-slate-900">
                    {subject.code} - {subject.title}
                  </div>
                  <div className="mt-2 text-slate-600">{subject.alignmentNote}</div>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
