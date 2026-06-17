export type MspRoadmapItem = {
  id: string;
  title: string;
  summary: string;
  outcome: string;
  href: string;
};

export type MspThirtyDayBlock = {
  label: string;
  focus: string;
  drills: string[];
};

export type MspEvidenceBridge = {
  dcsExperience: string;
  mspCapability: string;
  evidencePrompt: string;
};

export const mspRoadmapItems: MspRoadmapItem[] = [
  {
    id: 'msp-mode',
    title: 'MSP Mode / Avance Mode',
    summary: 'Reframe the app from DCS-first practice into client-facing MSP readiness.',
    outcome: 'A clear pathway for support desk habits, escalation boundaries, and client-safe practice.',
    href: '/msp-transition'
  },
  {
    id: 'ticket-simulator',
    title: 'Client-safe ticket simulator',
    summary: 'Practise fictional MSP tickets for M365, endpoint, printer, backup, MFA, and security triage.',
    outcome: 'Better first checks, stronger scope statements, and safer escalation decisions.',
    href: '/scenarios'
  },
  {
    id: 'ticket-note-coach',
    title: 'MSP ticket note coach',
    summary: 'Score notes for client, device, impact, checks, evidence, communication, and next action.',
    outcome: 'Cleaner tickets that are easier for senior engineers and clients to trust.',
    href: '/scenarios'
  },
  {
    id: 'client-comms',
    title: 'Client communication trainer',
    summary: 'Practise clear updates, careful escalation language, and professional ticket closure notes.',
    outcome: 'More confident customer updates without overpromising or hiding uncertainty.',
    href: '/msp-transition'
  },
  {
    id: 'kb-builder',
    title: 'Knowledge base builder',
    summary: 'Turn repeated support patterns into reusable KB article templates and checklists.',
    outcome: 'Reusable documentation for common MSP workflows.',
    href: '/support-tools'
  },
  {
    id: 'evidence-bridge',
    title: 'DCS-to-MSP evidence translator',
    summary: 'Translate school IT work into privacy-safe MSP capability statements.',
    outcome: 'Career evidence that explains transferable experience without exposing sensitive details.',
    href: '/evidence-pack'
  }
];

export const mspThirtyDayPlan: MspThirtyDayBlock[] = [
  {
    label: 'Week 1',
    focus: 'Ticketing expectations, shadowing, clean notes, and escalation boundaries.',
    drills: [
      'Rewrite a vague ticket into a clean first-response note.',
      'List what belongs in the ticket versus what should never be copied.',
      'Practise a concise escalation reason for an issue beyond first-line scope.'
    ]
  },
  {
    label: 'Weeks 2-3',
    focus: 'M365 identity/access, endpoint troubleshooting, printers, networks, and client updates.',
    drills: [
      'Triage an Outlook access issue using scope, identity, service, and device checks.',
      'Write a client update that explains investigation status without overpromising.',
      'Build a short checklist for new starter access and device readiness.'
    ]
  },
  {
    label: 'Weeks 4-6',
    focus: 'Backup alerts, security triage, recurring issue patterns, and reusable documentation.',
    drills: [
      'Classify a backup alert by impact, urgency, and escalation path.',
      'Turn three repeated support issues into one KB article outline.',
      'Export privacy-safe evidence of growth for a manager check-in.'
    ]
  }
];

export const mspEvidenceBridge: MspEvidenceBridge[] = [
  {
    dcsExperience: 'DCS account and access support',
    mspCapability: 'Identity, access, MFA, and SaaS support',
    evidencePrompt: 'Describe the access pattern, checks used, and escalation boundary without naming systems or people.'
  },
  {
    dcsExperience: 'Parent Portal, OurDCS, Sentral, and Schoolbox support',
    mspCapability: 'Line-of-business SaaS triage',
    evidencePrompt: 'Explain how you identified whether the issue was user, permission, workflow, or vendor-owned.'
  },
  {
    dcsExperience: 'Classroom AV, printers, Wi-Fi, BYOD, and iPad first response',
    mspCapability: 'Endpoint, peripheral, and network first-line troubleshooting',
    evidencePrompt: 'Summarise the troubleshooting sequence and what evidence made escalation useful.'
  },
  {
    dcsExperience: 'Staff onboarding and missing-access checks',
    mspCapability: 'New starter onboarding and access readiness',
    evidencePrompt: 'List the repeatable checklist items and how you confirmed readiness safely.'
  },
  {
    dcsExperience: 'Ticket writing and handoff notes',
    mspCapability: 'Professional service desk documentation',
    evidencePrompt: 'Show how your notes capture scope, impact, checks completed, and next action.'
  }
];

export const mspTicketNoteCriteria = [
  'Client, user, device, and service are clear without exposing secrets.',
  'Business impact and urgency are stated plainly.',
  'Checks completed and evidence gathered are specific.',
  'Customer communication is documented professionally.',
  'Escalation reason and next action are obvious.',
  'No passwords, tokens, private records, internal URLs, or unnecessary personal details are included.'
];
