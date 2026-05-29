"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import ModuleCard from '../../src/components/modules/ModuleCard';
import { modules } from '../../src/data/modules';
import { getModuleCompletion } from '../../src/lib/moduleMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';
import type { ModuleDomain, ModuleLevel, TrainingModule } from '../../src/types/training';

export const dynamic = 'force-dynamic';

type ModuleCategory =
  | 'Support Foundations'
  | 'M365 & Identity'
  | 'Networking'
  | 'Endpoint Management'
  | 'Cybersecurity'
  | 'DCS Context'
  | 'A+ Readiness'
  | 'All modules';

type SortMode = 'Recommended' | 'Title A-Z' | 'Progress low-high' | 'Progress high-low' | 'Shortest first';
type CompletionFilter = 'All' | 'Not started' | 'In progress' | 'Completed';

const categoryOptions: ModuleCategory[] = [
  'Support Foundations',
  'M365 & Identity',
  'Networking',
  'Endpoint Management',
  'Cybersecurity',
  'DCS Context',
  'A+ Readiness',
  'All modules'
];

const sortOptions: SortMode[] = ['Recommended', 'Title A-Z', 'Progress low-high', 'Progress high-low', 'Shortest first'];
const completionOptions: CompletionFilter[] = ['All', 'Not started', 'In progress', 'Completed'];

function getModuleCategory(moduleData: TrainingModule): Exclude<ModuleCategory, 'All modules'> {
  const domain = moduleData.domain.toLowerCase();
  const id = moduleData.id.toLowerCase();

  if (id.startsWith('messer-core2-') || moduleData.level === 'A+') {
    return 'A+ Readiness';
  }

  if (domain.includes('networking')) {
    return 'Networking';
  }

  if (domain.includes('identity') || domain.includes('m365') || domain.includes('cloud')) {
    return 'M365 & Identity';
  }

  if (domain.includes('endpoint') || domain.includes('hardware')) {
    return 'Endpoint Management';
  }

  if (domain.includes('security') || domain.includes('cyber')) {
    return 'Cybersecurity';
  }

  if (moduleData.level === 'DCS Context' || moduleData.tags.some((tag) => tag.toLowerCase().includes('dcs'))) {
    return 'DCS Context';
  }

  return 'Support Foundations';
}

function matchesCompletion(progress: number, completionFilter: CompletionFilter) {
  if (completionFilter === 'All') {
    return true;
  }

  if (completionFilter === 'Not started') {
    return progress === 0;
  }

  if (completionFilter === 'In progress') {
    return progress > 0 && progress < 100;
  }

  return progress >= 100;
}

export default function ModulesPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot(modules));
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ModuleCategory>('All modules');
  const [domain, setDomain] = useState<ModuleDomain | 'All'>('All');
  const [level, setLevel] = useState<ModuleLevel | 'All'>('All');
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('All');
  const [sortMode, setSortMode] = useState<SortMode>('Recommended');

  useEffect(() => {
    setProgress(getStoredProgressSnapshot(modules));
  }, []);

  const domains = useMemo(
    () => Array.from(new Set(modules.map((moduleData) => moduleData.domain))).sort(),
    []
  );
  const levels = useMemo(() => Array.from(new Set(modules.map((moduleData) => moduleData.level))).sort(), []);

  const categoryCounts = useMemo(() => {
    const counts = new Map<ModuleCategory, number>(categoryOptions.map((option) => [option, 0]));

    modules.forEach((moduleData) => {
      const moduleCategory = getModuleCategory(moduleData);
      counts.set(moduleCategory, (counts.get(moduleCategory) ?? 0) + 1);
      counts.set('All modules', (counts.get('All modules') ?? 0) + 1);
    });

    return counts;
  }, []);

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    const filtered = modules
      .map((moduleData, index) => ({
        moduleData,
        index,
        completion: getModuleCompletion(moduleData.id, progress, moduleData)
      }))
      .filter(({ moduleData, completion }) => {
        const moduleCategory = getModuleCategory(moduleData);
        const haystack = [
          moduleData.title,
          moduleData.description,
          moduleData.domain,
          moduleData.level,
          moduleData.tags.join(' '),
          moduleData.sections.map((section) => `${section.title} ${section.bodyMarkdown}`).join(' ')
        ]
          .join(' ')
          .toLowerCase();

        return (
          (category === 'All modules' || moduleCategory === category) &&
          (domain === 'All' || moduleData.domain === domain) &&
          (level === 'All' || moduleData.level === level) &&
          matchesCompletion(completion, completionFilter) &&
          (!normalizedQuery || haystack.includes(normalizedQuery))
        );
      });

    return filtered.sort((a, b) => {
      if (sortMode === 'Title A-Z') {
        return a.moduleData.title.localeCompare(b.moduleData.title);
      }

      if (sortMode === 'Progress low-high') {
        return a.completion - b.completion;
      }

      if (sortMode === 'Progress high-low') {
        return b.completion - a.completion;
      }

      if (sortMode === 'Shortest first') {
        return a.moduleData.estimatedMinutes - b.moduleData.estimatedMinutes;
      }

      return a.index - b.index;
    });
  }, [category, completionFilter, domain, level, progress, query, sortMode]);

  function clearFilters() {
    setQuery('');
    setCategory('All modules');
    setDomain('All');
    setLevel('All');
    setCompletionFilter('All');
    setSortMode('Recommended');
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Training Library</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
              SupportOps Training Modules
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
              Guided IT training modules covering Level 1 & 2 support foundations, Microsoft 365 administration, 
              networking, and professional service delivery. Each module is practical and action-oriented.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700 font-bold">
            {modules.length} Skill Modules
          </div>
        </div>
      </section>

      {/* Recommended Next Module */}
      {filteredModules.length > 0 && (
        <section className="rounded-[2.5rem] bg-indigo-600 p-8 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                Recommended Next Objective
              </div>
              <h2 className="mt-4 text-3xl font-bold">{filteredModules[0].moduleData.title}</h2>
              <p className="mt-3 text-indigo-100 max-w-2xl leading-relaxed">
                {filteredModules[0].moduleData.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="opacity-60">Time:</span>
                  <span>{filteredModules[0].moduleData.estimatedMinutes} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="opacity-60">Domain:</span>
                  <span>{filteredModules[0].moduleData.domain}</span>
                </div>
                {filteredModules[0].moduleData.careerTrack && (
                  <div className="flex items-center gap-2">
                    <span className="opacity-60">Track:</span>
                    <span>{filteredModules[0].moduleData.careerTrack}</span>
                  </div>
                )}
              </div>
            </div>
            <Link
              href={`/modules/${filteredModules[0].moduleData.id}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all active:scale-95"
            >
              Start Mission ⚔️
            </Link>
          </div>
        </section>
      )}

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Browse Catalogue</div>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Explore Skill Modules</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Filter by career track, difficulty, or context to find your next learning milestone.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-100 px-5 py-4 text-sm text-slate-700">
            Showing {filteredModules.length} of {modules.length}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categoryOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={`rounded-full px-4 py-2 text-sm ${
                category === option ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-700'
              }`}
            >
              {option} ({categoryCounts.get(option) ?? 0})
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_1fr_auto]">
          <label className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Scripting Use Cases, File Systems, Jamf..."
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            />
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Domain</span>
            <select
              value={domain}
              onChange={(event) => setDomain(event.target.value as ModuleDomain | 'All')}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            >
              <option value="All">All domains</option>
              {domains.map((domainOption) => (
                <option key={domainOption} value={domainOption}>
                  {domainOption}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Level</span>
            <select
              value={level}
              onChange={(event) => setLevel(event.target.value as ModuleLevel | 'All')}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            >
              <option value="All">All levels</option>
              {levels.map((levelOption) => (
                <option key={levelOption} value={levelOption}>
                  {levelOption}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Progress</span>
            <select
              value={completionFilter}
              onChange={(event) => setCompletionFilter(event.target.value as CompletionFilter)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            >
              {completionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Sort</span>
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            >
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={clearFilters}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 xl:self-end"
          >
            Reset
          </button>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {filteredModules.length ? (
          filteredModules.map(({ moduleData, completion }) => (
            <ModuleCard
              key={moduleData.id}
              id={moduleData.id}
              title={moduleData.title}
              description={moduleData.description}
              domain={moduleData.domain}
              level={moduleData.level}
              estimatedMinutes={moduleData.estimatedMinutes}
              tags={moduleData.tags}
              progress={completion}
              careerTrack={moduleData.careerTrack}
              attributeFocus={moduleData.attributeFocus}
            />
          ))
        ) : (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm xl:col-span-2">
            No modules match the current filters.
          </div>
        )}
      </div>
    </div>
  );
}
