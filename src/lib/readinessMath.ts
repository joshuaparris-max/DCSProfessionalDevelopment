import { weakTopicLabels } from '../data/skillDomains';
import type { UserProgress } from './progress';

export type ReadinessScore = {
  id: string;
  label: string;
  note: string;
  score: number;
  confidence: 'low' | 'medium' | 'high';
  evidenceCount: number;
  topActions: string[];
};

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function getEvidenceStats(progress: UserProgress) {
  const assessmentCount = progress.assessmentAttempts.length;
  const weakTopicCount = Object.keys(progress.weakTopicReviews).length;
  const scenarioCount = progress.scenarioRuns.filter(r => typeof r.noteScore === 'number').length;
  const totalEvidence = assessmentCount + weakTopicCount + scenarioCount;
  
  let confidence: 'low' | 'medium' | 'high' = 'low';
  if (totalEvidence >= 15) confidence = 'high';
  else if (totalEvidence >= 5) confidence = 'medium';

  return { totalEvidence, confidence };
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
  careerTrack?: string;
  attributeFocus?: string;
};

export function getDashboardRecommendation(progress: UserProgress): DashboardRecommendation {
  const weakTopics = Object.values(progress.weakTopicReviews);
  const context = progress.selectedWorkContext;

  if (weakTopics.length) {
    const lowest = weakTopics.reduce((current, next) => (next.averageScore < current.averageScore ? next : current));
    return {
      title: `Quest: Master ${weakTopicLabels[lowest.topic] ?? lowest.topic}`,
      detail: `Your performance in ${weakTopicLabels[lowest.topic] ?? lowest.topic} is currently low for a ${context} role. Return to the core training to build your attributes.`,
      ctaHref: '/due-today',
      ctaLabel: 'Start Review',
      careerTrack: 'Support Fundamentals',
      attributeFocus: 'Intelligence'
    };
  }

  // Context-specific starting points
  const contextStartingPoints: Record<string, { title: string; detail: string; href: string; track: string; attr: string }> = {
    'DCS / School IT': {
      title: 'Main Quest: DCS Foundations',
      detail: 'Begin your journey by mastering the foundational IT support patterns at DCS.',
      href: '/modules/dcs-it-support-foundations',
      track: 'School IT',
      attr: 'Spirit'
    },
    'MSP Support': {
      title: 'Main Quest: MSP Foundations',
      detail: 'Learn the core triage and documentation patterns required for high-volume MSP support.',
      href: '/modules/dcs-it-support-foundations', // Fallback for now
      track: 'MSP L1 Support',
      attr: 'Agility'
    },
    'Certification Study': {
      title: 'Main Quest: CompTIA A+',
      detail: 'Focus on core hardware and software foundations for A+ readiness.',
      href: '/modules/messer-core2-operating-systems-overview', // Updated to an existing module
      track: 'CompTIA A+',
      attr: 'Intelligence'
    }
  };

  const recommendation = contextStartingPoints[context] || {
    title: 'Main Quest: Foundations',
    detail: 'Begin your IT journey by mastering the foundational support modules.',
    href: '/modules/dcs-it-support-foundations',
    track: 'Support Fundamentals',
    attr: 'Intelligence'
  };

  return {
    title: recommendation.title,
    detail: recommendation.detail,
    ctaHref: recommendation.href,
    ctaLabel: 'Begin Quest',
    careerTrack: recommendation.track,
    attributeFocus: recommendation.attr
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
    | 'userCommunication'
    | 'schoolItContext',
  progress: UserProgress
): ReadinessScore[] {
  const assessmentAverage = getAssessmentAverage(progress);
  const weakAverage = getWeakTopicAverage(progress);
  const scenarioNoteAverage = getScenarioNoteAverage(progress);
  const { totalEvidence, confidence } = getEvidenceStats(progress);

  const blendedAssessment = assessmentAverage ?? 48;
  const blendedWeak = weakAverage ?? 52;
  const blendedScenario = scenarioNoteAverage ?? 50;
  const base = blendedAssessment * 0.45 + blendedWeak * 0.3 + blendedScenario * 0.25;

  const evidenceNote = totalEvidence > 0
    ? `Based on ${totalEvidence} evidence points.`
    : 'No direct evidence found—using conservative baseline.';

  if (category === 'compTIAaPlus') {
    return [
      {
        id: 'a-plus-fundamentals',
        label: 'A+ Fundamentals',
        note: `${evidenceNote} Core hardware and OS knowledge.`,
        score: clampScore(base * 0.92),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Complete hardware modules', 'Review OS troubleshooting', 'Pass foundation quiz']
      },
      {
        id: 'hardware-ops',
        label: 'Hardware & Endpoint Ops',
        note: `${evidenceNote} Device troubleshooting performance.`,
        score: clampScore(base * 0.9),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Run printer scenarios', 'Complete BIOS/UEFI module', 'Log device repair evidence']
      }
    ];
  }

  if (category === 'mspL1') {
    return [
      {
        id: 'msp1-triage',
        label: 'MSP L1 Triage',
        note: `${evidenceNote} Fast problem scope and first response.`,
        score: clampScore(base * 0.92),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Practice triage missions', 'Review SLA guidelines', 'Master ticket intake']
      },
      {
        id: 'msp1-ticket-quality',
        label: 'Ticket Documentation',
        note: `${evidenceNote} Quality of troubleshooting notes.`,
        score: clampScore(base * 0.88),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Use escalation templates', 'Complete ticket note mission', 'Refine symptom capture']
      }
    ];
  }

  if (category === 'm365Admin') {
    return [
      {
        id: 'm365-identity',
        label: 'Identity & Access',
        note: `${evidenceNote} Azure AD / Entra ID fundamentals.`,
        score: clampScore(base * 0.85),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Review MFA setup', 'Complete password reset scenario', 'Learn group management']
      },
      {
        id: 'm365-services',
        label: 'Core Services (Teams/SharePoint)',
        note: `${evidenceNote} Service-specific troubleshooting.`,
        score: clampScore(base * 0.8),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Complete SharePoint sync mission', 'Review Teams meeting room setup', 'Master OneDrive triage']
      }
    ];
  }

  if (category === 'endpointIntune') {
    return [
      {
        id: 'endpoint-deployment',
        label: 'Device Enrollment',
        note: `${evidenceNote} Autopilot and enrollment patterns.`,
        score: clampScore(base * 0.82),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Review Autopilot flow', 'Complete enrollment module', 'Check device compliance rules']
      },
      {
        id: 'endpoint-policy',
        label: 'Policy Management',
        note: `${evidenceNote} Configuration profiles and apps.`,
        score: clampScore(base * 0.78),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Learn app deployment', 'Review security baselines', 'Check configuration sync']
      }
    ];
  }

  if (category === 'networkingFundamentals') {
    return [
      {
        id: 'net-connectivity',
        label: 'Connectivity Triage',
        note: `${evidenceNote} IP, DNS, and DHCP troubleshooting.`,
        score: clampScore(base * 0.88),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Run Wi-Fi missions', 'Review DNS records', 'Master ipconfig/ping tools']
      },
      {
        id: 'net-infrastructure',
        label: 'Network Infrastructure',
        note: `${evidenceNote} Switches, APs, and cabling.`,
        score: clampScore(base * 0.8),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Review VLAN basics', 'Check PoE status patterns', 'Master cabling standards']
      }
    ];
  }

  if (category === 'cybersecurityTriage') {
    return [
      {
        id: 'sec-phishing',
        label: 'Threat Identification',
        note: `${evidenceNote} Phishing and alert analysis.`,
        score: clampScore(base * 0.9),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Complete phishing scenarios', 'Review email headers', 'Master alert triage']
      },
      {
        id: 'sec-incident',
        label: 'Incident Response',
        note: `${evidenceNote} Escalation and containment.`,
        score: clampScore(base * 0.82),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Learn containment steps', 'Review isolation policies', 'Master safe escalation']
      }
    ];
  }

  if (category === 'userCommunication') {
    return [
      {
        id: 'comm-clarity',
        label: 'Communication Clarity',
        note: `${evidenceNote} Clear, jargon-free user instruction.`,
        score: clampScore(base * 0.92),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Run user comms missions', 'Review ticket note clarity', 'Master simple analogies']
      },
      {
        id: 'comm-empathy',
        label: 'Professional Empathy',
        note: `${evidenceNote} Calm support under user pressure.`,
        score: clampScore(base * 0.88),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Complete difficult user scenarios', 'Review soft skill modules', 'Master de-escalation']
      }
    ];
  }

  if (category === 'schoolItContext') {
    return [
      {
        id: 'school-ops',
        label: 'School IT Operations',
        note: `${evidenceNote} School-specific systems and workflows.`,
        score: clampScore(base * 0.85),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Review DCS workflows', 'Master SIS basics', 'Complete ViewBoard module']
      },
      {
        id: 'school-culture',
        label: 'Educational IT Context',
        note: `${evidenceNote} Supporting teachers and students.`,
        score: clampScore(base * 0.9),
        confidence,
        evidenceCount: totalEvidence,
        topActions: ['Learn teacher support patterns', 'Review student privacy rules', 'Master classroom AV']
      }
    ];
  }

  // Fallback / default
  return [
    {
      id: 'general-readiness',
      label: 'General IT Readiness',
      note: evidenceNote,
      score: clampScore(base),
      confidence,
      evidenceCount: totalEvidence,
      topActions: ['Complete more modules', 'Run more scenarios', 'Log daily PD activity']
    }
  ];
}
