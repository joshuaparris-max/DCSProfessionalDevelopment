import Link from 'next/link';
import { searchApp } from '../../src/lib/searchIndex';

type SearchPageProps = {
  searchParams?: {
    q?: string;
  };
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = (searchParams?.q ?? '').trim();
  const results = searchApp(query);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Search</div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Global search across DCSPrep</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Search modules, scenarios, academic subjects, and core app routes from one place.
        </p>

        <form action="/search" method="get" className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for login, Sentral, APIPA, CSE1IIT, filtering..."
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          />
          <button type="submit" className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white">
            Search
          </button>
        </form>
      </section>

      {query ? (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Results for &quot;{query}&quot;</h2>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">{results.length} matches</div>
          </div>

          <div className="mt-5 space-y-3">
            {results.length ? (
              results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  className="block rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{result.kind}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">{result.title}</div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{result.snippet}</p>
                  <div className="mt-3 text-xs text-slate-500">{result.href}</div>
                </Link>
              ))
            ) : (
              <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                No results yet. Try broader keywords like module names, systems, or subject codes.
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          Enter a query to search the app.
        </section>
      )}
    </div>
  );
}
