import type { AssessmentQuestion, AssessmentSource } from '../types/assessment';
import type { TrainingModule } from '../types/training';
import { dcsWorkflowModules } from './dcsWorkflowModules';

export type ModuleData = TrainingModule;

const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';

function mcq(question: Omit<Extract<AssessmentQuestion, { type: 'mcq' }>, 'type'>): AssessmentQuestion {
  return {
    type: 'mcq',
    ...question
  };
}

function shortAnswer(
  question: Omit<Extract<AssessmentQuestion, { type: 'short-answer' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'short-answer',
    ...question
  };
}

function orderSteps(
  question: Omit<Extract<AssessmentQuestion, { type: 'order-steps' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'order-steps',
    ...question
  };
}

function scenarioResponse(
  question: Omit<Extract<AssessmentQuestion, { type: 'scenario-response' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'scenario-response',
    ...question
  };
}

function explainItSimply(
  question: Omit<Extract<AssessmentQuestion, { type: 'explain-it-simply' }>, 'type'>
): AssessmentQuestion {
  return {
    type: 'explain-it-simply',
    ...question
  };
}

export const legacyModuleAliases: Record<string, string> = {
  foundations: 'dcs-it-support-foundations',
  'library-daily-routines': 'classroom-display-viewboard-troubleshooting',
  'ict-helpdesk-101': 'ticket-notes-escalation-quality'
};

export const modules: TrainingModule[] = [
  {
    id: 'dcs-it-support-foundations',
    title: 'DCS IT Support Foundations',
    description:
      'A Level 1 operating approach for professional development during approved professional development periods: triage clearly, act safely, and stop immediately when live support takes priority.',
    domain: 'Foundations',
    level: 'DCS Context',
    estimatedMinutes: 18,
    tags: ['approved PD periods', 'triage', 'Level 1', 'support-first'],
    learningObjectives: [
      'Use a 60-second triage pattern before touching settings.',
      'Recognise the boundary between safe Level 1 action and escalation.',
      'Capture clean notes that help Paul or a Level 2 tech move faster.'
    ],
    dcsRelevance: [
      'Fits the stop-start rhythm of walk-ups, calls, and classroom interruptions.',
      'Keeps professional development aligned with day-to-day DCS helpdesk responsibilities.',
      'Builds safer judgement for shared school devices and visible campus support.'
    ],
    sections: [
      {
        id: 'foundations-1',
        title: 'Support first, PD second',
        bodyMarkdown: `Professional development should only take place during approved professional development periods with no active support demand.\n\nIf a ticket, walk-up, call, classroom issue, or direct instruction arrives, the professional development session stops immediately and operational support resumes. That is part of the role, not a sign of poor discipline.\n\nA sound DCS Level 1 rhythm is: identify the issue, stabilise the situation, ask the clearest next question, then either complete a safe basic fix or escalate clearly.`
      },
      {
        id: 'foundations-2',
        title: 'The 60-second triage frame',
        bodyMarkdown: `Start with: who is affected, where it is happening, what the symptom is, when it started, and whether learning can continue right now.\n\nThen ask one more question: "What changed?" A cable move, a reboot, a password reset, a trolley swap, or a room change often explains more than the first complaint does.\n\nThe aim is not to sound impressive. The aim is to shrink uncertainty without causing more risk.`
      },
      {
        id: 'foundations-3',
        title: 'Safe Level 1 boundaries',
        bodyMarkdown: `Safe first actions are usually reversible: reconnect, reseat, restart, confirm the correct account, confirm the correct room, confirm the correct printer, and compare with a known-good device.\n\nUnsafe actions are deeper changes you do not own yet: production admin changes, policy changes, account permission changes, firewall edits, or anything that could affect other users.\n\nWhen in doubt, preserve evidence and escalate rather than experimenting.`
      },
      {
        id: 'foundations-4',
        title: 'Multi-campus rhythm and where workflow knowledge lives',
        bodyMarkdown: `Many symptoms repeat across campuses but fixes still route through the right owners. Note campus or site in tickets early because VLAN paths, room naming, and local contacts differ.\n\nTrustworthy operational knowledge usually lives in approved channels such as internal ticketing history, authorised Teams channels, published intranet articles, and leadership-approved procedures—not informal guesses.\n\nJosh stays credible when he cites what was verified locally versus what still needs the authoritative owner.`
      }
    ],
    flashcards: [
      { id: 'foundations-f1', front: 'What interrupts PD immediately at DCS?', back: 'Tickets, walk-ups, calls, classroom issues, and direct instructions.' },
      { id: 'foundations-f2', front: 'What are the five core triage prompts?', back: 'Who, where, what, when, and impact on learning.' },
      { id: 'foundations-f3', front: 'What extra question often reveals the cause fastest?', back: 'What changed?' },
      { id: 'foundations-f4', front: 'Name two safe Level 1 actions.', back: 'Reconnect, reseat, restart, confirm account, confirm room, or compare with known-good.' },
      { id: 'foundations-f5', front: 'What kind of actions should Level 1 avoid without approval?', back: 'Production admin, policy, permission, firewall, or broad-impact changes.' },
      { id: 'foundations-f6', front: 'Why do we capture scope before tinkering?', back: 'So we know whether it is one device, one room, or something wider.' },
      { id: 'foundations-f7', front: 'What does a good escalation note preserve?', back: 'Exact symptom, scope, steps tried, impact, and next concern.' },
      { id: 'foundations-f8', front: 'What is the primary goal of triage?', back: 'Reduce uncertainty safely so the next action is evidence-based and justified.' },
      { id: 'foundations-f9', front: 'Why tag campus/site early?', back: 'Routing, VLAN context, and local escalation contacts differ between locations.' },
      { id: 'foundations-f10', front: 'Where should trusted workflow detail live?', back: 'Authorised school systems and approved docs—not personal PD notes as system of record.' }
    ],
    quiz: [
      mcq({
        id: 'foundations-q1',
        prompt: 'A teacher says, "Room 7 has no internet." What is the best first move for Josh at Level 1?',
        domain: 'DCS support foundations',
        difficulty: 'foundation',
        explanation: 'Scope comes before guesswork.',
        modelAnswer:
          'Clarify scope and location first: which device, which room, whether staff and students are both affected, and whether learning is blocked right now. Then try the safest basic checks.',
        commonMistakes: ['Jumping straight to changing settings', 'Assuming it is only one laptop', 'Skipping impact and urgency'],
        dcsContext: 'A classroom issue can be one device, one room, or a broader network symptom.',
        reviewSchedule,
        recommendedModuleId: 'dcs-it-support-foundations',
        weakTopic: 'ticket-quality',
        options: [
          { id: 'a', label: 'Open admin tools and start changing adapter settings' },
          { id: 'b', label: 'Clarify who, where, and scope before touching anything risky' },
          { id: 'c', label: 'Restart the affected device immediately before checking whether others are affected' },
          { id: 'd', label: 'Assume the Wi-Fi is down school-wide' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'foundations-q2',
        prompt: 'List the minimum details you want in a clean escalation note for a blocked classroom support issue.',
        domain: 'DCS support foundations',
        difficulty: 'foundation',
        explanation: 'Escalation quality is part of the fix, not admin overhead.',
        modelAnswer:
          'Include who is affected, room/location, device or asset, exact symptom, when it started, scope, safe steps tried, impact on learning, and why you are escalating.',
        commonMistakes: ['Writing "internet broken" with no scope', 'Forgetting time or room', 'Leaving out what was already tried'],
        dcsContext: 'A short but precise note saves back-and-forth while class time is under pressure.',
        reviewSchedule,
        recommendedModuleId: 'dcs-it-support-foundations',
        weakTopic: 'ticket-quality',
        rubric: ['Identifies scope clearly', 'Names exact symptom', 'Shows safe work already attempted'],
        keywordHints: ['room', 'device', 'scope', 'steps tried']
      }),
      orderSteps({
        id: 'foundations-q3',
        prompt: 'Put this first-line response in the best order.',
        domain: 'DCS support foundations',
        difficulty: 'stretch',
        explanation: 'Sequence matters because scope should shape your checks.',
        modelAnswer:
          'Clarify scope first, try a reversible check second, compare with a known-good reference third, then escalate with evidence if the issue persists or affects learning broadly.',
        commonMistakes: ['Escalating before clarifying scope', 'Changing too much before comparing with known-good'],
        dcsContext: 'A tidy sequence keeps Josh inside safe Level 1 boundaries.',
        reviewSchedule,
        recommendedModuleId: 'dcs-it-support-foundations',
        weakTopic: 'ticket-quality',
        steps: [
          { id: 'clarify', label: 'Clarify who, where, and scope' },
          { id: 'safe-check', label: 'Try the simplest reversible check' },
          { id: 'compare', label: 'Compare with a known-good device or room' },
          { id: 'escalate', label: 'Escalate with notes if the impact remains' }
        ],
        correctOrder: ['clarify', 'safe-check', 'compare', 'escalate'],
        rubric: ['Starts with scope', 'Uses only reversible checks', 'Knows when to escalate']
      }),
      scenarioResponse({
        id: 'foundations-q4',
        prompt:
          'You are mid-PD in a quiet library window when Paul asks you to help a teacher with a display issue immediately. Explain your next action and the judgement behind it.',
        domain: 'DCS support foundations',
        difficulty: 'stretch',
        explanation: 'The mission is not to finish study. It is to support safely and professionally.',
        modelAnswer:
          'Stop the PD block immediately, switch into support mode, gather the room and symptom details, and work the display issue using a safe Level 1 flow. The judgement point is that operational support outranks personal PD every time.',
        commonMistakes: ['Trying to finish the module first', 'Treating PD as equally urgent as live support'],
        dcsContext: 'Quiet-window learning only exists while support demand is genuinely quiet.',
        reviewSchedule,
        recommendedModuleId: 'dcs-it-support-foundations',
        weakTopic: 'ticket-quality',
        rubric: ['Stops PD cleanly', 'Explains support-first priority', 'Shows safe troubleshooting posture']
      }),
      explainItSimply({
        id: 'foundations-q5',
        prompt:
          'Explain, in simple language, why Josh should clarify scope before changing settings when a teacher says "the internet is down."',
        domain: 'DCS support foundations',
        difficulty: 'foundation',
        explanation: 'Simple explanations reveal whether the concept is actually understood.',
        modelAnswer:
          'Clarifying scope first tells Josh whether the problem is one device, one room, or something broader. That prevents random changes, protects the classroom from unnecessary risk, and makes escalation notes more useful if the issue is bigger than one laptop.',
        commonMistakes: ['Jumping straight to fixes', 'Explaining only the technical cause instead of the support reason'],
        dcsContext: 'In a school environment, clear scope checks reduce disruption and help protect class time.',
        reviewSchedule,
        recommendedModuleId: 'dcs-it-support-foundations',
        weakTopic: 'ticket-quality',
        rubric: ['Uses plain English', 'Explains scope clearly', 'Connects scope to safer support decisions'],
        keywordHints: ['one device', 'one room', 'broader issue', 'safer next step']
      }),
      mcq({
        id: 'foundations-q6',
        prompt:
          'Two campuses report similar printer symptoms at once. What shows the best Level 1 judgement before escalating?',
        domain: 'DCS support foundations',
        difficulty: 'stretch',
        explanation: 'Correlated symptoms deserve consolidated evidence and owner routing—not improvising cross-site changes.',
        modelAnswer:
          'Treat it as a possible central dependency pattern, capture timestamps and counts per campus, and escalate with correlation detail rather than guessing VLAN edits.',
        commonMistakes: ['Trying local fixes only without noting correlation', 'Assuming coincidence'],
        dcsContext: 'Multi-campus schools amplify systemic faults.',
        reviewSchedule,
        recommendedModuleId: 'dcs-it-support-foundations',
        weakTopic: 'ticket-quality',
        options: [
          { id: 'a', label: 'Assume unrelated coincidences at each campus' },
          { id: 'b', label: 'Capture correlated evidence and route escalation noting multi-campus scope' },
          { id: 'c', label: 'Edit firewall rules locally without authority' },
          { id: 'd', label: 'Tell staff printers are always broken everywhere' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'foundations-q7',
        prompt:
          'Give two examples of authorised places Josh should look for verified workflow detail instead of improvising from memory.',
        domain: 'DCS support foundations',
        difficulty: 'foundation',
        explanation: 'Aligned behaviour reduces risk and inconsistency.',
        modelAnswer:
          'Examples include the official ticketing knowledge base, Teams channels owned by ICT leadership, published intranet procedures, or mentor-approved runbooks.',
        commonMistakes: ['Citing informal chat rumours', 'Claiming certainty without a source'],
        dcsContext: 'Operational truth should stay anchored to approved references.',
        reviewSchedule,
        recommendedModuleId: 'dcs-it-support-foundations',
        weakTopic: 'ticket-quality',
        rubric: ['Names approved channels', 'Contrasts with guessing'],
        keywordHints: ['intranet', 'ticketing', 'Teams', 'procedure']
      })
    ],
    scenarioPrompts: [
      {
        id: 'foundations-s1',
        title: 'Operational interruption response',
        prompt: 'Respond to a transition from personal study to live support with concise, professional communication.'
      }
    ],
    practicalOutputs: [
      {
        id: 'foundations-p1',
        title: 'Quiet-window triage card',
        description: 'Draft a one-page checklist for how Josh starts a DCS Level 1 incident without overstepping.'
      }
    ]
  },
  {
    id: 'ports-and-protocols',
    title: 'Ports and Protocols',
    description:
      'Remember the ports and traffic patterns that explain real school symptoms, without pretending Level 1 should edit firewall policy.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 20,
    tags: ['ports', 'protocols', 'firewall thinking', 'network basics'],
    learningObjectives: [
      'Separate a port number from a protocol and a service.',
      'Recognise common school traffic patterns such as DNS, DHCP, HTTPS, and printing.',
      'Use port knowledge to describe likely causes without making unsafe changes.'
    ],
    dcsRelevance: [
      'Helps translate vague "internet is weird" complaints into better escalations.',
      'Supports safer firewall and guest Wi-Fi conversations with clearer language.',
      'Builds confidence around Teams, printing, browsing, and classroom service symptoms.'
    ],
    sections: [
      {
        id: 'ports-1',
        title: 'Why ports matter in school support',
        bodyMarkdown: `A protocol is the communication rule. A port is the numbered doorway a service commonly listens on.\n\nYou do not need to memorise every port in existence. You do need enough fluency to recognise why web access, name resolution, print services, remote support, or blocked guest access might behave differently.`
      },
      {
        id: 'ports-2',
        title: 'The school support shortlist',
        bodyMarkdown: `Keep a practical shortlist handy: DNS 53, DHCP 67/68, HTTP 80, HTTPS 443, SMB 445, RDP 3389.\n\nThe value is not trivia. The value is being able to say, "Browsing works, but name resolution may not," or, "Guest access should not have internal device reachability."`
      },
      {
        id: 'ports-3',
        title: 'Port knowledge with Level 1 judgement',
        bodyMarkdown: `Level 1 should not be changing firewall policy in production.\n\nLevel 1 should be able to describe a clean suspicion: for example, internal print or file services may be intentionally blocked from guest Wi-Fi, or a service may depend on HTTPS even when a user just says "Teams is broken."`
      }
    ],
    flashcards: [
      { id: 'ports-f1', front: 'What does port 53 usually support?', back: 'DNS name resolution.' },
      { id: 'ports-f2', front: 'What do ports 67 and 68 point to?', back: 'DHCP lease traffic.' },
      { id: 'ports-f3', front: 'What service usually rides on 443?', back: 'HTTPS-secured web traffic.' },
      { id: 'ports-f4', front: 'Why might guest Wi-Fi fail to reach printers by design?', back: 'Segmentation or firewall policy can intentionally block internal services.' },
      { id: 'ports-f5', front: 'What is the practical difference between a protocol and a port?', back: 'The protocol is the rule set; the port is the numbered entry point commonly used.' },
      { id: 'ports-f6', front: 'Which port is commonly associated with SMB file or print sharing?', back: '445.' },
      { id: 'ports-f7', front: 'Why is port knowledge useful to Level 1 if Josh is not editing firewalls?', back: 'It sharpens diagnosis and escalation language.' },
      { id: 'ports-f8', front: 'What service is commonly associated with RDP?', back: 'Remote Desktop on 3389.' }
    ],
    quiz: [
      mcq({
        id: 'ports-q1',
        prompt: 'A web app fails while basic network connection still seems present. Which port and service language is most useful to mention?',
        domain: 'Ports and protocols',
        difficulty: 'foundation',
        explanation: 'HTTPS is a common application dependency.',
        modelAnswer:
          'Mention that the application may depend on HTTPS over port 443, so the issue may be application-specific rather than total connectivity loss.',
        commonMistakes: ['Saying "the internet is dead" with no nuance', 'Confusing DNS with HTTPS'],
        dcsContext: 'Teams, portals, and modern SaaS tools often surface as HTTPS issues to the end user.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'ports-protocols',
        options: [
          { id: 'a', label: 'Port 443 and HTTPS' },
          { id: 'b', label: 'Port 25 and SMTP' },
          { id: 'c', label: 'Port 21 and FTP' },
          { id: 'd', label: 'Port 110 and POP3' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'ports-q2',
        prompt: 'Explain why remembering a few common ports is useful to a DCS Level 1 tech even if Josh should not change firewall rules.',
        domain: 'Ports and protocols',
        difficulty: 'stretch',
        explanation: 'Language quality improves escalation quality.',
        modelAnswer:
          'A short list of common ports helps Josh describe likely causes more precisely, separate browsing issues from name resolution or print-sharing issues, and escalate with better technical language without making risky changes.',
        commonMistakes: ['Treating ports as memorisation only', 'Assuming port knowledge automatically means admin authority'],
        dcsContext: 'The school context rewards accurate descriptions and safe boundaries.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'ports-protocols',
        rubric: ['Connects knowledge to safer diagnosis', 'Stays inside Level 1 boundaries', 'Explains escalation value'],
        keywordHints: ['diagnosis', 'escalation', 'boundaries']
      }),
      orderSteps({
        id: 'ports-q3',
        prompt: 'Order the safest way to reason through a guest Wi-Fi printer complaint.',
        domain: 'Ports and protocols',
        difficulty: 'stretch',
        explanation: 'Segmentation logic comes before guesswork.',
        modelAnswer:
          'Confirm the device is genuinely on guest Wi-Fi, confirm the target printer is an internal service, recognise segmentation as a likely design choice, then escalate rather than trying to bypass policy.',
        commonMistakes: ['Trying random printer installs first', 'Treating guest isolation like an accident'],
        dcsContext: 'Guest access often exists to keep internal devices protected.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'vlan-firewall-rules',
        steps: [
          { id: 'ssid', label: 'Confirm the device is actually on guest Wi-Fi' },
          { id: 'service', label: 'Confirm the printer lives on an internal service path' },
          { id: 'design', label: 'Recognise segmentation may be intentional' },
          { id: 'escalate', label: 'Escalate instead of bypassing policy' }
        ],
        correctOrder: ['ssid', 'service', 'design', 'escalate'],
        rubric: ['Confirms facts first', 'Recognises design intent', 'Avoids unsafe workarounds']
      }),
      scenarioResponse({
        id: 'ports-q4',
        prompt: 'A staff member says, "Guest Wi-Fi should reach the smart TV and printer because the internet works." Explain the safer response.',
        domain: 'Ports and protocols',
        difficulty: 'challenge',
        explanation: 'Internet access and internal service access are not the same thing.',
        modelAnswer:
          'Explain that guest internet access does not imply access to internal devices. Guest networks are often isolated by design. Confirm the SSID and target device path, then escalate the requirement instead of promising a quick workaround.',
        commonMistakes: ['Assuming working internet means all services should work', 'Offering to open access without approval'],
        dcsContext: 'School guest access should stay restricted unless deliberately approved.',
        reviewSchedule,
        recommendedModuleId: 'ports-and-protocols',
        weakTopic: 'vlan-firewall-rules',
        rubric: ['Separates internet from internal access', 'Shows design awareness', 'Avoids unauthorised changes']
      })
    ],
    scenarioPrompts: [
      {
        id: 'ports-s1',
        title: 'Guest Wi-Fi complaint',
        prompt: 'Explain why internet access does not imply access to printers or TVs on the same network.'
      }
    ],
    practicalOutputs: [
      {
        id: 'ports-p1',
        title: 'Port memory sheet',
        description: 'Build a one-page memory sheet for the small port list Josh actually needs in school support.'
      }
    ]
  },
  {
    id: 'dns-dhcp-gateway-ip-basics',
    title: 'DNS, DHCP, Gateway, and IP Basics',
    description:
      'Turn loose network language into a concrete first-line mental model for classroom internet faults and 169.254 symptoms.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 20,
    tags: ['DNS', 'DHCP', 'gateway', 'IP', '169.254'],
    learningObjectives: [
      'Explain what DNS, DHCP, and the gateway each do in plain English.',
      'Recognise the difference between address problems and name-resolution problems.',
      'Use safe checks before escalating a classroom network fault.'
    ],
    dcsRelevance: [
      'Directly supports common classroom Wi-Fi, no-internet, and login confusion reports.',
      'Helps Josh interpret APIPA and name-resolution symptoms accurately.',
      'Improves escalation notes for room outages and trolley device issues.'
    ],
    sections: [
      {
        id: 'dns-1',
        title: 'Three jobs, three failures',
        bodyMarkdown: `DHCP gives a device an address. DNS turns names into addresses. The gateway is the route out toward other networks.\n\nIf DHCP fails, the device may never join the network properly. If DNS fails, users often say "internet is down" even though raw connectivity may still exist. If the gateway path fails, the device may have an address but still cannot reach beyond the local segment.`
      },
      {
        id: 'dns-2',
        title: 'What 169.254 usually means',
        bodyMarkdown: `A 169.254 address often means the device did not get a proper DHCP lease.\n\nThat does not tell you the exact root cause by itself. It does tell you where to start thinking: connection quality, correct SSID, adapter state, or a DHCP path problem.`
      },
      {
        id: 'dns-3',
        title: 'Safe checks before escalation',
        bodyMarkdown: `Use the low-risk flow: confirm the right SSID, reconnect, compare with another nearby device, and use simple tools like ipconfig, ping, or nslookup if that fits your confidence and permissions.\n\nYour aim is not to diagnose the entire network stack alone. Your aim is to preserve a clear symptom picture.`
      },
      {
        id: 'dns-4',
        title: 'Wi-Fi onboarding mistakes and cross-device comparison',
        bodyMarkdown: `Students and staff often attach to the wrong SSID, remain on a captive portal state, or carry a stale profile after summer breaks.\n\n“Forget” and rejoin is sometimes the right gentle reset after confirming policy allows it. Compare another device on the same SSID to tell one-device drift from room-wide faults.\n\nSignal strength matters for trolley carts—note approximate bars and whether roaming between APs correlates with drops.`
      }
    ],
    flashcards: [
      { id: 'dns-f1', front: 'What does DHCP do?', back: 'It leases an IP configuration to the device.' },
      { id: 'dns-f2', front: 'What does DNS do?', back: 'It resolves names to IP addresses.' },
      { id: 'dns-f3', front: 'What does the default gateway do?', back: 'It provides the route off the local network.' },
      { id: 'dns-f4', front: 'What does 169.254 usually suggest?', back: 'The device did not get a proper DHCP lease.' },
      { id: 'dns-f5', front: 'Can a DNS issue feel like "the internet is down"?', back: 'Yes. Names may fail even if some connectivity still exists.' },
      { id: 'dns-f6', front: 'What is the safest first comparison in a classroom outage?', back: 'Check another known-good device in the same room or on the same SSID.' },
      { id: 'dns-f7', front: 'Why is SSID confirmation important?', back: 'Because the wrong network can create misleading symptoms.' },
      { id: 'dns-f8', front: 'What is Josh trying to preserve before escalation?', back: 'A clear symptom picture, not a speculative guess.' },
      { id: 'dns-f9', front: 'Why compare another device on the same SSID?', back: 'It distinguishes one-device onboarding drift from a room or infrastructure symptom.' },
      { id: 'dns-f10', front: 'When might forget/rejoin be reasonable?', back: 'After confirming correct SSID intent and policy-safe resets for stale Wi-Fi profiles—not as the first guess without scope.' }
    ],
    quiz: [
      mcq({
        id: 'dns-q1',
        prompt: 'A student laptop shows a 169.254 address. What is the best first interpretation?',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'foundation',
        explanation: 'APIPA points to a lease problem, not usually to a name-resolution problem first.',
        modelAnswer:
          'It most likely failed to get a proper DHCP lease, so start with connection quality, correct SSID, adapter state, and local lease path thinking.',
        commonMistakes: ['Calling it a DNS failure immediately', 'Assuming the entire school network is down from one address'],
        dcsContext: 'This is a common support pattern on laptops moving between rooms or trolleys.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        options: [
          { id: 'a', label: 'The DNS server is definitely down' },
          { id: 'b', label: 'The device likely did not obtain a proper DHCP lease' },
          { id: 'c', label: 'The device may be connected to the wrong SSID without a usable school lease' },
          { id: 'd', label: 'The device may have a local adapter or onboarding problem unrelated to DNS resolution' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'dns-q2',
        prompt: 'Explain the difference between a DNS problem and a gateway-path problem in plain English.',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'stretch',
        explanation: 'Good support language separates names from routing.',
        modelAnswer:
          'A DNS issue is about finding the right address for a name. A gateway-path issue is about getting traffic out beyond the local network after the address is already known.',
        commonMistakes: ['Describing both as simply "internet down"', 'Mixing gateway and DNS into one job'],
        dcsContext: 'Clear language helps Paul or a Level 2 tech know where to look next.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        rubric: ['Separates name resolution from routing', 'Uses plain English', 'Links to diagnosis value'],
        keywordHints: ['names', 'address', 'route']
      }),
      orderSteps({
        id: 'dns-q3',
        prompt: 'Order a safe first-line response for "Wi-Fi connected, but room has no internet."',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'stretch',
        explanation: 'Scope and comparison beat random resets.',
        modelAnswer:
          'Clarify whether it is one device or many, confirm the correct network, compare with a known-good device, then gather evidence for escalation if the pattern stays broad.',
        commonMistakes: ['Resetting many settings before checking scope', 'Skipping room comparison'],
        dcsContext: 'Room-based symptoms often hinge on scope.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        steps: [
          { id: 'scope', label: 'Clarify one device or many' },
          { id: 'ssid', label: 'Confirm the correct network is selected' },
          { id: 'compare', label: 'Compare with another device in the same space' },
          { id: 'escalate', label: 'Escalate with room and symptom evidence if needed' }
        ],
        correctOrder: ['scope', 'ssid', 'compare', 'escalate'],
        rubric: ['Scope first', 'Safe checks only', 'Evidence-rich escalation']
      }),
      scenarioResponse({
        id: 'dns-q4',
        prompt: 'A trolley laptop has Wi-Fi on, but pages will not load. Describe how you would explain the likely branches of failure without overclaiming certainty.',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'challenge',
        explanation: 'Support confidence should be honest, not inflated.',
        modelAnswer:
          'Explain that the failure could be address leasing, name resolution, or path/routing. Confirm the right SSID, check whether it received a valid address, compare with a nearby device, and escalate with the observed branch rather than guessing the root cause.',
        commonMistakes: ['Claiming a root cause too early', 'Using vague phrases like "network thing"'],
        dcsContext: 'Trolley devices can pick up stale states after moving between rooms and chargers.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        rubric: ['Names the main branches', 'Avoids false certainty', 'Uses safe checks']
      }),
      mcq({
        id: 'dns-q5',
        prompt:
          'A laptop shows full Wi-Fi bars but cannot obtain a school DHCP lease after SSID confusion yesterday. What is the safest next framing?',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'stretch',
        explanation: 'Treat onboarding drift explicitly.',
        modelAnswer:
          'Confirm they are on the intended SSID, validate lease presence versus APIPA, consider policy-safe forget/rejoin after documenting scope, and compare another device.',
        commonMistakes: ['Assuming strong bars proves fully working network config'],
        dcsContext: 'SSID confusion is a recurring trolley theme.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        options: [
          { id: 'a', label: 'Bars prove DHCP must be fine—blame applications only' },
          { id: 'b', label: 'Treat SSID/lease onboarding drift as plausible and confirm with compares + lease checks' },
          { id: 'c', label: 'Rename Wi-Fi SSIDs yourself' },
          { id: 'd', label: 'Disable DHCP globally for maintenance humor' }
        ],
        correctOptionId: 'b'
      }),
      explainItSimply({
        id: 'dns-q6',
        prompt: 'Explain to a teacher why their laptop “shows Wi-Fi” but sites fail.',
        domain: 'DNS, DHCP, gateway basics',
        difficulty: 'foundation',
        explanation: 'Plain layering reduces confusion.',
        modelAnswer:
          'Wi-Fi bars mainly say you reached wireless; you still need a valid lease, working DNS, and gateway reachability—each layer can fail independently.',
        commonMistakes: [],
        dcsContext: 'Teachers appreciate metaphors over RFC lectures.',
        reviewSchedule,
        recommendedModuleId: 'dns-dhcp-gateway-ip-basics',
        weakTopic: 'dns-dhcp-gateway',
        rubric: ['States bars ≠ full path', 'Names another layer'],
        keywordHints: ['lease', 'DNS', 'gateway']
      })
    ],
    scenarioPrompts: [
      {
        id: 'dns-s1',
        title: '169.254 on a student laptop',
        prompt: 'Convert an APIPA symptom into a clear escalation note.'
      }
    ],
    practicalOutputs: [
      {
        id: 'dns-p1',
        title: 'Troubleshooting decision tree',
        description: 'Write a one-page decision tree for DNS, DHCP, and gateway-style classroom internet faults.'
      }
    ]
  },
  {
    id: 'printer-troubleshooting',
    title: 'Printer Troubleshooting',
    description:
      'A symptom-to-cause mental map for queues, jams, toner, wrong printers, and safe escalation from the classroom or library desk.',
    domain: 'Endpoint Support',
    level: 'L1',
    estimatedMinutes: 18,
    tags: ['printers', 'queues', 'toner', 'library desk'],
    learningObjectives: [
      'Separate queue issues, device issues, and user-targeting mistakes.',
      'Use a clean symptom-to-cause pattern before escalating printer faults.',
      'Write printer notes that help the next tech move immediately.'
    ],
    dcsRelevance: [
      'Printers are frequent school friction points and can block class momentum fast.',
      'The library desk often becomes the first support contact for print confusion.',
      'Good symptom notes save wasted backtracking across rooms.'
    ],
    sections: [
      {
        id: 'printer-1',
        title: 'Three broad printer fault buckets',
        bodyMarkdown: `Most printer pain lands in one of three buckets: the user sent the job to the wrong place, the queue or spool path is stuck, or the device itself has a hardware or consumable issue.\n\nStart there before chasing rare causes.`
      },
      {
        id: 'printer-2',
        title: 'What the symptom is trying to tell you',
        bodyMarkdown: `No print at all often points to wrong target, queue, offline status, or a broad service path. Smudging, rubbing off, or faint output points more toward toner, drum, paper, or fuser-style issues.\n\nDifferent symptoms deserve different escalation language.`
      },
      {
        id: 'printer-3',
        title: 'Printer fixes with boundaries',
        bodyMarkdown: `Safe Level 1 work includes confirming the correct printer, checking the queue, checking paper and obvious jams, and comparing whether other users are affected.\n\nDo not improvise deep driver surgery or device-admin changes if the environment belongs to someone else.`
      },
      {
        id: 'printer-4',
        title: 'PaperCut-style release, photocopiers, and service calls',
        bodyMarkdown: `Many fleets need authentication or release steps before jobs leave the queue—confirm the user signed in or released on the panel.\n\nPhotocopiers add finishing trays, staple jams, and thermal faults that differ from small desktop lasers.\n\nWhen symptoms persist after queue/device basics, capture counters and error codes for vendor service rather than improvising hardware repairs.`
      }
    ],
    flashcards: [
      { id: 'printer-f1', front: 'What are the three broad printer fault buckets?', back: 'Wrong target, queue/spool path, or device/consumable fault.' },
      { id: 'printer-f2', front: 'A job never prints. What is the first check?', back: 'Confirm the correct printer and queue state.' },
      { id: 'printer-f3', front: 'What kind of symptom points toward consumables or hardware quality?', back: 'Faint print, rubbing off toner, smudging, or streaking.' },
      { id: 'printer-f4', front: 'Why does scope matter on a printer call?', back: 'It tells you whether the issue is one user, one queue, or the whole device.' },
      { id: 'printer-f5', front: 'What should a good printer escalation note include?', back: 'Printer location, exact symptom, who is affected, and steps already tried.' },
      { id: 'printer-f6', front: 'What is a safe Level 1 printer action?', back: 'Check queue, paper, jam, offline state, or wrong printer selection.' },
      { id: 'printer-f7', front: 'What should Josh avoid on a shared school printer without approval?', back: 'Deep admin changes or risky device reconfiguration.' },
      { id: 'printer-f8', front: 'Why is "printer broken" a weak note?', back: "It hides the symptom pattern and wastes the next technician's time." },
      { id: 'printer-f9', front: 'Why confirm pull-print release?', back: 'Jobs can sit waiting for authentication or swipe steps before reaching the device.' },
      { id: 'printer-f10', front: 'Queue vs device symptom?', back: 'Queue stuck often prints nowhere; device faults often repeat locally after clearing queue.' }
    ],
    quiz: [
      mcq({
        id: 'printer-q1',
        prompt: 'A teacher says a document printed to the wrong room. What is the most likely first explanation?',
        domain: 'Printer troubleshooting',
        difficulty: 'foundation',
        explanation: 'Start with the simple targeting mistake before bigger causes.',
        modelAnswer:
          'The document likely went to the wrong selected printer or queue. Confirm the print target before treating it as a device failure.',
        commonMistakes: ['Jumping straight to hardware failure', 'Ignoring user target selection'],
        dcsContext: 'Shared school printers create easy targeting mistakes.',
        reviewSchedule,
        recommendedModuleId: 'printer-troubleshooting',
        weakTopic: 'printer-symptoms',
        options: [
          { id: 'a', label: 'The printer is online but a device-side paper-size mismatch is blocking output' },
          { id: 'b', label: 'The wrong printer or queue was selected' },
          { id: 'c', label: 'The job is waiting in a held or offline queue rather than reaching the printer' },
          { id: 'd', label: 'The printer may need release or authentication steps before output starts' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'printer-q2',
        prompt: 'What details would make a printer escalation note genuinely useful?',
        domain: 'Printer troubleshooting',
        difficulty: 'stretch',
        explanation: 'The next tech needs symptom, scope, and evidence.',
        modelAnswer:
          'Name the printer and location, exact symptom, whether the issue affects one user or many, any queue or device message, and the safe checks already completed.',
        commonMistakes: ['Leaving out scope', 'Leaving out location', 'Not saying what was already tried'],
        dcsContext: 'Room and device detail matters in a school with many similar printers.',
        reviewSchedule,
        recommendedModuleId: 'printer-troubleshooting',
        weakTopic: 'ticket-quality',
        rubric: ['Includes location and scope', 'Names the symptom', 'Captures steps tried'],
        keywordHints: ['location', 'scope', 'queue', 'steps tried']
      }),
      orderSteps({
        id: 'printer-q3',
        prompt: 'Put this Level 1 printer flow in the best order.',
        domain: 'Printer troubleshooting',
        difficulty: 'stretch',
        explanation: 'Work from simplest and safest to most informative.',
        modelAnswer:
          'Confirm the right printer first, inspect queue and offline status second, check device basics third, then escalate if the symptom remains or affects more users.',
        commonMistakes: ['Opening with risky reconfiguration', 'Checking consumables before confirming the target'],
        dcsContext: 'Most school print issues are simpler than they first sound.',
        reviewSchedule,
        recommendedModuleId: 'printer-troubleshooting',
        weakTopic: 'printer-symptoms',
        steps: [
          { id: 'target', label: 'Confirm the correct printer was selected' },
          { id: 'queue', label: 'Check the queue and offline state' },
          { id: 'device', label: 'Check paper, jams, and visible device errors' },
          { id: 'escalate', label: 'Escalate with symptom and scope if needed' }
        ],
        correctOrder: ['target', 'queue', 'device', 'escalate'],
        rubric: ['Starts with the likely cause', 'Uses reversible checks', 'Escalates with evidence']
      }),
      scenarioResponse({
        id: 'printer-q4',
        prompt: 'A laser print rubs off the page when touched. Explain how you would describe that symptom and why it points beyond a simple wrong-printer issue.',
        domain: 'Printer troubleshooting',
        difficulty: 'challenge',
        explanation: "The symptom pattern matters more than the user's frustration language.",
        modelAnswer:
          'Describe it as a print-quality fault where toner is not bonding correctly, which points more toward consumables or hardware process issues than queue targeting. Note location, stock used, and whether the symptom appears on all jobs.',
        commonMistakes: ['Calling it a queue issue', 'Not describing the symptom precisely'],
        dcsContext: 'Precise print-quality language helps the right follow-up happen faster.',
        reviewSchedule,
        recommendedModuleId: 'printer-troubleshooting',
        weakTopic: 'printer-symptoms',
        rubric: ['Names the quality symptom', 'Separates it from queue issues', 'Captures evidence for escalation']
      }),
      mcq({
        id: 'printer-q5',
        prompt: 'Jobs reach “Printed” in the queue but nothing emerges at the copier used with Follow-Me printing.',
        domain: 'Printer troubleshooting',
        difficulty: 'stretch',
        explanation: 'Authentication/release layers matter.',
        modelAnswer:
          'Suspect release/authentication at the device panel before assuming hardware failure—confirm signed-in session or pull-print steps.',
        commonMistakes: ['Immediately blaming drivers'],
        dcsContext: 'School Follow-Me queues behave differently than direct printers.',
        reviewSchedule,
        recommendedModuleId: 'printer-troubleshooting',
        weakTopic: 'printer-symptoms',
        options: [
          { id: 'a', label: 'Replace Windows entirely' },
          { id: 'b', label: 'Verify Follow-Me release/sign-in steps at the physical device' },
          { id: 'c', label: 'Delete every printer mapping silently' },
          { id: 'd', label: 'Assume paper jam without looking' }
        ],
        correctOptionId: 'b'
      }),
      scenarioResponse({
        id: 'printer-q6',
        prompt:
          'Photocopier shows recurring fuser errors after clearing jams. What is the Level 1 posture and note content for a vendor call?',
        domain: 'Printer troubleshooting',
        difficulty: 'challenge',
        explanation: 'Hardware faults belong to trained maintainers.',
        modelAnswer:
          'Stop DIY disassembly, capture exact code, asset ID, counters, recent media types, and escalation urgency—hand to authorised service channel.',
        commonMistakes: ['Opening heated assemblies'],
        dcsContext: 'Safety and warranty matter.',
        reviewSchedule,
        recommendedModuleId: 'printer-troubleshooting',
        weakTopic: 'printer-symptoms',
        rubric: ['Avoids unsafe repair', 'Captures vendor-ready evidence']
      })
    ],
    scenarioPrompts: [
      {
        id: 'printer-s1',
        title: 'Queue stuck or device fault?',
        prompt: 'Determine whether the problem relates to user targeting, the print path, or the printer itself.'
      }
    ],
    practicalOutputs: [
      {
        id: 'printer-p1',
        title: 'Printer symptom table',
        description: 'Build a symptom-to-cause table for common school printer issues and safe first checks.'
      }
    ]
  },
  {
    id: 'classroom-display-viewboard-troubleshooting',
    title: 'Classroom Display and ViewBoard Troubleshooting',
    description:
      'A classroom-safe flow for no picture, no audio, and no touch when teachers need the room back quickly.',
    domain: 'Endpoint Support',
    level: 'L1',
    estimatedMinutes: 18,
    tags: ['ViewBoard', 'display', 'HDMI', 'classroom'],
    learningObjectives: [
      'Work the display chain in a structured order: source, cable, adapter, input, touch, audio.',
      'Separate "no picture" from "no touch" and "no audio" symptoms.',
      'Know when to stop fiddling and escalate because class time is being burned.'
    ],
    dcsRelevance: [
      'One blocked classroom can create immediate pressure and visible frustration.',
      'ViewBoard issues are resolved more effectively with structured sequencing than ad hoc changes.',
      'A short display checklist can reduce disruption at the front of the room.'
    ],
    sections: [
      {
        id: 'viewboard-1',
        title: 'Think in links, not magic',
        bodyMarkdown: `A classroom display path usually has several links: the source device, a cable or dock, the display input, and sometimes a separate USB path for touch.\n\nThe symptom often tells you which link is failing if you resist random swapping.`
      },
      {
        id: 'viewboard-2',
        title: 'No picture, no audio, no touch are different problems',
        bodyMarkdown: `No picture usually points toward input, cable, dock, power, or source output. No touch often points toward the USB or control path. HDMI video with no audio can be the wrong playback device or a display-side audio path issue.\n\nUse the symptom to narrow the path.`
      },
      {
        id: 'viewboard-3',
        title: 'Class time changes the threshold',
        bodyMarkdown: `In a classroom, speed and clarity matter. Try the safest short sequence, explain what you are checking, and stop once the class is losing too much time.\n\nA tidy escalation is better than a long public experiment.`
      },
      {
        id: 'viewboard-4',
        title: 'Projector modes, calibration, and thermal clues',
        bodyMarkdown: `Windows display modes (duplicate/extend) change expectations—confirm teachers extend intentionally.\n\nInteractive boards may need driver-aware calibration checks when touch misaligns.\n\nProjectors may show lamp-hour warnings or overheating shutdown patterns—capture indicator behaviour rather than guessing bulb life.\n\nEscalate lamp or thermal replacements through authorised AV workflows instead of improvising hardware swaps mid-lesson.`
      }
    ],
    flashcards: [
      { id: 'viewboard-f1', front: 'What is the first mental model for a ViewBoard fault?', back: 'Treat it as a chain of links: source, cable or dock, input, and control paths.' },
      { id: 'viewboard-f2', front: 'What symptom usually points to the USB path rather than video?', back: 'No touch or inking.' },
      { id: 'viewboard-f3', front: 'What does HDMI picture but no audio often suggest?', back: 'The wrong playback device or a display audio-path issue.' },
      { id: 'viewboard-f4', front: 'Why should Josh avoid a long public experiment?', back: 'Class time is being lost and the risk of confusion rises.' },
      { id: 'viewboard-f5', front: 'What is a safe first display check?', back: 'Confirm power, correct input, and cable or dock seating.' },
      { id: 'viewboard-f6', front: 'What should a display escalation note include?', back: 'Room, source device type, exact symptom, steps tried, and classroom impact.' },
      { id: 'viewboard-f7', front: 'Why separate no picture from no touch?', back: 'Because they often live on different parts of the chain.' },
      { id: 'viewboard-f8', front: 'What does a known-good cable or source help prove?', back: 'Which part of the display chain is likely failing.' },
      { id: 'viewboard-f9', front: 'Why confirm duplicate vs extend?', back: 'Teachers may present on the wrong virtual desktop expecting mirrored ink.' },
      { id: 'viewboard-f10', front: 'Thermal/lamp symptom?', back: 'Unexpected shutdowns or warning LEDs belong in escalation notes for AV maintainers.' }
    ],
    quiz: [
      mcq({
        id: 'viewboard-q1',
        prompt: 'The laptop is on, but nothing appears on the ViewBoard. What is the best first check?',
        domain: 'Classroom display troubleshooting',
        difficulty: 'foundation',
        explanation: 'Start with the visible links in the chain.',
        modelAnswer:
          'Check power, the selected input, and whether the cable or dock is seated correctly before going deeper.',
        commonMistakes: ['Installing software immediately', 'Changing many settings before checking the chain'],
        dcsContext: 'Classroom display issues reward fast visible checks first.',
        reviewSchedule,
        recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
        weakTopic: 'ticket-quality',
        options: [
          { id: 'a', label: 'Check input and cable or dock seating first' },
          { id: 'b', label: 'Change Windows display settings before confirming the board input and cable path' },
          { id: 'c', label: 'Replace the dock immediately before ruling out source or mode selection issues' },
          { id: 'd', label: 'Escalate as a board failure before testing a known-good source or cable' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'viewboard-q2',
        prompt: 'Why is "no touch" a different troubleshooting path from "no picture"?',
        domain: 'Classroom display troubleshooting',
        difficulty: 'stretch',
        explanation: 'The control path is often separate from the display path.',
        modelAnswer:
          'No picture usually points to source, cable, power, or selected input. No touch often points to a separate USB or control path even when video is already working.',
        commonMistakes: ['Treating all display symptoms as one issue', 'Ignoring the USB or control path'],
        dcsContext: 'ViewBoards commonly split video and touch into different links.',
        reviewSchedule,
        recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
        weakTopic: 'ticket-quality',
        rubric: ['Separates video and control paths', 'Uses symptom-based reasoning', 'Shows practical value'],
        keywordHints: ['video', 'USB', 'input', 'control']
      }),
      orderSteps({
        id: 'viewboard-q3',
        prompt: 'Order the safest classroom display response when time is tight.',
        domain: 'Classroom display troubleshooting',
        difficulty: 'stretch',
        explanation: 'Short, visible checks first. Escalation before chaos.',
        modelAnswer:
          'Clarify the symptom, check the visible chain, compare with a known-good cable or source if available, then escalate with a short note if the class remains blocked.',
        commonMistakes: ['Skipping clarification', 'Staying too long without progress'],
        dcsContext: 'Class time adds urgency even when the issue feels simple.',
        reviewSchedule,
        recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
        weakTopic: 'ticket-quality',
        steps: [
          { id: 'clarify', label: 'Clarify whether the issue is picture, touch, or audio' },
          { id: 'visible', label: 'Check the visible chain: power, input, cable or dock' },
          { id: 'compare', label: 'Try a known-good cable or source if it is quick and safe' },
          { id: 'escalate', label: 'Escalate once class impact stays high' }
        ],
        correctOrder: ['clarify', 'visible', 'compare', 'escalate'],
        rubric: ['Clarifies the symptom', 'Starts with visible checks', 'Protects class time']
      }),
      scenarioResponse({
        id: 'viewboard-q4',
        prompt: 'A teacher says the display is working but there is no audio over HDMI. Describe your next reasoning steps and the risk trade-off.',
        domain: 'Classroom display troubleshooting',
        difficulty: 'challenge',
        explanation: 'The right answer separates symptom branches and protects class time.',
        modelAnswer:
          'Treat it as an audio-path issue rather than a total display failure. Check the selected playback device and the display-side audio path if that is a safe visible check. If class time is being burned, document what works, what does not, and escalate.',
        commonMistakes: ['Re-running the whole display sequence as if there is no picture', 'Spending too long in front of the class'],
        dcsContext: 'Different symptoms on the same cable path still deserve different reasoning.',
        reviewSchedule,
        recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
        weakTopic: 'ticket-quality',
        rubric: ['Separates the symptom correctly', 'Keeps the response short', 'Explains when to escalate']
      }),
      mcq({
        id: 'viewboard-q5',
        prompt: 'Touch registers inches away from the pen tip after cable swaps.',
        domain: 'Classroom display troubleshooting',
        difficulty: 'stretch',
        explanation: 'Calibration/control path.',
        modelAnswer: 'Treat as calibration or USB/control instability—not HDMI swapping endlessly.',
        commonMistakes: [],
        dcsContext: 'Mis-touch wastes lesson credibility.',
        reviewSchedule,
        recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
        weakTopic: 'ticket-quality',
        options: [
          { id: 'a', label: 'Ignore—it will self-heal magically' },
          { id: 'b', label: 'Escalate AV/interactive calibration pathway with reproduction detail' },
          { id: 'c', label: 'Apply permanent marker calibration jokes' },
          { id: 'd', label: 'Disable touch permanently without approval' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'viewboard-q6',
        prompt: 'Two checks specific to projector thermal shutdown rumours.',
        domain: 'Classroom display troubleshooting',
        difficulty: 'stretch',
        explanation: 'Evidence-based AV escalation.',
        modelAnswer:
          'Capture LED/error codes, whether cooldown restores temporarily, intake obstruction clues, and recent filter cleaning history if known.',
        commonMistakes: [],
        dcsContext: 'Fans/filters matter in dusty classrooms.',
        reviewSchedule,
        recommendedModuleId: 'classroom-display-viewboard-troubleshooting',
        weakTopic: 'ticket-quality',
        rubric: ['Thermal evidence'],
        keywordHints: ['cooldown', 'filter', 'LED']
      })
    ],
    scenarioPrompts: [
      {
        id: 'viewboard-s1',
        title: 'No display on a ViewBoard',
        prompt: 'Work through a front-of-class troubleshooting sequence that preserves class time and evidence.'
      }
    ],
    practicalOutputs: [
      {
        id: 'viewboard-p1',
        title: 'Classroom display quick-check flow',
        description: 'Draft a short front-of-class troubleshooting flow for picture, touch, and audio issues.'
      }
    ]
  },
  {
    id: 'm365-identity-offboarding-basics',
    title: 'M365 Identity and Offboarding Basics',
    description:
      'High-level identity and offboarding thinking for DCS: what should happen, why sequencing matters, and where Level 1 must escalate.',
    domain: 'Identity and Access',
    level: 'L1',
    estimatedMinutes: 20,
    tags: ['M365', 'Entra', 'Teams', 'offboarding'],
    learningObjectives: [
      'Describe offboarding as a sequence, not a single click.',
      'Recognise why accounts can appear active in Teams after other changes.',
      'Understand which parts Josh can document versus which parts need authority.'
    ],
    dcsRelevance: [
      'Staff departure tasks carry obvious privacy and security risk.',
      'M365 lag and identity sequencing easily confuse new support staff.',
      'Good documentation protects the school and the departing staff member.'
    ],
    sections: [
      {
        id: 'offboarding-1',
        title: 'Offboarding is a sequence',
        bodyMarkdown: `Think in order, not in single actions. There may be account disablement, session sign-out, group or role cleanup, device handling, mailbox or file decisions, and communication with leaders.\n\nJosh does not need production authority to understand the logic. He needs enough understanding to document safely and escalate accurately.`
      },
      {
        id: 'offboarding-2',
        title: 'Why "still active in Teams" happens',
        bodyMarkdown: `Different Microsoft services do not always reflect changes instantly. A user can appear visible in one service while another change has already occurred.\n\nThat does not automatically mean the offboarding failed. It does mean the sequence and evidence matter.`
      },
      {
        id: 'offboarding-3',
        title: 'The Level 1 posture',
        bodyMarkdown: `Level 1 should gather the facts, confirm the business need, note the current symptom, and hand off cleanly.\n\nNever treat identity actions as casual tasks. Poor sequencing can create privacy, access, and continuity problems.`
      }
    ],
    flashcards: [
      { id: 'offboarding-f1', front: 'Why is offboarding not a single action?', back: 'Because accounts, sessions, roles, devices, and data each have different effects and timing.' },
      { id: 'offboarding-f2', front: 'What should Josh avoid during offboarding practice?', back: 'Pretending he has authority to make production identity changes.' },
      { id: 'offboarding-f3', front: 'Why might a former staff member still appear in Teams?', back: 'Service state can lag behind other identity changes.' },
      { id: 'offboarding-f4', front: "What is Josh's safe role in offboarding?", back: 'Gather facts, document clearly, and escalate to authorised staff.' },
      { id: 'offboarding-f5', front: 'Why does sequencing matter in offboarding?', back: 'The wrong order can leave access, privacy, or continuity gaps.' },
      { id: 'offboarding-f6', front: 'What kind of detail belongs in an offboarding note?', back: 'Requested change, current symptom, urgency, and any visible account state.' },
      { id: 'offboarding-f7', front: 'What is the risk of vague wording like "delete the account"?', back: 'It hides the actual business need and can cause unsafe actions.' },
      { id: 'offboarding-f8', front: 'What should a good Level 1 question ask first?', back: 'What is the requested outcome and who has approved it?' }
    ],
    quiz: [
      mcq({
        id: 'offboarding-q1',
        prompt: 'A former staff member still appears active in Teams after a departure process started. What is the safest first interpretation?',
        domain: 'M365 offboarding',
        difficulty: 'foundation',
        explanation: 'Visibility lag is possible.',
        modelAnswer:
          'It may reflect service lag or incomplete sequencing, so document the current symptom and escalate to the authorised owner rather than assuming the whole process failed.',
        commonMistakes: ['Assuming Josh should immediately delete more objects', 'Treating one service view as the whole truth'],
        dcsContext: 'Identity systems often update at different speeds.',
        reviewSchedule,
        recommendedModuleId: 'm365-identity-offboarding-basics',
        weakTopic: 'offboarding-sequence',
        options: [
          { id: 'a', label: 'It usually means the account is still fully active everywhere' },
          { id: 'b', label: 'It may be service lag or sequencing, so document and escalate' },
          { id: 'c', label: 'Josh should remove every visible group membership himself before checking the authorised process' },
          { id: 'd', label: 'It is probably only a Teams cache issue, so there is no need to log or escalate it' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'offboarding-q2',
        prompt: 'Explain why offboarding needs sequencing rather than random identity actions.',
        domain: 'M365 offboarding',
        difficulty: 'stretch',
        explanation: 'Access, continuity, and privacy depend on order.',
        modelAnswer:
          'Offboarding affects access, sessions, group membership, devices, shared ownership, and data continuity. Sequencing matters so access is removed safely without losing evidence, ownership, or operational continuity.',
        commonMistakes: ['Reducing offboarding to one account disable step', 'Ignoring continuity and data considerations'],
        dcsContext: 'School staff accounts touch teaching tools, Teams, files, and devices.',
        reviewSchedule,
        recommendedModuleId: 'm365-identity-offboarding-basics',
        weakTopic: 'offboarding-sequence',
        rubric: ['Mentions multiple moving parts', 'Explains why order matters', 'Shows security and continuity judgement'],
        keywordHints: ['access', 'sessions', 'data', 'ownership']
      }),
      orderSteps({
        id: 'offboarding-q3',
        prompt: 'Order the safest Level 1 response to a departure-related identity concern.',
        domain: 'M365 offboarding',
        difficulty: 'stretch',
        explanation: 'Fact gathering comes before action claims.',
        modelAnswer:
          'Confirm the request and approval, capture the exact current symptom, note any business urgency, then escalate to the authorised owner with clear documentation.',
        commonMistakes: ['Acting before confirming approval', 'Skipping the current-state note'],
        dcsContext: 'Identity work should be deliberate and traceable.',
        reviewSchedule,
        recommendedModuleId: 'm365-identity-offboarding-basics',
        weakTopic: 'offboarding-sequence',
        steps: [
          { id: 'confirm', label: 'Confirm the requested outcome and authority' },
          { id: 'capture', label: 'Capture the exact visible symptom or account state' },
          { id: 'urgency', label: 'Note timing or risk urgency' },
          { id: 'escalate', label: 'Escalate with the documented sequence concern' }
        ],
        correctOrder: ['confirm', 'capture', 'urgency', 'escalate'],
        rubric: ['Checks authority', 'Documents current state', 'Escalates cleanly']
      }),
      scenarioResponse({
        id: 'offboarding-q4',
        prompt: 'Write the reasoning Josh should use when asked to "just switch everything off" for a departing staff member.',
        domain: 'M365 offboarding',
        difficulty: 'challenge',
        explanation: 'The business outcome matters more than the emotional wording.',
        modelAnswer:
          'Slow the request into a clear outcome: what access must stop, what ownership or continuity must be preserved, what has been approved, and who owns the change. The safe response is to document and escalate rather than acting on a vague broad instruction.',
        commonMistakes: ['Treating a vague request as a safe task', 'Ignoring ownership and continuity'],
        dcsContext: 'Departure requests often arrive with urgency and emotion.',
        reviewSchedule,
        recommendedModuleId: 'm365-identity-offboarding-basics',
        weakTopic: 'security-risk-judgement',
        rubric: ['Clarifies the business need', 'Names the risks', 'Stays inside Level 1 authority']
      })
    ],
    scenarioPrompts: [
      {
        id: 'offboarding-s1',
        title: 'Former staff still in Teams',
        prompt: 'Write a clear note when service visibility and offboarding status appear out of sync.'
      }
    ],
    practicalOutputs: [
      {
        id: 'offboarding-p1',
        title: 'Safe offboarding checklist',
        description: 'Write a high-level checklist that explains sequence and boundaries without implying production authority.'
      }
    ]
  },
  {
    id: 'mdm-intune-group-policy-concepts',
    title: 'MDM, Intune, and Group Policy Concepts',
    description:
      'Understand what cloud device management does, what classic policy does, and how school devices can sit across both worlds.',
    domain: 'Identity and Access',
    level: 'L2',
    estimatedMinutes: 20,
    tags: ['MDM', 'Intune', 'Group Policy', 'device management'],
    learningObjectives: [
      'Explain the difference between MDM-style management and traditional Group Policy.',
      'Map each concept to school device examples like staff laptops and iPads.',
      'Recognise why policy behaviour can differ across joined, enrolled, and unmanaged devices.'
    ],
    dcsRelevance: [
      'Clarifies why staff laptops, iPads, and shared devices behave differently.',
      'Supports safer conversations about configuration, compliance, and device ownership.',
      'Builds a bridge from endpoint support into modern management thinking.'
    ],
    sections: [
      {
        id: 'mdm-1',
        title: 'MDM versus Group Policy in plain English',
        bodyMarkdown: `Group Policy is the classic domain-driven policy approach for joined Windows environments. MDM is modern device management that can push settings, apps, and compliance through a cloud-management layer such as Intune.\n\nBoth aim to control and support devices, but they reach them differently.`
      },
      {
        id: 'mdm-2',
        title: 'Why school fleets are mixed',
        bodyMarkdown: `A school may have Windows laptops, iPads, shared classroom devices, and staff devices all under different management paths.\n\nThat is why one fix or policy idea does not automatically apply everywhere.`
      },
      {
        id: 'mdm-3',
        title: 'Level 1 value without pretending admin access',
        bodyMarkdown: `Josh does not need tenant-level control to benefit from these concepts.\n\nHe needs enough understanding to explain why a managed iPad, a staff laptop, and a domain-shaped Windows device may behave differently, and to escalate using the right language.`
      }
    ],
    flashcards: [
      { id: 'mdm-f1', front: 'What is the plain-English goal of MDM?', back: 'Manage devices, settings, apps, and compliance through a modern management layer.' },
      { id: 'mdm-f2', front: 'What is Group Policy best associated with?', back: 'Traditional domain-driven Windows policy management.' },
      { id: 'mdm-f3', front: 'Why might an iPad and a staff laptop behave differently?', back: 'They may sit under very different management models and policies.' },
      { id: 'mdm-f4', front: 'What is a key Level 1 benefit of understanding MDM and GPO?', back: 'Better diagnosis language and cleaner escalation.' },
      { id: 'mdm-f5', front: 'Does policy behavior stay identical across all device types?', back: 'No. Device ownership and management paths change the result.' },
      { id: 'mdm-f6', front: 'Why is "just change the setting" weak thinking?', back: 'Because the setting may be centrally enforced by policy or management.' },
      { id: 'mdm-f7', front: 'What kind of devices often use MDM thinking strongly?', back: 'Cloud-managed laptops, mobiles, and tablets.' },
      { id: 'mdm-f8', front: 'What should Josh avoid assuming about a device?', back: 'That he personally owns its management path or policy authority.' }
    ],
    quiz: [
      mcq({
        id: 'mdm-q1',
        prompt: 'Which statement best separates MDM from Group Policy?',
        domain: 'MDM and Group Policy',
        difficulty: 'foundation',
        explanation: 'They overlap in purpose but differ in management path.',
        modelAnswer:
          'MDM commonly manages devices through a modern cloud layer, while Group Policy is the traditional domain-driven policy approach for Windows environments.',
        commonMistakes: ['Treating them as identical', 'Assuming one fully replaces all policy models everywhere'],
        dcsContext: 'School fleets often mix both concepts.',
        reviewSchedule,
        recommendedModuleId: 'mdm-intune-group-policy-concepts',
        weakTopic: 'mdm-group-policy',
        options: [
          { id: 'a', label: 'They are exactly the same thing with different branding' },
          { id: 'b', label: 'MDM is cloud-style management; Group Policy is classic domain policy' },
          { id: 'c', label: 'Group Policy mainly manages iPads, while MDM mainly manages on-prem Windows login scripts' },
          { id: 'd', label: 'MDM can only report device status and cannot enforce settings or restrictions' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'mdm-q2',
        prompt: 'Why might a staff laptop and an iPad respond differently to the same configuration request?',
        domain: 'MDM and Group Policy',
        difficulty: 'stretch',
        explanation: 'Management path shapes what settings can be applied and how.',
        modelAnswer:
          'They may be different platforms under different management layers, compliance rules, and policy engines. The same request may need a different path or may not even belong to the same toolset.',
        commonMistakes: ['Assuming all devices share one control plane', 'Ignoring platform differences'],
        dcsContext: 'School fleets are often mixed and layered.',
        reviewSchedule,
        recommendedModuleId: 'mdm-intune-group-policy-concepts',
        weakTopic: 'mdm-group-policy',
        rubric: ['Names management differences', 'Mentions platform differences', 'Explains why the response path changes'],
        keywordHints: ['platform', 'policy', 'management']
      }),
      orderSteps({
        id: 'mdm-q3',
        prompt: 'Order the right thinking when a device setting "keeps changing back."',
        domain: 'MDM and Group Policy',
        difficulty: 'stretch',
        explanation: 'Central policy is a more likely explanation than user stubbornness.',
        modelAnswer:
          'Confirm the exact setting and device type, consider whether policy is enforcing the state, gather evidence of the behavior, then escalate through the correct management path.',
        commonMistakes: ['Reapplying the setting repeatedly without questioning policy', 'Ignoring device type'],
        dcsContext: 'Managed school devices often revert settings for a reason.',
        reviewSchedule,
        recommendedModuleId: 'mdm-intune-group-policy-concepts',
        weakTopic: 'mdm-group-policy',
        steps: [
          { id: 'device', label: 'Confirm the exact device type and setting' },
          { id: 'policy', label: 'Consider whether central policy is enforcing it' },
          { id: 'evidence', label: 'Gather evidence of the revert behavior' },
          { id: 'escalate', label: 'Escalate through the right management path' }
        ],
        correctOrder: ['device', 'policy', 'evidence', 'escalate'],
        rubric: ['Starts with device type', 'Considers central policy', 'Escalates correctly']
      }),
      scenarioResponse({
        id: 'mdm-q4',
        prompt: 'A user asks Josh to change a restricted setting on a school laptop because "it works on my home PC." Explain the safer response.',
        domain: 'MDM and Group Policy',
        difficulty: 'challenge',
        explanation: 'School management context matters more than what works at home.',
        modelAnswer:
          'Explain that school devices may be centrally managed by policy and compliance requirements, so a home-PC comparison does not prove the request is safe or allowed. Capture the business need and escalate through the authorised management path.',
        commonMistakes: ['Promising a quick manual workaround', 'Treating the home example as a valid permission signal'],
        dcsContext: 'School-managed devices carry different risk and compliance expectations.',
        reviewSchedule,
        recommendedModuleId: 'mdm-intune-group-policy-concepts',
        weakTopic: 'security-risk-judgement',
        rubric: ['Names management context', 'Declines unsafe workaround', 'Captures the real need']
      })
    ],
    scenarioPrompts: [
      {
        id: 'mdm-s1',
        title: 'Policy keeps changing it back',
        prompt: 'Identify when a centrally managed setting is the likely cause rather than local user error.'
      }
    ],
    practicalOutputs: [
      {
        id: 'mdm-p1',
        title: 'MDM versus Group Policy explainer',
        description: "Write a plain-English comparison for Josh's own revision notes with school device examples."
      }
    ]
  },
  {
    id: 'vlans-network-segmentation',
    title: 'VLANs and Network Segmentation',
    description:
      'Understand why a school network deliberately separates traffic and how to talk about allow or block decisions without overpromising access.',
    domain: 'Networking',
    level: 'L2',
    estimatedMinutes: 18,
    tags: ['VLAN', 'segmentation', 'guest Wi-Fi', 'allow/block'],
    learningObjectives: [
      'Describe a VLAN as a traffic-separation tool rather than an abstract exam term.',
      'Explain why guest, student, staff, and device networks may need different access.',
      'Use plain-English allow or block thinking in escalation notes.'
    ],
    dcsRelevance: [
      'Schools need safe separation between guest access and internal devices.',
      'Segmentation explains why printers, TVs, or admin services may be unreachable by design.',
      'Helps Josh avoid promising access that should stay blocked.'
    ],
    sections: [
      {
        id: 'vlan-1',
        title: 'What segmentation is trying to protect',
        bodyMarkdown: `Segmentation separates traffic so not every device can talk to every other device.\n\nIn a school, that matters for guest Wi-Fi, internal services, shared printers, staff resources, and student safety.`
      },
      {
        id: 'vlan-2',
        title: 'Allow or block in plain English',
        bodyMarkdown: `A useful habit is to explain access rules in plain English first: should this group of devices reach that group of devices, and for what reason?\n\nThat language is often clearer than trying to sound like a firewall appliance.`
      },
      {
        id: 'vlan-3',
        title: 'What Level 1 should and should not do',
        bodyMarkdown: `Level 1 can recognise when a path may be intentionally blocked, confirm the network context, and escalate with the right request.\n\nLevel 1 should not invent ad hoc bypasses around security design.`
      }
    ],
    flashcards: [
      { id: 'vlan-f1', front: 'What is a VLAN helping you achieve?', back: 'Traffic separation and control.' },
      { id: 'vlan-f2', front: 'Why might guest Wi-Fi not reach internal printers?', back: 'Because segmentation may intentionally block that path.' },
      { id: 'vlan-f3', front: 'What is a good plain-English rule statement?', back: 'This device group should or should not reach that service group, and here is why.' },
      { id: 'vlan-f4', front: 'What should Josh avoid promising on a network path?', back: 'Access that may be blocked for security reasons.' },
      { id: 'vlan-f5', front: 'Why is segmentation useful in schools?', back: 'It reduces risk and keeps different users and services appropriately separated.' },
      { id: 'vlan-f6', front: 'What is the first fact to confirm in a segmentation complaint?', back: 'Which network or SSID the device is actually using.' },
      { id: 'vlan-f7', front: 'What value does plain-English allow/block thinking add?', back: 'It makes escalation requests clearer and safer.' },
      { id: 'vlan-f8', front: 'What is a risky habit in segmentation issues?', back: 'Treating blocked access as a bug without checking design intent.' }
    ],
    quiz: [
      mcq({
        id: 'vlan-q1',
        prompt: 'A guest device cannot see an internal printer. Which explanation deserves serious weight first?',
        domain: 'VLAN and segmentation',
        difficulty: 'foundation',
        explanation: 'Blocked access may be intentional, not accidental.',
        modelAnswer:
          'Segmentation or firewall policy may be intentionally preventing guest access to internal services, so confirm the network context before treating it as a fault.',
        commonMistakes: ['Assuming all connectivity should be universal', 'Offering an immediate workaround'],
        dcsContext: 'Guest isolation is often a deliberate school control.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        options: [
          { id: 'a', label: 'The request may be failing because the device is on an isolated network segment' },
          { id: 'b', label: 'Segmentation may be intentionally blocking that path' },
          { id: 'c', label: 'The SSID may provide internet only and not internal-service access by design' },
          { id: 'd', label: 'The target device may be reachable only from a staff or managed network path' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'vlan-q2',
        prompt: 'Explain segmentation in plain English for a non-technical staff member.',
        domain: 'VLAN and segmentation',
        difficulty: 'stretch',
        explanation: 'Simple language is a professional skill.',
        modelAnswer:
          'Segmentation means not every device is allowed to talk to every other device. The network is intentionally separated so the right people and devices can reach the right services while risk stays lower.',
        commonMistakes: ['Using jargon with no meaning', 'Explaining it as only an exam term'],
        dcsContext: 'Teachers need reassurance and clarity, not networking theatre.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        rubric: ['Plain English', 'Mentions separation', 'Mentions purpose or safety'],
        keywordHints: ['separate', 'allowed', 'services', 'safer']
      }),
      orderSteps({
        id: 'vlan-q3',
        prompt: 'Order the safest response to a guest Wi-Fi access complaint.',
        domain: 'VLAN and segmentation',
        difficulty: 'stretch',
        explanation: 'Context, design intent, then escalation.',
        modelAnswer:
          'Confirm the device really is on guest Wi-Fi, confirm what internal service it is trying to reach, recognise design intent may explain the block, then escalate the business requirement rather than bypassing the control.',
        commonMistakes: ['Trying to bypass before confirming the SSID', 'Treating every block as accidental'],
        dcsContext: 'Guest and internal paths should not blur casually.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'vlan-firewall-rules',
        steps: [
          { id: 'confirm-ssid', label: 'Confirm the SSID or network context' },
          { id: 'target', label: 'Confirm the internal service or device being requested' },
          { id: 'intent', label: 'Consider whether the block may be intentional' },
          { id: 'request', label: 'Escalate the access request safely' }
        ],
        correctOrder: ['confirm-ssid', 'target', 'intent', 'request'],
        rubric: ['Verifies context', 'Checks design intent', 'Escalates safely']
      }),
      scenarioResponse({
        id: 'vlan-q4',
        prompt: 'A staff member wants guest devices to reach classroom TVs for an event. What reasoning should Josh apply before promising anything?',
        domain: 'VLAN and segmentation',
        difficulty: 'challenge',
        explanation: 'Business need and design intent both matter.',
        modelAnswer:
          'Capture the event need, identify the current network path, and recognise that guest-to-internal access may be intentionally blocked. The safe move is to escalate the business requirement and timing rather than promising access or suggesting a bypass.',
        commonMistakes: ['Promising a quick network exception', 'Ignoring event urgency in the escalation note'],
        dcsContext: 'Events create real pressure, but controls still matter.',
        reviewSchedule,
        recommendedModuleId: 'vlans-network-segmentation',
        weakTopic: 'security-risk-judgement',
        rubric: ['Recognises design intent', 'Captures the need clearly', 'Avoids unauthorised changes']
      })
    ],
    scenarioPrompts: [
      {
        id: 'vlan-s1',
        title: 'Guest access versus internal devices',
        prompt: 'Convert a blocked-path complaint into a clear plain-English escalation.'
      }
    ],
    practicalOutputs: [
      {
        id: 'vlan-p1',
        title: 'Allow and block rules in plain English',
        description: 'Write a simple rule sheet explaining what should or should not talk across key school network segments.'
      }
    ]
  },
  {
    id: 'cloud-models-saas-paas-iaas-daas',
    title: 'Cloud Models: SaaS, PaaS, IaaS, and DaaS',
    description:
      'Demystify cloud labels so Josh can place real school services in the right bucket and ask better support questions.',
    domain: 'Cloud and Platforms',
    level: 'A+',
    estimatedMinutes: 16,
    tags: ['cloud', 'SaaS', 'PaaS', 'IaaS', 'DaaS'],
    learningObjectives: [
      'Separate the major cloud service models with practical examples.',
      'Explain why cloud-model language matters for support and escalation.',
      'Avoid treating every online service as the same kind of dependency.'
    ],
    dcsRelevance: [
      'M365, Teams, web portals, and device management all live in different cloud conversations.',
      'Better cloud language helps Josh translate vendor or platform issues more clearly.',
      'Supports progression toward Level 2 responsibilities and broader school IT conversations.'
    ],
    sections: [
      {
        id: 'cloud-1',
        title: 'Think in responsibility layers',
        bodyMarkdown: `SaaS gives you the application. PaaS gives you a platform to build or run on. IaaS gives you infrastructure pieces. DaaS gives you a desktop-style environment as a service.\n\nThe helpful question is: who is responsible for what layer?`
      },
      {
        id: 'cloud-2',
        title: 'Why support should care',
        bodyMarkdown: `If a tool is SaaS, Josh is often dealing with access, browser, account, service status, or local endpoint symptoms rather than server ownership.\n\nIf the issue lives lower in the stack, the responsible team and escalation path may look different.`
      },
      {
        id: 'cloud-3',
        title: 'School examples without overclaiming',
        bodyMarkdown: `Use the model to reason, not to bluff. M365 and Teams are strong SaaS examples. Hosted desktops can fit DaaS thinking. Some school systems may hide deeper IaaS or platform layers, but Josh does not need to pretend he administers them to understand the shape.`
      }
    ],
    flashcards: [
      { id: 'cloud-f1', front: 'What does SaaS usually give the customer?', back: 'A ready-to-use application or service.' },
      { id: 'cloud-f2', front: 'What is the key lens for cloud models?', back: 'Responsibility layers and who manages what.' },
      { id: 'cloud-f3', front: 'What is PaaS in simple terms?', back: 'A platform layer for building or running applications.' },
      { id: 'cloud-f4', front: 'What is IaaS in simple terms?', back: 'Infrastructure resources such as compute, storage, or networking.' },
      { id: 'cloud-f5', front: 'What does DaaS usually provide?', back: 'A desktop-style environment delivered as a service.' },
      { id: 'cloud-f6', front: 'Why is M365 usually taught as SaaS first?', back: 'Because Josh mostly consumes the application and service layer.' },
      { id: 'cloud-f7', front: 'What risk comes from calling every online issue "cloud is broken"?', back: 'It hides the real layer and weakens diagnosis.' },
      { id: 'cloud-f8', front: 'Why should Josh know cloud models if he is Level 1?', back: 'They improve support language and escalation routing.' }
    ],
    quiz: [
      mcq({
        id: 'cloud-q1',
        prompt: "Which model best fits a ready-to-use application like Teams from Josh's support perspective?",
        domain: 'Cloud models',
        difficulty: 'foundation',
        explanation: 'Teams is primarily consumed as an application service.',
        modelAnswer: "From Josh's support perspective, Teams is best approached as SaaS.",
        commonMistakes: ['Treating any online app as IaaS by default', 'Using cloud terms without linking them to responsibility'],
        dcsContext: 'The question is about support posture, not vendor marketing purity.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        options: [
          { id: 'a', label: 'SaaS' },
          { id: 'b', label: 'PaaS' },
          { id: 'c', label: 'IaaS' },
          { id: 'd', label: 'On-prem application hosting with no service layer involved' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'cloud-q2',
        prompt: 'Why does cloud-model language help Josh escalate better?',
        domain: 'Cloud models',
        difficulty: 'stretch',
        explanation: 'The layer often hints at the right owner and symptom language.',
        modelAnswer:
          'Cloud-model language helps Josh describe which layer seems affected, who likely owns it, and whether the problem looks like account access, browser behavior, application service health, or deeper infrastructure.',
        commonMistakes: ['Treating cloud labels as empty trivia', 'Ignoring ownership and responsibility'],
        dcsContext: 'Better layer language makes support notes more useful.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        rubric: ['Mentions ownership or layer', 'Links to support value', 'Uses practical examples'],
        keywordHints: ['layer', 'ownership', 'service', 'access']
      }),
      orderSteps({
        id: 'cloud-q3',
        prompt: 'Order the best thinking path for a SaaS-style service complaint.',
        domain: 'Cloud models',
        difficulty: 'stretch',
        explanation: 'Start at the consumed layer before making premature infrastructure assumptions.',
        modelAnswer:
          'Clarify the service and user symptom, check account and browser or device basics, compare with another user or device if possible, then escalate with evidence if the service path still looks affected.',
        commonMistakes: ['Jumping to deep infrastructure assumptions first', 'Skipping comparison'],
        dcsContext: 'Most Level 1 SaaS work lives close to the user experience.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'cloud-models',
        steps: [
          { id: 'clarify', label: 'Clarify the service and exact symptom' },
          { id: 'basics', label: 'Check account, browser, or device basics' },
          { id: 'compare', label: 'Compare with another user or device if possible' },
          { id: 'escalate', label: 'Escalate with service-specific evidence' }
        ],
        correctOrder: ['clarify', 'basics', 'compare', 'escalate'],
        rubric: ['Starts at the consumed layer', 'Uses simple checks', 'Escalates with evidence']
      }),
      scenarioResponse({
        id: 'cloud-q4',
        prompt: 'A user says, "The cloud is down." Explain the more appropriate response Josh should use.',
        domain: 'Cloud models',
        difficulty: 'challenge',
        explanation: 'Vague labels hide useful distinctions.',
        modelAnswer:
          'Translate the complaint into a specific service, user symptom, and scope. Ask which app or platform is affected, whether others are impacted, and whether the issue looks like access, browser, or service behavior. Use cloud-model language only to sharpen the note, not to sound clever.',
        commonMistakes: ['Repeating the vague label back', 'Pretending the label is already a diagnosis'],
        dcsContext: 'Teachers need clear clarification rather than jargon.',
        reviewSchedule,
        recommendedModuleId: 'cloud-models-saas-paas-iaas-daas',
        weakTopic: 'ticket-quality',
        rubric: ['Clarifies the service', 'Separates symptom from label', 'Shows useful support posture']
      })
    ],
    scenarioPrompts: [
      {
        id: 'cloud-s1',
        title: 'The cloud is down',
        prompt: 'Translate vague platform language into a supportable symptom note.'
      }
    ],
    practicalOutputs: [
      {
        id: 'cloud-p1',
        title: 'Cloud model memory sheet',
        description: 'Write a concise comparison of SaaS, PaaS, IaaS, and DaaS with DCS-flavoured examples.'
      }
    ]
  },
  {
    id: 'ticket-notes-escalation-quality',
    title: 'Ticket Notes and Escalation Quality',
    description:
      'Build notes that are short, privacy-safe, and useful enough that the next tech can move without guesswork.',
    domain: 'Operations',
    level: 'L1',
    estimatedMinutes: 18,
    tags: ['ticket notes', 'escalation', 'documentation', 'privacy'],
    learningObjectives: [
      'Capture who, where, device, symptom, scope, and steps tried without waffle.',
      'Keep wording privacy-safe and manager-safe.',
      'Explain urgency and impact without exaggerating the issue.'
    ],
    dcsRelevance: [
      'Good notes make practical support judgement visible and reusable.',
      'Clear escalation reduces repeat questions while protecting privacy.',
      'Documentation quality is one of the clearest bridges from Level 1 toward Level 2.'
    ],
    sections: [
      {
        id: 'ticket-1',
        title: 'What a good note actually does',
        bodyMarkdown: `A good note helps the next person act. It should answer: who or what is affected, where it is happening, what the exact symptom is, what scope is known, what has already been tried, and why the issue matters now.\n\nA note is not a diary and it is not a dramatic story.`
      },
      {
        id: 'ticket-2',
        title: 'Privacy-safe wording',
        bodyMarkdown: `Do not paste sensitive content, passwords, or private detail into a personal study app.\n\nEven in live ticketing, only include what is necessary. Describe the issue cleanly without spraying extra private data everywhere.`
      },
      {
        id: 'ticket-3',
        title: 'Impact, urgency, and honesty',
        bodyMarkdown: `Not every issue is critical, but some are urgent because learning is blocked, staff are stuck, or a security concern exists.\n\nGood support language is accurate and proportionate. It does not exaggerate, and it does not hide the real impact.`
      }
    ],
    flashcards: [
      { id: 'ticket-f1', front: 'What is the first job of a support note?', back: 'Help the next person act without guesswork.' },
      { id: 'ticket-f2', front: 'What details usually belong in a good note?', back: 'Who or what, where, exact symptom, scope, steps tried, impact, and next concern.' },
      { id: 'ticket-f3', front: 'What kind of wording should Josh avoid?', back: 'Vague, dramatic, or privacy-risk wording.' },
      { id: 'ticket-f4', front: 'Why does scope matter in a note?', back: 'It tells the next tech whether the issue is isolated or broader.' },
      { id: 'ticket-f5', front: 'How should urgency be described?', back: 'Clearly and accurately, tied to impact.' },
      { id: 'ticket-f6', front: 'What does privacy-safe wording protect?', back: 'Students, staff, families, and the school.' },
      { id: 'ticket-f7', front: 'What is better than "it is broken again"?', back: 'A specific symptom with room, device, scope, and steps tried.' },
      { id: 'ticket-f8', front: 'Why is documentation an indicator of professional capability?', back: 'It demonstrates judgement, communication quality, and process maturity.' }
    ],
    quiz: [
      mcq({
        id: 'ticket-q1',
        prompt: 'Which note is the strongest escalation summary?',
        domain: 'Ticket quality',
        difficulty: 'foundation',
        explanation: 'The strongest note preserves action-ready facts.',
        modelAnswer:
          'The best note names the room, device or service, exact symptom, scope, steps already tried, and class or business impact in a concise, evidence-based way.',
        commonMistakes: ['Choosing notes with emotion but no evidence', 'Leaving out scope and action taken'],
        dcsContext: 'A short but specific note saves class time later.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'ticket-quality',
        options: [
          { id: 'a', label: 'Internet broken again. Please fix ASAP.' },
          { id: 'b', label: 'Room 3 teacher laptop shows display but no audio on ViewBoard; other laptop not yet tested; class blocked for media playback.' },
          { id: 'c', label: 'Teacher reports a display issue and says it has happened a few times before.' },
          { id: 'd', label: 'Room 3 audio issue noted; will investigate later if it happens again.' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'ticket-q2',
        prompt: 'What makes a note privacy-safe without becoming useless?',
        domain: 'Ticket quality',
        difficulty: 'stretch',
        explanation: 'The goal is useful minimum detail, not zero detail.',
        modelAnswer:
          'Include only the details needed to understand the issue and next action. Avoid passwords, unnecessary personal information, or copied private content, while still naming the room, symptom, and business impact clearly.',
        commonMistakes: ['Removing so much detail that the note becomes useless', 'Including sensitive content because it feels thorough'],
        dcsContext: 'The app itself is for personal PD and should stay especially clean.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'security-risk-judgement',
        rubric: ['Balances usefulness and privacy', 'Mentions minimum necessary detail', 'Avoids sensitive oversharing'],
        keywordHints: ['minimum necessary', 'passwords', 'private']
      }),
      orderSteps({
        id: 'ticket-q3',
        prompt: 'Order the right structure for an escalation note.',
        domain: 'Ticket quality',
        difficulty: 'stretch',
        explanation: 'Good structure improves reading speed under pressure.',
        modelAnswer:
          'Start with location and affected thing, then exact symptom and scope, then steps tried, then impact and why it is being escalated.',
        commonMistakes: ['Burying the actual symptom deep in the note', 'Putting opinions ahead of facts'],
        dcsContext: 'Busy support staff scan notes fast.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'ticket-quality',
        steps: [
          { id: 'location', label: 'State room or location and affected device or service' },
          { id: 'symptom', label: 'State the exact symptom and known scope' },
          { id: 'steps', label: 'List the safe steps already tried' },
          { id: 'impact', label: 'State impact, urgency, and escalation reason' }
        ],
        correctOrder: ['location', 'symptom', 'steps', 'impact'],
        rubric: ['Puts facts first', 'Shows scope and actions', 'Ends with impact and escalation reason']
      }),
      scenarioResponse({
        id: 'ticket-q4',
        prompt: 'Write the reasoning Josh should apply before logging a phishing-email concern in his personal PD app.',
        domain: 'Ticket quality',
        difficulty: 'challenge',
        explanation: 'The personal app is not the place for confidential incident details.',
        modelAnswer:
          'Do not paste the live email content, sender detail, or sensitive incident data into the personal PD app. Instead, log the learning concept at a high level, note the safe escalation pathway, and keep operational incident details in the authorised work system only.',
        commonMistakes: ['Copying real incident detail into a personal tool', 'Treating privacy risk as optional'],
        dcsContext: 'Security concerns demand both urgency and data discipline.',
        reviewSchedule,
        recommendedModuleId: 'ticket-notes-escalation-quality',
        weakTopic: 'security-risk-judgement',
        rubric: ['Protects sensitive data', 'Understands tool boundaries', 'Explains the safer alternative']
      })
    ],
    scenarioPrompts: [
      {
        id: 'ticket-s1',
        title: 'Escalation note under pressure',
        prompt: 'Write one clear note after a classroom incident without unnecessary detail or oversharing.'
      }
    ],
    practicalOutputs: [
      {
        id: 'ticket-p1',
        title: 'Excellent escalation note',
        description: 'Draft one model-quality ticket or escalation note Josh can use as a reference pattern.'
      }
    ]
  }
  ,
  {
    id: 'aplus-core1-mobile-devices',
    title: 'A+ Core 1: Mobile Devices',
    description:
      'Laptop components, mobile connectivity, accessories, and management concepts you’ll see in real support tickets.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 22,
    tags: ['A+ 220-1201', 'laptops', 'mobile', 'BYOD', 'MDM'],
    learningObjectives: [
      'Identify common laptop hardware components and failure patterns.',
      'Explain common mobile connection methods (USB, Bluetooth, tethering, hotspots).',
      'Describe MDM concepts and why BYOD/COPE choices matter to support.'
    ],
    dcsRelevance: [
      'School support includes a mix of managed staff laptops and less-controlled BYOD devices.',
      'Connection issues often look like "it just won’t connect" until you name the actual transport.',
      'Management model affects what you can safely change and what must be escalated.'
    ],
    sections: [
      {
        id: 'aplus-mobile-1',
        title: 'Laptop hardware: what breaks and what you can verify',
        bodyMarkdown:
          'Think in subsystems: power (battery/charger), input (keyboard/trackpad/camera), storage (SSD/HDD), and wireless (Wi‑Fi/Bluetooth).\n\nFor Level 1 support, focus on symptom patterns and reversible checks before replacing parts: power path, known-good charger, device recognition, and simple device settings.'
      },
      {
        id: 'aplus-mobile-2',
        title: 'Mobile connections: name the link',
        bodyMarkdown:
          'Most mobile connectivity issues are solved faster when you identify the exact link: USB (data/charging), Bluetooth (pairing + profiles), Wi‑Fi hotspot, or tethering.\n\n“Connected” is not enough—ask what connected to what, and for what purpose (power vs data vs audio).'
      },
      {
        id: 'aplus-mobile-3',
        title: 'Management concepts (BYOD / COPE / MDM)',
        bodyMarkdown:
          'Mobile Device Management (MDM) is the set of tools and policies used to configure, secure, and support a fleet.\n\nBYOD and COPE are ownership models that change what’s reasonable to enforce. Support outcomes depend on which model applies—don’t assume you can apply the same rules everywhere.'
      }
    ],
    flashcards: [
      { id: 'aplus-mobile-f1', front: 'Name four common laptop subsystems to think in.', back: 'Power, input, storage, and wireless.' },
      { id: 'aplus-mobile-f2', front: 'Why is “connected” not enough when troubleshooting mobile links?', back: 'You need to know what is connected to what and for what purpose (power, data, audio, network).' },
      { id: 'aplus-mobile-f3', front: 'What is MDM in plain English?', back: 'Tools and policies used to configure, secure, and support devices at scale.' },
      { id: 'aplus-mobile-f4', front: 'What does BYOD mean?', back: 'Bring Your Own Device: user-owned hardware with limited organisation control.' },
      { id: 'aplus-mobile-f5', front: 'What does COPE mean?', back: 'Corporate Owned, Personally Enabled: org-owned device with some personal use.' },
      { id: 'aplus-mobile-f6', front: 'Why does ownership model change support decisions?', back: 'It changes what you are allowed to enforce and what risks you can take.' },
      { id: 'aplus-mobile-f7', front: 'Give two quick reversible checks for a laptop power complaint.', back: 'Try a known-good charger/cable, check the power indicator, or reseat the connector.' },
      { id: 'aplus-mobile-f8', front: 'Name two common mobile connectivity methods besides Wi‑Fi.', back: 'USB and Bluetooth (also hotspot/tethering).' },
      { id: 'aplus-mobile-f9', front: 'What is tethering?', back: 'Using a phone to share its cellular connection over USB/Bluetooth/Wi‑Fi.' },
      { id: 'aplus-mobile-f10', front: 'What’s a common Bluetooth troubleshooting hinge?', back: 'Correct pairing plus the correct profile (audio vs data) and removing stale pairings.' }
    ],
    quiz: [
      mcq({
        id: 'aplus-mobile-q1',
        prompt: 'A user says, “My phone is connected but nothing works.” What is the best first follow-up?',
        domain: 'A+ Mobile devices',
        difficulty: 'foundation',
        explanation: 'The word “connected” hides which link is actually used.',
        modelAnswer:
          'Clarify what connection type is meant (USB charging vs USB data, Bluetooth audio vs tethering, Wi‑Fi hotspot, etc.) and what the user is trying to achieve.',
        commonMistakes: ['Assuming Wi‑Fi', 'Jumping to resets without naming the link'],
        dcsContext: 'In school support, many complaints are really about the wrong transport or profile.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        options: [
          { id: 'a', label: 'Ask them to factory reset the phone immediately' },
          { id: 'b', label: 'Clarify the connection type and the intended outcome (power/data/audio/network)' },
          { id: 'c', label: 'Assume the Wi‑Fi is down and escalate' },
          { id: 'd', label: 'Tell them to try again later because mobile connections are unreliable' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'aplus-mobile-q2',
        prompt: 'In one paragraph, explain why BYOD vs COPE changes what support can safely do.',
        domain: 'A+ Mobile devices',
        difficulty: 'stretch',
        explanation: 'Ownership and responsibility shape the boundaries of support.',
        modelAnswer:
          'BYOD devices are user-owned, so organisational control is limited and enforcement must respect policy boundaries. COPE devices are organisation-owned, so standard configurations and security controls may apply, and support can rely on managed tooling. The ownership model changes what settings can be enforced, what data must be protected, and what escalation path is appropriate.',
        commonMistakes: ['Treating all devices as fully managed', 'Ignoring policy boundaries'],
        dcsContext: 'In schools, mixing staff-owned and school-owned devices is common.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        rubric: ['Mentions ownership and control', 'Mentions policy boundaries', 'Links to support actions'],
        keywordHints: ['ownership', 'managed', 'policy', 'boundaries']
      }),
      orderSteps({
        id: 'aplus-mobile-q3',
        prompt: 'Order a safe first-line response for “laptop won’t charge.”',
        domain: 'A+ Mobile devices',
        difficulty: 'stretch',
        explanation: 'Start with reversible checks and evidence.',
        modelAnswer:
          'Confirm symptom and indicator lights, try a known-good charger/cable if available, inspect/seat connector, then escalate or arrange repair if the power path still fails.',
        commonMistakes: ['Assuming the battery is dead without testing', 'Skipping the known-good comparison'],
        dcsContext: 'A known-good charger/cable is one of the fastest isolators.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        steps: [
          { id: 'symptom', label: 'Confirm the exact symptom (no charge vs slow charge vs intermittent)' },
          { id: 'known-good', label: 'Try a known-good charger/cable if available' },
          { id: 'seat', label: 'Inspect and reseat the connector safely' },
          { id: 'escalate', label: 'Escalate or book repair with evidence if unresolved' }
        ],
        correctOrder: ['symptom', 'known-good', 'seat', 'escalate'],
        rubric: ['Reversible checks first', 'Uses known-good comparison', 'Escalates with evidence']
      }),
      scenarioResponse({
        id: 'aplus-mobile-q4',
        prompt:
          'A staff member’s laptop camera doesn’t work in a meeting. Explain a calm Level 1 approach and what evidence you’d capture if it needs escalation.',
        domain: 'A+ Mobile devices',
        difficulty: 'challenge',
        explanation: 'Support is evidence-driven, not guess-driven.',
        modelAnswer:
          'Confirm the meeting app permissions and the selected camera device, test with another app if quick, and check whether the camera is disabled by a privacy switch or setting. If it persists, capture the exact error, apps tested, whether the camera works anywhere, and the device details for escalation.',
        commonMistakes: ['Reinstalling everything immediately', 'Ignoring privacy switches or permissions'],
        dcsContext: 'Camera faults are often permissions, device selection, or a privacy disable—not always hardware.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        rubric: ['Starts with safe checks', 'Captures evidence', 'Avoids unnecessary risky steps']
      }),
      mcq({
        id: 'aplus-mobile-q5',
        prompt: 'Which symptom most strongly suggests a laptop storage issue rather than a network issue?',
        domain: 'A+ Mobile devices',
        difficulty: 'foundation',
        explanation: 'Some symptoms are strongly local rather than connectivity-related.',
        modelAnswer: 'File copy errors or drive-not-detected symptoms point more to local storage than networking.',
        commonMistakes: ['Calling every slow behavior “Wi‑Fi”', 'Ignoring device-local error messages'],
        dcsContext: 'Support gets faster when you separate device-local failures from connectivity complaints.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        options: [
          { id: 'a', label: 'The user cannot resolve a website name but can ping an IP' },
          { id: 'b', label: 'The laptop reports the drive is missing or shows repeated read/write errors' },
          { id: 'c', label: 'The Wi‑Fi icon shows “connected, no internet”' },
          { id: 'd', label: 'Other devices in the room have no connectivity' }
        ],
        correctOptionId: 'b'
      }),
      explainItSimply({
        id: 'aplus-mobile-q6',
        prompt: 'Explain (simply) why a USB cable can charge a phone but not transfer files.',
        domain: 'A+ Mobile devices',
        difficulty: 'foundation',
        explanation: 'Power and data are different paths.',
        modelAnswer:
          'Some cables support power only, or the phone/PC may be in a charging-only mode. Charging proves power is flowing, but data transfer needs the right cable and the right data mode.',
        commonMistakes: ['Assuming charging proves data will work', 'Ignoring data mode prompts'],
        dcsContext: 'This comes up constantly when staff connect devices for photos, files, or tethering.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        rubric: ['Separates power from data', 'Mentions cable capability or mode', 'Plain language'],
        keywordHints: ['power', 'data', 'mode', 'cable']
      }),
      shortAnswer({
        id: 'aplus-mobile-q7',
        prompt: 'List three evidence items you would capture before escalating a recurring Bluetooth headset problem.',
        domain: 'A+ Mobile devices',
        difficulty: 'stretch',
        explanation: 'Evidence helps separate pairing, profile, and device issues.',
        modelAnswer:
          'Capture: device models involved, whether the issue is pairing or audio profile, where/when it fails (apps), and what steps were tried (remove pairing/re-pair, restart Bluetooth).',
        commonMistakes: ['No model details', 'No description of whether it is pairing vs audio routing'],
        dcsContext: 'Bluetooth problems are often about profiles and stale pairings, not “broken hardware.”',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        rubric: ['Includes device models', 'Separates symptom type', 'Includes steps tried'],
        keywordHints: ['model', 'pairing', 'profile', 'steps tried']
      }),
      orderSteps({
        id: 'aplus-mobile-q8',
        prompt: 'Order a safe response to “my phone hotspot won’t connect my laptop to the internet.”',
        domain: 'A+ Mobile devices',
        difficulty: 'stretch',
        explanation: 'Identify the link, then scope, then isolate.',
        modelAnswer:
          'Confirm hotspot is enabled, confirm the laptop is on the correct hotspot SSID, confirm authentication, then compare with another device before escalating carrier/device issues.',
        commonMistakes: ['Skipping SSID confirmation', 'Changing many settings without a comparison test'],
        dcsContext: 'Hotspot issues are often “wrong network” or auth, not mysterious failures.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-mobile-devices',
        weakTopic: 'a-plus-mobile-devices',
        steps: [
          { id: 'hotspot', label: 'Confirm hotspot is enabled and visible on the phone' },
          { id: 'ssid', label: 'Confirm the laptop joins the correct hotspot SSID' },
          { id: 'auth', label: 'Confirm the password/auth step succeeds' },
          { id: 'compare', label: 'Compare with another device before escalating deeper issues' }
        ],
        correctOrder: ['hotspot', 'ssid', 'auth', 'compare'],
        rubric: ['Names the link', 'Checks SSID/auth', 'Uses comparison']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-mobile-s1', title: 'Mobile connectivity complaint', prompt: 'Translate “it’s connected” into a specific link and next step.' }
    ],
    practicalOutputs: [
      { id: 'aplus-mobile-p1', title: 'Mobile support cheat-sheet', description: 'Create a one-page cheat-sheet for mobile links and first checks.' }
    ]
  },
  {
    id: 'aplus-core1-networking-basics',
    title: 'A+ Core 1: Networking Basics (IP, ports, wireless)',
    description:
      'Build a mental model of IP, common ports, and wireless basics so you can describe symptoms clearly and troubleshoot safely.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 24,
    tags: ['A+ 220-1201', 'IP', 'TCP/UDP', 'ports', 'wireless'],
    learningObjectives: [
      'Explain IP addressing and why TCP vs UDP matters at a high level.',
      'Recall a practical shortlist of ports and what they imply.',
      'Describe wireless basics (frequency, interference, Bluetooth vs Wi‑Fi) in support language.'
    ],
    dcsRelevance: [
      'Better networking language makes your notes and escalations dramatically faster to act on.',
      'Wireless symptoms are common in classrooms and staff areas.',
      'A+ networking fluency supports faster diagnosis of “no internet” claims.'
    ],
    sections: [
      {
        id: 'aplus-net-1',
        title: 'IP in plain English',
        bodyMarkdown:
          'IP addressing identifies endpoints so traffic can be delivered. TCP is connection-oriented and aims for reliable delivery; UDP is connectionless and often chosen when speed matters.\n\nFor support, your aim is not to recite theory—it’s to recognise what kind of symptom you’re seeing and what basic evidence would help.'
      },
      {
        id: 'aplus-net-2',
        title: 'Ports: the support shortlist',
        bodyMarkdown:
          'A small port shortlist helps you interpret symptoms: DNS 53, DHCP 67/68, HTTP 80, HTTPS 443, SMB 445, RDP 3389.\n\nPorts are not a permission to change firewalls—they’re a language tool for better problem statements.'
      },
      {
        id: 'aplus-net-3',
        title: 'Wireless basics that explain real complaints',
        bodyMarkdown:
          'Wi‑Fi issues often come from signal strength, interference, wrong band/SSID, or authentication problems. Bluetooth issues often come from pairing and profiles.\n\nStart with: which SSID, which device, and whether other devices in the same spot work.'
      }
    ],
    flashcards: [
      { id: 'aplus-net-f1', front: 'What is IP used for?', back: 'Identifying endpoints so traffic can be delivered and routed.' },
      { id: 'aplus-net-f2', front: 'High level: TCP vs UDP?', back: 'TCP aims for reliable delivery; UDP is connectionless and often prioritizes speed/latency.' },
      { id: 'aplus-net-f3', front: 'DNS port?', back: '53.' },
      { id: 'aplus-net-f4', front: 'DHCP ports?', back: '67/68.' },
      { id: 'aplus-net-f5', front: 'HTTPS port?', back: '443.' },
      { id: 'aplus-net-f6', front: 'SMB port?', back: '445.' },
      { id: 'aplus-net-f7', front: 'What is the first scope check in a Wi‑Fi complaint?', back: 'Test another device in the same location/SSID.' },
      { id: 'aplus-net-f8', front: 'What is a common cause of intermittent Wi‑Fi?', back: 'Low signal or interference / roaming between APs.' },
      { id: 'aplus-net-f9', front: 'Why do ports help Level 1 even without firewall access?', back: 'They sharpen diagnosis language and escalation notes.' },
      { id: 'aplus-net-f10', front: 'Bluetooth troubleshooting hinge?', back: 'Correct pairing and the correct profile (audio vs data).' }
    ],
    quiz: [
      mcq({
        id: 'aplus-net-q1',
        prompt: 'A device gets a 169.254 address. Which concept should you think about first?',
        domain: 'A+ Networking basics',
        difficulty: 'foundation',
        explanation: 'APIPA strongly suggests a lease problem.',
        modelAnswer: 'It likely failed to obtain a DHCP lease, so start with DHCP and connectivity to the network.',
        commonMistakes: ['Blaming DNS immediately', 'Assuming internet outage for the whole site'],
        dcsContext: 'This shows up in classrooms when devices move between networks or have onboarding issues.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        options: [
          { id: 'a', label: 'DNS resolution is down' },
          { id: 'b', label: 'DHCP lease acquisition likely failed' },
          { id: 'c', label: 'SMTP is blocked' },
          { id: 'd', label: 'The device is definitely infected' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'aplus-net-q2',
        prompt: 'Explain why “Wi‑Fi connected” is not the same as “internet working.”',
        domain: 'A+ Networking basics',
        difficulty: 'stretch',
        explanation: 'Connection to an AP is only one piece.',
        modelAnswer:
          'Wi‑Fi connected often means the device associated to the access point, but it may still lack a usable IP lease, fail DNS, or have a broken gateway path. You need to confirm addressing, name resolution, and path—not just association.',
        commonMistakes: ['Treating association as proof of internet', 'Skipping IP/DNS/gateway thinking'],
        dcsContext: 'This distinction reduces classroom confusion when symptoms are partial.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        rubric: ['Mentions IP lease', 'Mentions DNS or gateway path', 'Uses plain language'],
        keywordHints: ['DHCP', 'DNS', 'gateway', 'address']
      }),
      orderSteps({
        id: 'aplus-net-q3',
        prompt: 'Order the best first-line approach for intermittent Wi‑Fi in one room.',
        domain: 'A+ Networking basics',
        difficulty: 'stretch',
        explanation: 'Scope and comparison drive next steps.',
        modelAnswer:
          'Confirm scope, confirm SSID, compare devices, then capture signal/location evidence before escalation.',
        commonMistakes: ['Resetting everything immediately', 'Ignoring room-specific scope'],
        dcsContext: 'Room-based patterns often reveal AP coverage issues.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        steps: [
          { id: 'scope', label: 'Confirm whether it is one device or many' },
          { id: 'ssid', label: 'Confirm the correct SSID/network' },
          { id: 'compare', label: 'Compare with another device in the same location' },
          { id: 'evidence', label: 'Capture evidence (location/time/signal) for escalation if needed' }
        ],
        correctOrder: ['scope', 'ssid', 'compare', 'evidence'],
        rubric: ['Scope first', 'Uses comparison', 'Captures evidence']
      }),
      explainItSimply({
        id: 'aplus-net-q4',
        prompt: 'Explain what a “port number” is using a simple real-world analogy.',
        domain: 'A+ Networking basics',
        difficulty: 'foundation',
        explanation: 'Analogies help lock in concept recall.',
        modelAnswer:
          'A port number is like a numbered door on a building: the IP address gets you to the building, and the port tells you which service door to use once you arrive.',
        commonMistakes: ['Confusing ports with IPs', 'Making it more complex than needed'],
        dcsContext: 'Plain language makes it easier to communicate during support calls.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        rubric: ['Separates IP from port', 'Uses an understandable analogy', 'Keeps it short'],
        keywordHints: ['door', 'building', 'service']
      }),
      mcq({
        id: 'aplus-net-q5',
        prompt: 'Which pair best matches a service and its common port?',
        domain: 'A+ Networking basics',
        difficulty: 'foundation',
        explanation: 'A small practical shortlist is the goal.',
        modelAnswer: 'DNS commonly uses port 53.',
        commonMistakes: ['Mixing up DHCP/DNS/HTTPS', 'Treating port knowledge as permission to change firewalls'],
        dcsContext: 'Being able to name the service helps you write clearer escalation notes.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        options: [
          { id: 'a', label: 'DNS — 53' },
          { id: 'b', label: 'HTTPS — 67' },
          { id: 'c', label: 'DHCP — 443' },
          { id: 'd', label: 'SMB — 3389' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'aplus-net-q6',
        prompt: 'What is the difference between a “private IP” and a “public IP” in one or two sentences?',
        domain: 'A+ Networking basics',
        difficulty: 'stretch',
        explanation: 'This is a common support concept that affects expectations.',
        modelAnswer:
          'A private IP is used inside a local network and is not directly reachable from the internet. A public IP is internet-routable and represents the network or device as seen from outside.',
        commonMistakes: ['Calling private IPs “not real”', 'Thinking a private IP is always wrong'],
        dcsContext: 'This helps explain why internal services differ from internet services.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        rubric: ['Mentions local vs internet routing', 'Short and clear'],
        keywordHints: ['local', 'internet', 'routable']
      }),
      scenarioResponse({
        id: 'aplus-net-q7',
        prompt:
          'A class says “the internet is down,” but one staff laptop can still open a site. Write the evidence you’d gather next before escalating.',
        domain: 'A+ Networking basics',
        difficulty: 'challenge',
        explanation: 'Partial functionality suggests scope or DNS/lease differences.',
        modelAnswer:
          'Capture which devices are affected, which SSID/network they are on, whether they have valid IP addressing, and whether name resolution differs (try a known site and a comparison device). Note the time and room.',
        commonMistakes: ['Escalating “internet down” with no scope', 'Not recording SSID or room'],
        dcsContext: 'School incidents often have mixed scope; evidence prevents mis-routing.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        rubric: ['Captures scope', 'Captures SSID/network', 'Captures basic IP/DNS evidence']
      }),
      orderSteps({
        id: 'aplus-net-q8',
        prompt: 'Order a safe “no internet” triage check sequence for one device.',
        domain: 'A+ Networking basics',
        difficulty: 'stretch',
        explanation: 'Sequence keeps checks fast and reversible.',
        modelAnswer:
          'Confirm SSID and signal, confirm valid IP address, confirm DNS behavior, then capture findings and escalate if needed.',
        commonMistakes: ['Resetting everything first', 'Skipping IP/DNS checks'],
        dcsContext: 'A small repeated sequence builds reliable support habits.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-networking-basics',
        weakTopic: 'a-plus-networking',
        steps: [
          { id: 'ssid', label: 'Confirm SSID and signal strength' },
          { id: 'ip', label: 'Confirm valid IP addressing (not 169.254)' },
          { id: 'dns', label: 'Check whether names resolve vs IP works' },
          { id: 'escalate', label: 'Escalate with evidence if unresolved' }
        ],
        correctOrder: ['ssid', 'ip', 'dns', 'escalate'],
        rubric: ['Correct sequence', 'Evidence driven', 'Safe checks only']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-net-s1', title: 'Room Wi‑Fi complaint', prompt: 'Turn “Wi‑Fi is bad” into scope + evidence.' }
    ],
    practicalOutputs: [
      { id: 'aplus-net-p1', title: 'Networking mini-checklist', description: 'Write a checklist for scope, SSID, IP lease, DNS, and gateway checks.' }
    ]
  },
  {
    id: 'aplus-core1-network-services',
    title: 'A+ Core 1: Network Services (DNS, DHCP, file/print)',
    description:
      'Understand what network services do so you can describe failures precisely: DNS, DHCP, authentication, file and print services.',
    domain: 'Networking',
    level: 'A+',
    estimatedMinutes: 22,
    tags: ['A+ 220-1201', 'DNS', 'DHCP', 'services', 'file sharing', 'print servers'],
    learningObjectives: [
      'Describe what DNS and DHCP each provide and how failures present.',
      'Name common services you’ll hear about in tickets (file, print, mail, logging, proxy).',
      'Write a clean “service suspected” escalation note with evidence instead of guesses.'
    ],
    dcsRelevance: [
      'Many “internet down” reports are actually DNS or DHCP symptoms.',
      'School environments depend heavily on file and print workflows.',
      'Service-aware notes speed up escalations to Level 2 or network owners.'
    ],
    sections: [
      {
        id: 'aplus-svc-1',
        title: 'DNS and DHCP: the two services you meet constantly',
        bodyMarkdown:
          'DHCP gives an address configuration so a device can participate on the network. DNS turns names into addresses.\n\nIf DHCP fails, devices may get unusable addressing. If DNS fails, users often describe it as “the internet is down” because names won’t resolve.'
      },
      {
        id: 'aplus-svc-2',
        title: 'Common service categories in support language',
        bodyMarkdown:
          'Services you’ll hear about include file sharing, print servers, authentication, mail, web services, and logging.\n\nYour goal is not to run the service—it’s to recognise the category and capture evidence: who is impacted, what fails, what still works.'
      },
      {
        id: 'aplus-svc-3',
        title: 'Evidence-first service escalation',
        bodyMarkdown:
          'When you suspect a service issue, avoid absolute claims. Write: observed symptom, scope, time, and a minimal set of checks.\n\nThat evidence is often enough for the service owner to confirm health and investigate.'
      }
    ],
    flashcards: [
      { id: 'aplus-svc-f1', front: 'DHCP does what?', back: 'Leases IP configuration to devices.' },
      { id: 'aplus-svc-f2', front: 'DNS does what?', back: 'Resolves names to IP addresses.' },
      { id: 'aplus-svc-f3', front: 'A DNS failure often feels like what to users?', back: '“The internet is down” because names fail.' },
      { id: 'aplus-svc-f4', front: 'A DHCP failure can present as what?', back: 'No usable IP address (often 169.254) or no network access.' },
      { id: 'aplus-svc-f5', front: 'Give two service categories besides DNS/DHCP.', back: 'File sharing and print services (also auth, web, mail, logging).' },
      { id: 'aplus-svc-f6', front: 'What should a “suspected service issue” note include?', back: 'Symptom, scope, time, and steps tried.' },
      { id: 'aplus-svc-f7', front: 'Why avoid absolute claims like “DNS is down”?', back: 'Because you may not have enough evidence, and it can mislead escalation.' },
      { id: 'aplus-svc-f8', front: 'What does “scope” mean in service terms?', back: 'How many users/devices/locations are affected.' },
      { id: 'aplus-svc-f9', front: 'What is a print server in one line?', back: 'A service that manages print queues and jobs for multiple clients.' },
      { id: 'aplus-svc-f10', front: 'Why do services matter for Level 1?', back: 'They shape symptom interpretation and escalation quality.' }
    ],
    quiz: [
      mcq({
        id: 'aplus-svc-q1',
        prompt: 'Users can reach some websites by IP address but not by name. What service category is most suspect?',
        domain: 'A+ Network services',
        difficulty: 'foundation',
        explanation: 'Names failing with IP working is a classic clue.',
        modelAnswer: 'DNS (name resolution) is the most suspect category.',
        commonMistakes: ['Assuming total internet outage', 'Blaming hardware immediately'],
        dcsContext: 'This pattern helps triage “internet down” into a clearer branch.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        options: [
          { id: 'a', label: 'DNS' },
          { id: 'b', label: 'DHCP' },
          { id: 'c', label: 'Email service' },
          { id: 'd', label: 'Print server' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'aplus-svc-q2',
        prompt: 'Write a 3-bullet escalation note for a suspected DHCP failure affecting a classroom.',
        domain: 'A+ Network services',
        difficulty: 'stretch',
        explanation: 'Clear notes are the product.',
        modelAnswer:
          '- Room/location and time observed; devices affected.\n- Symptom: devices show no valid lease (e.g. 169.254) or cannot obtain IP on correct SSID.\n- Steps tried: forget/rejoin SSID, reboot, compare with another device; result.',
        commonMistakes: ['No scope', 'No time/location', 'No steps tried'],
        dcsContext: 'A concise note helps network owners isolate scope quickly.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        rubric: ['Has location/time', 'Has scope', 'Has steps tried'],
        keywordHints: ['room', 'scope', '169.254', 'SSID']
      }),
      orderSteps({
        id: 'aplus-svc-q3',
        prompt: 'Order the best evidence-first flow for “file share not accessible.”',
        domain: 'A+ Network services',
        difficulty: 'stretch',
        explanation: 'Start with access context before technical assumptions.',
        modelAnswer:
          'Confirm the user account and exact path, confirm scope (others affected), check network connectivity basics, then escalate with evidence if still blocked.',
        commonMistakes: ['Assuming permissions immediately without evidence', 'Skipping scope checks'],
        dcsContext: 'Access issues can be user-specific or service-wide.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        steps: [
          { id: 'path', label: 'Confirm the exact share/path and the account in use' },
          { id: 'scope', label: 'Check whether others are affected' },
          { id: 'connectivity', label: 'Confirm basic connectivity to the network' },
          { id: 'escalate', label: 'Escalate with evidence if it persists' }
        ],
        correctOrder: ['path', 'scope', 'connectivity', 'escalate'],
        rubric: ['Confirms context', 'Checks scope', 'Escalates with evidence']
      }),
      scenarioResponse({
        id: 'aplus-svc-q4',
        prompt:
          'A staff member says “printing is broken.” Describe the key clarifying questions that reveal whether it’s a service/queue issue or a device fault.',
        domain: 'A+ Network services',
        difficulty: 'challenge',
        explanation: 'Clarifying questions isolate the category quickly.',
        modelAnswer:
          'Ask which printer/queue, whether others can print, whether jobs are stuck spooling or reach the printer, and whether the printer has an error on its panel. That separates user targeting, queue/service path, and device-side faults.',
        commonMistakes: ['Treating all printing issues as hardware', 'Skipping the queue/target questions'],
        dcsContext: 'Schools often have multiple printers and shared queues; targeting mistakes are common.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        rubric: ['Asks for queue/printer name', 'Checks scope', 'Separates queue vs device symptoms']
      }),
      mcq({
        id: 'aplus-svc-q5',
        prompt: 'A device can join Wi‑Fi but keeps showing 169.254.x.x. Which service category is most suspect?',
        domain: 'A+ Network services',
        difficulty: 'foundation',
        explanation: 'APIPA commonly indicates lease failure.',
        modelAnswer: 'DHCP lease acquisition is the most suspect service category.',
        commonMistakes: ['Blaming DNS immediately', 'Ignoring the IP address evidence'],
        dcsContext: 'This is a common classroom symptom when onboarding or DHCP paths are failing.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        options: [
          { id: 'a', label: 'DHCP' },
          { id: 'b', label: 'DNS' },
          { id: 'c', label: 'Print server' },
          { id: 'd', label: 'SMTP' }
        ],
        correctOptionId: 'a'
      }),
      explainItSimply({
        id: 'aplus-svc-q6',
        prompt: 'Explain DNS in one sentence using plain English.',
        domain: 'A+ Network services',
        difficulty: 'foundation',
        explanation: 'One-line recall builds speed.',
        modelAnswer: 'DNS is the system that turns names like websites into the IP addresses computers use.',
        commonMistakes: ['Confusing DNS with internet access itself', 'Overcomplicating the definition'],
        dcsContext: 'This explanation helps during quick walk-up support.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        rubric: ['One sentence', 'Plain English', 'Correct meaning'],
        keywordHints: ['names', 'IP address']
      }),
      shortAnswer({
        id: 'aplus-svc-q7',
        prompt: 'Give two examples of “scope evidence” that strengthen a suspected service outage note.',
        domain: 'A+ Network services',
        difficulty: 'stretch',
        explanation: 'Scope evidence turns guessing into useful escalation.',
        modelAnswer:
          'Examples: multiple users affected across different devices; multiple rooms/campuses affected; comparison device on same SSID works/does not work; exact times observed.',
        commonMistakes: ['Only one-user evidence', 'No time/location'],
        dcsContext: 'Scope evidence is what lets service owners triage faster.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        rubric: ['Mentions multiple users/devices', 'Mentions location/time', 'Shows comparison thinking'],
        keywordHints: ['multiple', 'time', 'location', 'compare']
      }),
      orderSteps({
        id: 'aplus-svc-q8',
        prompt: 'Order a safe response to “shared drive access denied.”',
        domain: 'A+ Network services',
        difficulty: 'stretch',
        explanation: 'Context first, then scope, then escalation.',
        modelAnswer:
          'Confirm the exact path and account, confirm scope (others affected), try a web/alternate access check if appropriate, then escalate with evidence.',
        commonMistakes: ['Jumping straight to permissions changes', 'Skipping scope checks'],
        dcsContext: 'Access requests often need approval and the right owner.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-network-services',
        weakTopic: 'a-plus-network-services',
        steps: [
          { id: 'path', label: 'Confirm exact path and account in use' },
          { id: 'scope', label: 'Check whether others are affected' },
          { id: 'alt', label: 'Try an alternate access method (web vs app) if safe' },
          { id: 'escalate', label: 'Escalate to the right owner with evidence' }
        ],
        correctOrder: ['path', 'scope', 'alt', 'escalate'],
        rubric: ['Correct order', 'Avoids unsafe permission changes', 'Escalates cleanly']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-svc-s1', title: 'DNS vs internet', prompt: 'Turn “internet down” into a DNS evidence check.' }
    ],
    practicalOutputs: [
      { id: 'aplus-svc-p1', title: 'Service triage note template', description: 'Create a reusable escalation note template for service-style incidents.' }
    ]
  },
  {
    id: 'aplus-core1-hardware-fundamentals',
    title: 'A+ Core 1: Hardware Fundamentals (storage, memory, boards)',
    description:
      'Core PC hardware you troubleshoot: memory, storage, motherboards/firmware, expansion, cooling, and power basics.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 26,
    tags: ['A+ 220-1201', 'RAM', 'storage', 'motherboards', 'BIOS/UEFI', 'cooling', 'power'],
    learningObjectives: [
      'Recognise RAM vs storage symptoms and basic diagnostic ideas.',
      'Describe motherboard/firmware roles (BIOS/UEFI) at a support level.',
      'Explain why cooling and power faults look like “random” issues.'
    ],
    dcsRelevance: [
      'You’ll see sluggish performance, boot issues, and overheating across staff and lab devices.',
      'Knowing the hardware categories improves your troubleshooting questions.',
      'Better hardware language helps you avoid wasting time on the wrong subsystem.'
    ],
    sections: [
      {
        id: 'aplus-hw-1',
        title: 'Memory vs storage: symptoms differ',
        bodyMarkdown:
          'RAM issues often present as crashes, instability, or failed boots. Storage issues often present as slow performance, read/write errors, or missing drives.\n\nSupport value comes from matching symptom to subsystem before choosing tools.'
      },
      {
        id: 'aplus-hw-2',
        title: 'Motherboard and firmware roles',
        bodyMarkdown:
          'The motherboard connects components; BIOS/UEFI is the firmware layer that initializes hardware at boot.\n\nYou don’t need to memorize every setting. You do need to know that firmware settings can change boot behavior, device visibility, and security features.'
      },
      {
        id: 'aplus-hw-3',
        title: 'Cooling and power: why issues look random',
        bodyMarkdown:
          'Overheating and unstable power can cause intermittent shutdowns, throttling, or weird performance swings.\n\nWhen a symptom seems inconsistent, consider heat and power as first-class suspects and capture environment evidence.'
      }
    ],
    flashcards: [
      { id: 'aplus-hw-f1', front: 'RAM issues often show up as what?', back: 'Instability, crashes, or failed boots.' },
      { id: 'aplus-hw-f2', front: 'Storage issues often show up as what?', back: 'Slow performance, read/write errors, or drive not detected.' },
      { id: 'aplus-hw-f3', front: 'What does the motherboard do?', back: 'Connects and coordinates hardware components.' },
      { id: 'aplus-hw-f4', front: 'What is BIOS/UEFI in one line?', back: 'Firmware that initializes hardware and manages boot configuration.' },
      { id: 'aplus-hw-f5', front: 'Why do overheating issues feel intermittent?', back: 'Temperature varies over time and triggers throttling/shutdown under load.' },
      { id: 'aplus-hw-f6', front: 'Why can power issues look “weird”?', back: 'Unstable power causes unpredictable resets, device dropouts, or failures.' },
      { id: 'aplus-hw-f7', front: 'What is an expansion card?', back: 'A card added to provide extra capabilities (network, video, capture, etc.).' },
      { id: 'aplus-hw-f8', front: 'What is a common first evidence check for overheating?', back: 'Fan noise/vents blocked, temperature symptoms under load, and recent environment changes.' },
      { id: 'aplus-hw-f9', front: 'What is RAID at a high level?', back: 'Combining drives for performance and/or redundancy.' },
      { id: 'aplus-hw-f10', front: 'Why is “it’s slow” not a diagnosis?', back: 'It can be CPU, RAM, storage, thermal throttling, or software—clarify evidence first.' }
    ],
    quiz: [
      mcq({
        id: 'aplus-hw-q1',
        prompt: 'A PC shuts down only after 10–15 minutes of use, especially during video. Which category should you consider early?',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'foundation',
        explanation: 'Heat-related symptoms often correlate with time and load.',
        modelAnswer: 'Overheating/cooling should be considered early because heat builds with time and load.',
        commonMistakes: ['Replacing random components immediately', 'Ignoring the time/load correlation'],
        dcsContext: 'School devices can overheat due to dust, blocked vents, or environment.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        options: [
          { id: 'a', label: 'Printer driver mismatch' },
          { id: 'b', label: 'Cooling/overheating' },
          { id: 'c', label: 'DNS configuration' },
          { id: 'd', label: 'Bluetooth pairing' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'aplus-hw-q2',
        prompt: 'Explain (briefly) how RAM symptoms often differ from storage symptoms.',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'stretch',
        explanation: 'Different subsystems fail differently.',
        modelAnswer:
          'RAM issues often cause instability (crashes, random errors, boot failures). Storage issues often cause slow performance, read/write errors, corruption symptoms, or missing-drive detection problems.',
        commonMistakes: ['Calling all slowness “RAM”', 'Ignoring error patterns'],
        dcsContext: 'This helps you ask better questions before touching anything.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        rubric: ['Mentions instability for RAM', 'Mentions read/write or detection for storage', 'Keeps it clear'],
        keywordHints: ['crash', 'instability', 'read/write', 'slow']
      }),
      orderSteps({
        id: 'aplus-hw-q3',
        prompt: 'Order a safe approach for a “random reboots” complaint.',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'stretch',
        explanation: 'Evidence first, then reversible checks.',
        modelAnswer:
          'Clarify timing and triggers, check power/cable/charger or PSU context, check heat/ventilation, then escalate or run deeper diagnostics as appropriate.',
        commonMistakes: ['Changing many settings immediately', 'Ignoring power and heat'],
        dcsContext: 'Unstable power and heat are common in busy environments.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        steps: [
          { id: 'clarify', label: 'Clarify timing and triggers (load/time)' },
          { id: 'power', label: 'Check power path (cables/adapter/PSU) evidence' },
          { id: 'heat', label: 'Check heat/ventilation evidence' },
          { id: 'next', label: 'Escalate or run deeper diagnostics with the evidence' }
        ],
        correctOrder: ['clarify', 'power', 'heat', 'next'],
        rubric: ['Starts with evidence', 'Checks power and heat early', 'Chooses next step safely']
      }),
      scenarioResponse({
        id: 'aplus-hw-q4',
        prompt:
          'A lab PC is “very slow” and the student wants it fixed immediately. Write the first three clarifying questions that prevent you chasing the wrong subsystem.',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'challenge',
        explanation: 'Good troubleshooting starts with narrowing the symptom.',
        modelAnswer:
          'Ask: when did it start, does it happen in all apps or one, and do you see specific errors (disk warnings, crashes, overheating, long boot). Then decide whether the likely path is storage, memory, thermal, or software.',
        commonMistakes: ['Skipping clarification', 'Assuming one cause for all slowness'],
        dcsContext: 'Lab environments have many variables; the first questions matter.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        rubric: ['Asks about timing', 'Asks about scope', 'Asks about evidence/errors']
      }),
      mcq({
        id: 'aplus-hw-q5',
        prompt: 'Which symptom most strongly suggests a storage problem rather than a RAM problem?',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'foundation',
        explanation: 'Storage faults often show read/write or detection errors.',
        modelAnswer: 'Repeated disk read/write errors or a missing drive suggests storage more than RAM.',
        commonMistakes: ['Calling all instability “disk”', 'Calling all slowness “RAM”'],
        dcsContext: 'Symptom-to-subsystem matching reduces wasted work.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        options: [
          { id: 'a', label: 'Random app crashes without disk errors' },
          { id: 'b', label: 'Drive not detected or recurring read/write errors' },
          { id: 'c', label: 'Intermittent Wi‑Fi drops' },
          { id: 'd', label: 'Bluetooth headset won’t pair' }
        ],
        correctOptionId: 'b'
      }),
      explainItSimply({
        id: 'aplus-hw-q6',
        prompt: 'Explain BIOS/UEFI in one sentence.',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'foundation',
        explanation: 'One-line recall matters in fast support contexts.',
        modelAnswer: 'BIOS/UEFI is the firmware that starts the computer and initializes hardware before the OS loads.',
        commonMistakes: ['Calling it the operating system', 'Describing settings details instead of the role'],
        dcsContext: 'Support often needs the role definition more than the configuration detail.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        rubric: ['One sentence', 'Mentions firmware and startup role', 'Clear wording'],
        keywordHints: ['firmware', 'start', 'hardware']
      }),
      shortAnswer({
        id: 'aplus-hw-q7',
        prompt: 'Name three signs that “random issues” could be power or heat related.',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'stretch',
        explanation: 'Time/load correlation is a strong clue.',
        modelAnswer:
          'Examples: shutdowns under load after time, hot chassis or loud fans, throttling/slowness that worsens with use, issues stop after cooling, or flickering power/charging behavior.',
        commonMistakes: ['Listing only one sign', 'Ignoring time correlation'],
        dcsContext: 'Heat and power are common hidden causes in busy school device fleets.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        rubric: ['Includes time/load correlation', 'Includes temperature or fan evidence', 'Includes instability evidence'],
        keywordHints: ['load', 'time', 'hot', 'fan']
      }),
      orderSteps({
        id: 'aplus-hw-q8',
        prompt: 'Order a safe first-line check sequence for “laptop overheating.”',
        domain: 'A+ Hardware fundamentals',
        difficulty: 'stretch',
        explanation: 'Simple environmental checks first.',
        modelAnswer:
          'Confirm symptom and timing, check vents/airflow and environment, check for heavy load/processes, then escalate/clean/service as appropriate.',
        commonMistakes: ['Opening the device without approval', 'Skipping airflow/environment checks'],
        dcsContext: 'In-school support often starts with airflow and usage checks before any hardware intervention.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-hardware-fundamentals',
        weakTopic: 'a-plus-hardware',
        steps: [
          { id: 'timing', label: 'Confirm symptom, timing, and triggers' },
          { id: 'airflow', label: 'Check vents/airflow and environment (blocked vents, dust, surface)' },
          { id: 'load', label: 'Check heavy load indicators (fans, high usage, recent changes)' },
          { id: 'next', label: 'Escalate/clean/service with evidence if unresolved' }
        ],
        correctOrder: ['timing', 'airflow', 'load', 'next'],
        rubric: ['Starts with evidence', 'Checks environment', 'Escalates safely']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-hw-s1', title: 'Random reboot triage', prompt: 'Decide whether to suspect heat, power, or software first.' }
    ],
    practicalOutputs: [
      { id: 'aplus-hw-p1', title: 'Hardware symptom map', description: 'Create a symptom-to-subsystem map (RAM vs storage vs thermal vs power).' }
    ]
  },
  {
    id: 'aplus-core1-cables-connectors',
    title: 'A+ Core 1: Cables & Connectors (network, USB, video, storage)',
    description:
      'Cables, connectors, and adapters that show up constantly in support: network wiring, USB/Thunderbolt, video, and storage connections.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 24,
    tags: ['A+ 220-1201', 'cables', 'connectors', 'USB-C', 'HDMI', 'DisplayPort', 'RJ45'],
    learningObjectives: [
      'Identify common connector types and what they’re used for.',
      'Explain why adapters/docks cause “works sometimes” problems.',
      'Use cable knowledge to ask the right clarifying questions quickly.'
    ],
    dcsRelevance: [
      'Classroom AV and docking issues are often cable/adapter issues.',
      'Network cabling matters for desk drops, printers, and switches.',
      'Being fluent with connectors reduces trial-and-error in front of staff.'
    ],
    sections: [
      {
        id: 'aplus-cable-1',
        title: 'Name the connector before guessing the fix',
        bodyMarkdown:
          'Support accelerates when you name what you see: HDMI vs DisplayPort, USB‑A vs USB‑C, RJ45 vs RJ11.\n\nMany “device broken” problems are actually “wrong connector/wrong adapter/wrong direction.”'
      },
      {
        id: 'aplus-cable-2',
        title: 'Adapters, docks, and directionality',
        bodyMarkdown:
          'Adapters can be passive or active and may depend on direction (e.g., some conversions only work one way). Docks add complexity: power delivery, video output, data lanes, and driver/firmware layers.\n\nIf a setup is intermittent, suspect the dock/adapter path early and try a known-good comparison.'
      },
      {
        id: 'aplus-cable-3',
        title: 'Network cabling basics that show up in real support',
        bodyMarkdown:
          'Ethernet uses twisted pair with RJ45 connectors. A cable issue can look like intermittent connectivity, slow speeds, or no link.\n\nIn support notes, capture which port and which cable was used, and whether a known-good cable fixes it.'
      }
    ],
    flashcards: [
      { id: 'aplus-cable-f1', front: 'RJ45 is used for what?', back: 'Ethernet networking.' },
      { id: 'aplus-cable-f2', front: 'HDMI is used for what?', back: 'Digital video and often audio.' },
      { id: 'aplus-cable-f3', front: 'DisplayPort is used for what?', back: 'Digital video (and often audio), common on PCs/monitors.' },
      { id: 'aplus-cable-f4', front: 'USB‑C can carry what kinds of signals?', back: 'Power, data, and sometimes video (depending on device and mode).' },
      { id: 'aplus-cable-f5', front: 'Why can docks cause intermittent issues?', back: 'They combine power/video/data paths and can be sensitive to cable/firmware/port differences.' },
      { id: 'aplus-cable-f6', front: 'What is a “known-good comparison” in cable troubleshooting?', back: 'Swapping in a tested cable/adapter to isolate the failure link.' },
      { id: 'aplus-cable-f7', front: 'What should you capture in a cable-related escalation note?', back: 'Cable type, adapter/dock, ports used, and what was tested.' },
      { id: 'aplus-cable-f8', front: 'Why does directionality matter for some adapters?', back: 'Some conversions only work in one direction or require active conversion.' },
      { id: 'aplus-cable-f9', front: 'What is a common symptom of a bad network cable?', back: 'No link, intermittent drops, or reduced speed.' },
      { id: 'aplus-cable-f10', front: 'What is a practical first question for a “no display” issue?', back: 'What cable/adapter/dock path is being used and what input is selected?' }
    ],
    quiz: [
      mcq({
        id: 'aplus-cable-q1',
        prompt: 'A laptop shows video on a board but no audio. Which cable type commonly carries both video and audio?',
        domain: 'A+ Cables & connectors',
        difficulty: 'foundation',
        explanation: 'Some cables commonly carry both.',
        modelAnswer: 'HDMI commonly carries both digital video and audio.',
        commonMistakes: ['Assuming audio is impossible over display links', 'Blaming the speakers first without checking output device'],
        dcsContext: 'Classroom AV issues are often output routing, not cable failure.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        options: [
          { id: 'a', label: 'RJ45' },
          { id: 'b', label: 'HDMI' },
          { id: 'c', label: 'RJ11' },
          { id: 'd', label: 'SATA' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'aplus-cable-q2',
        prompt: 'Why is “try a known-good cable/adapter” such a powerful troubleshooting move?',
        domain: 'A+ Cables & connectors',
        difficulty: 'stretch',
        explanation: 'It isolates the failing link quickly.',
        modelAnswer:
          'Because it isolates whether the current cable/adapter path is the failure point. If a known-good replacement works, you’ve narrowed the fault to the original link without changing many settings.',
        commonMistakes: ['Changing many settings first', 'Swapping multiple things at once so the result is unclear'],
        dcsContext: 'In front-of-class troubleshooting, fast isolation matters.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        rubric: ['Mentions isolation', 'Mentions reducing variables', 'Mentions avoiding risky changes'],
        keywordHints: ['isolate', 'variables', 'known-good']
      }),
      orderSteps({
        id: 'aplus-cable-q3',
        prompt: 'Order the best cable-path troubleshooting steps for “no display on monitor.”',
        domain: 'A+ Cables & connectors',
        difficulty: 'stretch',
        explanation: 'Work the chain from obvious to isolating.',
        modelAnswer:
          'Confirm the selected input, confirm cable seating, try a known-good cable/port, then escalate with evidence if it persists.',
        commonMistakes: ['Skipping input selection', 'Swapping everything simultaneously'],
        dcsContext: 'Most display faults are input/cable-path issues.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        steps: [
          { id: 'input', label: 'Confirm the monitor/board input selection' },
          { id: 'seat', label: 'Reseat cable and check connector fit' },
          { id: 'known-good', label: 'Try a known-good cable/port or adapter' },
          { id: 'escalate', label: 'Escalate with what was tested and observed' }
        ],
        correctOrder: ['input', 'seat', 'known-good', 'escalate'],
        rubric: ['Checks input first', 'Uses known-good comparison', 'Captures evidence']
      }),
      scenarioResponse({
        id: 'aplus-cable-q4',
        prompt:
          'A user has a USB‑C dock that works on one laptop but not another. Explain what you would capture before escalating.',
        domain: 'A+ Cables & connectors',
        difficulty: 'challenge',
        explanation: 'USB‑C capabilities vary by device.',
        modelAnswer:
          'Capture which laptops were tested, what functions fail (power/video/network), what cables are used, which ports, whether the dock works with a known-good configuration, and whether the laptop supports the required USB‑C features for video or power delivery.',
        commonMistakes: ['Assuming all USB‑C ports are identical', 'Escalating with no comparison evidence'],
        dcsContext: 'Port capabilities and dock firmware can differ across device models.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        rubric: ['Captures scope and comparison', 'Names which functions fail', 'Avoids false assumptions']
      }),
      mcq({
        id: 'aplus-cable-q5',
        prompt: 'Which connector is most associated with Ethernet networking?',
        domain: 'A+ Cables & connectors',
        difficulty: 'foundation',
        explanation: 'Connector recognition is a support accelerator.',
        modelAnswer: 'RJ45 is the common Ethernet connector.',
        commonMistakes: ['Mixing RJ45 and RJ11', 'Calling all modular plugs “phone plugs”'],
        dcsContext: 'Schools often use Ethernet for printers, desk drops, and AP uplinks.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        options: [
          { id: 'a', label: 'RJ45' },
          { id: 'b', label: 'RJ11' },
          { id: 'c', label: 'DB-9' },
          { id: 'd', label: 'Lightning' }
        ],
        correctOptionId: 'a'
      }),
      explainItSimply({
        id: 'aplus-cable-q6',
        prompt: 'Explain why adapters/docks can create “it works sometimes” display problems.',
        domain: 'A+ Cables & connectors',
        difficulty: 'foundation',
        explanation: 'Multiple layers increase failure points.',
        modelAnswer:
          'Adapters and docks add extra links (power, video mode negotiation, drivers/firmware). Small differences between ports or cables can break the chain, so problems can appear intermittent.',
        commonMistakes: ['Assuming all USB‑C ports behave the same', 'Blaming the display first without checking the chain'],
        dcsContext: 'Classroom and meeting rooms often rely on docks and adapters.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        rubric: ['Mentions extra links', 'Mentions negotiation/firmware or port capability', 'Plain English'],
        keywordHints: ['adapter', 'dock', 'chain', 'firmware']
      }),
      shortAnswer({
        id: 'aplus-cable-q7',
        prompt: 'List three details you should capture when escalating a recurring HDMI/display cable issue.',
        domain: 'A+ Cables & connectors',
        difficulty: 'stretch',
        explanation: 'Cable-path evidence drives faster resolution.',
        modelAnswer:
          'Capture: room/location, cable type/length and adapter/dock used, which ports were tested, and whether a known-good cable/source works.',
        commonMistakes: ['No room detail', 'No mention of adapters or ports tested'],
        dcsContext: 'Small evidence details reduce repeat visits and guesswork.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        rubric: ['Includes location', 'Includes cable/adapter details', 'Includes tests performed'],
        keywordHints: ['room', 'adapter', 'port', 'known-good']
      }),
      orderSteps({
        id: 'aplus-cable-q8',
        prompt: 'Order the fastest way to isolate whether a cable or the device is at fault.',
        domain: 'A+ Cables & connectors',
        difficulty: 'stretch',
        explanation: 'Known-good comparisons isolate the failing link.',
        modelAnswer:
          'Swap one link at a time using known-good: cable first, then port/adapter, then source device, then escalate with the results.',
        commonMistakes: ['Swapping everything at once', 'Not recording what changed'],
        dcsContext: 'Isolating one link at a time is the difference between troubleshooting and guessing.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-cables-connectors',
        weakTopic: 'a-plus-cables-connectors',
        steps: [
          { id: 'cable', label: 'Try a known-good cable first' },
          { id: 'adapter', label: 'Try a different port/adapter/dock if applicable' },
          { id: 'source', label: 'Try a known-good source device if quick' },
          { id: 'escalate', label: 'Escalate with what worked/failed' }
        ],
        correctOrder: ['cable', 'adapter', 'source', 'escalate'],
        rubric: ['Changes one variable at a time', 'Uses known-good comparisons', 'Captures results']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-cable-s1', title: 'Dock mismatch', prompt: 'Explain why USB‑C ports differ and what to capture.' }
    ],
    practicalOutputs: [
      { id: 'aplus-cable-p1', title: 'Connector quick reference', description: 'Create a quick reference for common connectors and what they carry.' }
    ]
  },
  {
    id: 'aplus-core1-printers',
    title: 'A+ Core 1: Printers & Multifunction Devices',
    description:
      'Printer types, common failures, and maintenance concepts—plus the support thinking that separates queue issues from print-quality faults.',
    domain: 'Endpoint Support',
    level: 'A+',
    estimatedMinutes: 22,
    tags: ['A+ 220-1201', 'laser', 'inkjet', 'thermal', 'impact', 'MFD'],
    learningObjectives: [
      'Describe common printer types and typical failure patterns.',
      'Recognise print-quality symptoms that indicate consumables or hardware paths.',
      'Separate queue/targeting issues from device faults with clarifying questions.'
    ],
    dcsRelevance: [
      'Printers can block staff workflows quickly in a school environment.',
      'Knowing the difference between queue issues and fuser/toner issues saves time.',
      'Clear printer notes speed up escalation and reduce repeated back-and-forth.'
    ],
    sections: [
      {
        id: 'aplus-print-1',
        title: 'Printer types and what fails',
        bodyMarkdown:
          'Laser printers often fail via consumables and bonding processes (toner, drum, fuser). Inkjet failures often involve clogged heads, cartridges, or feed paths. Thermal printers depend on heat and thermal paper.\n\nThe type often predicts the likely symptom pattern.'
      },
      {
        id: 'aplus-print-2',
        title: 'Queue problems vs device problems',
        bodyMarkdown:
          'A job stuck in a queue, printing to the wrong target, or offline status is a print-path problem. Smearing, rubbing off, streaks, or faint output is a print-quality problem.\n\nDon’t mix those categories: they escalate differently.'
      },
      {
        id: 'aplus-print-3',
        title: 'Maintenance thinking without overstepping',
        bodyMarkdown:
          'Basic checks include paper/jams, toner status, and a benign test print. Service-level fixes depend on policy and contracts.\n\nCapture the symptom, scope, and what you tested so the next step is obvious.'
      }
    ],
    flashcards: [
      { id: 'aplus-print-f1', front: 'Laser printer toner rubbing off suggests what category?', back: 'Print-quality / bonding (often fuser/consumable path) rather than queue targeting.' },
      { id: 'aplus-print-f2', front: 'Queue issue vs device issue: one clue?', back: 'Queue issues show stuck jobs/offline; device issues show panel errors or print-quality faults.' },
      { id: 'aplus-print-f3', front: 'Inkjet common maintenance issue?', back: 'Clogged print heads or cartridge problems.' },
      { id: 'aplus-print-f4', front: 'Thermal printers require what special supply?', back: 'Thermal paper.' },
      { id: 'aplus-print-f5', front: 'Impact printers are like what?', back: 'Dot-matrix style: physical striking against paper.' },
      { id: 'aplus-print-f6', front: 'What is an MFD?', back: 'Multifunction device: printer/scanner/copier/fax combined.' },
      { id: 'aplus-print-f7', front: 'Why use a benign test print?', back: 'Avoid printing sensitive content while testing.' },
      { id: 'aplus-print-f8', front: 'Key escalation note details for a printer fault?', back: 'Printer ID/location, exact symptom, scope, steps tried, and any panel message.' },
      { id: 'aplus-print-f9', front: 'What is a common first question for “printing broken”?', back: 'Which printer/queue and does it affect others?' },
      { id: 'aplus-print-f10', front: 'What is calibration in one line?', back: 'A process to align/standardize print output quality.' }
    ],
    quiz: [
      mcq({
        id: 'aplus-print-q1',
        prompt: 'Which symptom most strongly points to a print-quality issue rather than a queue issue?',
        domain: 'A+ Printers',
        difficulty: 'foundation',
        explanation: 'Print-quality symptoms map to consumables/hardware paths.',
        modelAnswer: 'Toner rubbing off or smudging indicates a print-quality/bonding problem.',
        commonMistakes: ['Treating smudging as a driver issue', 'Focusing only on queue status'],
        dcsContext: 'Correct categorization makes escalation faster.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        options: [
          { id: 'a', label: 'Jobs stuck “Spooling” in the user queue' },
          { id: 'b', label: 'Toner rubs off the paper when touched' },
          { id: 'c', label: 'User printed to the wrong printer' },
          { id: 'd', label: 'Printer shows offline on one computer only' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'aplus-print-q2',
        prompt: 'List the top four pieces of information you want before escalating a printer issue.',
        domain: 'A+ Printers',
        difficulty: 'stretch',
        explanation: 'The note is the product.',
        modelAnswer: 'Printer ID/location, exact symptom, scope (who else is affected), and steps tried/panel messages.',
        commonMistakes: ['No location', 'No scope', 'No steps tried'],
        dcsContext: 'School environments have many similar devices; location is key.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        rubric: ['Includes location', 'Includes symptom', 'Includes scope', 'Includes steps tried'],
        keywordHints: ['location', 'scope', 'symptom', 'panel']
      }),
      orderSteps({
        id: 'aplus-print-q3',
        prompt: 'Order the fastest flow for “jobs stuck in queue.”',
        domain: 'A+ Printers',
        difficulty: 'stretch',
        explanation: 'Targeting + scope before deeper changes.',
        modelAnswer:
          'Confirm correct printer/queue, check if others are affected, clear/retry a benign test print, then escalate if it’s a shared queue issue.',
        commonMistakes: ['Jumping to hardware repairs', 'Ignoring whether it’s one user'],
        dcsContext: 'Many queue problems are user targeting or local spool issues.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        steps: [
          { id: 'target', label: 'Confirm correct printer/queue' },
          { id: 'scope', label: 'Check whether others are affected' },
          { id: 'test', label: 'Clear/retry with a benign test print' },
          { id: 'escalate', label: 'Escalate if it appears shared/systemic' }
        ],
        correctOrder: ['target', 'scope', 'test', 'escalate'],
        rubric: ['Checks targeting', 'Checks scope', 'Escalates correctly']
      }),
      scenarioResponse({
        id: 'aplus-print-q4',
        prompt:
          'A staff member says the printer is “broken.” Write the two clarifying questions that most quickly split queue issues from device issues.',
        domain: 'A+ Printers',
        difficulty: 'challenge',
        explanation: 'Two questions can save ten minutes.',
        modelAnswer:
          'Ask: which printer/queue are you printing to, and does it affect other users? Then check whether jobs are stuck on the PC (queue) versus an error on the printer panel or print-quality fault (device).',
        commonMistakes: ['Not asking which printer', 'Not checking scope'],
        dcsContext: 'Schools have many printers; mis-targeting is common.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        rubric: ['Asks which printer/queue', 'Asks scope', 'Connects questions to the split']
      }),
      mcq({
        id: 'aplus-print-q5',
        prompt: 'Which printer type relies on heat-sensitive paper to produce output?',
        domain: 'A+ Printers',
        difficulty: 'foundation',
        explanation: 'Printer type recognition guides expectations.',
        modelAnswer: 'Thermal printers rely on thermal paper and heat.',
        commonMistakes: ['Confusing thermal with laser', 'Assuming all printers use ink or toner'],
        dcsContext: 'Knowing the type helps you predict which “supplies” matter.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        options: [
          { id: 'a', label: 'Laser' },
          { id: 'b', label: 'Thermal' },
          { id: 'c', label: 'Inkjet' },
          { id: 'd', label: 'Impact' }
        ],
        correctOptionId: 'b'
      }),
      explainItSimply({
        id: 'aplus-print-q6',
        prompt: 'Explain why “jobs stuck spooling” is a different category from “toner rubs off.”',
        domain: 'A+ Printers',
        difficulty: 'foundation',
        explanation: 'Category separation improves troubleshooting speed.',
        modelAnswer:
          'Spooling is about the job getting from the computer to the printer (queue/path). Toner rubbing off is about print quality and how the printer bonds toner to paper (device/consumable path).',
        commonMistakes: ['Treating all printer issues as the same', 'Trying queue fixes for print-quality faults'],
        dcsContext: 'Different categories require different checks and escalation language.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        rubric: ['Separates queue from quality', 'Mentions job path vs bonding', 'Plain English'],
        keywordHints: ['queue', 'path', 'quality', 'bond']
      }),
      shortAnswer({
        id: 'aplus-print-q7',
        prompt: 'Name two safe test actions for a suspected print-quality issue.',
        domain: 'A+ Printers',
        difficulty: 'stretch',
        explanation: 'Tests should be low-risk and privacy-safe.',
        modelAnswer:
          'Print a benign test page, check paper type/stock, and check the printer panel/consumable status.',
        commonMistakes: ['Printing sensitive documents to test', 'Changing advanced settings without evidence'],
        dcsContext: 'Use benign tests in a school environment to protect privacy.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        rubric: ['Benign test', 'Mentions consumables/panel', 'Low-risk'],
        keywordHints: ['test page', 'panel', 'paper']
      }),
      orderSteps({
        id: 'aplus-print-q8',
        prompt: 'Order the escalation evidence for a toner-smudge complaint.',
        domain: 'A+ Printers',
        difficulty: 'stretch',
        explanation: 'Evidence should be specific and reproducible.',
        modelAnswer:
          'Identify printer/location, describe the symptom clearly, confirm scope, note paper type and test print, then escalate with that evidence.',
        commonMistakes: ['No printer ID', 'No scope', 'No test'],
        dcsContext: 'Service calls are faster when evidence is concrete and repeatable.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-printers',
        weakTopic: 'a-plus-printers',
        steps: [
          { id: 'id', label: 'Record printer ID/location' },
          { id: 'symptom', label: 'Describe the exact print-quality symptom' },
          { id: 'scope', label: 'Confirm whether multiple users/jobs show it' },
          { id: 'test', label: 'Run a benign test print and note paper type' }
        ],
        correctOrder: ['id', 'symptom', 'scope', 'test'],
        rubric: ['Has ID', 'Has symptom', 'Has scope and test evidence']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-print-s1', title: 'Smudging vs spooling', prompt: 'Classify the symptom and choose the right escalation language.' }
    ],
    practicalOutputs: [
      { id: 'aplus-print-p1', title: 'Printer triage table', description: 'Build a small table mapping symptom → category → first checks.' }
    ]
  },
  {
    id: 'aplus-core1-virtualization-cloud',
    title: 'A+ Core 1: Virtualization & Cloud',
    description:
      'Core ideas: virtualization, hypervisors, containers, VDI, and cloud model thinking used in modern support conversations.',
    domain: 'Cloud and Platforms',
    level: 'A+',
    estimatedMinutes: 20,
    tags: ['A+ 220-1201', 'virtualization', 'hypervisors', 'VDI', 'containers', 'cloud'],
    learningObjectives: [
      'Explain virtualization and why it’s useful in testing and legacy support.',
      'Differentiate type 1 vs type 2 hypervisors at a high level.',
      'Describe cloud models using the responsibility-layer lens.'
    ],
    dcsRelevance: [
      'You’ll meet hosted services and virtual environments in school IT even at Level 1.',
      'Virtualization language helps you interpret “this app only works on X” situations.',
      'Cloud-model thinking improves escalation routing and expectations.'
    ],
    sections: [
      {
        id: 'aplus-virt-1',
        title: 'Virtualization: why it exists',
        bodyMarkdown:
          'Virtualization runs one or more virtual machines (VMs) on shared hardware. It’s useful for testing, development, isolation, and running older systems.\n\nSupport value: you learn to separate the host from the guest and avoid “fixes” in the wrong layer.'
      },
      {
        id: 'aplus-virt-2',
        title: 'Hypervisors and VDI in support language',
        bodyMarkdown:
          'A type 1 hypervisor runs directly on hardware; type 2 runs on top of an OS. Virtual Desktop Infrastructure (VDI) delivers a desktop environment as a service.\n\nIn tickets, capture whether the issue is inside the virtual desktop/app or on the local device.'
      },
      {
        id: 'aplus-virt-3',
        title: 'Cloud: responsibility layers',
        bodyMarkdown:
          'The most useful cloud question is: who owns which layer? SaaS gives the app; IaaS gives infrastructure resources; PaaS gives a platform layer; DaaS delivers a desktop.\n\nUse these labels to clarify, not to bluff.'
      }
    ],
    flashcards: [
      { id: 'aplus-virt-f1', front: 'Virtualization in one line?', back: 'Running virtual machines on shared hardware.' },
      { id: 'aplus-virt-f2', front: 'Type 1 vs type 2 hypervisor?', back: 'Type 1 runs on hardware; type 2 runs on top of an OS.' },
      { id: 'aplus-virt-f3', front: 'What is VDI?', back: 'Virtual Desktop Infrastructure: desktops delivered from a centralized environment.' },
      { id: 'aplus-virt-f4', front: 'Why does “host vs guest” matter?', back: 'Fixes in the wrong layer waste time and can break other things.' },
      { id: 'aplus-virt-f5', front: 'SaaS provides what?', back: 'The application/service layer.' },
      { id: 'aplus-virt-f6', front: 'IaaS provides what?', back: 'Infrastructure resources like compute, storage, networking.' },
      { id: 'aplus-virt-f7', front: 'PaaS provides what?', back: 'A platform layer for running/building apps.' },
      { id: 'aplus-virt-f8', front: 'DaaS provides what?', back: 'Desktop environments as a service.' },
      { id: 'aplus-virt-f9', front: 'Why is virtualization useful for legacy apps?', back: 'You can run older OS/app environments without changing the host.' },
      { id: 'aplus-virt-f10', front: 'What evidence matters in a VDI complaint?', back: 'Whether the issue reproduces on another device/user and whether local network/auth is involved.' }
    ],
    quiz: [
      mcq({
        id: 'aplus-virt-q1',
        prompt: 'Which statement best describes a type 1 hypervisor?',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'foundation',
        explanation: 'Type 1 is closer to the hardware layer.',
        modelAnswer: 'A type 1 hypervisor runs directly on the hardware without a host OS layer.',
        commonMistakes: ['Mixing up type 1 and type 2', 'Treating containers as the same as VMs'],
        dcsContext: 'Understanding layers helps you explain where issues might live.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        options: [
          { id: 'a', label: 'Runs on top of a host OS like a normal application' },
          { id: 'b', label: 'Runs directly on the hardware layer' },
          { id: 'c', label: 'Only runs inside a web browser' },
          { id: 'd', label: 'Is the same thing as a VPN' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'aplus-virt-q2',
        prompt: 'Why is “host vs guest” a useful frame when troubleshooting virtual environments?',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'stretch',
        explanation: 'Layer clarity prevents wasted work.',
        modelAnswer:
          'Because it helps you decide whether the failure is in the virtual machine/application environment (guest) or in the underlying device/network/auth environment (host). Fixing the wrong layer wastes time and can create new issues.',
        commonMistakes: ['Treating all issues as local device problems', 'Changing many host settings when the guest is the issue'],
        dcsContext: 'Schools may run apps in virtual environments or hosted desktops.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        rubric: ['Mentions layers', 'Explains troubleshooting value', 'Avoids overclaiming'],
        keywordHints: ['layer', 'host', 'guest', 'evidence']
      }),
      orderSteps({
        id: 'aplus-virt-q3',
        prompt: 'Order a sensible first-line response for a VDI “my desktop is slow” complaint.',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'stretch',
        explanation: 'Scope + comparison before deep guesses.',
        modelAnswer:
          'Confirm scope (one user or many), test local network basics, compare another user/device, then escalate with evidence if it looks platform-wide.',
        commonMistakes: ['Assuming the host PC is always the cause', 'Escalating with no scope evidence'],
        dcsContext: 'VDI issues can be local network, auth, or platform capacity.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        steps: [
          { id: 'scope', label: 'Confirm whether it is one user or many' },
          { id: 'local', label: 'Check local network basics quickly' },
          { id: 'compare', label: 'Compare with another user/device if possible' },
          { id: 'escalate', label: 'Escalate with evidence if platform-wide' }
        ],
        correctOrder: ['scope', 'local', 'compare', 'escalate'],
        rubric: ['Checks scope', 'Uses comparison', 'Escalates with evidence']
      }),
      explainItSimply({
        id: 'aplus-virt-q4',
        prompt: 'Explain SaaS in one sentence without jargon.',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'foundation',
        explanation: 'One-liners make recall easy.',
        modelAnswer: 'SaaS is when you use a complete application delivered as an online service.',
        commonMistakes: ['Describing infrastructure details', 'Using marketing jargon'],
        dcsContext: 'Clear language helps you communicate with non-technical staff.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        rubric: ['One sentence', 'Plain language', 'Correct idea'],
        keywordHints: ['application', 'service', 'online']
      }),
      mcq({
        id: 'aplus-virt-q5',
        prompt: 'Which term best matches “desktop delivered as a service”?',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'foundation',
        explanation: 'Model labels can be learned with simple mapping.',
        modelAnswer: 'DaaS is desktop as a service.',
        commonMistakes: ['Mixing DaaS with SaaS', 'Treating VDI and DaaS as identical in all contexts'],
        dcsContext: 'Hosted desktop language helps you triage where issues might live.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        options: [
          { id: 'a', label: 'SaaS' },
          { id: 'b', label: 'PaaS' },
          { id: 'c', label: 'IaaS' },
          { id: 'd', label: 'DaaS' }
        ],
        correctOptionId: 'd'
      }),
      explainItSimply({
        id: 'aplus-virt-q6',
        prompt: 'Explain the difference between a VM and a container in one sentence (high level).',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'stretch',
        explanation: 'High-level distinctions are enough for A+ recall.',
        modelAnswer:
          'A VM virtualizes an entire OS environment, while a container packages an app and its dependencies while sharing the host OS kernel.',
        commonMistakes: ['Treating them as identical', 'Diving into unnecessary implementation detail'],
        dcsContext: 'You’ll hear both terms in modern IT conversations; the high-level split is the key.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        rubric: ['Mentions OS-level difference', 'One sentence', 'Clear'],
        keywordHints: ['OS', 'kernel', 'environment']
      }),
      shortAnswer({
        id: 'aplus-virt-q7',
        prompt: 'List three evidence checks that help separate “VDI platform issue” from “local device issue.”',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'stretch',
        explanation: 'Evidence is the bridge to the right owner.',
        modelAnswer:
          'Examples: does it reproduce on another device/network, does another user have the same issue, does local internet work outside VDI, and what time/scope is affected.',
        commonMistakes: ['No comparison tests', 'No scope'],
        dcsContext: 'VDI complaints can be local connectivity, auth, or platform capacity—evidence decides.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        rubric: ['Includes comparison', 'Includes scope/time', 'Separates local vs platform evidence'],
        keywordHints: ['compare', 'user', 'device', 'scope']
      }),
      orderSteps({
        id: 'aplus-virt-q8',
        prompt: 'Order the best first response for “my virtual desktop won’t log in.”',
        domain: 'A+ Virtualization and cloud',
        difficulty: 'stretch',
        explanation: 'Context and scope before deep fixes.',
        modelAnswer:
          'Confirm account and error, confirm scope (others impacted), confirm local connectivity basics, then escalate with evidence to the platform owner.',
        commonMistakes: ['Resetting many things first', 'Escalating without the error text'],
        dcsContext: 'Account and scope evidence shortens time-to-fix in identity/platform incidents.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-virtualization-cloud',
        weakTopic: 'a-plus-virtualization-cloud',
        steps: [
          { id: 'error', label: 'Confirm account in use and exact error message' },
          { id: 'scope', label: 'Check whether others are impacted' },
          { id: 'local', label: 'Confirm local connectivity basics' },
          { id: 'escalate', label: 'Escalate with error + scope evidence' }
        ],
        correctOrder: ['error', 'scope', 'local', 'escalate'],
        rubric: ['Captures error', 'Captures scope', 'Escalates cleanly']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-virt-s1', title: 'VDI slow desktop', prompt: 'Decide what evidence to gather before escalation.' }
    ],
    practicalOutputs: [
      { id: 'aplus-virt-p1', title: 'Virtualization layer checklist', description: 'Write a checklist for host vs guest evidence gathering.' }
    ]
  },
  {
    id: 'aplus-core1-troubleshooting',
    title: 'A+ Core 1: Troubleshooting Approach (hardware, network, printers)',
    description:
      'A consistent troubleshooting process: identify, scope, test safely, document, and escalate—with examples across hardware, network, and printing.',
    domain: 'Operations',
    level: 'A+',
    estimatedMinutes: 20,
    tags: ['A+ 220-1201', 'troubleshooting', 'scope', 'evidence', 'documentation'],
    learningObjectives: [
      'Use a repeatable troubleshooting process that starts with scope.',
      'Choose reversible checks before risky changes.',
      'Write short evidence-rich notes that move the issue forward.'
    ],
    dcsRelevance: [
      'School support is fast-paced; a consistent process prevents thrashing.',
      'Clear scope checks reduce disruption and stop unnecessary changes.',
      'Good documentation is the bridge from Level 1 to Level 2.'
    ],
    sections: [
      {
        id: 'aplus-triage-1',
        title: 'Start with scope and symptom clarity',
        bodyMarkdown:
          'Before you “fix,” describe: who is affected, where, what exactly is happening, and what still works.\n\nScope tells you whether you’re looking at a single device issue or something broader.'
      },
      {
        id: 'aplus-triage-2',
        title: 'Reversible checks beat risky changes',
        bodyMarkdown:
          'Prefer checks that are reversible and isolating: reseat, reconnect, reboot, known-good comparison, and basic configuration verification.\n\nIf a change could impact many users or break policy, stop and escalate.'
      },
      {
        id: 'aplus-triage-3',
        title: 'Document like you’re handing off',
        bodyMarkdown:
          'A great note includes: who/where/device, symptom, scope, steps tried, impact/urgency, and next action.\n\nYour future self and the next technician should be able to act from the note.'
      }
    ],
    flashcards: [
      { id: 'aplus-triage-f1', front: 'What is “scope” in troubleshooting?', back: 'How many users/devices/locations are affected.' },
      { id: 'aplus-triage-f2', front: 'Why do reversible checks come first?', back: 'They reduce risk and isolate causes without broad impact.' },
      { id: 'aplus-triage-f3', front: 'What is a known-good comparison?', back: 'Testing with a working device/cable/adapter to isolate the fault.' },
      { id: 'aplus-triage-f4', front: 'What is a common cause of troubleshooting thrash?', back: 'Changing too many variables without confirming evidence.' },
      { id: 'aplus-triage-f5', front: 'A good escalation note includes what core fields?', back: 'Who/where/device, symptom, scope, steps tried, impact, next action.' },
      { id: 'aplus-triage-f6', front: 'When should you escalate instead of continuing?', back: 'When the change is risky, affects many users, or you’re out of safe checks.' },
      { id: 'aplus-triage-f7', front: 'Why ask “what changed?”', back: 'It often reveals the cause faster than deeper theory.' },
      { id: 'aplus-triage-f8', front: 'What is the goal of first-line troubleshooting?', back: 'Stabilize and narrow uncertainty safely, then resolve or escalate.' },
      { id: 'aplus-triage-f9', front: 'What is the difference between symptom and cause?', back: 'Symptom is what you observe; cause is the underlying reason.' },
      { id: 'aplus-triage-f10', front: 'What is the value of time correlation?', back: 'It hints at heat/load, scheduled tasks, or environmental triggers.' }
    ],
    quiz: [
      mcq({
        id: 'aplus-triage-q1',
        prompt: 'Which action best fits an evidence-first troubleshooting approach?',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'foundation',
        explanation: 'Evidence-first means scope + reversible checks.',
        modelAnswer: 'Clarify scope and symptoms, then run a reversible isolating test.',
        commonMistakes: ['Resetting everything immediately', 'Making broad changes without scope'],
        dcsContext: 'A consistent process prevents wasting class time.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        options: [
          { id: 'a', label: 'Change multiple settings at once and see if it works' },
          { id: 'b', label: 'Clarify scope and run a reversible isolating check' },
          { id: 'c', label: 'Assume the network is down for everyone from one report' },
          { id: 'd', label: 'Escalate immediately without collecting any details' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'aplus-triage-q2',
        prompt: 'Write a mini-template (5 lines) for an escalation note that would be useful to the next technician.',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'stretch',
        explanation: 'Templates turn knowledge into output.',
        modelAnswer:
          'Who/where/device:\nSymptom:\nScope:\nSteps tried:\nImpact/urgency + next action:',
        commonMistakes: ['No scope', 'No steps tried', 'No impact'],
        dcsContext: 'This is the handoff format that saves time.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Includes who/where/device', 'Includes scope', 'Includes steps tried', 'Includes impact/next action'],
        keywordHints: ['scope', 'steps tried', 'impact']
      }),
      orderSteps({
        id: 'aplus-triage-q3',
        prompt: 'Order a safe troubleshooting sequence.',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'stretch',
        explanation: 'Good sequence prevents chaos.',
        modelAnswer:
          'Clarify scope, try a reversible check, compare with known-good, document and escalate if unresolved.',
        commonMistakes: ['Escalating before clarifying', 'Changing too much before comparing'],
        dcsContext: 'This matches real helpdesk performance expectations.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        steps: [
          { id: 'scope', label: 'Clarify scope and symptom' },
          { id: 'reversible', label: 'Try a reversible isolating check' },
          { id: 'known-good', label: 'Compare with a known-good reference' },
          { id: 'escalate', label: 'Document and escalate if needed' }
        ],
        correctOrder: ['scope', 'reversible', 'known-good', 'escalate'],
        rubric: ['Scope first', 'Reversible checks', 'Evidence-rich escalation']
      }),
      scenarioResponse({
        id: 'aplus-triage-q4',
        prompt:
          'A staff member is frustrated and wants you to “just change settings until it works.” Write the judgement-based response that keeps you safe and effective.',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'challenge',
        explanation: 'Professional support is calm and structured.',
        modelAnswer:
          'Explain that random setting changes can make things worse and waste time. You’ll first confirm the exact symptom and scope, run quick reversible checks, and if it still fails you’ll escalate with clear evidence so it can be fixed faster.',
        commonMistakes: ['Agreeing to random changes', 'Arguing instead of explaining calmly'],
        dcsContext: 'In schools, calm process matters as much as technical skill.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Explains process calmly', 'Mentions scope and reversible checks', 'Commits to evidence-based escalation']
      }),
      mcq({
        id: 'aplus-triage-q5',
        prompt: 'Which note best demonstrates strong scope evidence?',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'foundation',
        explanation: 'Scope evidence makes escalation actionable.',
        modelAnswer: 'The best note includes who/where, what, and whether others are affected.',
        commonMistakes: ['Vague “it’s broken” notes', 'Missing location and time'],
        dcsContext: 'Scope evidence is the fastest way to shrink uncertainty in school support.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        options: [
          { id: 'a', label: 'Internet broken. Please fix.' },
          { id: 'b', label: 'Room 12, student laptop: 169.254 IP on student Wi‑Fi; two other laptops in room OK; started 10:10.' },
          { id: 'c', label: 'Wi‑Fi hates us today.' },
          { id: 'd', label: 'Printer is weird again.' }
        ],
        correctOptionId: 'b'
      }),
      explainItSimply({
        id: 'aplus-triage-q6',
        prompt: 'Explain what “change one variable at a time” means in troubleshooting.',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'foundation',
        explanation: 'This principle prevents false conclusions.',
        modelAnswer:
          'It means you change only one thing (like the cable) and test, so you know which change caused the outcome instead of guessing.',
        commonMistakes: ['Changing many things at once', 'Not recording what changed'],
        dcsContext: 'This is the difference between troubleshooting and random experimenting.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Mentions one change', 'Mentions testing', 'Clear'],
        keywordHints: ['one', 'test', 'isolate']
      }),
      shortAnswer({
        id: 'aplus-triage-q7',
        prompt: 'List three “safe, reversible” first-line actions that apply to many problems.',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'stretch',
        explanation: 'These are your first tools under pressure.',
        modelAnswer: 'Reconnect/reseat, restart, confirm correct account/target, and compare with known-good.',
        commonMistakes: ['Listing risky admin changes', 'Listing only one action'],
        dcsContext: 'Reversible actions reduce risk in a school environment.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        rubric: ['Reversible', 'Generalizable', 'Avoids admin changes'],
        keywordHints: ['restart', 'reseat', 'known-good']
      }),
      orderSteps({
        id: 'aplus-triage-q8',
        prompt: 'Order the fastest path from report → useful escalation.',
        domain: 'A+ Troubleshooting approach',
        difficulty: 'stretch',
        explanation: 'A good order reduces back-and-forth.',
        modelAnswer:
          'Clarify symptom, check scope, try a reversible isolating test, then document and escalate with results.',
        commonMistakes: ['Escalating first', 'Changing too many settings'],
        dcsContext: 'This order produces better outcomes in real helpdesk work.',
        reviewSchedule,
        recommendedModuleId: 'aplus-core1-troubleshooting',
        weakTopic: 'a-plus-troubleshooting',
        steps: [
          { id: 'symptom', label: 'Clarify the exact symptom' },
          { id: 'scope', label: 'Check scope (who/where/how many)' },
          { id: 'test', label: 'Try a reversible isolating test' },
          { id: 'escalate', label: 'Document results and escalate' }
        ],
        correctOrder: ['symptom', 'scope', 'test', 'escalate'],
        rubric: ['Good order', 'Evidence based', 'Escalation includes results']
      })
    ],
    scenarioPrompts: [
      { id: 'aplus-triage-s1', title: 'Pressure to “just fix it”', prompt: 'Practice a calm scope-first response.' }
    ],
    practicalOutputs: [
      { id: 'aplus-triage-p1', title: 'Troubleshooting one-pager', description: 'Write a one-page troubleshooting process card you can use at work.' }
    ]
  },
  {
    id: 'rbc-cse1icb-cybersecurity-awareness',
    title: 'RBC Cybersecurity Awareness for School IT',
    description:
      'Build school-first cybersecurity judgement through safe data practices, incident triage, and risk-aware escalation. This module keeps the focus on what DCS support can do first, not specialist forensic work.',
    domain: 'Identity and Access',
    level: 'DCS Context',
    estimatedMinutes: 18,
    tags: ['RBC', 'cybersecurity', 'privacy', 'incident triage'],
    learningObjectives: [
      'Recognise common school cybersecurity risks and the safe first-line response.',
      'Describe how to safeguard data, systems, and accounts in a school setting.',
      'Differentiate safe DCS actions from specialist forensic or admin work.'
    ],
    dcsRelevance: [
      'Cybersecurity is a core part of safe school technology support.',
      'Helps Josh decide when to preserve evidence instead of improvising a fix.',
      'Keeps privacy and compliance at the centre of everyday incident judgement.'
    ],
    sections: [
      {
        id: 'rbc-cyber-1',
        title: 'Cybersecurity in everyday school IT',
        bodyMarkdown: `School cybersecurity is not only about firewalls and passwords. It is about recognising suspicious emails, safeguarding student and staff data, and knowing who should handle the next step.

As a first-line support person, your goal is to keep the incident contained, collect the right evidence, and escalate without making unsafe changes.`
      },
      {
        id: 'rbc-cyber-2',
        title: 'Safe first-line incident triage',
        bodyMarkdown: `The safest first actions are usually low-risk: confirm the report, capture scope, preserve the suspicious item, and avoid executing unknown attachments or links.

If you are asked to “just check it”, stop and ask: who reported it, what changed, and what systems or accounts are involved.`
      },
      {
        id: 'rbc-cyber-3',
        title: 'Privacy, evidence, and escalation',
        bodyMarkdown: `Do not record passwords, personal details, or full message content in a personal study tool. Keep notes high-level and privacy-safe, then hand off the exact incident details to the authorised work system.

A clean escalation note says what happened, what was seen, what was preserved, and why the next owner needs to review it.`
      }
    ],
    flashcards: [
      { id: 'rbc-cyber-f1', front: 'What is the safest first action for a suspicious email report?', back: 'Confirm the report and preserve the item without clicking attachments or links.' },
      { id: 'rbc-cyber-f2', front: 'What should you avoid writing in a PD app about a live incident?', back: 'Passwords, private message content, or identifying student/staff sensitive details.' },
      { id: 'rbc-cyber-f3', front: 'Why is scope important in a cybersecurity report?', back: 'It tells whether the issue affects one account, one device, or a wider system.' },
      { id: 'rbc-cyber-f4', front: 'What distinguishes safe DCS action from specialist forensics?', back: 'Safe action preserves evidence and escalates; specialist forensics analyzes and recovers from the incident.' },
      { id: 'rbc-cyber-f5', front: 'What is a safe phrase for an unconfirmed cyber issue?', back: 'Suspected incident, unusual prompt, or possible credential risk.' },
      { id: 'rbc-cyber-f6', front: 'Why should Josh avoid clicking a suspicious link to test it?', back: 'Testing the link can expose the device, account, or evidence chain to extra risk.' },
      { id: 'rbc-cyber-f7', front: 'What does cybersecurity risk management mean at Level 1?', back: 'Choose the safer action based on likely impact, uncertainty, and authority boundaries.' },
      { id: 'rbc-cyber-f8', front: 'Where should live incident evidence be kept?', back: 'In the authorised work or security system, not in informal PD notes.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'rbc-cyber-q1',
        prompt: 'A teacher sends a screenshot of a suspicious login email. What should Josh do first?',
        domain: 'School cybersecurity',
        difficulty: 'foundation',
        explanation: 'The first priority is evidence and scope, not remediation without authority.',
        modelAnswer:
          'Document the report, preserve the suspicious email or screenshot, confirm affected users and systems, and escalate to the authorised security owner.',
        commonMistakes: ['Deleting the email immediately', 'Clicking the link to inspect it'],
        dcsContext: 'School staff need safe guidance when security concerns appear in everyday reports.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1icb-cybersecurity-awareness',
        weakTopic: 'cybersecurity-incident-triage',
        options: [
          { id: 'a', label: 'Open the email and inspect the sender details yourself.' },
          { id: 'b', label: 'Preserve the evidence, confirm scope, and escalate safely.' },
          { id: 'c', label: 'Delete the email from the teacher’s inbox and mark it as spam.' },
          { id: 'd', label: 'Reply to the sender asking if they meant to send it.' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'rbc-cyber-q2',
        prompt: 'List three things you should preserve in a cybersecurity incident note without oversharing private details.',
        domain: 'School cybersecurity',
        difficulty: 'stretch',
        explanation: 'A good incident note is precise and privacy-safe.',
        modelAnswer:
          'Who reported it, what the suspicious symptom was, what systems or accounts were involved, and what safe action was already taken or preserved.',
        commonMistakes: ['Including passwords or full message content', 'Writing vague descriptions like “bad email”.'],
        dcsContext: 'Privacy-safe notes protect school communities while still moving the issue forward.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1icb-cybersecurity-awareness',
        weakTopic: 'cybersecurity-incident-triage',
        rubric: ['Includes reporter and symptom', 'Keeps detail high-level', 'Says what was preserved or escalated'],
        keywordHints: ['reporter', 'symptom', 'preserved', 'escalated']
      },
      {
        type: 'scenario-response',
        id: 'rbc-cyber-q3',
        prompt:
          'A teacher says a student clicked a link in a suspicious message. Explain the safest next actions and the judgement behind them.',
        domain: 'School cybersecurity',
        difficulty: 'stretch',
        explanation: 'The safe response balances evidence, urgency, and boundary awareness.',
        modelAnswer:
          'Preserve any evidence, do not chase the link, capture which account and device were involved, check whether the login or device is still compromised, and escalate to the authorised security owner with a clear summary.',
        commonMistakes: ['Trying to remediate the incident alone', 'Assuming the issue is safe because the link was clicked once.'],
        dcsContext: 'Live incident reports should be handed off cleanly rather than solved informally in a personal tool.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1icb-cybersecurity-awareness',
        weakTopic: 'cybersecurity-incident-triage',
        rubric: ['Preserves evidence', 'Captures scope', 'Escalates appropriately']
      },
      {
        type: 'explain-it-simply',
        id: 'rbc-cyber-q4',
        prompt: 'Explain why a first-line support person should preserve a suspicious email instead of deleting it immediately.',
        domain: 'School cybersecurity',
        difficulty: 'foundation',
        explanation: 'Preserved evidence lets the authorised reviewer confirm risk and protect other users.',
        modelAnswer:
          'Preserving the email keeps useful evidence available for the authorised reviewer while avoiding unsafe clicks or unsupported claims.',
        commonMistakes: ['Deleting evidence too early', 'Clicking the message to investigate alone'],
        dcsContext: 'A school may need the original message to understand whether other staff or students are at risk.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1icb-cybersecurity-awareness',
        weakTopic: 'cybersecurity-incident-triage',
        rubric: ['Mentions evidence', 'Mentions authorised review', 'Avoids unsafe interaction'],
        keywordHints: ['evidence', 'review', 'avoid clicking']
      }
    ],
    scenarioPrompts: [
      {
        id: 'rbc-cyber-s1',
        title: 'Suspicious email reported by staff',
        prompt: 'Describe the safest handling and note-taking approach for a phishing-like report.'
      }
    ],
    practicalOutputs: [
      {
        id: 'rbc-cyber-p1',
        title: 'Cyber incident triage note',
        description: 'Write a privacy-safe note template for suspicious email or account compromise reports.'
      }
    ]
  },
  {
    id: 'rbc-cse1iit-hardware-network-web-basics',
    title: 'RBC Hardware, Network, and Web Basics',
    description:
      'Turn RBC IT fundamentals into school support fluency: how devices, networks, and web services work together, and how to describe problems clearly without overstepping.',
    domain: 'Networking',
    level: 'DCS Context',
    estimatedMinutes: 20,
    tags: ['RBC', 'hardware', 'networking', 'web'],
    learningObjectives: [
      'Explain the basic roles of device hardware, network connectivity, and web service access.',
      'Recognise common school network and web symptoms in plain support language.',
      'Use safe evidence-based checks before escalating a device or room connectivity problem.'
    ],
    dcsRelevance: [
      'Bridges academic hardware and networking concepts into real classroom support.',
      'Improves escalation notes for room-level internet, Wi-Fi, and web app faults.',
      'Keeps the focus on what a first-line support person can verify safely.'
    ],
    sections: [
      {
        id: 'rbc-hwnetwork-1',
        title: 'How hardware, network, and web fit together',
        bodyMarkdown: `Devices need power, the correct connections, and a working network path before web services can load. When one piece fails, the symptom may look like a general "internet problem."`
      },
      {
        id: 'rbc-hwnetwork-2',
        title: 'Common school symptom buckets',
        bodyMarkdown: `A broken cable or missing power can look different from a Wi-Fi problem. A good support note separates device, network, and web symptoms instead of calling everything "down."`
      },
      {
        id: 'rbc-hwnetwork-3',
        title: 'Safe checks before escalation',
        bodyMarkdown: `The safest checks are usually visible and reversible: power, cables, correct network, room comparison, and whether the same web service works elsewhere. If the pattern stays broader than one device, escalate with the evidence. `
      }
    ],
    flashcards: [
      { id: 'rbc-hwnetwork-f1', front: 'What does a device need before web services can load?', back: 'Power, a working network path, and the correct service endpoint.' },
      { id: 'rbc-hwnetwork-f2', front: 'Why should you compare with another nearby device?', back: 'To tell whether the problem is one device or a room/network issue.' },
      { id: 'rbc-hwnetwork-f3', front: 'What is a safe first check for a “website not loading” complaint?', back: 'Confirm the correct network and that the device has a valid connection.' },
      { id: 'rbc-hwnetwork-f4', front: 'Why does “internet is down” often need more detail?', back: 'Because it can come from device, network, or web service problems, and the next tech needs the right path.' },
      { id: 'rbc-hwnetwork-f5', front: 'What is a known-good comparison?', back: 'Testing against a working device, room, cable, or service to isolate the fault.' },
      { id: 'rbc-hwnetwork-f6', front: 'What does a valid IP address help confirm?', back: 'The device has at least some network configuration and is not only associated to Wi-Fi.' },
      { id: 'rbc-hwnetwork-f7', front: 'Why test another website or service?', back: 'It separates one web app fault from a wider connectivity fault.' },
      { id: 'rbc-hwnetwork-f8', front: 'What should a room-level network note include?', back: 'Room, affected devices, SSID, symptoms, comparison result, and impact on learning.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'rbc-hwnetwork-q1',
        prompt: 'A room has working Wi-Fi but a teacher cannot open a school webpage. What should Josh suspect first?',
        domain: 'Hardware, network, and web basics',
        difficulty: 'foundation',
        explanation: 'Working Wi-Fi narrows the issue toward DNS, gateway, or the web service itself.',
        modelAnswer:
          'This is more likely a DNS/gateway or web service issue than a pure Wi-Fi association problem, so check whether the device can reach other services and whether the same site works elsewhere.',
        commonMistakes: ['Assuming the entire internet is down', 'Restarting the Wi-Fi before checking other services'],
        dcsContext: 'Classroom symptoms often look broader than they are. Seizing the right category saves time.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1iit-hardware-network-web-basics',
        weakTopic: 'hardware-network-web',
        options: [
          { id: 'a', label: 'The web page host is broken, but Wi-Fi is probably fine.' },
          { id: 'b', label: 'The device likely has the wrong network or invalid IP address.' },
          { id: 'c', label: 'The classroom Wi-Fi is definitely down for everyone.' },
          { id: 'd', label: 'The printer is causing the network fault.' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'rbc-hwnetwork-q2',
        prompt: 'Name two visible checks Josh can perform before escalating a classroom internet or web issue.',
        domain: 'Hardware, network, and web basics',
        difficulty: 'stretch',
        explanation: 'Visible checks are safe and fast before escalation.',
        modelAnswer: 'Confirm the device is powered on and connected to the correct SSID, and compare the symptom with another nearby device on the same network.',
        commonMistakes: ['Jumping straight to rebooting the network gear', 'Not checking whether the device has the correct network selected'],
        dcsContext: 'A quick compare check often reveals whether the issue is device-specific or room-wide.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1iit-hardware-network-web-basics',
        weakTopic: 'hardware-network-web',
        rubric: ['Mentions power or network', 'Mentions comparison', 'Uses safe checks'],
        keywordHints: ['power', 'SSID', 'compare', 'nearby device']
      },
      {
        type: 'scenario-response',
        id: 'rbc-hwnetwork-q3',
        prompt:
          'A teacher says the classroom laptop is on but “the internet is broken.” Describe the safest way to turn that into a useful support note.',
        domain: 'Hardware, network, and web basics',
        difficulty: 'stretch',
        explanation: 'Good notes reduce guessing and keep the focus on evidence.',
        modelAnswer:
          'Note the device state, the network or SSID, whether the symptom affects one or more devices, what services were tested, and whether a nearby device works. Avoid broad phrases like “internet broken.”',
        commonMistakes: ['Writing only “internet broken”', 'Skipping scope and comparison details'],
        dcsContext: 'School support notes need enough detail to avoid repeated checks during class time.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1iit-hardware-network-web-basics',
        weakTopic: 'hardware-network-web',
        rubric: ['Uses device and network detail', 'Captures scope', 'Avoids vague language']
      },
      {
        type: 'explain-it-simply',
        id: 'rbc-hwnetwork-q4',
        prompt: 'Explain why a Wi-Fi icon does not prove a web service should load.',
        domain: 'Hardware, network, and web basics',
        difficulty: 'foundation',
        explanation: 'Association to Wi-Fi is only one layer of the path.',
        modelAnswer:
          'The Wi-Fi icon only suggests the device is connected to wireless; the device still needs valid network settings, DNS, gateway access, and the web service itself to be working.',
        commonMistakes: ['Treating Wi-Fi association as full internet access', 'Ignoring DNS, gateway, or service layers'],
        dcsContext: 'This helps Josh explain classroom issues without overclaiming that the whole internet is down.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1iit-hardware-network-web-basics',
        weakTopic: 'hardware-network-web',
        rubric: ['Mentions Wi-Fi as one layer', 'Mentions other network or service layers', 'Uses plain language'],
        keywordHints: ['Wi-Fi', 'DNS', 'gateway', 'service']
      }
    ],
    scenarioPrompts: [
      {
        id: 'rbc-hwnetwork-s1',
        title: 'Connected but no web access',
        prompt: 'Explain the evidence you would collect when a device is on Wi-Fi but cannot load a school site.'
      }
    ],
    practicalOutputs: [
      {
        id: 'rbc-hwnetwork-p1',
        title: 'Classroom connection checklist',
        description: 'Write a short checklist for confirming power, network, and web service status before escalation.'
      }
    ]
  },
  {
    id: 'rbc-cse1pe-programming-readiness',
    title: 'RBC Programming Literacy for School IT',
    description:
      'Translate the programming environment into DCS-level script literacy: read simple logic, understand automation flow, and know what to preserve when code affects school systems.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 18,
    tags: ['RBC', 'programming', 'automation', 'scripts'],
    learningObjectives: [
      'Explain the basic structure of script logic using sequence, selection, and iteration.',
      'Recognise common automation patterns in school IT workflows.',
      'Use safe judgement when asked to review or run a simple script or automation task.'
    ],
    dcsRelevance: [
      'Many school tools use scripts or automation, and first-line staff need to read them safely.',
      'Helps Josh avoid running unknown code and instead escalate with the right questions.',
      'Builds a practical bridge from programming concepts to everyday support logic.'
    ],
    sections: [
      {
        id: 'rbc-code-1',
        title: 'Sequence, selection, and iteration in plain language',
        bodyMarkdown: `Sequence means doing steps one after another. Selection means choosing one path when a condition is true. Iteration means repeating a step until a condition changes.

These are the building blocks of almost every script or automation task.`
      },
      {
        id: 'rbc-code-2',
        title: 'What scripts do in school support',
        bodyMarkdown: `Scripts often move files, update settings, or collect data. Your job is not to become a developer first; your job is to recognise whether the script is doing what the team expects and whether it is safe to run or escalate.`
      },
      {
        id: 'rbc-code-3',
        title: 'Safe script review habits',
        bodyMarkdown: `Look for obvious loops, conditions, file paths, and commands that change settings. Ask whether the script touches student or staff data, whether it runs on the right devices, and whether a change can be reversed if it goes wrong.`
      }
    ],
    flashcards: [
      { id: 'rbc-code-f1', front: 'What is sequence in a script?', back: 'Steps executed one after another.' },
      { id: 'rbc-code-f2', front: 'What is selection in a script?', back: 'Choosing one path or action based on a condition.' },
      { id: 'rbc-code-f3', front: 'What is iteration in a script?', back: 'Repeating a step or block until a condition changes.' },
      { id: 'rbc-code-f4', front: 'What should you ask before running a script on school systems?', back: 'Does it affect sensitive data, is it reversible, and who owns the change?' },
      { id: 'rbc-code-f5', front: 'What is input in a script?', back: 'The data, file, list, device group, or setting the script starts from.' },
      { id: 'rbc-code-f6', front: 'What is output in a script?', back: 'The result it creates, reports, changes, deletes, moves, or updates.' },
      { id: 'rbc-code-f7', front: 'Why does a loop increase support risk?', back: 'A mistake can repeat across many users, devices, files, or records.' },
      { id: 'rbc-code-f8', front: 'What is a safe script review phrase?', back: 'I need to confirm target, change impact, test evidence, and rollback path before action.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'rbc-code-q1',
        prompt: 'A script checks each student file and updates a setting only if the file is missing. What programming concept is this?',
        domain: 'Script literacy',
        difficulty: 'foundation',
        explanation: 'This describes a conditional action inside a repeatable check.',
        modelAnswer: 'It is selection inside an iteration: the script repeats through files and takes action only when a condition is met.',
        commonMistakes: ['Calling it only iteration', 'Calling it only sequence'],
        dcsContext: 'Recognising the shape of the logic helps you ask the right run-time questions.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1pe-programming-readiness',
        weakTopic: 'script-literacy',
        options: [
          { id: 'a', label: 'Sequence' },
          { id: 'b', label: 'Selection in iteration' },
          { id: 'c', label: 'Data structure use' },
          { id: 'd', label: 'Exception handling' }
        ],
        correctOptionId: 'b'
      },
      {
        type: 'short-answer',
        id: 'rbc-code-q2',
        prompt: 'What is one safe question to ask before approving a script that will run on multiple student devices?',
        domain: 'Script literacy',
        difficulty: 'stretch',
        explanation: 'Safe script review is about scope, data, and reversibility.',
        modelAnswer:
          'Ask whether the script has been tested on a representative device, whether it touches student data, and what the rollback plan is if it behaves unexpectedly.',
        commonMistakes: ['Focusing only on whether it runs quickly', 'Ignoring data and rollback concerns'],
        dcsContext: 'Scripts on student devices can have wide impact, so the safest questions are about testing and reversibility.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1pe-programming-readiness',
        weakTopic: 'script-literacy',
        rubric: ['Asks about testing', 'Mentions data or rollback', 'Keeps the focus on safe scope'],
        keywordHints: ['testing', 'data', 'rollback', 'scope']
      },
      {
        type: 'scenario-response',
        id: 'rbc-code-q3',
        prompt:
          'A senior tech asks if an automation can be run tonight to update student software. What should Josh mention before agreeing?',
        domain: 'Script literacy',
        difficulty: 'stretch',
        explanation: 'The right answer looks for safety, scope, and impact, not just convenience.',
        modelAnswer:
          'Mention whether the script has been reviewed for the right devices, whether the update is reversible, whether student work is affected, and whether there is a clear fallback if the update goes wrong.',
        commonMistakes: ['Saying yes immediately because it is from a senior tech', 'Ignoring student impact or rollback'],
        dcsContext: 'School automation needs a safe operating habit more than a fast yes.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1pe-programming-readiness',
        weakTopic: 'script-literacy',
        rubric: ['Checks scope', 'Asks about rollback', 'Mentions impact']
      },
      {
        type: 'explain-it-simply',
        id: 'rbc-code-q4',
        prompt: 'Explain iteration in one sentence using a school IT example.',
        domain: 'Script literacy',
        difficulty: 'foundation',
        explanation: 'A simple example proves the concept is usable outside coding class.',
        modelAnswer:
          'Iteration is when a script repeats the same check or action for each item, such as checking every laptop in a device list.',
        commonMistakes: ['Explaining only one single step', 'Confusing iteration with a decision branch'],
        dcsContext: 'Many school automation tasks loop through devices, accounts, files, or groups.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse1pe-programming-readiness',
        weakTopic: 'script-literacy',
        rubric: ['One sentence', 'Mentions repetition', 'Uses a school IT example'],
        keywordHints: ['repeat', 'each', 'device']
      }
    ],
    scenarioPrompts: [
      {
        id: 'rbc-code-s1',
        title: 'Read before you run scripts',
        prompt: 'Describe what you look for when reviewing a simple automation before execution.'
      }
    ],
    practicalOutputs: [
      {
        id: 'rbc-code-p1',
        title: 'Script review checklist',
        description: 'Write a checklist of questions to use before running or escalating automation in a school environment.'
      }
    ]
  },
  {
    id: 'rbc-cse3pe-professional-practice',
    title: 'RBC Professional Practice and Ethical Reflection',
    description:
      'Develop a school-first professional support mindset with reflective practice, privacy-aware documentation, and ethical escalation.',
    domain: 'Operations',
    level: 'DCS Context',
    estimatedMinutes: 18,
    tags: ['RBC', 'ethics', 'privacy', 'reflection'],
    learningObjectives: [
      'Explain why professional practice and ethics matter in school IT support.',
      'Recognise the boundary between useful documentation and sensitive incident data.',
      'Apply reflective judgement to escalation, privacy, and safety decisions.'
    ],
    dcsRelevance: [
      'Professional practice underpins trust with staff and students.',
      'Ethical support decisions keep school data safe and keep escalation clear.',
      'Reflective judgement helps avoid unsafe shortcuts during pressure.'
    ],
    sections: [
      {
        id: 'rbc-ethics-1',
        title: 'What professional practice looks like in school IT',
        bodyMarkdown: `Professional practice is about being consistent, honest, and respectful of privacy. It is not just about resolving technical issues; it is about how you document, communicate, and decide when to escalate.`
      },
      {
        id: 'rbc-ethics-2',
        title: 'Documentation that is useful and safe',
        bodyMarkdown: `Useful documentation is clear, concise, and focused on the issue. Safe documentation avoids details that should stay in authorised systems, especially student or staff personal information.`
      },
      {
        id: 'rbc-ethics-3',
        title: 'Why reflection matters after the event',
        bodyMarkdown: `After a support incident, take a moment to reflect: what went well, what could have been safer, and what you would do differently next time. That kind of habit builds better judgement over time.`
      }
    ],
    flashcards: [
      { id: 'rbc-ethics-f1', front: 'What is the first job of a professional support note?', back: 'Help the next person act without ambiguity.' },
      { id: 'rbc-ethics-f2', front: 'What kind of detail should you never write in a personal study app?', back: 'Sensitive student or staff information, passwords, and live incident evidence.' },
      { id: 'rbc-ethics-f3', front: 'Why is reflective practice valuable after a school support incident?', back: 'It turns experience into better future judgement and safer habits.' },
      { id: 'rbc-ethics-f4', front: 'What is a good question to ask before escalating?', back: 'Have I captured the right symptom, scope, and impact without adding risky detail?' },
      { id: 'rbc-ethics-f5', front: 'What should a PD reflection capture?', back: 'The lesson, risk noticed, judgement used, boundary respected, and next improvement.' },
      { id: 'rbc-ethics-f6', front: 'Why separate PD notes from incident records?', back: 'PD notes are for learning; incident records are for authorised operational detail and audit.' },
      { id: 'rbc-ethics-f7', front: 'What is a professional boundary?', back: 'The limit of what Josh is authorised and competent to view, change, or decide.' },
      { id: 'rbc-ethics-f8', front: 'How should Josh respond to pressure to bypass process?', back: 'Acknowledge urgency, explain the boundary, capture impact, and route to the authorised owner.' }
    ],
    quiz: [
      {
        type: 'mcq',
        id: 'rbc-ethics-q1',
        prompt: 'Which note best balances usefulness and privacy for a classroom incident?',
        domain: 'Professional practice',
        difficulty: 'foundation',
        explanation: 'A good note is precise but not oversharing.',
        modelAnswer:
          'The best note names the location, exact symptom, known scope, and steps tried without including student names or sensitive content.',
        commonMistakes: ['Including unnecessary personal details', 'Being too vague to act on.'],
        dcsContext: 'Privacy-safe notes keep school trust intact while still moving the fix forward.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse3pe-professional-practice',
        weakTopic: 'professional-practice',
        options: [
          { id: 'a', label: 'Room 12 laptop shows a login error. Student name removed for privacy.' },
          { id: 'b', label: 'Student laptop in Room 12 shows login error when attempting a school account.' },
          { id: 'c', label: 'A student cannot log in on a laptop in Room 12; issue may be account or device.' },
          { id: 'd', label: 'Student account blocked again on laptop in Room 12—please fix.' }
        ],
        correctOptionId: 'c'
      },
      {
        type: 'short-answer',
        id: 'rbc-ethics-q2',
        prompt: 'What should you reflect on after a support incident that involved sensitive data?',
        domain: 'Professional practice',
        difficulty: 'stretch',
        explanation: 'Reflection is about learning and safer practice.',
        modelAnswer:
          'Reflect on what was documented, whether any sensitive data was handled properly, whether the escalation was clear, and how to keep future responses safer.',
        commonMistakes: ['Only thinking about whether the issue was fixed', 'Ignoring the privacy or escalation quality of the note.'],
        dcsContext: 'Reflection helps the support team improve its practice over time.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse3pe-professional-practice',
        weakTopic: 'professional-practice',
        rubric: ['Mentions privacy or data handling', 'Mentions documentation quality', 'Mentions safer future steps'],
        keywordHints: ['privacy', 'documentation', 'safer', 'future']
      },
      {
        type: 'scenario-response',
        id: 'rbc-ethics-q3',
        prompt:
          'After helping with a sensitive staff account issue, what should Josh record in the PD app versus the authorised ticketing system?',
        domain: 'Professional practice',
        difficulty: 'stretch',
        explanation: 'The response should separate learning from live incident detail.',
        modelAnswer:
          'In the PD app, record the lesson learned and the safe escalation path. In the authorised ticketing system, keep the exact account details, actions taken, and evidence needed for audit. Do not copy sensitive technical incident detail into the study tool.',
        commonMistakes: ['Copying full incident detail into the PD app', 'Leaving only vague learning notes without a place for the incident record.'],
        dcsContext: 'School support depends on clean boundaries between learning notes and official incident records.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse3pe-professional-practice',
        weakTopic: 'professional-practice',
        rubric: ['Separates PD notes from incident records', 'Keeps PD notes high-level', 'Keeps actual incident evidence in the authorised system']
      },
      {
        type: 'explain-it-simply',
        id: 'rbc-ethics-q4',
        prompt: 'Explain why professional practice matters even when the technical fix is simple.',
        domain: 'Professional practice',
        difficulty: 'foundation',
        explanation: 'Support quality includes how the work is handled, not only whether the device works.',
        modelAnswer:
          'Professional practice matters because even a simple fix can involve privacy, trust, authority, and clear documentation.',
        commonMistakes: ['Treating ethics as separate from support work', 'Thinking only the technical result matters'],
        dcsContext: 'In a school, support often happens around sensitive people, systems, and information.',
        reviewSchedule: 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.',
        recommendedModuleId: 'rbc-cse3pe-professional-practice',
        weakTopic: 'professional-practice',
        rubric: ['Mentions trust or privacy', 'Mentions authority or documentation', 'Connects to support work'],
        keywordHints: ['privacy', 'trust', 'documentation']
      }
    ],
    scenarioPrompts: [
      {
        id: 'rbc-ethics-s1',
        title: 'Ethical note-taking for incidents',
        prompt: 'Describe what belongs in a reflection note versus a live incident record.'
      }
    ],
    practicalOutputs: [
      {
        id: 'rbc-ethics-p1',
        title: 'Ethical support reflection sheet',
        description: 'Write a one-page reflection sheet for using privacy-safe language and escalation judgement in school IT support.'
      }
    ]
  },
  {
    id: 'rbc-cybersecurity-school-it',
    title: 'RBC Cybersecurity for School IT',
    description:
      'Translate introductory cybersecurity outcomes into safe first-line school IT habits: recognise risk, protect data, and escalate with clean evidence.',
    domain: 'Cybersecurity',
    level: 'RBC',
    estimatedMinutes: 22,
    tags: ['RBC', 'CSE1ICB', 'cybersecurity', 'school data', 'risk judgement'],
    sourceSubjects: [
      {
        code: 'CSE1ICB',
        title: 'Introduction to Cybersecurity',
        course: 'RBC',
        silos: [
          'Describe key emerging cybersecurity practices, regulations and standards.',
          'Demonstrate foundation skills in safeguarding data, systems and networks.',
          'Compare approaches for cyber risk management used to address real-world problems.',
          'Identify approaches to digital forensics, application security and network security in the context of cyberspace.',
          'Show understanding of data security, web security and cryptography and possible solutions to cyber threats.'
        ],
        weeklyTopics: ['The Cyber Story', 'Application Security', 'Network Security'],
        alignmentNote:
          'DCSPrep uses this subject as a practical first-line cybersecurity module for school data, phishing, account hygiene, and escalation quality.',
        slgCurrency: '2023 SLG in the current RBC reference.'
      }
    ],
    learningObjectives: [
      'Recognise common school-facing cyber risks before acting.',
      'Use first-line safeguards for data, devices, accounts, and networks.',
      'Escalate suspected incidents without copying sensitive details into the PD app.'
    ],
    dcsRelevance: [
      'School IT support often sees cyber symptoms first through emails, login prompts, shared devices, and worried staff.',
      'Good first-line judgement protects student and staff information while the authorised owner investigates.',
      'The module turns broad cybersecurity SILOs into daily DCS behaviours: stop, preserve, report, and avoid risky experiments.'
    ],
    sections: [
      {
        id: 'rbc-cyber-1',
        title: 'Cybersecurity starts as pattern recognition',
        bodyMarkdown:
          'At Level 1, cybersecurity is not about proving an attacker exists. It is about spotting enough risk to stop unsafe action and move the issue to the right owner.\n\nUseful patterns include unexpected MFA prompts, password reset pressure, strange sender addresses, links that do not match the claimed service, unusual device behaviour, and requests to bypass normal approval.'
      },
      {
        id: 'rbc-cyber-2',
        title: 'Safeguard before investigating deeply',
        bodyMarkdown:
          'First-line safeguards are simple and conservative: do not click suspicious links, do not forward live sensitive content to informal channels, do not run unknown attachments, and do not change broad security settings without authority.\n\nFor a school, the privacy risk matters as much as the technical risk. A screenshot, copied email, student name, or account detail can become a second incident if it is stored in the wrong place.'
      },
      {
        id: 'rbc-cyber-3',
        title: 'Risk language beats certainty language',
        bodyMarkdown:
          'Use careful wording: suspected phishing, unusual prompt, possible credential risk, or needs authorised review. Avoid claiming breach, malware, or compromise unless the authorised investigation confirms it.\n\nA useful escalation captures who reported it, where it appeared, what was observed, what safe action was taken, and where the original evidence is stored. The PD app should keep the learning pattern, not the live incident record.'
      }
    ],
    flashcards: [
      { id: 'rbc-cyber-f1', front: 'What is the first-line goal in a suspected cyber incident?', back: 'Recognise risk, stop unsafe action, preserve evidence, and escalate through the authorised path.' },
      { id: 'rbc-cyber-f2', front: 'Why should live phishing content not be copied into the PD app?', back: 'It may contain sensitive personal, account, or security details and the PD app is not the incident system of record.' },
      { id: 'rbc-cyber-f3', front: 'Name two phishing warning signs.', back: 'Unexpected urgency, mismatched links, unusual sender, attachment pressure, or unexpected MFA/login prompts.' },
      { id: 'rbc-cyber-f4', front: 'What is safer than saying "this is a breach"?', back: 'Say "suspected incident" or "possible credential risk" until authorised review confirms the facts.' },
      { id: 'rbc-cyber-f5', front: 'What should a cyber escalation note include?', back: 'Reporter, location/service, observed symptom, safe action taken, impact, and where evidence is stored.' },
      { id: 'rbc-cyber-f6', front: 'Why is risk management practical at Level 1?', back: 'It helps choose safer next actions without needing full forensic certainty.' },
      { id: 'rbc-cyber-f7', front: 'What should Josh avoid doing with suspicious attachments?', back: 'Opening, running, forwarding informally, or testing them outside the approved process.' },
      { id: 'rbc-cyber-f8', front: 'How does cybersecurity connect to school data?', back: 'Cyber incidents can expose student, staff, account, or operational information if handled poorly.' }
    ],
    quiz: [
      mcq({
        id: 'rbc-cyber-q1',
        prompt: 'A staff member reports an unexpected Microsoft login prompt after clicking an email link. What is the safest first-line response?',
        domain: 'RBC cybersecurity',
        difficulty: 'foundation',
        explanation: 'The immediate goal is to reduce risk and route the issue correctly.',
        modelAnswer:
          'Tell the staff member not to enter credentials, capture the basic symptom and where the message came from, preserve the original evidence in the authorised place, and escalate as a suspected phishing or credential-risk incident.',
        commonMistakes: ['Clicking the link to test it', 'Copying the full message into the PD app', 'Declaring a breach without review'],
        dcsContext: 'School accounts can expose email, student data, Teams, files, and other connected services.',
        reviewSchedule,
        recommendedModuleId: 'rbc-cybersecurity-school-it',
        weakTopic: 'rbc-cybersecurity',
        options: [
          { id: 'a', label: 'Click the same link on your own device to see what happens' },
          { id: 'b', label: 'Tell them not to enter details, preserve evidence, and escalate' },
          { id: 'c', label: 'Delete the email immediately so nobody else sees it' },
          { id: 'd', label: 'Reset unrelated security settings until the prompt disappears' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'rbc-cyber-q2',
        prompt: 'Write a privacy-safe escalation note template for a suspected phishing report.',
        domain: 'RBC cybersecurity',
        difficulty: 'stretch',
        explanation: 'A template keeps the note useful without spreading sensitive content.',
        modelAnswer:
          'Reporter and service affected; time observed; short symptom summary; safe action taken; impact; evidence location in the authorised system; request for security review.',
        commonMistakes: ['Pasting full email headers or personal details into PD notes', 'Leaving out the time and service', 'Overstating certainty'],
        dcsContext: 'DCS needs useful security notes without unnecessary exposure of staff or student information.',
        reviewSchedule,
        recommendedModuleId: 'rbc-cybersecurity-school-it',
        weakTopic: 'rbc-cybersecurity',
        rubric: ['Names the symptom', 'Avoids sensitive copied content', 'Includes action and escalation path'],
        keywordHints: ['symptom', 'safe action', 'authorised system', 'review']
      }),
      orderSteps({
        id: 'rbc-cyber-q3',
        prompt: 'Order the safest response to a suspicious attachment report.',
        domain: 'RBC cybersecurity',
        difficulty: 'stretch',
        explanation: 'Safe containment and evidence handling come before curiosity.',
        modelAnswer:
          'Stop interaction with the attachment, capture a minimal symptom note, preserve evidence in the authorised system, then escalate for security review.',
        commonMistakes: ['Opening the attachment to inspect it', 'Forwarding it informally', 'Deleting all evidence before review'],
        dcsContext: 'A school support role needs caution because the same account may touch many services.',
        reviewSchedule,
        recommendedModuleId: 'rbc-cybersecurity-school-it',
        weakTopic: 'rbc-cybersecurity',
        steps: [
          { id: 'stop', label: 'Stop interaction with the attachment' },
          { id: 'note', label: 'Capture a minimal symptom note' },
          { id: 'preserve', label: 'Preserve evidence in the authorised place' },
          { id: 'escalate', label: 'Escalate for security review' }
        ],
        correctOrder: ['stop', 'note', 'preserve', 'escalate'],
        rubric: ['Stops unsafe action', 'Preserves evidence', 'Escalates cleanly']
      }),
      explainItSimply({
        id: 'rbc-cyber-q4',
        prompt: 'Explain why "suspected phishing" is better wording than "we have been hacked" at first line.',
        domain: 'RBC cybersecurity',
        difficulty: 'foundation',
        explanation: 'Careful language prevents panic and keeps the facts clean.',
        modelAnswer:
          'Suspected phishing describes what has been observed without claiming facts that have not been confirmed. It helps the authorised reviewer investigate without panic or false certainty.',
        commonMistakes: ['Using dramatic language', 'Pretending certainty before investigation'],
        dcsContext: 'Clear language protects trust while still treating the risk seriously.',
        reviewSchedule,
        recommendedModuleId: 'rbc-cybersecurity-school-it',
        weakTopic: 'rbc-cybersecurity',
        rubric: ['Uses plain language', 'Avoids overclaiming', 'Connects wording to safer escalation'],
        keywordHints: ['observed', 'confirmed', 'review']
      })
    ],
    scenarioPrompts: [
      {
        id: 'rbc-cyber-s1',
        title: 'Suspicious email triage',
        prompt: 'Respond to a staff report of a suspicious Microsoft login email without clicking, forwarding sensitive content, or overstating certainty.'
      }
    ],
    practicalOutputs: [
      {
        id: 'rbc-cyber-p1',
        title: 'Cyber incident note template',
        description: 'Draft a privacy-safe suspected phishing note that captures risk, action, impact, and escalation path.'
      }
    ]
  },
  {
    id: 'rbc-scripting-code-reading',
    title: 'RBC Scripting and Code-Reading Literacy',
    description:
      'Use introductory programming concepts to read simple automation logic, ask better questions, and avoid running scripts blindly in a school environment.',
    domain: 'Programming and Automation',
    level: 'RBC',
    estimatedMinutes: 24,
    tags: ['RBC', 'CSE1PE', 'CSE1OOF', 'automation', 'testing'],
    sourceSubjects: [
      {
        code: 'CSE1PE',
        title: 'Programming Environment',
        course: 'RBC',
        silos: [
          'Analyse a data processing problem to correctly identify both the data and high-level processing involved.',
          'Apply sequence, selection, and iteration to design computational solutions.',
          'Use basic data structures such as lists and dictionaries to solve batch data processing problems.',
          'Implement executable code in Python to solve computational problems.'
        ],
        weeklyTopics: ['Algorithms and Flowcharts', 'Conditional Execution', 'Iteration', 'Functions and Objects', 'Strings and Files', 'Data Structures', 'Software Errors'],
        alignmentNote:
          'DCSPrep uses this subject to build script-reading and automation-safety literacy rather than full programming fluency.',
        slgCurrency: '2025/2024/2023 SLGs in the current RBC reference.'
      },
      {
        code: 'CSE1OOF',
        title: 'Object-Oriented Programming Fundamentals',
        course: 'RBC',
        silos: [
          'Use an operating system and development environment to code, debug and execute Java programs.',
          'Analyse a problem and construct a logical solution suitable for implementation.',
          'Develop a basic understanding of objects and classes.',
          'Design and execute test plans.'
        ],
        weeklyTopics: ['Development environment', 'Classes and objects', 'Flow of control', 'Testing'],
        alignmentNote:
          'DCSPrep pulls out transferable debugging, test-plan, and code-reasoning habits for support work.',
        slgCurrency: '2020 SLG; treat as directional until updated.'
      }
    ],
    learningObjectives: [
      'Read simple automation as input, process, output, and risk.',
      'Recognise sequence, selection, iteration, lists, and dictionaries in plain language.',
      'Use a basic test plan before recommending, running, or escalating a script.'
    ],
    dcsRelevance: [
      'School IT work often involves scripts, scheduled tasks, exports, device groups, and vendor instructions.',
      'Josh does not need to become a developer to notice whether a script targets the wrong users or changes too much.',
      'A small amount of code-reading literacy improves escalation notes and reduces accidental production risk.'
    ],
    sections: [
      {
        id: 'rbc-script-1',
        title: 'Read scripts as data flow',
        bodyMarkdown:
          'Start by asking what data goes in, what the script does to it, and what comes out. This is the same input-process-output frame used in introductory programming.\n\nFor support work, also ask what the script changes. A report-only script is different from a script that deletes, disables, moves, or grants access.'
      },
      {
        id: 'rbc-script-2',
        title: 'Control flow in plain English',
        bodyMarkdown:
          'Sequence means actions happen in order. Selection means the script chooses a path with an if/else decision. Iteration means the script loops over items such as users, devices, files, or records.\n\nIf you can identify those three ideas, you can often explain what a script is trying to do without understanding every syntax detail.'
      },
      {
        id: 'rbc-script-3',
        title: 'Testing is part of safe automation',
        bodyMarkdown:
          'Before a script touches school systems, ask how it was tested, what sample it used, whether it has a dry-run mode, and how the result can be reversed or checked.\n\nA good escalation says what the script is supposed to target, what evidence suggests it is wrong, and what safe test would reduce uncertainty.'
      }
    ],
    flashcards: [
      { id: 'rbc-script-f1', front: 'What is the input-process-output frame?', back: 'Identify what data goes in, what happens to it, and what result comes out.' },
      { id: 'rbc-script-f2', front: 'What is sequence?', back: 'Steps running in order.' },
      { id: 'rbc-script-f3', front: 'What is selection?', back: 'A decision path, often expressed as if/else logic.' },
      { id: 'rbc-script-f4', front: 'What is iteration?', back: 'A loop over multiple items such as users, devices, files, or rows.' },
      { id: 'rbc-script-f5', front: 'Why are lists and dictionaries useful in automation?', back: 'They hold groups of items or key-value details that scripts can process.' },
      { id: 'rbc-script-f6', front: 'What is a dry run?', back: 'A test mode that shows what would happen without making the real change.' },
      { id: 'rbc-script-f7', front: 'What question should Josh ask before running a script?', back: 'What will this change, who or what is targeted, and how was it tested?' },
      { id: 'rbc-script-f8', front: 'How does a test plan help support work?', back: 'It defines expected behaviour, evidence, and safer comparison before production action.' }
    ],
    quiz: [
      mcq({
        id: 'rbc-script-q1',
        prompt: 'A script loops through a list of devices and removes each one from a group. Which programming idea is most important to notice?',
        domain: 'RBC scripting literacy',
        difficulty: 'foundation',
        explanation: 'The loop makes the blast radius depend on the device list.',
        modelAnswer:
          'The key idea is iteration over a list. Josh should check which devices are in the list before any removal action happens.',
        commonMistakes: ['Focusing only on the command name', 'Ignoring the target list', 'Assuming a loop affects only one device'],
        dcsContext: 'A wrong group or device list can affect many classrooms at once.',
        reviewSchedule,
        recommendedModuleId: 'rbc-scripting-code-reading',
        weakTopic: 'rbc-programming-logic',
        options: [
          { id: 'a', label: 'Iteration over a list' },
          { id: 'b', label: 'A web browser cache problem' },
          { id: 'c', label: 'Printer driver matching' },
          { id: 'd', label: 'DNS name resolution' }
        ],
        correctOptionId: 'a'
      }),
      shortAnswer({
        id: 'rbc-script-q2',
        prompt: 'List four questions to ask before running or recommending an automation script.',
        domain: 'RBC scripting literacy',
        difficulty: 'stretch',
        explanation: 'Automation safety starts with scope, target, test, and rollback thinking.',
        modelAnswer:
          'What data goes in? What will change? Which users/devices/files are targeted? Has it been tested or dry-run? How can the result be checked or reversed?',
        commonMistakes: ['Asking only whether it works', 'Ignoring target scope', 'No test or rollback question'],
        dcsContext: 'Even simple scripts can change many accounts or devices quickly.',
        reviewSchedule,
        recommendedModuleId: 'rbc-scripting-code-reading',
        weakTopic: 'rbc-programming-logic',
        rubric: ['Includes target scope', 'Includes change impact', 'Includes testing', 'Includes verification or rollback'],
        keywordHints: ['target', 'change', 'test', 'rollback']
      }),
      orderSteps({
        id: 'rbc-script-q3',
        prompt: 'Order a safe first review of an unfamiliar script.',
        domain: 'RBC scripting literacy',
        difficulty: 'stretch',
        explanation: 'Understanding target and action comes before execution.',
        modelAnswer:
          'Identify inputs, identify changes, check target scope, then ask for dry-run or authorised test evidence.',
        commonMistakes: ['Running first', 'Checking syntax only', 'Ignoring target scope'],
        dcsContext: 'The support risk is not just whether the script runs; it is what it changes.',
        reviewSchedule,
        recommendedModuleId: 'rbc-scripting-code-reading',
        weakTopic: 'rbc-programming-logic',
        steps: [
          { id: 'inputs', label: 'Identify inputs' },
          { id: 'changes', label: 'Identify what changes' },
          { id: 'scope', label: 'Check target scope' },
          { id: 'test', label: 'Ask for dry-run or test evidence' }
        ],
        correctOrder: ['inputs', 'changes', 'scope', 'test'],
        rubric: ['Inputs first', 'Change impact included', 'Test evidence before execution']
      }),
      explainItSimply({
        id: 'rbc-script-q4',
        prompt: 'Explain selection logic to a non-technical staff member in one sentence.',
        domain: 'RBC scripting literacy',
        difficulty: 'foundation',
        explanation: 'Plain-language explanation confirms real understanding.',
        modelAnswer:
          'Selection logic means the script checks a condition and chooses what to do next based on the result.',
        commonMistakes: ['Using jargon only', 'Confusing selection with repetition'],
        dcsContext: 'Clear explanations help when discussing automation behaviour with staff or vendors.',
        reviewSchedule,
        recommendedModuleId: 'rbc-scripting-code-reading',
        weakTopic: 'rbc-programming-logic',
        rubric: ['One sentence', 'Mentions condition', 'Mentions chosen action'],
        keywordHints: ['condition', 'choose', 'result']
      })
    ],
    scenarioPrompts: [
      {
        id: 'rbc-script-s1',
        title: 'Read before running',
        prompt: 'Review a simple automation snippet and decide what target, change, and test evidence must be confirmed before action.'
      }
    ],
    practicalOutputs: [
      {
        id: 'rbc-script-p1',
        title: 'Automation safety checklist',
        description: 'Write a short checklist for input, target scope, change impact, dry run, verification, and escalation.'
      }
    ]
  },
  {
    id: 'rbc-professional-responsibility-school-it',
    title: 'RBC Professional Responsibility in School IT',
    description:
      'Apply professional, ethical, legal, and reflective practice habits to school IT support decisions where privacy, duty, and trust matter.',
    domain: 'Professional Practice',
    level: 'RBC',
    estimatedMinutes: 20,
    tags: ['RBC', 'CSE3PE', 'ethics', 'privacy', 'reflection'],
    sourceSubjects: [
      {
        code: 'CSE3PE',
        title: 'Professional Environment',
        course: 'RBC/SMITB',
        silos: [
          'Apply ethical theory to the resolution of ethical dilemmas in IT.',
          'Develop a personal ethical framework for IT practice.',
          'Investigate and analyse contemporary social, legal and ethical issues in IT.',
          'Apply critical thinking to social, legal and ethical issues in IT.',
          'Appreciate responsibilities of IT professionals to employers, clients and society.',
          'Develop an appreciation of reflection in professional practice.'
        ],
        weeklyTopics: ['Ethical case reflection', 'Professional responsibilities', 'Social, legal and ethical issues'],
        alignmentNote:
          'DCSPrep treats this as a core professional-practice anchor for privacy, boundaries, escalation, and reflective evidence.',
        slgCurrency: '2018 SLG; treat as directional but highly relevant.'
      }
    ],
    learningObjectives: [
      'Recognise ethical and privacy risk in everyday support situations.',
      'Choose actions that respect role boundaries, student data, and organisational trust.',
      'Write short professional reflections that show judgement without exposing sensitive information.'
    ],
    dcsRelevance: [
      'School IT support can expose sensitive student, staff, pastoral, medical, assessment, and account information.',
      'Professional behaviour includes what Josh chooses not to open, copy, change, or discuss.',
      'Reflection turns support moments into PD evidence while keeping live school details protected.'
    ],
    sections: [
      {
        id: 'rbc-pro-1',
        title: 'Professional duty is practical',
        bodyMarkdown:
          'Professional responsibility is not abstract. It shows up when a user asks for a shortcut, when a screen displays sensitive information, or when a fix would require authority Josh does not hold.\n\nThe practical question is: what action protects learning, privacy, policy, and trust at the same time?'
      },
      {
        id: 'rbc-pro-2',
        title: 'Privacy is a support boundary',
        bodyMarkdown:
          'A support task may require seeing enough to diagnose the issue, but it does not justify reading unrelated content, copying personal information, or storing live details in PD notes.\n\nA good support habit is to ask the user to navigate, blur details where possible, record only the minimum necessary, and keep sensitive evidence in authorised systems.'
      },
      {
        id: 'rbc-pro-3',
        title: 'Reflect without leaking',
        bodyMarkdown:
          'Reflection should capture the professional lesson: risk noticed, duty involved, boundary respected, action taken, and next improvement.\n\nIt should not capture names, student records, screenshots, passwords, private messages, or unnecessary ticket details. The reflection proves judgement, not access to sensitive information.'
      }
    ],
    flashcards: [
      { id: 'rbc-pro-f1', front: 'What is professional responsibility in school IT?', back: 'Acting in ways that protect learning, privacy, policy, safety, and trust.' },
      { id: 'rbc-pro-f2', front: 'What is minimum necessary information?', back: 'Only the detail needed to diagnose, escalate, or document the issue appropriately.' },
      { id: 'rbc-pro-f3', front: 'Why should PD reflections avoid names and screenshots?', back: 'They can expose sensitive school information outside the authorised record.' },
      { id: 'rbc-pro-f4', front: 'What is a role boundary?', back: 'The limit of what Josh is authorised and competent to change or decide.' },
      { id: 'rbc-pro-f5', front: 'Name one ethical question before bypassing a process.', back: 'Who could be harmed, whose authority is needed, and what policy or trust is affected?' },
      { id: 'rbc-pro-f6', front: 'What belongs in a professional reflection?', back: 'Risk, duty, boundary, action, evidence type, and next improvement.' },
      { id: 'rbc-pro-f7', front: 'Why does trust matter in support?', back: 'Users allow access to devices and systems because they expect careful, limited, professional handling.' },
      { id: 'rbc-pro-f8', front: 'What should Josh do when pressured to overstep?', back: 'Stay calm, explain the boundary, offer the safe pathway, and escalate if needed.' }
    ],
    quiz: [
      mcq({
        id: 'rbc-pro-q1',
        prompt: 'A staff member asks Josh to open a student record on their computer while they leave the room. What is the best professional response?',
        domain: 'RBC professional practice',
        difficulty: 'foundation',
        explanation: 'Support access should be limited and user-present where practical.',
        modelAnswer:
          'Ask the staff member to stay and navigate where possible, view only what is necessary for the support issue, and avoid recording unrelated student details.',
        commonMistakes: ['Browsing the record alone', 'Copying details into PD notes', 'Ignoring privacy because access was convenient'],
        dcsContext: 'Student records carry high privacy and trust obligations.',
        reviewSchedule,
        recommendedModuleId: 'rbc-professional-responsibility-school-it',
        weakTopic: 'rbc-professional-practice',
        options: [
          { id: 'a', label: 'Open the record alone and explore until the issue is clear' },
          { id: 'b', label: 'Ask the staff member to stay and expose only what is needed' },
          { id: 'c', label: 'Take a screenshot for the PD app so the issue is documented' },
          { id: 'd', label: 'Refuse all support involving student systems under any condition' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'rbc-pro-q2',
        prompt: 'Write a five-part privacy-safe professional reflection template.',
        domain: 'RBC professional practice',
        difficulty: 'stretch',
        explanation: 'A reflection template keeps evidence useful and safe.',
        modelAnswer:
          'Risk noticed; duty or policy involved; boundary respected; action taken; next improvement. Avoid names, screenshots, passwords, and unnecessary personal details.',
        commonMistakes: ['Writing a story full of identifying details', 'Skipping the boundary or lesson', 'Treating reflection as a ticket clone'],
        dcsContext: 'PD evidence should show judgement without becoming a second record of sensitive incidents.',
        reviewSchedule,
        recommendedModuleId: 'rbc-professional-responsibility-school-it',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Includes risk', 'Includes duty or boundary', 'Includes action', 'Avoids sensitive details'],
        keywordHints: ['risk', 'duty', 'boundary', 'action', 'improvement']
      }),
      scenarioResponse({
        id: 'rbc-pro-q3',
        prompt:
          'A teacher is frustrated and wants Josh to bypass an approval process for a quick account change. Write the professional response.',
        domain: 'RBC professional practice',
        difficulty: 'challenge',
        explanation: 'Professional support needs calm boundaries under pressure.',
        modelAnswer:
          'Acknowledge the urgency, explain that account changes need the authorised path because they affect access and privacy, capture the impact clearly, and escalate or route the request to the owner who can approve it.',
        commonMistakes: ['Making the change to keep the peace', 'Arguing instead of explaining the boundary', 'Ignoring the impact'],
        dcsContext: 'Identity and access decisions can affect student safety, staff privacy, and auditability.',
        reviewSchedule,
        recommendedModuleId: 'rbc-professional-responsibility-school-it',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Acknowledges urgency', 'States boundary', 'Routes to authorised owner']
      }),
      explainItSimply({
        id: 'rbc-pro-q4',
        prompt: 'Explain why a PD reflection should not include real student names.',
        domain: 'RBC professional practice',
        difficulty: 'foundation',
        explanation: 'Plain privacy reasoning is part of professional practice.',
        modelAnswer:
          'A reflection only needs the lesson learned; real student names add privacy risk without improving the professional evidence.',
        commonMistakes: ['Assuming local notes are always safe', 'Treating names as harmless detail'],
        dcsContext: 'School PD notes should not become unnecessary stores of student information.',
        reviewSchedule,
        recommendedModuleId: 'rbc-professional-responsibility-school-it',
        weakTopic: 'rbc-professional-practice',
        rubric: ['Mentions lesson', 'Mentions privacy risk', 'Explains unnecessary detail'],
        keywordHints: ['lesson', 'privacy', 'unnecessary']
      })
    ],
    scenarioPrompts: [
      {
        id: 'rbc-pro-s1',
        title: 'Sensitive information during support',
        prompt: 'Handle a support moment where confidential student or staff information becomes visible while still solving the technical problem.'
      }
    ],
    practicalOutputs: [
      {
        id: 'rbc-pro-p1',
        title: 'Professional reflection template',
        description: 'Draft a privacy-safe PD reflection template with risk, duty, boundary, action, and next improvement.'
      }
    ]
  },
  {
    id: 'smitb-cloud-ai-school-it',
    title: 'SMITB Cloud and AI Awareness for School IT',
    description:
      'Build practical awareness of cloud services, deployment language, AI limitations, and responsible AI handling in school support contexts.',
    domain: 'Data and AI',
    level: 'SMITB',
    estimatedMinutes: 26,
    tags: ['SMITB', 'CSE4002', 'CSE5006', 'CSE5NLP', 'cloud', 'AI'],
    sourceSubjects: [
      {
        code: 'CSE4002',
        title: 'Artificial Intelligence Fundamentals',
        course: 'SMITB',
        silos: [
          'Devise representations for search and game playing.',
          'Represent knowledge and automated reasoning.',
          'Construct simple expert systems.',
          'Analyse and design basic machine learning algorithms.'
        ],
        weeklyTopics: ['Introduction to AI', 'Search', 'Knowledge Representation', 'Automated Reasoning', 'Expert Systems', 'Machine Learning', 'Azure AI'],
        alignmentNote:
          'DCSPrep uses this subject for responsible AI and Azure AI awareness in school support rather than model-building depth.',
        slgCurrency: '2025/2024 SLGs in the current SMITB reference.'
      },
      {
        code: 'CSE5006',
        title: 'Cloud-Based Web Application',
        course: 'SMITB',
        silos: [
          'Design and develop web applications using JavaScript.',
          'Design and build a stateless web server based on cloud technologies.',
          'Design and customise backend web applications based on user requirements.',
          'Use modern software engineering tools to build and deploy robust code for scalable websites.',
          'Investigate storage technologies for a web site.'
        ],
        weeklyTopics: ['Git', 'Docker', 'JavaScript', 'React', 'RESTful API', 'AWS S3', 'Containers', 'CI/CD'],
        alignmentNote:
          'DCSPrep uses this subject to explain SaaS, APIs, deployments, storage, and cloud service dependencies that appear in school support.',
        slgCurrency: '2024 SLG in the current SMITB reference.'
      },
      {
        code: 'CSE5NLP',
        title: 'Natural Language Processing',
        course: 'SMITB',
        silos: [
          'Apply NLP subtasks to natural language texts.',
          'Describe and evaluate methods used to process textual data.',
          'Devise NLP pipelines using existing libraries and resources.',
          'Critically evaluate NLP results for categorisation, clustering, recommendation and retrieval.'
        ],
        weeklyTopics: ['Introduction to NLP', 'Text classification', 'Vector semantics and embeddings', 'Neural language models'],
        alignmentNote:
          'DCSPrep uses this subject to frame Copilot, chatbots, AI search, and answer verification in school environments.',
        slgCurrency: '2024 SLG in the current SMITB reference.'
      }
    ],
    learningObjectives: [
      'Translate cloud and deployment vocabulary into first-line support questions.',
      'Recognise when AI output needs verification, privacy review, or escalation.',
      'Explain cloud and AI limits without overclaiming technical certainty.'
    ],
    dcsRelevance: [
      'Schools depend on cloud services, SaaS platforms, Microsoft 365, vendor APIs, and managed updates.',
      'AI tools can help staff but can also invent answers, mishandle sensitive data, or hide the real source of a problem.',
      'First-line awareness helps Josh ask sharper questions before escalating to vendors, platform owners, or Paul.'
    ],
    sections: [
      {
        id: 'smitb-cloud-ai-1',
        title: 'Cloud services have layers',
        bodyMarkdown:
          'A school web tool can involve the user device, browser, identity provider, internet path, SaaS front end, API, database, storage, and deployment pipeline.\n\nWhen something breaks, do not collapse all of that into "the app is down." Ask what still works, who is affected, whether login works, whether only one feature fails, and whether the vendor has a status or deployment notice.'
      },
      {
        id: 'smitb-cloud-ai-2',
        title: 'AI output is not authority',
        bodyMarkdown:
          'AI tools can summarise, classify, retrieve, and generate text, but they can still produce wrong or unsupported answers. NLP and machine learning systems work from patterns, training data, retrieval sources, and prompts.\n\nA support-safe approach is to verify important AI output against an authoritative source before acting, especially for policy, student information, security, finance, or legal issues.'
      },
      {
        id: 'smitb-cloud-ai-3',
        title: 'Responsible AI starts with data boundaries',
        bodyMarkdown:
          'Before putting information into an AI tool, ask whether the data is personal, sensitive, confidential, or school-controlled. Also ask whether the tool is approved for that kind of data.\n\nIf the answer is unclear, use a de-identified example, seek approval, or escalate. The goal is not to ban useful AI; it is to keep school information inside the right boundaries.'
      }
    ],
    flashcards: [
      { id: 'smitb-cloud-ai-f1', front: 'What is a SaaS dependency?', back: 'A service or layer the app relies on, such as identity, API, storage, network, or vendor platform.' },
      { id: 'smitb-cloud-ai-f2', front: 'What does CI/CD explain at a high level?', back: 'Automated building, testing, and deployment of software changes.' },
      { id: 'smitb-cloud-ai-f3', front: 'Why can an app fail for one feature but not all users?', back: 'Different features may use different APIs, permissions, storage, or backend services.' },
      { id: 'smitb-cloud-ai-f4', front: 'Why is AI output not authority?', back: 'It can be incomplete, unsupported, outdated, or confidently wrong.' },
      { id: 'smitb-cloud-ai-f5', front: 'What should verify an AI answer about school policy?', back: 'The authoritative school policy, owner, or approved source.' },
      { id: 'smitb-cloud-ai-f6', front: 'What is the first data question before using AI?', back: 'Is the information personal, sensitive, confidential, or approved for this tool?' },
      { id: 'smitb-cloud-ai-f7', front: 'How does NLP relate to Copilot or chatbots?', back: 'It helps process, retrieve, classify, and generate language-based responses.' },
      { id: 'smitb-cloud-ai-f8', front: 'What belongs in a cloud escalation note?', back: 'Affected users, feature, login status, error, time, scope, changes noticed, and vendor/status evidence.' }
    ],
    quiz: [
      mcq({
        id: 'smitb-cloud-ai-q1',
        prompt: 'A SaaS app loads, but file uploads fail for all staff. Which escalation framing is most useful?',
        domain: 'SMITB cloud and AI',
        difficulty: 'stretch',
        explanation: 'Feature-level failure suggests a dependency rather than total app outage.',
        modelAnswer:
          'Frame it as a feature-specific cloud dependency issue: login and main app load, but upload/storage path appears affected for multiple staff.',
        commonMistakes: ['Saying only "the app is down"', 'Reinstalling one browser before checking scope', 'Ignoring that storage may be separate'],
        dcsContext: 'Many school platforms are layered SaaS tools where one feature can fail while the rest still works.',
        reviewSchedule,
        recommendedModuleId: 'smitb-cloud-ai-school-it',
        weakTopic: 'smitb-cloud-ai',
        options: [
          { id: 'a', label: 'The entire internet is down' },
          { id: 'b', label: 'A feature-specific upload or storage dependency appears affected' },
          { id: 'c', label: 'Every staff laptop needs replacement' },
          { id: 'd', label: 'The issue must be a local printer driver' }
        ],
        correctOptionId: 'b'
      }),
      shortAnswer({
        id: 'smitb-cloud-ai-q2',
        prompt: 'List five details that make a cloud/SaaS escalation note useful.',
        domain: 'SMITB cloud and AI',
        difficulty: 'stretch',
        explanation: 'Cloud issues need scope and dependency clues.',
        modelAnswer:
          'Affected users or groups, exact feature, login status, error text, time started, scope, safe checks tried, recent change or vendor status evidence.',
        commonMistakes: ['Only writing "app broken"', 'No feature name', 'No scope or timing'],
        dcsContext: 'Good notes help Paul or the vendor separate identity, browser, network, API, and storage issues.',
        reviewSchedule,
        recommendedModuleId: 'smitb-cloud-ai-school-it',
        weakTopic: 'smitb-cloud-ai',
        rubric: ['Includes scope', 'Includes feature', 'Includes error/time', 'Includes safe checks or status evidence'],
        keywordHints: ['scope', 'feature', 'error', 'time', 'status']
      }),
      scenarioResponse({
        id: 'smitb-cloud-ai-q3',
        prompt:
          'A staff member wants to paste identifiable student wellbeing notes into an AI chatbot to summarise them. Write the safe response.',
        domain: 'SMITB cloud and AI',
        difficulty: 'challenge',
        explanation: 'Responsible AI starts with data boundaries.',
        modelAnswer:
          'Pause the action, explain that identifiable student wellbeing information is sensitive, check whether the tool is approved for that data, and suggest using a de-identified example or seeking the authorised pathway.',
        commonMistakes: ['Assuming any AI tool is safe', 'Only warning about accuracy and not privacy', 'Pasting the data to test the result'],
        dcsContext: 'Student wellbeing information needs strict handling and should not be put into unapproved tools.',
        reviewSchedule,
        recommendedModuleId: 'smitb-cloud-ai-school-it',
        weakTopic: 'smitb-cloud-ai',
        rubric: ['Stops unsafe data use', 'Names sensitivity', 'Offers approved or de-identified path']
      }),
      explainItSimply({
        id: 'smitb-cloud-ai-q4',
        prompt: 'Explain why an AI chatbot can sound confident and still be wrong.',
        domain: 'SMITB cloud and AI',
        difficulty: 'foundation',
        explanation: 'Plain explanation helps users trust verification rather than tone.',
        modelAnswer:
          'A chatbot generates likely language from patterns and sources, so a confident answer can still be incomplete, unsupported, or based on the wrong context.',
        commonMistakes: ['Saying AI is always useless', 'Assuming confident wording proves accuracy'],
        dcsContext: 'Staff may need help knowing when to verify AI answers before acting.',
        reviewSchedule,
        recommendedModuleId: 'smitb-cloud-ai-school-it',
        weakTopic: 'smitb-cloud-ai',
        rubric: ['Mentions likely language or patterns', 'Mentions wrong context', 'Connects to verification'],
        keywordHints: ['patterns', 'context', 'verify']
      })
    ],
    scenarioPrompts: [
      {
        id: 'smitb-cloud-ai-s1',
        title: 'Cloud app partial outage',
        prompt: 'Triage a SaaS feature failure by identifying affected users, login status, failed feature, dependency clues, and escalation evidence.'
      }
    ],
    practicalOutputs: [
      {
        id: 'smitb-cloud-ai-p1',
        title: 'Cloud and AI risk checklist',
        description: 'Draft a checklist covering SaaS dependency scope, vendor/status evidence, AI data sensitivity, and answer verification.'
      }
    ]
  },
  ...dcsWorkflowModules
];

export function getModuleById(moduleId: string) {
  const resolvedId = legacyModuleAliases[moduleId] || moduleId;
  return modules.find((module) => module.id === resolvedId);
}

export function getModuleQuestions(moduleId: string, source: AssessmentSource = 'module-quiz') {
  const moduleData = getModuleById(moduleId);

  if (!moduleData) {
    return [];
  }

  return moduleData.quiz.map((question) => ({
    ...question,
    recommendedModuleId: question.recommendedModuleId,
    reviewSchedule: question.reviewSchedule,
    source
  }));
}

export default modules;


