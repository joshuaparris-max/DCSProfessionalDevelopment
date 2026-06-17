import type { Scenario } from '../types/scenarios';

export const scenarios: Scenario[] = [
  {
    id: 'display-black-screen',
    title: 'Classroom display black screen',
    summary: 'Troubleshoot a classroom display that powers on but shows no image.',
    missionType: 'Triage Mission',
    estimatedMinutes: 12,
    initialReport: 'A teacher reports the classroom display is powered on but remains black with no signal.',
    contextBullets: [
      'The display is used for teaching and is part of the standard classroom kit.',
      'The room is mapped to a known school network VLAN.',
      'No recent change control request was raised for the room.'
    ],
    steps: [
      {
        id: 'step-1',
        title: 'Verify the physical setup',
        prompt: 'What should you check first?',
        choices: [
          {
            id: 'choice-1',
            label: 'Confirm the display power and cable connections',
            outcome: 'The power cable is secure and the display shows a standby light, so the hardware is powered correctly.',
            riskNote: 'Always check power and cabling before making configuration changes.',
            correct: true
          },
          {
            id: 'choice-2',
            label: 'Restart the school network switch',
            outcome: 'Restarting the switch is premature and may impact other classrooms.',
            riskNote: 'Avoid broad network changes unless local checks indicate a network fault.',
            correct: false
          }
        ]
      },
      {
        id: 'step-2',
        title: 'Check source and input settings',
        prompt: 'What is the safest next step?',
        choices: [
          {
            id: 'choice-3',
            label: 'Confirm the display input matches the teacher device output',
            outcome: 'The display input was on the wrong HDMI port; switching it returns the expected image.',
            riskNote: 'Matching source and input is a low-risk, high-value check.',
            correct: true
          },
          {
            id: 'choice-4',
            label: 'Replace the display with a spare unit immediately',
            outcome: 'Replacing hardware before confirming a configuration issue risks unnecessary hardware handling.',
            riskNote: 'Only replace hardware after simpler checks are exhausted.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Verify the display is powered and connected',
      'Confirm the correct input source is selected',
      'Check the teacher device output and cabling',
      'Document the resolution and escalation boundary if needed'
    ],
    escalationPoint: 'If the display remains blank after checking power and input, escalate to a Level 2 warrantied AV specialist.',
    riskNote: 'Do not alter network infrastructure unless the fault clearly points to the VLAN or switch.',
    ticketNoteExample: 'Verified display power and input source. Switched to HDMI port 1 and confirmed image return. No student data reviewed.'
  },
  {
    id: 'msp-m365-mfa-locked',
    title: 'Client locked out by MFA',
    summary: 'Handle a common MSP request where a client cannot access their M365 account due to MFA issues.',
    missionType: 'User Communication Mission',
    estimatedMinutes: 10,
    initialReport: 'A client calls saying they have a new phone and can no longer receive their MFA code to log into Outlook.',
    contextBullets: [
      'Client is a high-priority account with strict security requirements.',
      'You have access to the M365 Admin Center.',
      'Verification of identity is required before any reset.'
    ],
    steps: [
      {
        id: 'mfa-step-1',
        title: 'Verify Identity',
        prompt: 'How should you verify the user\'s identity before proceeding?',
        choices: [
          {
            id: 'mfa-c1',
            label: 'Ask for their full name and job title, then proceed.',
            outcome: 'This is not sufficient verification for a security-sensitive reset.',
            riskNote: 'Publicly available info like name and title is easily spoofed.',
            correct: false
          },
          {
            id: 'mfa-c2',
            label: 'Perform an out-of-band verification (e.g., call them back on a known number or verify via their manager).',
            outcome: 'Identity verified safely. You have followed the MSP security protocol.',
            riskNote: 'Always verify identity before touching MFA or password settings.',
            correct: true
          }
        ]
      },
      {
        id: 'mfa-step-2',
        title: 'Perform Reset',
        prompt: 'What is the correct action in the M365 Admin Center?',
        choices: [
          {
            id: 'mfa-c3',
            label: 'Require the user to re-register MFA and clear existing sessions.',
            outcome: 'The user will be prompted to set up their new phone on the next login. Sessions are cleared for security.',
            riskNote: 'Clearing sessions prevents unauthorized access from the old device.',
            correct: true
          },
          {
            id: 'mfa-c4',
            label: 'Disable MFA for the user entirely to get them working quickly.',
            outcome: 'This leaves the user account vulnerable and violates security policy.',
            riskNote: 'Never disable security features permanently as a "fix".',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Verify user identity using an approved out-of-band method',
      'Access M365 Admin Center and navigate to the user\'s security settings',
      'Trigger MFA re-registration and revoke active sessions',
      'Guide the user through the new setup process'
    ],
    escalationPoint: 'Escalate to a Security Lead if the user cannot be verified or if suspicious account activity is detected.',
    riskNote: 'Do not record the user\'s private phone number or temporary codes in your notes.',
    ticketNoteExample: 'User identity verified via manager callback. Triggered MFA re-registration and cleared active sessions. Guided user through Microsoft Authenticator setup. Access restored.'
  },
  {
    id: 'classroom-wifi-no-internet',
    title: 'One classroom has Wi-Fi but no internet',
    summary: 'Triage a room-level connectivity problem without jumping straight to network-wide assumptions.',
    missionType: 'Triage Mission',
    estimatedMinutes: 12,
    initialReport: 'A teacher says the classroom devices show Wi-Fi connected, but websites will not load in one room.',
    contextBullets: [
      'The issue appears to be limited to one classroom at the time of the report.',
      'Other areas of the school may still be working normally.',
      'The priority is to confirm scope before escalating.'
    ],
    steps: [
      {
        id: 'wifi-step-1',
        title: 'Clarify scope first',
        prompt: 'What is the best first move?',
        choices: [
          {
            id: 'wifi-choice-1',
            label: 'Check whether one device or multiple devices in the same room show the same symptom',
            outcome: 'The teacher confirms multiple devices in the same room are affected, which makes the issue more than a single-laptop problem.',
            riskNote: 'Scope checks protect class time and stop you from treating a room issue like a one-device fault.',
            correct: true
          },
          {
            id: 'wifi-choice-2',
            label: 'Forget the Wi-Fi network on the teacher laptop immediately and rebuild it from scratch',
            outcome: 'That may help one device, but it does not tell you whether the room symptom is broader.',
            riskNote: 'Avoid device-only fixes before you understand whether the fault is local or shared.',
            correct: false
          }
        ]
      },
      {
        id: 'wifi-step-2',
        title: 'Use a comparison check',
        prompt: 'What is the safest next check once scope looks room-level?',
        choices: [
          {
            id: 'wifi-choice-3',
            label: 'Compare with another nearby room or a known-good device to confirm whether the issue is isolated',
            outcome: 'A nearby room works normally, which supports the idea of a room-specific access point, uplink, or path problem.',
            riskNote: 'Comparison checks help produce a cleaner escalation note.',
            correct: true
          },
          {
            id: 'wifi-choice-4',
            label: 'Restart the whole school core network because the room has no internet',
            outcome: 'That would create unnecessary risk well beyond the affected classroom.',
            riskNote: 'Do not take broad infrastructure action from a room symptom without authority and evidence.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Clarify whether one device or many are affected',
      'Confirm the correct SSID and compare with a known-good device or nearby room',
      'Record the room, scope, and what still works',
      'Escalate with evidence if the issue remains room-specific or infrastructure-facing'
    ],
    escalationPoint: 'If multiple devices in one room remain connected to Wi-Fi but cannot reach services after safe checks, escalate as a room or infrastructure-path issue.',
    riskNote: 'Do not change VLAN, DHCP, gateway, or switch settings from a personal PD workflow or unauthorised first-line session.',
    ticketNoteExample: 'Room-level Wi-Fi issue reported. Multiple devices in the same classroom show connected Wi-Fi but no internet access. Nearby room still working. SSID and scope checked. Escalating with room and impact details.'
  },
  {
    id: 'msp-sharepoint-sync-conflict',
    title: 'SharePoint Sync Conflict',
    summary: 'Resolve a common file access issue where a client has sync errors in their OneDrive/SharePoint client.',
    missionType: 'Troubleshooting Sequence Mission',
    estimatedMinutes: 15,
    initialReport: 'A user reports that their files are not updating in the shared "Finance" folder and they see a red X on their OneDrive icon.',
    contextBullets: [
      'The Finance folder is a shared SharePoint document library.',
      'Other team members can see updates, but this user cannot.',
      'The user is working from home on a stable internet connection.'
    ],
    steps: [
      {
        id: 'sync-step-1',
        title: 'Identify the specific error',
        prompt: 'What is the first thing you should ask the user to do?',
        choices: [
          {
            id: 'sync-c1',
            label: 'Ask them to click the OneDrive cloud icon and read the specific error message.',
            outcome: 'The error says "A file with this name already exists" or "Conflict: 2 versions of this file".',
            riskNote: 'The OneDrive activity center is the best source of truth for sync faults.',
            correct: true
          },
          {
            id: 'sync-c2',
            label: 'Ask them to restart their computer.',
            outcome: 'A restart might clear a hung process but won\'t fix a file conflict or naming error.',
            riskNote: 'Avoid "reboot first" if there is a specific error message available.',
            correct: false
          }
        ]
      },
      {
        id: 'sync-step-2',
        title: 'Resolve the conflict',
        prompt: 'The user has a file named "Finance_Report_2024.xlsx" that is causing a conflict. What is the safest way to resolve it?',
        choices: [
          {
            id: 'sync-c3',
            label: 'Rename the local version of the file to "Finance_Report_2024_OLD.xlsx" and let the cloud version sync down.',
            outcome: 'Conflict resolved. The user can now compare both versions and merge if needed without losing data.',
            riskNote: 'Renaming is safer than deleting when you aren\'t sure which version is current.',
            correct: true
          },
          {
            id: 'sync-c4',
            label: 'Delete the local file and tell them to download it again from the web.',
            outcome: 'This risks losing any work the user did while they were offline or out of sync.',
            riskNote: 'Never delete user files as a first-line resolution for sync errors.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Read the specific error message in the OneDrive client',
      'Identify the conflicting file(s)',
      'Rename the local version to preserve work',
      'Allow the cloud version to sync and verify the icon turns green'
    ],
    escalationPoint: 'Escalate to a Level 2 Cloud Tech if the OneDrive client requires a full reset or if the document library permissions appear broken.',
    riskNote: 'Do not perform a "OneDrive /reset" without backup, as it can trigger massive re-downloads on slow connections.',
    ticketNoteExample: 'OneDrive sync error on Finance folder. Conflict identified on "Finance_Report_2024.xlsx". Renamed local file to preserve changes. Sync resumed successfully. Confirmed user has access to latest version.'
  },
  {
    id: 'staff-offboarding-m365-visibility',
    title: 'Former staff member still appears active in Teams',
    summary: 'Handle offboarding visibility concerns without treating one symptom as authority to make identity changes.',
    missionType: 'Security Judgement Mission',
    estimatedMinutes: 10,
    initialReport: 'A departed staff member still appears in Teams and a colleague wants it removed immediately.',
    contextBullets: [
      'Identity and offboarding changes carry privacy and access risk.',
      'Service visibility can lag behind back-end changes.',
      'The task is to capture the symptom clearly and escalate through the authorised owner.'
    ],
    steps: [
      {
        id: 'offboard-step-1',
        title: 'Treat the symptom carefully',
        prompt: 'What is the safest first response?',
        choices: [
          {
            id: 'offboard-choice-1',
            label: 'Document where the account still appears and confirm the offboarding context before escalating',
            outcome: 'You now have a clean note about the visible symptom and the business context without making extra identity changes.',
            riskNote: 'Documentation first is safer than improvising account actions.',
            correct: true
          },
          {
            id: 'offboard-choice-2',
            label: 'Start removing group memberships and resetting the account until the Teams entry disappears',
            outcome: 'That creates extra identity risk and steps outside a safe first-line boundary.',
            riskNote: 'Do not perform production identity cleanup without authority and process ownership.',
            correct: false
          }
        ]
      },
      {
        id: 'offboard-step-2',
        title: 'Explain the likely next step',
        prompt: 'What should your escalation note communicate?',
        choices: [
          {
            id: 'offboard-choice-3',
            label: 'That service visibility may lag or the offboarding sequence may need review by the authorised owner',
            outcome: 'This sets the right expectation: the symptom matters, but it does not justify unsafe cleanup from Level 1.',
            riskNote: 'State the symptom, scope, and urgency without pretending certainty about the root cause.',
            correct: true
          },
          {
            id: 'offboard-choice-4',
            label: 'That Teams is unreliable, so no further review is needed unless the user complains again',
            outcome: 'That dismisses a potentially important identity symptom without proper review.',
            riskNote: 'Privacy and access symptoms should not be hand-waved away.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Capture exactly where the departed account is still visible',
      'Confirm the departure context and whether there is active access concern',
      'Avoid unauthorised identity cleanup actions',
      'Escalate through the authorised M365 or identity owner with a concise symptom note'
    ],
    escalationPoint: 'Escalate once the visible symptom and impact are captured; do not attempt broad account cleanup without explicit ownership.',
    riskNote: 'Never record unnecessary personal details, passwords, or internal identity data in the PD app or informal notes.',
    ticketNoteExample: 'Former staff visibility issue reported in Teams. Account still appears in service view after departure. Symptom captured for authorised identity/offboarding review. No direct account changes made at first line.'
  },
  {
    id: 'rbc-cybersecurity-phishing-triage',
    title: 'Phishing triage in a school context',
    summary: 'Review a suspicious email report and decide what to preserve, what to record, and what to escalate.',
    missionType: 'Security Judgement Mission',
    estimatedMinutes: 12,
    initialReport: 'A teacher received a login request email that looks like it came from the school, and they want you to check if it is real.',
    contextBullets: [
      'The email mentions a school login and asks the user to verify their password.',
      'The teacher is unsure whether to delete it or forward it to IT.',
      'Student safety and privacy are important in this workflow.'
    ],
    steps: [
      {
        id: 'phish-step-1',
        title: 'Preserve the suspicious item',
        prompt: 'What should you do first?',
        choices: [
          {
            id: 'phish-choice-1',
            label: 'Keep the message and capture the report details without clicking any links.',
            outcome: 'You preserve evidence and avoid triggering any potential malicious behavior.',
            riskNote: 'Clicking the link or downloading attachments can make the incident worse.',
            correct: true
          },
          {
            id: 'phish-choice-2',
            label: 'Open the link in a browser to see where it goes.',
            outcome: 'That could expose the device to phishing or malware.',
            riskNote: 'Do not interact with suspicious content directly.',
            correct: false
          }
        ]
      },
      {
        id: 'phish-step-2',
        title: 'Choose the right note style',
        prompt: 'What should the PD app note focus on?',
        choices: [
          {
            id: 'phish-choice-3',
            label: 'The fact that a suspicious login request was reported, what account or service was involved, and that it was preserved for review.',
            outcome: 'This keeps the note useful and privacy-safe.',
            riskNote: 'Avoid storing passwords, exact message text, or student names in the PD app.',
            correct: true
          },
          {
            id: 'phish-choice-4',
            label: 'The full email content and sender address for later reference.',
            outcome: 'That may expose private or sensitive information in the wrong place.',
            riskNote: 'Sensitive incident detail belongs in the authorised work system, not the PD app.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Preserve the suspicious email without interacting with it',
      'Capture the affected account or service at a high level',
      'Keep the PD note privacy-safe',
      'Escalate the item to the authorised security owner for formal review'
    ],
    escalationPoint: 'When the suspicious item is preserved and the scope is clear, escalate to the authorised security reviewer rather than trying to decide alone.',
    riskNote: 'Phishing incidents can include malicious URLs, attachments, or credential harvesting; do not engage with them directly.',
    ticketNoteExample: 'Teacher reported a suspicious school login request email. Preserved the item without clicking links. Escalating for authorised security review.'
  },
  {
    id: 'rbc-hardware-network-troubleshooting',
    title: 'Hardware/network troubleshooting for school devices',
    summary: 'Triage a room-level device problem and decide whether it is a hardware, network, or web issue.',
    missionType: 'Triage Mission',
    estimatedMinutes: 12,
    initialReport: 'A teacher says a classroom laptop is on, connected to Wi-Fi, but cannot load the learning portal.',
    contextBullets: [
      'The laptop shows a Wi-Fi connection icon and is on the right SSID.',
      'The portal loads fine on a nearby staff laptop.',
      'Class time is active and disruption should be minimised.'
    ],
    steps: [
      {
        id: 'hw-step-1',
        title: 'Confirm the scope',
        prompt: 'What is the best first check?',
        choices: [
          {
            id: 'hw-choice-1',
            label: 'Check whether another device in the same room can reach the portal.',
            outcome: 'You establish whether the issue is specific to the laptop or broader than one device.',
            riskNote: 'Scope protects against chasing the wrong category of problem.',
            correct: true
          },
          {
            id: 'hw-choice-2',
            label: 'Restart the entire room Wi-Fi access point immediately.',
            outcome: 'That is premature and may impact other users unnecessarily.',
            riskNote: 'Broad infrastructure changes should not be the first move.',
            correct: false
          }
        ]
      },
      {
        id: 'hw-step-2',
        title: 'Check the right category',
        prompt: 'What should you verify next?',
        choices: [
          {
            id: 'hw-choice-3',
            label: 'Confirm the laptop has an IP address and can reach a simple site such as the school intranet or search page.',
            outcome: 'This helps separate network access from a specific web service issue.',
            riskNote: 'One service failure does not always imply total internet failure.',
            correct: true
          },
          {
            id: 'hw-choice-4',
            label: "Immediately open the laptop's network settings and change DNS servers.",
            outcome: 'That is too invasive before you know the actual failure category.',
            riskNote: 'Settings changes should follow evidence, not guesswork.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm whether the problem affects one device or multiple devices',
      'Check simple connectivity and compare with a known-good device',
      'Separate device hardware and network path from the portal service itself',
      'Escalate with clear evidence if the problem is broader than one laptop'
    ],
    escalationPoint: 'Escalate once the same portal works on another device and the affected laptop still cannot reach it.',
    riskNote: 'Do not treat a working Wi-Fi icon as proof that all network layers are functional.',
    ticketNoteExample: 'Room A laptop on correct SSID cannot load learning portal; nearby staff laptop can load portal. Confirmed device still has connectivity and scope is room-specific. Escalating with evidence.'
  },
  {
    id: 'rbc-script-readiness-logic',
    title: 'Script readiness and automation logic',
    summary: 'Assess a simple automation request and identify whether it is safe to run or should be reviewed further.',
    missionType: 'Security Judgement Mission',
    estimatedMinutes: 10,
    initialReport: 'A technician asks whether a scheduled script can run tonight to update classroom devices.',
    contextBullets: [
      'The script will run across many devices overnight.',
      'The school wants the update done quickly but safely.',
      'Josh is expected to review the request before it goes to the authorised owner.'
    ],
    steps: [
      {
        id: 'script-step-1',
        title: 'Ask the right scope question',
        prompt: 'What should you confirm first?',
        choices: [
          {
            id: 'script-choice-1',
            label: 'Ask which devices and which data the script will affect.',
            outcome: 'You establish whether the automation is appropriately targeted and whether sensitive systems are involved.',
            riskNote: 'Scripts can have widespread impact if they run on the wrong devices.',
            correct: true
          },
          {
            id: 'script-choice-2',
            label: 'Ask whether the script has a catchy name or who wrote it.',
            outcome: 'That is not the safest first priority.',
            riskNote: 'The safest question is about scope and impact, not branding.',
            correct: false
          }
        ]
      },
      {
        id: 'script-step-2',
        title: 'Assess the rollback plan',
        prompt: 'What should you ask next?',
        choices: [
          {
            id: 'script-choice-3',
            label: 'Ask if the update can be reversed or undone if something goes wrong.',
            outcome: 'That helps keep the automation safe rather than risky.',
            riskNote: 'Automation should have a fallback before it is run widely.',
            correct: true
          },
          {
            id: 'script-choice-4',
            label: 'Ask if it will finish before students arrive tomorrow.',
            outcome: 'Timing matters, but safety and rollback are higher priorities.',
            riskNote: 'Do not let convenience override safety.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm which devices and systems the script affects',
      'Verify whether a rollback or undo path exists',
      'Check whether sensitive data or student work is involved',
      'Escalate the automation review if the scope or safety is uncertain'
    ],
    escalationPoint: 'Escalate if the script affects multiple school devices, sensitive data, or if there is no clear rollback plan.',
    riskNote: 'Automation should be reviewed as a safety decision, not a convenience task.',
    ticketNoteExample: 'Nightly device update script requested. Confirmed affected devices, sensitive data scope, and rollback plan. Escalating for authorised review.'
  },
  {
    id: 'rbc-ethical-reflection-privacy',
    title: 'Ethics and privacy reflection for school IT support',
    summary: 'Decide how to keep documentation useful, ethical, and privacy-safe after a sensitive incident.',
    missionType: 'Security Judgement Mission',
    estimatedMinutes: 10,
    initialReport: 'A support incident involved a student account issue and someone asked if the details could be saved in the study notes.',
    contextBullets: [
      'The incident includes student account and device information.',
      'Josh wants to learn from the situation without violating privacy.',
      'The school expects incident details to stay in authorised systems.'
    ],
    steps: [
      {
        id: 'ethics-step-1',
        title: 'Choose the right documentation place',
        prompt: 'What should you do first?',
        choices: [
          {
            id: 'ethics-choice-1',
            label: 'Use the PD app for the lesson learned and keep the incident detail in the authorised ticketing system.',
            outcome: 'You keep learning while protecting privacy.',
            riskNote: 'The study tool is not a system of record for sensitive incidents.',
            correct: true
          },
          {
            id: 'ethics-choice-2',
            label: 'Copy the full incident details into the PD app so you can review them later.',
            outcome: 'That exposes sensitive information in an inappropriate place.',
            riskNote: 'Sensitive incident detail belongs in authorised systems only.',
            correct: false
          }
        ]
      },
      {
        id: 'ethics-step-2',
        title: 'Explain the learning takeaway',
        prompt: 'What should the safe PD note include?',
        choices: [
          {
            id: 'ethics-choice-3',
            label: 'A short summary of the principle learned, such as "keep privacy-safe notes in personal learning tools".',
            outcome: 'This captures the lesson without sensitive detail.',
            riskNote: 'Avoid anything that could identify the student or the exact account.',
            correct: true
          },
          {
            id: 'ethics-choice-4',
            label: 'A detailed log of the student account and the exact actions taken.',
            outcome: 'That is too detailed for a personal learning note.',
            riskNote: 'Sensitive logs should stay in the authorised incident record.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Recognise the boundary between a learning summary and an incident record',
      'Keep the PD app note principle-based and privacy-safe',
      'Preserve the incident detail in the authorised ticketing system',
      'Use reflection to improve future behaviour and documentation choices'
    ],
    escalationPoint: 'Escalate the live incident through the proper work system once the learning note is separated from the confidential details.',
    riskNote: 'Mixing sensitive incident detail into personal notes can breach privacy policies and school expectations.',
    ticketNoteExample: 'Captured the lesson: keep sensitive incident details in authorised systems and use personal learning notes for general reflection only.'
  },
  {
    id: 'smitb-cloud-ai-saas-ai-risk',
    title: 'Cloud app outage and AI data risk',
    summary: 'Triage a partial SaaS outage while handling an AI summarisation request safely.',
    missionType: 'Security Judgement Mission',
    estimatedMinutes: 14,
    initialReport:
      'A staff portal loads normally, but file uploads fail for multiple staff. At the same time, a teacher asks whether an AI chatbot can summarise identifiable student notes.',
    contextBullets: [
      'The portal login works, but one feature fails across several staff accounts.',
      'The upload feature may depend on a separate storage or API path.',
      'The AI request involves identifiable student wellbeing information.'
    ],
    steps: [
      {
        id: 'smitb-cloud-step-1',
        title: 'Frame the cloud symptom',
        prompt: 'What is the most useful first-line framing?',
        choices: [
          {
            id: 'smitb-cloud-choice-1',
            label: 'Record that login works, the upload feature fails, and multiple staff are affected.',
            outcome: 'You now have feature-level and scope evidence that points to a cloud service dependency rather than a total outage.',
            riskNote: 'Cloud tools can fail in one layer while other parts keep working.',
            correct: true
          },
          {
            id: 'smitb-cloud-choice-2',
            label: 'Tell everyone the whole internet is down and restart local devices.',
            outcome: 'That overstates the symptom and misses the feature-specific evidence.',
            riskNote: 'Do not collapse a partial SaaS failure into a broad outage without evidence.',
            correct: false
          }
        ]
      },
      {
        id: 'smitb-cloud-step-2',
        title: 'Handle the AI data request',
        prompt: 'What should you do with the student-notes AI request?',
        choices: [
          {
            id: 'smitb-cloud-choice-3',
            label: 'Pause the request and check whether the tool is approved for identifiable student wellbeing data.',
            outcome: 'You protect sensitive information and keep the AI use inside the authorised pathway.',
            riskNote: 'AI usefulness does not override data sensitivity or approval requirements.',
            correct: true
          },
          {
            id: 'smitb-cloud-choice-4',
            label: 'Paste the notes into the chatbot and check whether the summary is accurate.',
            outcome: 'That exposes sensitive student information to an unconfirmed tool.',
            riskNote: 'Do not use identifiable student data in an AI tool unless it is approved for that data and purpose.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Separate the partial SaaS symptom from a full network outage',
      'Capture affected users, feature, timing, error text, and vendor/status clues',
      'Pause AI use when identifiable student data is involved',
      'Use an approved, de-identified, or escalated path for AI-assisted work'
    ],
    escalationPoint:
      'Escalate the portal issue with feature-level evidence and escalate the AI data request to the authorised policy or data owner before any identifiable data is used.',
    riskNote:
      'The same support moment can involve technical availability risk and privacy risk; handle both explicitly.',
    ticketNoteExample:
      'Staff portal login works, but uploads fail for multiple staff. Captured affected feature, scope, and timing. Separately advised that identifiable student wellbeing notes should not be placed into an unapproved AI tool.'
  },
  {
    id: 'hdmi-picture-no-audio-classroom',
    title: 'HDMI picture works but classroom audio is silent',
    summary: 'Separate display audio routing from total display failure while protecting class time.',
    missionType: 'Triage Mission',
    estimatedMinutes: 10,
    initialReport: 'The laptop shows on the ViewBoard, but there is no sound through the room speakers.',
    contextBullets: [
      'Picture path appears stable.',
      'Teacher needs audio for a short video clip.',
      'USB touch path may still be working independently.'
    ],
    steps: [
      {
        id: 'av-step-1',
        title: 'Clarify where audio should play',
        prompt: 'What is the best first clarification?',
        choices: [
          {
            id: 'av-choice-1',
            label: 'Ask whether laptop speakers are silent too or only the room speakers',
            outcome:
              'You learn whether the fault is likely OS playback selection versus display audio extraction.',
            riskNote: 'Skipping this forks troubleshooting incorrectly.',
            correct: true
          },
          {
            id: 'av-choice-2',
            label: 'Replace every HDMI cable in the building immediately',
            outcome: 'That burns class time without isolating the audio branch.',
            riskNote: 'Avoid wholesale swaps before narrowing symptom branches.',
            correct: false
          }
        ]
      },
      {
        id: 'av-step-2',
        title: 'Choose a safe next action',
        prompt: 'Laptop speakers work but room speakers do not. What should Josh try next within Level 1?',
        choices: [
          {
            id: 'av-choice-3',
            label: 'Check Windows playback device selection and safe visible audio-path checks before escalating AV hardware',
            outcome:
              'Either restores audio quickly or produces crisp evidence for escalation if the display audio extractor fails.',
            riskNote: 'Document steps before deeper AV hardware changes.',
            correct: true
          },
          {
            id: 'av-choice-4',
            label: 'Edit firewall VLAN ACLs during class',
            outcome: 'That is out-of-scope and high risk.',
            riskNote: 'Stay inside classroom-safe troubleshooting boundaries.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Separate laptop audio versus room audio symptoms',
      'Verify playback device selection and visible cable/audio routing checks',
      'Capture reproducibility and class impact',
      'Escalate AV hardware path if software routing checks fail'
    ],
    escalationPoint:
      'Escalate when playback routing is correct but room amplification still fails—likely display-side audio hardware or specialist cabling.',
    riskNote: 'Do not dismantle amplified classroom systems without authorised AV support.',
    ticketNoteExample:
      'HDMI video stable; audio absent via room speakers while laptop speakers OK. Checked playback device selection and safe routing checks—still failing. Captured room, device model, and lesson impact for AV follow-up.'
  },
  {
    id: 'student-laptop-apipa-169254',
    title: 'Student laptop shows 169.254 address',
    summary: 'Treat APIPA as DHCP onboarding failure while comparing scope.',
    missionType: 'Triage Mission',
    estimatedMinutes: 10,
    initialReport: 'A student laptop cannot reach the internet and shows a 169.254.x.x address.',
    contextBullets: [
      'Other laptops in the trolley reportedly work.',
      'SSID appears connected.',
      'Lesson depends on cloud resource access.'
    ],
    steps: [
      {
        id: 'apipa-step-1',
        title: 'Interpret the pattern',
        prompt: 'What does 169.254 most strongly suggest at Level 1?',
        choices: [
          {
            id: 'apipa-choice-1',
            label: 'DHCP lease failure or onboarding drift—not immediate proof of global DNS outage',
            outcome: 'You focus on lease/onboarding checks instead of blaming unrelated layers.',
            riskNote: 'Avoid declaring whole-network outages from one client.',
            correct: true
          },
          {
            id: 'apipa-choice-2',
            label: 'Proof the DNS root servers exploded',
            outcome: 'That overstates evidence.',
            riskNote: 'Stay disciplined about symptom categories.',
            correct: false
          }
        ]
      },
      {
        id: 'apipa-step-2',
        title: 'Pick safe comparisons',
        prompt: 'Best next move?',
        choices: [
          {
            id: 'apipa-choice-3',
            label: 'Compare another device on the same SSID and capture scope before deeper resets',
            outcome: 'You determine trolley-wide versus isolated onboarding drift quickly.',
            riskNote: 'Comparison protects against chasing phantom Wi-Fi outages.',
            correct: true
          },
          {
            id: 'apipa-choice-4',
            label: 'Randomly edit gateway addresses',
            outcome: 'Dangerous and unauthorised.',
            riskNote: 'Never improvise addressing changes.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm SSID intent',
      'Validate lease versus APIPA',
      'Compare peers on same network',
      'Apply policy-safe forget/rejoin if indicated',
      'Escalate with correlation evidence if multiple devices fail'
    ],
    escalationPoint:
      'Escalate DHCP scope or infrastructure faults if multiple devices share APIPA after safe onboarding retries.',
    riskNote: 'Do not assign static addresses outside authorised processes.',
    ticketNoteExample:
      'Student laptop on intended SSID shows 169.254.x.x while peers obtain leases. Documented scope comparison result after safe checks. Escalating potential DHCP path issue if pattern repeats.'
  },
  {
    id: 'printer-queue-stuck-followme',
    title: 'Jobs stuck waiting at Follow-Me queue',
    summary: 'Differentiate release/auth layers from hardware faults.',
    missionType: 'Triage Mission',
    estimatedMinutes: 10,
    initialReport: 'Teacher prints repeatedly but nothing prints at the copier—even though the queue moves.',
    contextBullets: [
      'Follow-Me printing is enabled.',
      'Others printed successfully earlier.',
      'Class deadline approaching.'
    ],
    steps: [
      {
        id: 'pq-step-1',
        title: 'Interpret queue behaviour',
        prompt: 'What should you suspect first?',
        choices: [
          {
            id: 'pq-choice-1',
            label: 'Authentication/release at the device panel rather than driver corruption',
            outcome: 'You avoid reinstall loops.',
            riskNote: 'Pull-print workflows gate hardware differently.',
            correct: true
          },
          {
            id: 'pq-choice-2',
            label: 'Immediate OS reinstall',
            outcome: 'Too heavy before verifying release steps.',
            riskNote: 'Preserve proportionality.',
            correct: false
          }
        ]
      },
      {
        id: 'pq-step-2',
        title: 'Escalation-ready capture',
        prompt: 'What belongs in the note if release fails?',
        choices: [
          {
            id: 'pq-choice-3',
            label: 'Printer ID, user scope, queue vs panel behaviour, timestamps, and error wording',
            outcome: 'Owners can reproduce quickly.',
            riskNote: 'Vague tickets stall deadlines.',
            correct: true
          },
          {
            id: 'pq-choice-4',
            label: 'Only “printing broken”',
            outcome: 'Insufficient for diagnosis.',
            riskNote: 'Always capture observable specifics.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Verify printer targeting',
      'Verify Follow-Me release/sign-in',
      'Check panel errors',
      'Escalate print subsystem owners if auth succeeds but hardware silent'
    ],
    escalationPoint: 'Escalate authentication or print subsystem failures beyond Level 1 visibility.',
    riskNote: 'Do not bypass billing or authentication controls.',
    ticketNoteExample:
      'Follow-Me jobs do not release at copier X despite queue progression; panel shows auth prompt looping. Captured timestamps and user scope for print services escalation.'
  },
  {
    id: 'laser-toner-rubs-off',
    title: 'Laser output rubs off when touched',
    summary: 'Identify consumables/hardware bonding faults versus queue targeting.',
    missionType: 'Triage Mission',
    estimatedMinutes: 9,
    initialReport: 'Printed worksheets smudge when students touch them—toner rubs off cleanly.',
    contextBullets: [
      'Happens on multiple jobs.',
      'Paper seems normal stock.',
      'Printer recently serviced—or overdue.'
    ],
    steps: [
      {
        id: 'toner-step-1',
        title: 'Classify symptom',
        prompt: 'What category fits best?',
        choices: [
          {
            id: 'toner-choice-1',
            label: 'Print-quality/hardware process fault—not wrong-printer targeting',
            outcome: 'You steer toward consumables/fuser pathway.',
            riskNote: 'Symptom vocabulary guides vendors.',
            correct: true
          },
          {
            id: 'toner-choice-2',
            label: 'Definitely Wi-Fi DNS failure',
            outcome: 'Wrong domain entirely.',
            riskNote: 'Stay anchored to observed behaviour.',
            correct: false
          }
        ]
      },
      {
        id: 'toner-step-2',
        title: 'Level 1 posture',
        prompt: 'Best posture?',
        choices: [
          {
            id: 'toner-choice-3',
            label: 'Capture printer asset, media type, sample photo, counts/error codes—hand to authorised maintainers',
            outcome: 'Vendor/service path activated safely.',
            riskNote: 'Avoid DIY heated assemblies.',
            correct: true
          },
          {
            id: 'toner-choice-4',
            label: 'Disassemble fuser during class',
            outcome: 'Unsafe and unwarranted.',
            riskNote: 'Thermal hardware belongs to trained techs.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm symptom reproducibility',
      'Note media/stock',
      'Capture error indicators',
      'Escalate hardware service with evidence'
    ],
    escalationPoint: 'Escalate persistent bonding faults to authorised printer vendor workflow.',
    riskNote: 'Burn and electrical hazards exist inside printers.',
    ticketNoteExample:
      'Laser output rubs off across jobs on printer asset Z; captured sample and panel warning code 0x### for vendor service.'
  },
  {
    id: 'guest-wifi-cannot-reach-printer',
    title: 'Guest Wi-Fi cannot reach internal printers',
    summary: 'Explain intentional segmentation without promising unsafe bypasses.',
    missionType: 'User Communication Mission',
    estimatedMinutes: 9,
    initialReport: 'Visitor laptop on guest Wi-Fi cannot print to staff copiers.',
    contextBullets: [
      'Internet browsing works.',
      'Visitor needs handouts for workshop.',
      'Staff printers normally require internal paths.'
    ],
    steps: [
      {
        id: 'gw-step-1',
        title: 'Interpret design intent',
        prompt: 'Safest explanation?',
        choices: [
          {
            id: 'gw-choice-1',
            label: 'Guest isolation commonly blocks internal services like printers by policy',
            outcome: 'Sets realistic expectations.',
            riskNote: 'Do not frame security design as accidental.',
            correct: true
          },
          {
            id: 'gw-choice-2',
            label: 'Guest Wi-Fi must reach everything internal automatically',
            outcome: 'False mental model.',
            riskNote: 'Segmentation protects production networks.',
            correct: false
          }
        ]
      },
      {
        id: 'gw-step-2',
        title: 'Constructive pathway',
        prompt: 'Better next step?',
        choices: [
          {
            id: 'gw-choice-3',
            label: 'Offer sanctioned alternatives such as staff-mediated printing or approved temporary pathways via authorised owners',
            outcome: 'Balances hospitality with policy.',
            riskNote: 'Never improvise VPN tunnels.',
            correct: true
          },
          {
            id: 'gw-choice-4',
            label: 'Disable firewall “just for an hour”',
            outcome: 'Unauthorised and unsafe.',
            riskNote: 'Escalate requirement instead of bypassing controls.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm SSID is guest',
      'Explain segmentation calmly',
      'Route requirement through approval',
      'Use authorised workaround'
    ],
    escalationPoint: 'Escalate business-approved exceptions through security/network owners.',
    riskNote: 'Casual bypasses create audit and malware paths.',
    ticketNoteExample:
      'Guest SSID user requires internal copier access for workshop; explained segmentation design and routed formal exception request with event timeframe.'
  },
  {
    id: 'parent-portal-invite-not-arriving',
    title: 'Parent Portal invitation not arriving',
    summary: 'Capture workflow timing and scope without owning authoritative enrolment edits.',
    missionType: 'Triage Mission',
    estimatedMinutes: 10,
    initialReport: 'Parent says they never received the portal invitation email.',
    contextBullets: [
      'Spam folder checked.',
      'Multiple parents reportedly okay.',
      'Administration manages authoritative invitations.'
    ],
    steps: [
      {
        id: 'pp-step-1',
        title: 'Initial framing',
        prompt: 'Best stance?',
        choices: [
          {
            id: 'pp-choice-1',
            label: 'Capture delivery channel, timing, alternate inbox, and whether others succeeded—without promising instant DB edits',
            outcome: 'Evidence supports admin reissue workflow.',
            riskNote: 'ICT triages technical visibility issues only.',
            correct: true
          },
          {
            id: 'pp-choice-2',
            label: 'Immediately edit enrolment records yourself',
            outcome: 'Outside Level 1 authority.',
            riskNote: 'Route authoritative changes.',
            correct: false
          }
        ]
      },
      {
        id: 'pp-step-2',
        title: 'Escalation note focus',
        prompt: 'What must the ticket emphasise?',
        choices: [
          {
            id: 'pp-choice-3',
            label: 'Scope (single household), timestamps, channels tested, and handoff boundary to administration',
            outcome: 'Clean routing.',
            riskNote: 'Privacy-safe identifiers only.',
            correct: true
          },
          {
            id: 'pp-choice-4',
            label: 'Paste confidential student dossiers',
            outcome: 'Privacy breach risk.',
            riskNote: 'Minimal necessary detail.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Verify ordinary mail-flow blocks',
      'Capture retries',
      'Escalate admin invitation workflow',
      'Maintain calm parent-facing updates'
    ],
    escalationPoint: 'Escalate authoritative invitation/enrolment actions to administration owners.',
    riskNote: 'Never collect passwords.',
    ticketNoteExample:
      'Single household reports missing portal invite while cohort succeeded; documented channels tested and timestamps; escalating administration reissue pathway.'
  },
  {
    id: 'sentral-markbook-row-missing',
    title: 'Sentral markbook rows missing for one teacher',
    summary: 'Capture timetable linkage clues without editing authoritative cohort data.',
    missionType: 'Triage Mission',
    estimatedMinutes: 11,
    initialReport: 'Teacher cannot see expected classes inside Sentral markbook screens.',
    contextBullets: [
      'Other teachers see classes.',
      'Reporting window approaching.',
      'Josh does not administer Sentral roster logic.'
    ],
    steps: [
      {
        id: 'sen-step-1',
        title: 'Interpret ownership',
        prompt: 'Correct posture?',
        choices: [
          {
            id: 'sen-choice-1',
            label: 'Document symptom screenshots (minimal), cohort comparisons, and escalate Sentral admin—not improvising roster edits',
            outcome: 'Protects data integrity.',
            riskNote: 'ICT observes; authoritative owners change.',
            correct: true
          },
          {
            id: 'sen-choice-2',
            label: 'Hack SQL casually',
            outcome: 'Never acceptable.',
            riskNote: 'Stay ethical.',
            correct: false
          }
        ]
      },
      {
        id: 'sen-step-2',
        title: 'Evidence bundle',
        prompt: 'Include?',
        choices: [
          {
            id: 'sen-choice-3',
            label: 'Exact missing labels, timeframe since timetable change, peers unaffected, reporting urgency',
            outcome: 'Admin fixes faster.',
            riskNote: 'Redact roster screenshots tightly.',
            correct: true
          },
          {
            id: 'sen-choice-4',
            label: 'Just “Sentral broken”',
            outcome: 'Too vague.',
            riskNote: 'Precision respects everyone’s time.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Compare peers',
      'Capture screenshots minimally',
      'Note reporting deadlines',
      'Escalate Sentral administration pathway'
    ],
    escalationPoint: 'Escalate roster/timetable linkage faults to Sentral owners.',
    riskNote: 'Mass edits carry academic integrity implications.',
    ticketNoteExample:
      'Teacher X missing expected markbook rows while peers intact post timetable change; captured minimal evidence + deadline pressure for Sentral administration.'
  },
  {
    id: 'password-lockout-after-travel',
    title: 'Account lockout after travel',
    summary: 'Coach reset pathways while watching compromise signals.',
    missionType: 'User Communication Mission',
    estimatedMinutes: 10,
    initialReport: 'Teacher returned from overseas travel and now cannot sign in—possible lockout.',
    contextBullets: [
      'MFA prompts appeared unusually.',
      'Password recently changed—or uncertain.',
      'They need lesson materials urgently.'
    ],
    steps: [
      {
        id: 'lock-step-1',
        title: 'Safety fork',
        prompt: 'Parallel priority?',
        choices: [
          {
            id: 'lock-choice-1',
            label: 'Balance urgency with checking for compromise indicators alongside sanctioned reset guidance',
            outcome: 'Avoids blessing attacker sessions.',
            riskNote: 'Travel correlates with risky prompts—not proof alone.',
            correct: true
          },
          {
            id: 'lock-choice-2',
            label: 'Tell them approve every MFA forever',
            outcome: 'Dangerous blanket advice.',
            riskNote: 'Coach deliberate MFA hygiene.',
            correct: false
          }
        ]
      },
      {
        id: 'lock-step-2',
        title: 'Escalation triggers',
        prompt: 'When escalate identity/security immediately?',
        choices: [
          {
            id: 'lock-choice-3',
            label: 'Unexpected MFA flooding, mailbox rule changes reported, or suspected credential reuse across sites',
            outcome: 'Security pathway activated.',
            riskNote: 'Document calmly.',
            correct: true
          },
          {
            id: 'lock-choice-4',
            label: 'Never escalate identity issues',
            outcome: 'Incorrect.',
            riskNote: 'Some signals mandate rapid review.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Avoid capturing passwords',
      'Coach sanctioned reset',
      'Watch compromise cues',
      'Escalate identity/security if warranted'
    ],
    escalationPoint: 'Escalate suspected compromise to authorised identity/security reviewers.',
    riskNote: 'Never share confidential incident detail into PD-only notes.',
    ticketNoteExample:
      'User lockout post-travel with suspicious MFA prompts; coached sanctioned reset path + paused unknown approvals; escalating identity security review with high-level symptom summary.'
  },
  {
    id: 'new-staff-missing-teams-access',
    title: 'New staff missing Teams or SharePoint access',
    summary: 'Trace onboarding sequencing without improvising broad admin grants.',
    estimatedMinutes: 11,
    initialReport: 'New teacher starts Monday but Teams teams/libraries look empty compared to peers.',
    contextBullets: [
      'HR start date confirmed.',
      'Other apps partially work.',
      'Provisioning usually automated.'
    ],
    steps: [
      {
        id: 'onb-step-1',
        title: 'Interpret pattern',
        prompt: 'Likely category?',
        choices: [
          {
            id: 'onb-choice-1',
            label: 'Group membership or provisioning sequencing—not random “Teams glitch vibes”',
            outcome: 'Focuses investigation.',
            riskNote: 'Correlate with HR timeline.',
            correct: true
          },
          {
            id: 'onb-choice-2',
            label: 'Give Global Administrator casually',
            outcome: 'Dangerous overreach.',
            riskNote: 'Least privilege always.',
            correct: false
          }
        ]
      },
      {
        id: 'onb-step-2',
        title: 'Escalation posture',
        prompt: 'Best documentation?',
        choices: [
          {
            id: 'onb-choice-3',
            label: 'Capture peer comparison, missing artefacts list, start date, licensing clues—route provisioning owners',
            outcome: 'Accelerates fix.',
            riskNote: 'Show systemic vs individual.',
            correct: true
          },
          {
            id: 'onb-choice-4',
            label: 'Avoid ticket entirely',
            outcome: 'Secrets stall onboarding.',
            riskNote: 'Always leave traceability.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Verify account activation timing',
      'Compare peer memberships',
      'Check licensing clues safely',
      'Escalate provisioning automation gaps'
    ],
    escalationPoint: 'Escalate directory/group automation failures beyond Level 1 remediation.',
    riskNote: 'Do not bulk-edit privileged groups.',
    ticketNoteExample:
      'New starter missing Teams/SharePoint artefacts vs peer baseline after confirmed start date; captured screenshots + gap list for identity provisioning review.'
  },
  {
    id: 'camera-windows-hello-accessibility-triage',
    title: 'Camera or Windows Hello fails during class support',
    summary: 'Triage camera and Windows Hello symptoms with accessibility-aware escalation notes.',
    estimatedMinutes: 10,
    initialReport: 'Teacher reports camera fails in class app and Windows Hello sign-in intermittently disappears.',
    contextBullets: [
      'Class starts in minutes, so low-risk checks come first.',
      'Device has privacy controls and policy-managed identity settings.',
      'User also relies on accessibility-related camera workflows.'
    ],
    steps: [
      {
        id: 'cv-step-1',
        title: 'First bucket',
        prompt: 'What should you test first?',
        choices: [
          {
            id: 'cv-choice-1',
            label: 'Check app permissions and selected camera, then test in a known-good app',
            outcome: 'You learn whether this is app-path or broader device path.',
            riskNote: 'Low-risk checks before hardware assumptions.',
            correct: true
          },
          {
            id: 'cv-choice-2',
            label: 'Replace the laptop camera hardware immediately',
            outcome: 'Premature and potentially disruptive.',
            riskNote: 'Avoid hardware swaps before permission/path checks.',
            correct: false
          }
        ]
      },
      {
        id: 'cv-step-2',
        title: 'Windows Hello context',
        prompt: 'If camera works in one app but Hello still fails, what next?',
        choices: [
          {
            id: 'cv-choice-3',
            label: 'Capture enrollment/policy indicators and escalate identity-endpoint path with evidence',
            outcome: 'Routes to correct owner with useful evidence.',
            riskNote: 'Do not force policy or enrollment changes as Level 1.',
            correct: true
          },
          {
            id: 'cv-choice-4',
            label: 'Disable all identity protections to restore convenience',
            outcome: 'Unsafe and unauthorized.',
            riskNote: 'Security controls are not optional workarounds.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Check permissions, selected camera, and known-good app behavior',
      'Confirm privacy shutter/switch state',
      'Differentiate app issue vs Hello enrollment/policy issue',
      'Escalate with accessibility-aware impact notes'
    ],
    escalationPoint: 'Escalate when app checks pass but Hello/policy path still fails or recurring accessibility impact remains.',
    riskNote: 'Avoid exposing personal accessibility details beyond functional impact required for support routing.',
    ticketNoteExample:
      'Camera works in app X but fails in class app Y; Hello intermittently unavailable. Permission/device checks complete, privacy switch clear, recurring class impact documented. Escalating identity-endpoint policy/enrollment path.'
  },
  {
    id: 'dashboard-log-interpretation-trend-triage',
    title: 'Dashboard and log trend interpretation',
    summary: 'Turn noisy telemetry into a clear evidence-first escalation note.',
    estimatedMinutes: 9,
    initialReport: 'A dashboard spike suggests login latency, but classroom complaints are mixed.',
    contextBullets: [
      'Telemetry can be noisy and incomplete.',
      'You need a note that is useful without over-claiming root cause.',
      'Known-good comparisons are available from another campus.'
    ],
    steps: [
      {
        id: 'dl-step-1',
        title: 'Interpret signal',
        prompt: 'Best first statement?',
        choices: [
          {
            id: 'dl-choice-1',
            label: 'Observed spike in time window; validating affected scope before root-cause claim',
            outcome: 'Accurate and evidence-oriented posture.',
            riskNote: 'Avoid absolute claims from one chart.',
            correct: true
          },
          {
            id: 'dl-choice-2',
            label: 'Definite whole-school outage confirmed',
            outcome: 'Overstates certainty and can misroute response.',
            riskNote: 'Do not over-claim with partial telemetry.',
            correct: false
          }
        ]
      },
      {
        id: 'dl-step-2',
        title: 'Escalation note quality',
        prompt: 'What should be included?',
        choices: [
          {
            id: 'dl-choice-3',
            label: 'Trend window, sample scope, known-good comparison, impact summary, and explicit uncertainty',
            outcome: 'Provides owner-ready evidence.',
            riskNote: 'Include uncertainty language where data is incomplete.',
            correct: true
          },
          {
            id: 'dl-choice-4',
            label: 'Raw logs only with no summary',
            outcome: 'Hard to triage quickly.',
            riskNote: 'Summarize before attaching raw evidence.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'State observed trend and timeframe',
      'Validate affected scope',
      'Compare with known-good baseline',
      'Escalate with concise uncertainty-aware evidence'
    ],
    escalationPoint: 'Escalate once trend + scope + comparison data are collected and impact remains.',
    riskNote: 'Telemetry summaries should avoid sensitive identifiers unless required for authorized troubleshooting.',
    ticketNoteExample:
      'Observed login latency spike 08:15-08:40 for cohort A; known-good comparison from campus B remains normal. Impact limited to specific roles; root cause unconfirmed. Escalating with trend + scope evidence.'
  },
  {
    id: 'msp-backup-alert-first-response',
    title: 'MSP backup alert first response',
    summary: 'Triage a failed overnight backup alert without over-claiming recovery risk.',
    missionType: 'Escalation Mission',
    estimatedMinutes: 11,
    initialReport: 'A fictional client backup job reports failed overnight for one server while other jobs completed.',
    contextBullets: [
      'The alert names a fictional server and backup job only.',
      'You can view backup console status but cannot make destructive changes.',
      'Senior engineer escalation is available for failed retry or suspected data risk.'
    ],
    careerTags: ['MSP support', 'Backup monitoring', 'Escalation'],
    contextTags: ['msp', 'backup', 'client-safe'],
    transferableSkills: ['impact scoping', 'evidence gathering', 'risk communication'],
    steps: [
      {
        id: 'backup-step-1',
        title: 'Scope the alert',
        prompt: 'What should you check first?',
        choices: [
          {
            id: 'backup-choice-1',
            label: 'Check job status, last successful backup, affected asset, and whether other jobs completed.',
            outcome: 'You establish the scope and avoid assuming the whole backup platform is down.',
            riskNote: 'Backup alerts need precise scope before escalation.',
            correct: true
          },
          {
            id: 'backup-choice-2',
            label: 'Tell the client their backups are broken and wait for a senior engineer.',
            outcome: 'This overstates risk and provides no useful triage evidence.',
            riskNote: 'Avoid alarming language before confirming impact.',
            correct: false
          }
        ]
      },
      {
        id: 'backup-step-2',
        title: 'Escalate with evidence',
        prompt: 'The retry fails. What belongs in the escalation?',
        choices: [
          {
            id: 'backup-choice-3',
            label: 'Affected job, last success, retry result, error summary, business impact, and next requested action.',
            outcome: 'A senior engineer can act without repeating your first-line checks.',
            riskNote: 'Good escalation notes reduce duplicate work and protect recovery time.',
            correct: true
          },
          {
            id: 'backup-choice-4',
            label: 'Only paste the raw error text.',
            outcome: 'Raw errors without scope and impact slow down handoff.',
            riskNote: 'Summarise evidence before attaching raw detail.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm affected job and asset',
      'Check last successful backup and whether other jobs completed',
      'Run only approved retry or verification steps',
      'Escalate with error summary, impact, and next action'
    ],
    escalationPoint: 'Escalate when an approved retry fails, last success is outside tolerance, or restore confidence is unclear.',
    riskNote: 'Do not delete backup chains, change retention, or expose real client backup names in practice notes.',
    ticketNoteExample:
      'Fictional client backup alert scoped to one server job. Last successful backup recorded before failure window; other jobs completed. Approved retry failed with same summary error. Escalating for backup engineer review and recovery-risk confirmation.'
  },
  {
    id: 'msp-shared-mailbox-permission',
    title: 'Shared mailbox permission issue',
    summary: 'Handle a client report where a user cannot access a shared mailbox after a role change.',
    missionType: 'Triage Mission',
    estimatedMinutes: 10,
    initialReport: 'A fictional client says a staff member can open Outlook but cannot see the shared Accounts mailbox.',
    contextBullets: [
      'The user can sign in and send normal mail.',
      'The issue appears limited to one shared mailbox.',
      'Permission changes should follow the authorised request path.'
    ],
    careerTags: ['MSP support', 'Microsoft 365', 'Permissions'],
    contextTags: ['msp', 'm365', 'mailbox'],
    transferableSkills: ['scope isolation', 'permission triage', 'change boundary'],
    steps: [
      {
        id: 'mailbox-step-1',
        title: 'Separate login from permission',
        prompt: 'What is the best first classification?',
        choices: [
          {
            id: 'mailbox-choice-1',
            label: 'Treat it as a mailbox permission or propagation issue, not a general Outlook outage.',
            outcome: 'Correct. Normal Outlook access narrows the problem to mailbox visibility or permissions.',
            riskNote: 'Classifying scope prevents unnecessary tenant-wide troubleshooting.',
            correct: true
          },
          {
            id: 'mailbox-choice-2',
            label: 'Escalate as complete email outage.',
            outcome: 'This misstates impact because the user can access normal mail.',
            riskNote: 'Do not inflate impact when the symptom is narrow.',
            correct: false
          }
        ]
      },
      {
        id: 'mailbox-step-2',
        title: 'Respect change boundaries',
        prompt: 'What should happen before permissions are changed?',
        choices: [
          {
            id: 'mailbox-choice-3',
            label: 'Confirm the authorised request or approval path for the mailbox access change.',
            outcome: 'Good. Permission changes need a valid request, not only a verbal report.',
            riskNote: 'Access changes are security changes.',
            correct: true
          },
          {
            id: 'mailbox-choice-4',
            label: 'Grant Full Access immediately to get the ticket closed.',
            outcome: 'Fast but unsafe. This bypasses approval and least privilege.',
            riskNote: 'Never grant access without the authorised path.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm normal Outlook access works',
      'Confirm mailbox-specific symptom and affected user',
      'Check authorised request or approval path',
      'Apply or escalate permission change according to policy',
      'Document propagation expectations and next action'
    ],
    escalationPoint: 'Escalate if approval is unclear, permission state conflicts with policy, or access still fails after expected propagation.',
    riskNote: 'Do not add mailbox permissions from a practice scenario or store real mailbox names in the PD app.',
    ticketNoteExample:
      'User can access Outlook; issue scoped to fictional shared mailbox visibility. Confirmed request requires authorised approval before access change. Awaiting approval/escalating permission path rather than applying access directly.'
  },
  {
    id: 'msp-single-workstation-internet',
    title: 'Internet down for one workstation',
    summary: 'Scope a client internet complaint before escalating it as a site outage.',
    missionType: 'Troubleshooting Sequence Mission',
    estimatedMinutes: 9,
    initialReport: 'A fictional client reports "the internet is down", but only one workstation has been checked so far.',
    contextBullets: [
      'The report came from one user.',
      'You need to determine whether the issue is device, user, network, DNS, or site-wide.',
      'Avoid making broad network changes from a single-device symptom.'
    ],
    careerTags: ['MSP support', 'Networking', 'Endpoint triage'],
    contextTags: ['msp', 'networking', 'first-response'],
    transferableSkills: ['scope-first triage', 'known-good comparison', 'clear client questions'],
    steps: [
      {
        id: 'internet-step-1',
        title: 'Ask the scope question',
        prompt: 'What should you ask or check first?',
        choices: [
          {
            id: 'internet-choice-1',
            label: 'Check whether other devices/users at the same site can access the internet.',
            outcome: 'Correct. You need scope before deciding whether this is endpoint or site-wide.',
            riskNote: 'Known-good comparison is the fastest way to avoid false outage escalation.',
            correct: true
          },
          {
            id: 'internet-choice-2',
            label: 'Restart the site firewall immediately.',
            outcome: 'This is too broad and could disrupt working users.',
            riskNote: 'Avoid broad infrastructure actions from one unscoped report.',
            correct: false
          }
        ]
      },
      {
        id: 'internet-step-2',
        title: 'Narrow the endpoint path',
        prompt: 'Other devices work. What is the useful next check?',
        choices: [
          {
            id: 'internet-choice-3',
            label: 'Check Wi-Fi/Ethernet state, IP address, DNS symptoms, and whether internal resources still work.',
            outcome: 'Good. These checks narrow the issue without changing infrastructure.',
            riskNote: 'Endpoint evidence makes escalation faster if first-line checks fail.',
            correct: true
          },
          {
            id: 'internet-choice-4',
            label: 'Tell the client the ISP is down.',
            outcome: 'Incorrect. Other devices working makes an ISP outage unlikely.',
            riskNote: 'Do not blame upstream services without evidence.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Ask whether one user, one device, one room, or the whole site is affected',
      'Compare against a known-good device',
      'Check adapter, IP, DNS, captive/filtering symptoms, and internal access',
      'Escalate with scope and endpoint evidence if unresolved'
    ],
    escalationPoint: 'Escalate when endpoint checks indicate policy, DNS, filtering, or infrastructure ownership beyond first line.',
    riskNote: 'Do not restart network equipment or claim a site outage without scope evidence.',
    ticketNoteExample:
      'Internet complaint scoped to one fictional workstation; other site devices working. Checked adapter state, IP/DNS symptoms, and internal access path. Escalating endpoint/network policy path with scope evidence.'
  },
  {
    id: 'msp-outlook-access-issue',
    title: 'Outlook access issue',
    summary: 'Separate account, mailbox, app, and service symptoms before choosing a fix.',
    missionType: 'Triage Mission',
    estimatedMinutes: 10,
    initialReport: 'A fictional client says Outlook will not open on their laptop this morning.',
    contextBullets: [
      'The report does not say whether webmail works.',
      'You need to avoid treating every Outlook complaint as the same issue.',
      'A client update is expected after first checks.'
    ],
    careerTags: ['MSP support', 'Microsoft 365', 'Client communication'],
    contextTags: ['msp', 'outlook', 'm365'],
    transferableSkills: ['scope isolation', 'client questioning', 'known-good checks'],
    steps: [
      {
        id: 'outlook-step-1',
        title: 'Find the working path',
        prompt: 'What should you ask or test first?',
        choices: [
          {
            id: 'outlook-choice-1',
            label: 'Check whether Outlook Web works and whether other M365 apps are affected.',
            outcome: 'Good. This separates device/app symptoms from account or service symptoms.',
            riskNote: 'Known-good web checks prevent unnecessary local rebuilds.',
            correct: true
          },
          {
            id: 'outlook-choice-2',
            label: 'Recreate the mail profile immediately.',
            outcome: 'Too early. You have not scoped account, web, or service symptoms.',
            riskNote: 'Profile rebuilds can be useful, but only after simpler scope checks.',
            correct: false
          }
        ]
      },
      {
        id: 'outlook-step-2',
        title: 'Write the update',
        prompt: 'Outlook Web works, desktop Outlook fails. What should the client update say?',
        choices: [
          {
            id: 'outlook-choice-3',
            label: 'Webmail is available while desktop Outlook is investigated; next checks are app/cache/profile path.',
            outcome: 'Clear and reassuring without claiming root cause.',
            riskNote: 'Good updates include a workaround when one exists.',
            correct: true
          },
          {
            id: 'outlook-choice-4',
            label: 'Microsoft is down.',
            outcome: 'Incorrect. Webmail working makes a broad service outage unlikely.',
            riskNote: 'Do not blame upstream services without evidence.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Check webmail and other M365 services',
      'Confirm scope: one user, one device, or multiple users',
      'Check app state/cache/profile only after account path is scoped',
      'Update the client with workaround and next action'
    ],
    escalationPoint: 'Escalate if account/service checks conflict, multiple users are affected, or desktop repair steps fail.',
    riskNote: 'Do not delete profiles or data paths before confirming sync and backup state.',
    ticketNoteExample:
      'Fictional client Outlook issue scoped to desktop app on one laptop. Outlook Web works and other M365 services available. Investigating local app/cache/profile path; user has webmail workaround during checks.'
  },
  {
    id: 'msp-new-starter-setup',
    title: 'New starter setup readiness',
    summary: 'Check the repeatable pieces needed before a new user can work on day one.',
    missionType: 'Ticket Note Mission',
    estimatedMinutes: 12,
    initialReport: 'A fictional client requests setup for a new starter beginning Monday.',
    contextBullets: [
      'The request has a start date but limited access detail.',
      'You need role, licence, groups, device, MFA, and app readiness.',
      'Do not guess access based on a similar user without approval.'
    ],
    careerTags: ['MSP support', 'Onboarding', 'Microsoft 365'],
    contextTags: ['msp', 'new-starter', 'access'],
    transferableSkills: ['checklist building', 'access boundaries', 'handover quality'],
    steps: [
      {
        id: 'starter-step-1',
        title: 'Collect required details',
        prompt: 'What information is most important before creating access?',
        choices: [
          {
            id: 'starter-choice-1',
            label: 'Role, manager approval, start date, licence needs, groups/apps, device requirement, and MFA path.',
            outcome: 'Correct. These details prevent incomplete or excessive access.',
            riskNote: 'New starter tickets fail when role and approval are unclear.',
            correct: true
          },
          {
            id: 'starter-choice-2',
            label: 'Copy all permissions from another employee immediately.',
            outcome: 'Unsafe. Similar-user copying can grant unnecessary access.',
            riskNote: 'Least privilege and approval still apply.',
            correct: false
          }
        ]
      },
      {
        id: 'starter-step-2',
        title: 'Confirm readiness',
        prompt: 'What should your completion note include?',
        choices: [
          {
            id: 'starter-choice-3',
            label: 'Account/licence/device/apps/MFA status, outstanding access approvals, and handover next step.',
            outcome: 'This gives the client a clear readiness picture.',
            riskNote: 'Completion notes should state what is done and what remains blocked.',
            correct: true
          },
          {
            id: 'starter-choice-4',
            label: 'User created.',
            outcome: 'Too vague for MSP handover and client confidence.',
            riskNote: 'Short notes create follow-up tickets.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm role, approval, start date, and required systems',
      'Prepare identity, licence, groups, device, and MFA setup',
      'Record blockers separately from completed actions',
      'Send a clear handover/readiness note'
    ],
    escalationPoint: 'Escalate unclear access approval, privileged access, or unsupported application setup.',
    riskNote: 'Do not grant access based on assumptions or store real user names in practice notes.',
    ticketNoteExample:
      'Fictional new starter setup checked against role, licence, groups, device, apps, and MFA readiness. Core account path prepared; one shared access item awaiting authorised approval. Client update sent with remaining blocker and next action.'
  },
  {
    id: 'msp-onedrive-device-replacement',
    title: 'OneDrive sync after device replacement',
    summary: 'Triage missing or duplicated files after a user receives a replacement laptop.',
    missionType: 'Troubleshooting Sequence Mission',
    estimatedMinutes: 11,
    initialReport: 'A fictional client says files are missing from a replacement laptop after signing into OneDrive.',
    contextBullets: [
      'The user can sign into Microsoft 365.',
      'You need to compare local sync state with OneDrive web.',
      'Avoid deleting conflict copies or local files during first response.'
    ],
    careerTags: ['MSP support', 'OneDrive', 'Endpoint'],
    contextTags: ['msp', 'onedrive', 'sync'],
    transferableSkills: ['data-safe troubleshooting', 'known-good web comparison', 'sync triage'],
    steps: [
      {
        id: 'onedrive-step-1',
        title: 'Protect the data path',
        prompt: 'What is the safest first check?',
        choices: [
          {
            id: 'onedrive-choice-1',
            label: 'Compare OneDrive web with local sync state and pause destructive cleanup.',
            outcome: 'Good. Web state is the known-good source before local cleanup.',
            riskNote: 'Never delete local or conflict files until source of truth is known.',
            correct: true
          },
          {
            id: 'onedrive-choice-2',
            label: 'Delete the local OneDrive folder and start again.',
            outcome: 'Unsafe. You may remove unsynced local changes.',
            riskNote: 'Data-preservation comes before cleanup.',
            correct: false
          }
        ]
      },
      {
        id: 'onedrive-step-2',
        title: 'Document the next action',
        prompt: 'What belongs in the ticket note?',
        choices: [
          {
            id: 'onedrive-choice-3',
            label: 'Web comparison result, sync status, affected folders, conflict files preserved, and next action.',
            outcome: 'Clear evidence for escalation or continued first-line repair.',
            riskNote: 'Document preservation steps for data-sensitive tickets.',
            correct: true
          },
          {
            id: 'onedrive-choice-4',
            label: 'OneDrive broken.',
            outcome: 'Too vague and unhelpful for handoff.',
            riskNote: 'Cloud sync tickets need specific folder and state evidence.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm sign-in and OneDrive web availability',
      'Compare web source of truth against local sync state',
      'Preserve conflict/local files',
      'Escalate or continue repair with affected folder evidence'
    ],
    escalationPoint: 'Escalate if web data is missing, sync errors persist after safe checks, or conflict risk is high.',
    riskNote: 'Do not delete files, reset sync, or expose real filenames in practice notes.',
    ticketNoteExample:
      'Fictional OneDrive issue after device replacement. Web source checked; local sync incomplete for selected folders. Conflict/local files preserved. Escalating with sync state and affected folder summary before cleanup.'
  },
  {
    id: 'msp-suspicious-email-report',
    title: 'Suspicious email report',
    summary: 'Respond to a possible phishing report without clicking links or losing evidence.',
    missionType: 'Security Judgement Mission',
    estimatedMinutes: 9,
    initialReport: 'A fictional client forwards a message asking whether an unexpected invoice link is safe.',
    contextBullets: [
      'The email may be malicious.',
      'The user has not clicked the link yet.',
      'You need to preserve useful evidence and escalate through the security path.'
    ],
    careerTags: ['MSP support', 'Security', 'Client communication'],
    contextTags: ['msp', 'phishing', 'security'],
    transferableSkills: ['risk containment', 'user guidance', 'evidence preservation'],
    steps: [
      {
        id: 'phish-step-1',
        title: 'Contain first',
        prompt: 'What should you tell the user first?',
        choices: [
          {
            id: 'phish-choice-1',
            label: 'Do not click links or open attachments; keep the email available for review.',
            outcome: 'Correct. This reduces risk while preserving evidence.',
            riskNote: 'Containment and evidence preservation come before curiosity.',
            correct: true
          },
          {
            id: 'phish-choice-2',
            label: 'Click the link in a browser to see where it goes.',
            outcome: 'Unsafe and unnecessary.',
            riskNote: 'Never interact with suspected malicious content in normal user context.',
            correct: false
          }
        ]
      },
      {
        id: 'phish-step-2',
        title: 'Escalate cleanly',
        prompt: 'What should the escalation include?',
        choices: [
          {
            id: 'phish-choice-3',
            label: 'Sender, subject, received time, whether clicked, affected user count, and preserved message path.',
            outcome: 'Security review has the context needed to act.',
            riskNote: 'Security escalations need facts, not screenshots alone.',
            correct: true
          },
          {
            id: 'phish-choice-4',
            label: 'A vague note saying "maybe phishing".',
            outcome: 'Insufficient for security triage.',
            riskNote: 'Vague reports slow containment.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Tell user not to click or forward broadly',
      'Preserve message evidence',
      'Check whether anyone clicked or received similar messages',
      'Escalate with sender, subject, time, scope, and click status'
    ],
    escalationPoint: 'Escalate any suspicious email with link/attachment risk, credential prompt, or possible compromise.',
    riskNote: 'Do not paste real email headers, links, names, or private message content into practice notes.',
    ticketNoteExample:
      'Fictional suspicious invoice email reported. User advised not to click; message preserved for review. Click status negative, scope currently one user. Escalating with sender/subject/time summary and security review request.'
  },
  {
    id: 'msp-device-performance-pressure',
    title: 'Device performance pressure',
    summary: 'Triage slow workstation symptoms using evidence before recommending replacement.',
    missionType: 'Triage Mission',
    estimatedMinutes: 10,
    initialReport: 'A fictional client says one workstation is too slow to use during normal business work.',
    contextBullets: [
      'Only one workstation is reported so far.',
      'You can collect basic CPU, RAM, disk, startup, and storage observations.',
      'Replacement should not be the first assumption.'
    ],
    careerTags: ['MSP support', 'Endpoint', 'Performance'],
    contextTags: ['msp', 'endpoint', 'performance'],
    transferableSkills: ['evidence gathering', 'impact scoping', 'upgrade recommendation quality'],
    steps: [
      {
        id: 'perf-step-1',
        title: 'Collect useful evidence',
        prompt: 'What should your first evidence set include?',
        choices: [
          {
            id: 'perf-choice-1',
            label: 'CPU/RAM/disk pressure, free storage, startup load, recent changes, and user impact.',
            outcome: 'Good. This makes performance triage evidence-based.',
            riskNote: 'Performance complaints need measurements and impact.',
            correct: true
          },
          {
            id: 'perf-choice-2',
            label: 'Tell the client to buy a new computer immediately.',
            outcome: 'Premature and not evidence-based.',
            riskNote: 'Recommendations need evidence.',
            correct: false
          }
        ]
      },
      {
        id: 'perf-step-2',
        title: 'Recommend next step',
        prompt: 'Disk is near full and startup load is high. What is the best next note?',
        choices: [
          {
            id: 'perf-choice-3',
            label: 'Document pressure findings, safe cleanup/startup actions, impact, and escalation if hardware limits remain.',
            outcome: 'Clear, measured, and action-oriented.',
            riskNote: 'Separate safe first-line actions from upgrade decisions.',
            correct: true
          },
          {
            id: 'perf-choice-4',
            label: 'Close as user error.',
            outcome: 'Dismissive and unsupported.',
            riskNote: 'Avoid blame language in client notes.',
            correct: false
          }
        ]
      }
    ],
    idealTroubleshootingPath: [
      'Confirm one device vs broader issue',
      'Collect CPU/RAM/disk/storage/startup observations',
      'Perform safe approved cleanup or startup checks',
      'Escalate with evidence if hardware or policy action is needed'
    ],
    escalationPoint: 'Escalate when hardware limits, disk health, security tooling, or business-critical impact needs senior review.',
    riskNote: 'Do not remove software or data without approval and backup confidence.',
    ticketNoteExample:
      'Fictional workstation performance issue scoped to one device. CPU/RAM/disk/storage/startup observations collected; disk pressure and startup load noted. Safe first-line cleanup path proposed; escalation if hardware limit remains.'
  }
];
