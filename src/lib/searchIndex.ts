import { navigationItems } from '../components/shell/navigation';
import { academicSubjects } from '../data/academicSubjects';
import { modules } from '../data/modules';
import { scenarios } from '../data/scenarios';

export type SearchResultKind = 'Route' | 'Module' | 'Module Section' | 'Scenario' | 'Academic Subject';

export type SearchResult = {
  id: string;
  kind: SearchResultKind;
  title: string;
  href: string;
  snippet: string;
};

type SearchEntry = SearchResult & {
  haystack: string;
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function buildSearchEntries(): SearchEntry[] {
  const routeEntries: SearchEntry[] = navigationItems.map((item) => ({
    id: `route-${item.href}`,
    kind: 'Route',
    title: item.label,
    href: item.href,
    snippet: `Navigate to ${item.label}`,
    haystack: `${item.label} ${item.href}`
  }));

  const moduleEntries: SearchEntry[] = modules.map((module) => {
    const sectionText = module.sections.map((section) => `${section.title} ${section.bodyMarkdown}`).join(' ');
    const flashcardText = module.flashcards.map((card) => `${card.front} ${card.back}`).join(' ');
    const objectiveText = module.learningObjectives.join(' ');
    const tagText = module.tags.join(' ');

    return {
      id: `module-${module.id}`,
      kind: 'Module',
      title: module.title,
      href: `/modules/${module.id}`,
      snippet: module.description,
      haystack: `${module.title} ${module.description} ${tagText} ${objectiveText} ${sectionText} ${flashcardText}`
    };
  });

  const moduleSectionEntries: SearchEntry[] = modules.flatMap((module) =>
    module.sections.map((section) => ({
      id: `module-section-${module.id}-${section.id}`,
      kind: 'Module Section' as const,
      title: `${module.title}: ${section.title}`,
      href: `/modules/${module.id}`,
      snippet: section.bodyMarkdown.replace(/\s+/g, ' ').slice(0, 260),
      haystack: `${module.title} ${module.description} ${module.tags.join(' ')} ${section.title} ${section.bodyMarkdown}`
    }))
  );

  const scenarioEntries: SearchEntry[] = scenarios.map((scenario) => ({
    id: `scenario-${scenario.id}`,
    kind: 'Scenario',
    title: scenario.title,
    href: '/scenarios',
    snippet: scenario.summary,
    haystack: `${scenario.title} ${scenario.summary} ${scenario.initialReport} ${scenario.contextBullets.join(' ')}`
  }));

  const subjectEntries: SearchEntry[] = academicSubjects.map((subject) => ({
    id: `subject-${subject.id}`,
    kind: 'Academic Subject',
    title: `${subject.code}: ${subject.title}`,
    href: `/academic-pd/subjects/${subject.code.toLowerCase()}`,
    snippet: subject.summary,
    haystack: `${subject.code} ${subject.title} ${subject.summary} ${subject.silos
      .map((silo) => `${silo.text} ${silo.plainEnglish}`)
      .join(' ')}`
  }));

  return [...routeEntries, ...moduleEntries, ...moduleSectionEntries, ...scenarioEntries, ...subjectEntries];
}

const SEARCH_ENTRIES = buildSearchEntries();

export function searchApp(query: string, limit = 50): SearchResult[] {
  const normalized = normalize(query);
  if (!normalized) {
    return [];
  }

  const terms = normalized.split(/\s+/).filter(Boolean);

  const scored = SEARCH_ENTRIES.map((entry) => {
    const haystack = normalize(entry.haystack);
    const allTermsMatch = terms.every((term) => haystack.includes(term));
    if (!allTermsMatch) {
      return null;
    }

    const titleMatchCount = terms.filter((term) => normalize(entry.title).includes(term)).length;
    const score = titleMatchCount * 10 + terms.length;

    return { entry, score };
  }).filter((item): item is { entry: SearchEntry; score: number } => Boolean(item));

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => ({
      id: entry.id,
      kind: entry.kind,
      title: entry.title,
      href: entry.href,
      snippet: entry.snippet
    }));
}
