import type { WeakTopicKey } from '../types/assessment';

export type WeakTopicCoaching = {
  topic: WeakTopicKey;
  dcsWhyItMatters: string;
  nextBestAction: string;
  recommendedHref: string;
  practicePrompt: string;
  safeBoundary: string;
};

export const weakTopicCoaching: Record<WeakTopicKey, WeakTopicCoaching> = {
  'ports-protocols': {
    topic: 'ports-protocols',
    dcsWhyItMatters:
      'Ports and protocols help Josh understand what service might be failing before escalating. This affects web access, printing, remote support, email, file access, and basic network conversations.',
    nextBestAction: 'Do one ports/protocols drill, then explain where HTTP, HTTPS, DNS, DHCP, SMB, and RDP would appear in school support.',
    recommendedHref: '/modules/ports-and-protocols',
    practicePrompt: 'A staff device can browse websites but cannot access a shared file path. What services or protocols could be involved?',
    safeBoundary: 'Do not change firewall, DNS, DHCP, or server settings. Capture evidence and escalate.'
  },
  'dns-dhcp-gateway': {
    topic: 'dns-dhcp-gateway',
    dcsWhyItMatters:
      'DNS, DHCP, gateway, and APIPA reasoning is core to Level 1 Wi-Fi and classroom connectivity triage. It helps separate one-device issues from network-wide issues.',
    nextBestAction: 'Review DHCP vs DNS vs gateway, then practise the 169.254 student laptop scenario.',
    recommendedHref: '/modules/dns-dhcp-gateway-ip-basics',
    practicePrompt: 'A student laptop has a 169.254.x.x address. What does that suggest, and what safe checks should come first?',
    safeBoundary: 'Do not change scopes, reservations, VLANs, or network infrastructure. Compare devices and escalate clearly.'
  },
  'vlan-firewall-rules': {
    topic: 'vlan-firewall-rules',
    dcsWhyItMatters:
      'VLAN and firewall rule understanding helps Josh describe guest, staff, student, printer, and server access boundaries without making unsafe network changes.',
    nextBestAction: 'Practise explaining source, destination, service, and action in one guest Wi-Fi rule.',
    recommendedHref: '/modules/vlans-network-segmentation',
    practicePrompt: 'A guest Wi-Fi device should reach the internet but not internal printers. Write the rule in plain English.',
    safeBoundary: 'Rule design is learning only unless assigned. Do not edit production network rules.'
  },
  'cloud-models': {
    topic: 'cloud-models',
    dcsWhyItMatters:
      'Cloud model fluency helps Josh distinguish SaaS platforms like M365, Schoolbox/OurDCS, Sentral-style systems, hosted desktops, and local installs.',
    nextBestAction: 'Make a DCS + A+ bridge card for SaaS, IaaS, PaaS, and DaaS using school examples.',
    recommendedHref: '/modules/cloud-models-saas-paas-iaas-daas',
    practicePrompt: 'Explain why M365 is SaaS and why that changes what Level 1 support can fix directly.',
    safeBoundary: 'Do not claim ownership of vendor or cloud tenant admin decisions unless explicitly assigned.'
  },
  'offboarding-sequence': {
    topic: 'offboarding-sequence',
    dcsWhyItMatters:
      'Offboarding sequence matters because identity, sessions, devices, groups, mailboxes, files, and shared resources can create privacy and access risk if handled poorly.',
    nextBestAction: 'Review block sign-in, revoke sessions, MFA cleanup, group removal, and shared-resource handoff as concepts.',
    recommendedHref: '/modules/m365-identity-offboarding-basics',
    practicePrompt: 'A former staff member still appears active in Teams. What evidence should Josh capture before escalation?',
    safeBoundary: 'Do not perform production offboarding actions unless assigned. Learn the sequence and escalate cleanly.'
  },
  'mdm-group-policy': {
    topic: 'mdm-group-policy',
    dcsWhyItMatters:
      'MDM and Group Policy concepts explain why apps, printers, Wi-Fi profiles, restrictions, and settings may apply differently across devices and users.',
    nextBestAction: 'Practise sorting symptoms into device policy, user policy, app deployment, network, or escalation.',
    recommendedHref: '/modules/mdm-intune-group-policy-concepts',
    practicePrompt: 'A managed iPad is missing an expected app. What evidence should Josh capture before escalation?',
    safeBoundary: 'Do not wipe, retire, enrol, or change policies unless assigned. Capture device state and hand off.'
  },
  'printer-symptoms': {
    topic: 'printer-symptoms',
    dcsWhyItMatters:
      'Printer symptom reasoning is high-frequency school IT work. It separates queue problems, release problems, device faults, toner/fuser issues, and service-call needs.',
    nextBestAction: 'Review queue-vs-device-vs-PaperCut reasoning, then write a service-call handoff note.',
    recommendedHref: '/modules/printer-troubleshooting',
    practicePrompt: 'A teacher says the printer is broken, but jobs are sitting in a queue. What should Josh check first?',
    safeBoundary: 'Avoid deep printer configuration changes unless assigned. Capture model, location, symptom, queue, and impact.'
  },
  'ticket-quality': {
    topic: 'ticket-quality',
    dcsWhyItMatters:
      'Ticket quality is one of the highest-value Level 1 skills. Good notes reduce back-and-forth, protect privacy, and help Paul or Level 2 act quickly.',
    nextBestAction: 'Rewrite one messy support note using who/where/device, exact symptom, scope, steps tried, urgency, and next action.',
    recommendedHref: '/modules/ticket-notes-escalation-quality',
    practicePrompt: 'Turn “internet not working in class” into a clear Jira-style escalation note.',
    safeBoundary: 'Do not include passwords, student details, family details, private incident detail, or unnecessary names.'
  },
  'security-risk-judgement': {
    topic: 'security-risk-judgement',
    dcsWhyItMatters:
      'Security judgement protects students, staff, systems, and trust. It matters for phishing, suspicious login prompts, account compromise, privacy wording, and escalation urgency.',
    nextBestAction: 'Practise the phishing reported-by-staff workflow and write a privacy-safe escalation note.',
    recommendedHref: '/modules/ticket-notes-escalation-quality',
    practicePrompt: 'A staff member reports a suspicious email. What should Josh ask them not to do, and what should be captured?',
    safeBoundary: 'Do not inspect sensitive mailbox content unnecessarily. Preserve evidence and escalate through the correct channel.'
  }
};

export type OwnershipArea = {
  id: string;
  title: string;
  primaryOwner: 'ICT' | 'Admin' | 'Leadership' | 'Teacher / Faculty' | 'Vendor / External' | 'Shared';
  joshRole: string;
  examples: string[];
  captureBeforeEscalation: string[];
  avoid: string[];
  escalationWording: string;
};

export const ownershipAreas: OwnershipArea[] = [
  {
    id: 'classroom-av',
    title: 'Classroom display, ViewBoard, audio, HDMI, USB-C',
    primaryOwner: 'ICT',
    joshRole: 'First-line triage: source/input, Windows + P, cable/adaptor, audio output, touch symptom, room impact, then escalate recurring or hardware faults.',
    examples: ['ViewBoard not displaying', 'HDMI works but no audio', 'Touch not working', 'Projector thermal or lamp symptoms'],
    captureBeforeEscalation: ['Room', 'device', 'connection type', 'input/source', 'Windows + P mode', 'one device or many', 'steps already tried'],
    avoid: ['Opening wall plates', 'Changing room infrastructure configuration', 'Assuming the teacher caused it'],
    escalationWording:
      'Room/display issue captured. First-line checks completed: source/input, Windows + P, cable/adaptor, and audio path. Escalating due to recurring or hardware-level symptoms.'
  },
  {
    id: 'identity-login',
    title: 'Login, password, lockout, MFA, account access',
    primaryOwner: 'ICT',
    joshRole: 'Safe first-line identity triage: confirm username/context, never ask for passwords, identify lockout/MFA/reset symptoms, escalate suspicious or admin-only changes.',
    examples: ['Password reset issue', 'MFA prompt problem', 'Self-service reset failure', 'Suspected account compromise'],
    captureBeforeEscalation: ['User type', 'system affected', 'exact error', 'time started', 'whether other systems work', 'suspicious activity indicators'],
    avoid: ['Recording passwords', 'Sharing reset links publicly', 'Changing identity/security settings without assignment'],
    escalationWording:
      'Login issue reported. User unable to authenticate to the named system. No password requested or recorded. Error/context captured and escalated for identity check.'
  },
  {
    id: 'parent-portal-sentral',
    title: 'Parent Portal and Sentral-style requests',
    primaryOwner: 'Admin',
    joshRole: 'Awareness and triage only unless assigned: capture symptoms, confirm system/request type, identify whether it is access, family details, markbook/reporting, or admin-owned data.',
    examples: ['Parent access-key issue', 'Family detail update request', 'Sentral markbook visibility', 'Reporting period access problem'],
    captureBeforeEscalation: ['System', 'request type', 'reported symptom', 'screenshots without sensitive details where appropriate', 'urgency/timing'],
    avoid: ['Changing family data', 'Copying private parent/student details into notes', 'Acting as if Sentral admin ownership sits with Josh'],
    escalationWording:
      'Portal/Sentral-related request captured at symptom level. Appears admin/system-owner owned. Escalating with request type, timing, and safe non-sensitive context.'
  },
  {
    id: 'files-permissions',
    title: 'Shared files, drives, Teams, SharePoint, OneDrive permissions',
    primaryOwner: 'Shared',
    joshRole: 'Triage access symptoms, distinguish missing permission from sync/search/ownership issue, capture approval context, and escalate access changes where required.',
    examples: ['Cannot find a shared file', 'OneDrive sync issue', 'Teams file missing', 'Shared drive access request'],
    captureBeforeEscalation: ['File/location type', 'who needs access', 'role/class/team context', 'approval source', 'error shown', 'whether web access works'],
    avoid: ['Granting least-privilege-sensitive access without approval', 'Pasting file contents into notes', 'Changing ownership without authority'],
    escalationWording:
      'File/access issue triaged. Captured target resource, affected role/context, error, and approval status. Escalating for permission or ownership review.'
  },
  {
    id: 'web-filtering',
    title: 'Website filtering and unblock requests',
    primaryOwner: 'Leadership',
    joshRole: 'Capture exact URL, learning purpose, requester, class/timeframe, block message, and approval context. Do not bypass filtering casually.',
    examples: ['Website blocked for a lesson', 'Video resource unavailable', 'Filtering category seems wrong'],
    captureBeforeEscalation: ['Exact URL', 'block message/category if visible', 'curriculum purpose', 'time needed', 'teacher/requester', 'class context'],
    avoid: ['Bypassing filters without approval', 'Assuming all blocked sites should be allowed', 'Including student browsing details unnecessarily'],
    escalationWording:
      'Website unblock request captured with URL, curriculum purpose, timeframe, and visible block details. Escalating for approval/filtering review.'
  },
  {
    id: 'printers',
    title: 'Printers, photocopiers, PaperCut / Follow-Me printing',
    primaryOwner: 'ICT',
    joshRole: 'First-line triage: queue, selected printer, release step, device status, paper/toner/jam, whether one user or many, then escalate service faults.',
    examples: ['Jobs stuck in queue', 'Follow-Me release problem', 'Toner rubs off', 'Paper jam or finishing issue'],
    captureBeforeEscalation: ['Printer location/name', 'user/device', 'queue/release state', 'error light/message', 'one user or many', 'sample symptom if safe'],
    avoid: ['Deep driver/server changes without assignment', 'Clearing evidence before recording it', 'Opening unsafe printer internals'],
    escalationWording:
      'Printer issue triaged. Queue/release/device symptoms checked and impact captured. Escalating due to likely device/service or configuration-level fault.'
  }
];

export type PrivacyWordingExample = {
  id: string;
  title: string;
  unsafe: string;
  safer: string;
  why: string;
};

export const privacyWordingExamples: PrivacyWordingExample[] = [
  {
    id: 'student-login',
    title: 'Student login issue',
    unsafe: 'Sarah Smith in Year 8 cannot log in and thinks her password is wrong.',
    safer: 'Student account login issue reported. User unable to authenticate. No password was requested or recorded. Further account check/escalation required.',
    why: 'Avoids unnecessary student identity detail and makes clear that the password was not collected.'
  },
  {
    id: 'parent-family-details',
    title: 'Parent/family details request',
    unsafe: 'Mum says the family details for the Jones family are wrong and wants the address changed.',
    safer: 'Parent portal family-detail update request reported. Request appears admin-owned. No private family details copied into ICT notes. Escalating to the appropriate system owner/admin workflow.',
    why: 'Avoids storing private family details in the IT learning/support note.'
  },
  {
    id: 'phishing',
    title: 'Suspicious email',
    unsafe: 'Teacher forwarded me a weird email from a parent with a dodgy attachment.',
    safer: 'Suspicious email reported by staff member. User advised not to click links or open attachments. Sender/subject/evidence should be preserved through the approved security escalation path.',
    why: 'Focuses on containment and evidence rather than repeating private content.'
  },
  {
    id: 'website-block',
    title: 'Blocked website request',
    unsafe: 'Year 10 student needs YouTube unblocked for a video.',
    safer: 'Website access request received for curriculum use. Exact URL, learning purpose, timeframe, and visible block message should be captured for filtering/approval review.',
    why: 'Keeps the note about the request and approval pathway, not the student.'
  }
];

export type WorkflowChoice = {
  id: string;
  label: string;
  outcome: string;
  nextStepId?: string;
  recommended?: boolean;
};

export type WorkflowStep = {
  id: string;
  title: string;
  prompt: string;
  choices: WorkflowChoice[];
  finalNote?: string;
};

export type WorkflowTree = {
  id: string;
  title: string;
  summary: string;
  ownerAreaId: string;
  relatedWeakTopics: WeakTopicKey[];
  startingStepId: string;
  steps: WorkflowStep[];
  modelTicketNote: string;
};

export const workflowTrees: WorkflowTree[] = [
  {
    id: 'teacher-laptop-no-display',
    title: 'Teacher laptop will not display on ViewBoard',
    summary: 'Safely narrows a classroom display issue without over-adjusting room infrastructure.',
    ownerAreaId: 'classroom-av',
    relatedWeakTopics: ['ticket-quality'],
    startingStepId: 'start',
    steps: [
      {
        id: 'start',
        title: 'First check',
        prompt: 'The teacher says the laptop is plugged in but nothing appears on the ViewBoard. What first check gives the most signal?',
        choices: [
          { id: 'source', label: 'Check ViewBoard input/source and whether the laptop detects a display.', outcome: 'Good. This separates input/source from laptop display mode.', nextStepId: 'windows-p', recommended: true },
          { id: 'restart', label: 'Restart the laptop immediately.', outcome: 'Sometimes helps, but it loses time before checking the visible classroom path.', nextStepId: 'windows-p' },
          { id: 'escalate', label: 'Escalate immediately without checking anything.', outcome: 'Too early unless there are safety or repeated hardware signs.', nextStepId: 'windows-p' }
        ]
      },
      {
        id: 'windows-p',
        title: 'Display mode',
        prompt: 'The ViewBoard input is correct. What next?',
        choices: [
          { id: 'duplicate', label: 'Press Windows + P and check Duplicate/Extend.', outcome: 'Good. Wrong display mode is common and safe to check.', nextStepId: 'scope', recommended: true },
          { id: 'settings', label: 'Open advanced display settings and change resolution randomly.', outcome: 'Too broad and may create more confusion.', nextStepId: 'scope' },
          { id: 'cable-only', label: 'Only swap the HDMI cable without checking Windows + P.', outcome: 'Cable can matter, but display mode is a fast safe check first.', nextStepId: 'scope' }
        ]
      },
      {
        id: 'scope',
        title: 'Scope',
        prompt: 'Windows + P does not fix it. What must be captured before escalation?',
        choices: [
          { id: 'scope-good', label: 'Room, device, cable/adaptor, source, whether another laptop works, and impact on learning.', outcome: 'Good escalation evidence.', recommended: true },
          { id: 'scope-poor', label: 'Only write “ViewBoard broken”.', outcome: 'Too vague. Level 2 will need to ask the same questions again.' }
        ],
        finalNote: 'Escalate recurring room faults, suspected damaged ports, touch failure, or multiple-device failure.'
      }
    ],
    modelTicketNote:
      'Room display issue: teacher laptop connected to ViewBoard but no image. Checked input/source and Windows + P. Issue persists after safe first-line checks. Need review of cable/adaptor/room hardware path. Learning impact: current lesson display unavailable.'
  },
  {
    id: 'student-laptop-169-254',
    title: 'Student laptop has 169.254 IP address',
    summary: 'Connects DHCP/APIPA knowledge to safe one-device vs many-device network triage.',
    ownerAreaId: 'identity-login',
    relatedWeakTopics: ['dns-dhcp-gateway', 'ticket-quality'],
    startingStepId: 'start',
    steps: [
      {
        id: 'start',
        title: 'Interpret the symptom',
        prompt: 'A student laptop has a 169.254.x.x address. What does that usually suggest?',
        choices: [
          { id: 'dhcp', label: 'The device did not receive a usable DHCP lease.', outcome: 'Correct. This is APIPA-style addressing.', nextStepId: 'safe-checks', recommended: true },
          { id: 'dns', label: 'DNS is definitely broken.', outcome: 'Not necessarily. DNS may be fine; the device may not have a usable network config.', nextStepId: 'safe-checks' },
          { id: 'blocked-site', label: 'The website is blocked.', outcome: 'Too narrow. The IP address problem comes before website filtering.', nextStepId: 'safe-checks' }
        ]
      },
      {
        id: 'safe-checks',
        title: 'Safe checks',
        prompt: 'What safe Level 1 checks come next?',
        choices: [
          { id: 'safe', label: 'Correct SSID, forget/rejoin if appropriate, compare another device in the same room, capture scope.', outcome: 'Good. This narrows device vs area/network issue.', recommended: true },
          { id: 'scope-change', label: 'Change DHCP scope settings.', outcome: 'Unsafe and not Level 1 unless explicitly assigned.' },
          { id: 'ignore', label: 'Tell the student to wait and do nothing else.', outcome: 'Too passive. Basic evidence capture is useful.' }
        ],
        finalNote: 'Escalate if multiple devices in the same area fail to obtain usable addressing.'
      }
    ],
    modelTicketNote:
      'Student device network issue: laptop showing 169.254.x.x address and cannot access network. Checked SSID and compared with another device/location where possible. Appears DHCP/connectivity related. Escalating with room/device/scope details.'
  },
  {
    id: 'website-unblock-request',
    title: 'Teacher requests a blocked website be unblocked',
    summary: 'Keeps website access requests safe, specific, and approval-aware.',
    ownerAreaId: 'web-filtering',
    relatedWeakTopics: ['security-risk-judgement', 'ticket-quality'],
    startingStepId: 'start',
    steps: [
      {
        id: 'start',
        title: 'Capture the request',
        prompt: 'A teacher says a site needed for class is blocked. What do you capture first?',
        choices: [
          { id: 'capture', label: 'Exact URL, block message/category, learning purpose, class/timeframe, and requester.', outcome: 'Good. This gives the approval/filtering reviewer enough context.', recommended: true },
          { id: 'unblock', label: 'Immediately bypass the filter.', outcome: 'Unsafe. Filtering changes need the right approval/workflow.' },
          { id: 'vague', label: 'Write “YouTube blocked”.', outcome: 'Too vague; exact URL and purpose matter.' }
        ],
        finalNote: 'Escalate with approval context. Do not copy student browsing detail unnecessarily.'
      }
    ],
    modelTicketNote:
      'Website unblock request: staff member reports curriculum resource blocked. Exact URL, visible block details, learning purpose, and timeframe captured. Request needs filtering/approval review before access change.'
  },
  {
    id: 'printer-jobs-stuck',
    title: 'Printer jobs stuck in queue',
    summary: 'Distinguishes queue, release, device, and service-call issues.',
    ownerAreaId: 'printers',
    relatedWeakTopics: ['printer-symptoms', 'ticket-quality'],
    startingStepId: 'start',
    steps: [
      {
        id: 'start',
        title: 'Separate queue from device',
        prompt: 'A staff member says the printer is broken, but jobs are stuck in the queue. What do you check first?',
        choices: [
          { id: 'queue-release', label: 'Correct printer/queue, Follow-Me release step, device status, and whether others are affected.', outcome: 'Good. This separates user workflow from device fault.', recommended: true },
          { id: 'toner', label: 'Replace toner immediately.', outcome: 'Wrong starting point if jobs have not reached/released to the device.' },
          { id: 'server', label: 'Change print server settings.', outcome: 'Not safe Level 1 unless assigned.' }
        ],
        finalNote: 'Escalate if many users are affected, queue behaviour is abnormal, or physical device/service symptoms remain.'
      }
    ],
    modelTicketNote:
      'Printer issue: staff print jobs stuck in queue/release path. Checked selected printer/queue, release step, and device status. Scope captured as one user/multiple users. Escalating if queue or device fault persists.'
  },
  {
    id: 'phishing-report',
    title: 'Staff member reports suspicious email',
    summary: 'Builds safe first response for phishing/security reports.',
    ownerAreaId: 'identity-login',
    relatedWeakTopics: ['security-risk-judgement', 'ticket-quality'],
    startingStepId: 'start',
    steps: [
      {
        id: 'start',
        title: 'Containment first',
        prompt: 'A staff member reports a suspicious email. What should happen first?',
        choices: [
          { id: 'contain', label: 'Advise them not to click links/open attachments and preserve the email for the approved escalation path.', outcome: 'Good. Containment and evidence preservation come first.', recommended: true },
          { id: 'open', label: 'Open the attachment to see what it does.', outcome: 'Unsafe.' },
          { id: 'delete', label: 'Delete it immediately without recording anything.', outcome: 'May lose useful evidence before escalation.' }
        ],
        finalNote: 'Escalate suspicious email reports through the approved security process.'
      }
    ],
    modelTicketNote:
      'Suspicious email reported by staff member. User advised not to click links or open attachments. Evidence preserved for approved security escalation. No sensitive message content copied into general notes.'
  }
];
