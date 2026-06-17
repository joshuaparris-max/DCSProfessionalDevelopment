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

export type MspThirtyDayTask = {
  id: string;
  week: string;
  title: string;
  detail: string;
  href: string;
};

export type ClientCommunicationDrill = {
  id: string;
  title: string;
  situation: string;
  weakDraft: string;
  targetPattern: string[];
  modelResponse: string;
};

export type MspKbTemplate = {
  id: string;
  title: string;
  useCase: string;
  sections: string[];
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

export const mspThirtyDayTasks: MspThirtyDayTask[] = [
  {
    id: 'week1-ticket-note',
    week: 'Week 1',
    title: 'Rewrite one vague support note',
    detail: 'Turn a short complaint into a note with client/user, service, impact, checks, and next action.',
    href: '/scenarios'
  },
  {
    id: 'week1-escalation-boundary',
    week: 'Week 1',
    title: 'Practise an escalation boundary',
    detail: 'Write the reason a first-line technician should escalate instead of changing access, backup, or network settings.',
    href: '/support-tools/escalation-templates'
  },
  {
    id: 'week1-privacy-line',
    week: 'Week 1',
    title: 'Write the privacy line',
    detail: 'Create one sentence that explains what belongs in tickets and what never belongs in notes.',
    href: '/msp-transition'
  },
  {
    id: 'week2-m365-scope',
    week: 'Weeks 2-3',
    title: 'Run an M365 scope drill',
    detail: 'Separate login, mailbox, shared mailbox, Teams, and OneDrive symptoms before choosing a fix.',
    href: '/scenarios'
  },
  {
    id: 'week2-client-update',
    week: 'Weeks 2-3',
    title: 'Write a client investigation update',
    detail: 'Explain what has been checked, what is still unknown, and when the next update will happen.',
    href: '/client-communication'
  },
  {
    id: 'week2-new-starter',
    week: 'Weeks 2-3',
    title: 'Draft a new starter checklist',
    detail: 'List identity, licence, groups, device, MFA, mailbox, apps, and handover checks.',
    href: '/knowledge-base-lab'
  },
  {
    id: 'week4-backup-alert',
    week: 'Weeks 4-6',
    title: 'Complete a backup alert mission',
    detail: 'Classify a failed backup alert by affected asset, last success, retry result, impact, and escalation path.',
    href: '/scenarios'
  },
  {
    id: 'week4-kb-outline',
    week: 'Weeks 4-6',
    title: 'Build one KB outline',
    detail: 'Convert a repeated support pattern into a reusable article that avoids real client details.',
    href: '/msp-kb-builder'
  },
  {
    id: 'week4-evidence-export',
    week: 'Weeks 4-6',
    title: 'Export MSP evidence',
    detail: 'Generate a privacy-safe evidence pack that translates DCS experience into MSP capabilities.',
    href: '/evidence-pack'
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

export const clientCommunicationDrills: ClientCommunicationDrill[] = [
  {
    id: 'first-response',
    title: 'First response',
    situation: 'A client reports Outlook is broken but gives no details.',
    weakDraft: 'Hi, I will look into it.',
    targetPattern: [
      'Acknowledge the issue',
      'Ask one or two scope questions',
      'Set a clear next action',
      'Avoid blaming a system before evidence'
    ],
    modelResponse:
      'Thanks for reporting this. I will start by checking whether this is affecting Outlook only or other Microsoft 365 services as well. Can you confirm whether Outlook Web works and whether anyone else is affected? I will update the ticket after those checks.'
  },
  {
    id: 'investigation-update',
    title: 'Investigation update',
    situation: 'You have checked the user account and device, but the issue is still unresolved.',
    weakDraft: 'Still not fixed, escalating.',
    targetPattern: [
      'State checks completed',
      'State what remains unknown',
      'Explain escalation reason',
      'Give the client confidence that the handoff is useful'
    ],
    modelResponse:
      'I have confirmed the account can sign in and the issue follows the mailbox rather than the device. I am escalating this with the permission and error details so the next engineer can review the mailbox configuration path without repeating the first checks.'
  },
  {
    id: 'closure-note',
    title: 'Closure note',
    situation: 'A printer issue is resolved after changing the default queue and confirming a test print.',
    weakDraft: 'Fixed printer.',
    targetPattern: [
      'Describe what changed',
      'Confirm the test result',
      'Mention user impact is resolved',
      'Include a simple reopen path'
    ],
    modelResponse:
      'The default print queue was corrected and a test print completed successfully from the affected workstation. Printing is working again for the user. Please reply to the ticket if the issue returns or affects another device.'
  }
];

export const mspKbTemplates: MspKbTemplate[] = [
  {
    id: 'outlook-sign-in',
    title: 'Outlook sign-in first checks',
    useCase: 'User can’t access Outlook, mailbox, or Microsoft 365 mail.',
    sections: ['Symptoms', 'Scope questions', 'First checks', 'Escalation triggers', 'Client update template']
  },
  {
    id: 'mfa-reset',
    title: 'MFA reset checklist',
    useCase: 'User has a new phone, lost authenticator access, or fails MFA setup.',
    sections: ['Identity verification', 'Approval path', 'Admin action', 'Session/security checks', 'Closure note']
  },
  {
    id: 'onedrive-sync',
    title: 'OneDrive sync issue flow',
    useCase: 'Files not syncing, conflict copies, or device replacement sync confusion.',
    sections: ['Affected folder', 'Sync client state', 'Known-good web check', 'Conflict handling', 'Escalation evidence']
  },
  {
    id: 'printer-first-checks',
    title: 'Printer first checks',
    useCase: 'Client printer unavailable, stuck queue, wrong printer, or failed test print.',
    sections: ['Affected device/user', 'Queue and default printer', 'Network/path check', 'Test print', 'Vendor/L2 handoff']
  },
  {
    id: 'new-user-onboarding',
    title: 'New user onboarding',
    useCase: 'New starter needs account, device, groups, apps, MFA, mailbox, and handover.',
    sections: ['Identity/licence', 'Groups and shared access', 'Device readiness', 'MFA and sign-in', 'Handover checklist']
  },
  {
    id: 'suspicious-email',
    title: 'Suspicious email triage',
    useCase: 'Client reports phishing, suspicious links, unexpected invoices, or login prompts.',
    sections: ['Do not click guidance', 'Evidence to preserve', 'Scope check', 'Security escalation', 'Client response']
  },
  {
    id: 'backup-alert',
    title: 'Backup alert first response',
    useCase: 'Backup job failed, missed SLA, retry failed, or restore confidence is unclear.',
    sections: ['Affected asset/job', 'Last success', 'Retry/check result', 'Risk statement', 'Escalation request']
  }
];
