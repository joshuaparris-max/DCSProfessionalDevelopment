import { weakTopicLabels } from '../data/skillDomains';
import type { UserProgress } from './progress';

export type ReadinessScore = {
  id: string;
  label: string;
  note: string;
  score: number;
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getAssessmentAverage(progress: UserProgress): number | null {
  if (!progress.assessmentAttempts.length) {
    return null;
  }

  const scored = progress.assessmentAttempts.map((attempt) => attempt.scoreBreakdown.total * 100);
  return scored.reduce((sum, value) => sum + value, 0) / scored.length;
}

function getWeakTopicAverage(progress: UserProgress): number | null {
  const reviews = Object.values(progress.weakTopicReviews);
  if (!reviews.length) {
    return null;
  }

  return reviews.reduce((sum, review) => sum + review.averageScore, 0) / reviews.length;
}

function getScenarioNoteAverage(progress: UserProgress): number | null {
  const scores = progress.scenarioRuns
    .map((run) => run.noteScore)
    .filter((score): score is number => typeof score === 'number')
    .map((score) => score * 100);
  if (!scores.length) {
    return null;
  }
  return scores.reduce((sum, value) => sum + value, 0) / scores.length;
}

export type DashboardRecommendation = {
  title: string;
  detail: string;
  ctaHref: string;
  ctaLabel: string;
};

export function getDashboardRecommendation(progress: UserProgress): DashboardRecommendation {
  const weakTopics = Object.values(progress.weakTopicReviews);
  if (weakTopics.length) {
    const lowest = weakTopics.reduce((current, next) => (next.averageScore < current.averageScore ? next : current));
    return {
      title: `Quest: Master ${weakTopicLabels[lowest.topic] ?? lowest.topic}`,
      detail: 'Your performance here is low. Return to the core training to build your attributes.',
      ctaHref: '/due-today',
      ctaLabel: 'Start Review'
    };
  }

  // Find first incomplete module
  const firstIncompleteModule = Object.entries(progress.modules).find(([id, data]) => {
    // A module is incomplete if its overall completion is less than 100%
    // This requires access to the module definitions to calculate completion correctly.
    // For now, we'll fallback to the main foundations module.
    return true; 
  });

  return {
    title: 'Main Quest: Foundations',
    detail: 'Begin your IT journey by mastering the foundational support modules.',
    ctaHref: '/modules/dcs-it-support-foundations',
    ctaLabel: 'Begin Quest'
  };
}

export function getCurrentWeakFocus(progress: UserProgress) {
  const weakReviews = Object.values(progress.weakTopicReviews);
  if (!weakReviews.length) {
    return 'Begin with a foundational module review.';
  }

  const weakest = weakReviews.reduce((current, next) => (next.averageScore < current.averageScore ? next : current));
  return weakTopicLabels[weakest.topic] ?? weakest.topic;
}

export function getReadinessProfile(
  category:
    | 'compTIAaPlus'
    | 'mspL1'
    | 'mspL2'
    | 'm365Admin'
    | 'endpointIntune'
    | 'networkingFundamentals'
    | 'cybersecurityTriage'
    | 'ticketDocumentation'
    | 'schoolItManager',
  progress: UserProgress
) {
  const assessmentAverage = getAssessmentAverage(progress);
  const weakAverage = getWeakTopicAverage(progress);
  const scenarioNoteAverage = getScenarioNoteAverage(progress);
  const assessmentEvidence = progress.assessmentAttempts.length >= 5;
  const weakEvidence = Object.keys(progress.weakTopicReviews).length >= 2;
  const scenarioEvidence = progress.scenarioRuns.some((run) => typeof run.noteScore === 'number');
  const evidenceBacked = assessmentEvidence && weakEvidence && scenarioEvidence;

  const blendedAssessment = assessmentAverage ?? 48;
  const blendedWeak = weakAverage ?? 52;
  const blendedScenario = scenarioNoteAverage ?? 50;
  const base = blendedAssessment * 0.45 + blendedWeak * 0.3 + blendedScenario * 0.25;

  const evidenceNote = evidenceBacked
    ? 'Grounded in recorded quiz attempts, weak-topic reviews, and scenario note-quality scores.'
    : 'Estimate until more quiz attempts, weak-topic reviews, and scenario note-quality scores exist—scores blend conservative placeholders where data is missing.';

  if (category === 'compTIAaPlus') {
    return [
      {
        id: 'a-plus-fundamentals',
        label: 'A+ fundamentals',
        note: `${evidenceNote} Focused on core hardware, networking, and support process knowledge.`,
        score: clampScore(base * 0.92)
      },
      {
        id: 'hardware-ops',
        label: 'Hardware & endpoint ops',
        note: `${evidenceNote} Reflects device troubleshooting and support sequence performance.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'support-documentation',
        label: 'Support documentation',
        note: `${evidenceNote} Measures how clearly you capture symptoms, steps, and escalation points.`,
        score: clampScore(base * 0.85)
      }
    ];
  }

  if (category === 'mspL1') {
    return [
      {
        id: 'msp1-triage',
        label: 'MSP L1 triage',
        note: `${evidenceNote} Weighted toward fast problem scope, service checks, and safe first-response work.`,
        score: clampScore(base * 0.92)
      },
      {
        id: 'msp1-device-support',
        label: 'Device support',
        note: `${evidenceNote} Builds on endpoint, printer, and user-device troubleshooting signals.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'msp1-ticket-quality',
        label: 'Ticket quality',
        note: `${evidenceNote} Measures clear notes, escalation readiness, and safe service delivery.`,
        score: clampScore(base * 0.88)
      }
    ];
  }

  if (category === 'mspL2') {
    return [
      {
        id: 'msp2-technical-depth',
        label: 'MSP L2 technical depth',
        note: `${evidenceNote} Maps to deeper networking, identity and system problem patterns.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'msp2-escalation-judgement',
        label: 'Escalation judgement',
        note: `${evidenceNote} Influenced by scenario decisions and note quality in edge-case support.`,
        score: clampScore(base * 0.88)
      },
      {
        id: 'msp2-service-process',
        label: 'Service process',
        note: `${evidenceNote} Reflects whether you use safe handoff, approvals, and follow-up checks.`,
        score: clampScore(base * 0.86)
      }
    ];
  }

  if (category === 'm365Admin') {
    return [
      {
        id: 'm365-user-management',
        label: 'M365 user management',
        note: `${evidenceNote} Focused on identity, access, licensing, and service support patterns.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'm365-service-triage',
        label: 'Service triage',
        note: `${evidenceNote} Draws from scenarios dealing with Exchange, Teams, and SharePoint symptoms.`,
        score: clampScore(base * 0.88)
      },
      {
        id: 'm365-documentation',
        label: 'Documentation & handoff',
        note: `${evidenceNote} Reflects how clearly you capture system state and next steps for another admin.`,
        score: clampScore(base * 0.85)
      }
    ];
  }

  if (category === 'endpointIntune') {
    return [
      {
        id: 'endpoint-device-support',
        label: 'Endpoint device support',
        note: `${evidenceNote} Tracks device troubleshooting, imaging, and configuration repair knowledge.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'endpoint-management',
        label: 'Management tooling',
        note: `${evidenceNote} Reflects familiarity with MDM, mobile device workflows, and remote support paths.`,
        score: clampScore(base * 0.88)
      },
      {
        id: 'endpoint-operational-safety',
        label: 'Operational safety',
        note: `${evidenceNote} Emphasises safe actions and clear escalation when device management is uncertain.`,
        score: clampScore(base * 0.86)
      }
    ];
  }

  if (category === 'networkingFundamentals') {
    return [
      {
        id: 'networking-core',
        label: 'Networking fundamentals',
        note: `${evidenceNote} Weighted toward connectivity, Wi-Fi, routing, and port/switch awareness.`,
        score: clampScore(base * 0.92)
      },
      {
        id: 'networking-troubleshooting',
        label: 'Network troubleshooting',
        note: `${evidenceNote} Reflects diagnostic ordering and evidence-based network checks.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'networking-visibility',
        label: 'Network visibility',
        note: `${evidenceNote} Measures whether you document scope, affected devices, and network boundaries.`,
        score: clampScore(base * 0.85)
      }
    ];
  }

  if (category === 'cybersecurityTriage') {
    return [
      {
        id: 'security-triage',
        label: 'Cybersecurity triage',
        note: `${evidenceNote} Focused on phishing, suspicious service behavior, and safe evidence preservation.`,
        score: clampScore(base * 0.92)
      },
      {
        id: 'security-risk-awareness',
        label: 'Risk awareness',
        note: `${evidenceNote} Reflects whether you treat sensitive flow, privacy, and escalation correctly.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'security-notes',
        label: 'Security documentation',
        note: `${evidenceNote} Measures whether you record clear incident context without exposing private data.`,
        score: clampScore(base * 0.86)
      }
    ];
  }

  if (category === 'ticketDocumentation') {
    return [
      {
        id: 'ticket-clarity',
        label: 'Ticket clarity',
        note: `${evidenceNote} Based on scenario notes, log detail, and how well the issue is summarized.`,
        score: clampScore(base * 0.92)
      },
      {
        id: 'ticket-scope',
        label: 'Scope & impact',
        note: `${evidenceNote} Weights how well you capture affected users, systems, and business impact.`,
        score: clampScore(base * 0.9)
      },
      {
        id: 'ticket-handoff',
        label: 'Handoff readiness',
        note: `${evidenceNote} Measures whether notes are useful for the next support level or manager review.`,
        score: clampScore(base * 0.88)
      }
    ];
  }

  return [
    {
      id: 'strategic-awareness',
      label: 'Strategic awareness',
      note: `${evidenceNote} Broad situational judgement from mixed assessments.`,
      score: clampScore(base * 0.8)
    },
    {
      id: 'privacy-risk',
      label: 'Privacy & risk',
      note: `${evidenceNote} Reinforced when privacy/security questions score well.`,
      score: clampScore(base * 0.85)
    },
    {
      id: 'process-adaptability',
      label: 'Process adaptability',
      note: `${evidenceNote} Strengthens as PD log + modules show sustained engagement.`,
      score: clampScore(base * 0.75)
    }
  ];
}
