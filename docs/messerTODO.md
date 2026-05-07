Josh, the app is **not missing everything** — it already has the right *spine*. But it is missing two different categories:

1. **DCS-specific workflow modules** from your TODO.
2. **A+ Core 1 topic coverage** from the Professor Messer list.

Your current app already has modules for:

* DCS IT Support Foundations
* Ports and Protocols
* DNS, DHCP, Gateway, and IP Basics
* Printer Troubleshooting
* Classroom Display and ViewBoard Troubleshooting
* M365 Identity and Offboarding Basics
* MDM / Intune / Group Policy Concepts
* VLANs and Network Segmentation
* Cloud Models
* Ticket Notes and Escalation Quality

## Missing DCSPrep modules

The most important missing modules are the DCS workflow ones:

1. **Parent Portal Registration**
2. **Parent Portal Details Updates**
3. **Sentral Support**
4. **OurDCS / Schoolbox Support**
5. **Login, Password, Lockout, MFA, and Self-Service Recovery**
6. **Permissions, Shared Drives, and Access Requests**
7. **Website Filtering and Unblock Request Triage**
8. **New User Onboarding and Missing-Access Checks**
9. **Teams, SharePoint, and OneDrive Support Basics**
10. **iPad and Jamf Workflow Basics**

Your TODO says each new module should include 3–5 short lessons, at least 10 flashcards, at least 8 mixed assessment items, a scenario/practical step, ownership boundaries, and privacy-safe ticket wording. 

## Missing A+ Core 1 coverage

From the Professor Messer topic list, the biggest missing/underdeveloped areas are:

* **Mobile devices:** laptop hardware, mobile configuration, accessories, mobile connectivity, battery/charging, hotspot/tethering, SIM/Bluetooth/GPS. 
* **Networking hardware/tools:** network devices, IP addressing, connection types, network types, crimpers, Wi-Fi analysers, tone generators, punch-down tools, cable testers. 
* **Cables and connectors:** network cables, T568A/B, fibre, USB/USB-C, Thunderbolt, HDMI, DisplayPort, SATA, adapters, RJ45, DB-9, fibre connectors. 
* **Core PC hardware:** memory, storage, RAID, motherboards, BIOS/UEFI, TPM/HSM, CPU features, expansion cards, cooling, power supplies. 
* **Virtualisation/cloud and troubleshooting:** virtualisation, hypervisors, VDI, containers, cloud models/characteristics, hardware/storage/display/mobile/network/printer troubleshooting. 

My judgement: **don’t implement all A+ topics as equal modules yet.** For your DCS role, implement the missing **DCS workflow modules first**, then add A+ topics as smaller support modules where they directly improve Level 1 troubleshooting.

Here’s the Copilot prompt.

```text
You are working in my existing Next.js / TypeScript DCSPrep app.

Goal:
Implement the missing DCS workflow training modules and lightly extend A+ Core 1 coverage, while keeping the app Level 1-safe, privacy-safe, and aligned with my current DCS IT support role.

Before coding:
1. Inspect the existing app structure.
2. Find the current module data shape in src/data/modules.ts.
3. Reuse the existing TrainingModule, AssessmentQuestion, flashcard, quiz, scenario prompt, and practical output patterns.
4. Do not redesign the whole app unless absolutely necessary.
5. Do not introduce external dependencies unless required.
6. Keep all content local/static for now.
7. Do not copy confidential DCS internal procedures, staff/student data, credentials, network details, or private ticket content.

Current app already has these modules:
- DCS IT Support Foundations
- Ports and Protocols
- DNS, DHCP, Gateway, and IP Basics
- Printer Troubleshooting
- Classroom Display and ViewBoard Troubleshooting
- M365 Identity and Offboarding Basics
- MDM, Intune, and Group Policy Concepts
- VLANs and Network Segmentation
- Cloud Models: SaaS, PaaS, IaaS, and DaaS
- Ticket Notes and Escalation Quality

Add these missing DCS workflow modules to src/data/modules.ts:

1. Parent Portal Registration
id: parent-portal-registration
Focus:
- parent portal account/access-key issues
- common blockers
- details to capture
- admin/Ruth handoff boundary
- parent-facing wording
- privacy-safe escalation

2. Parent Portal Details Updates
id: parent-portal-details-updates
Focus:
- family detail update requests
- what ICT can observe vs what admin owns
- urgent exceptions
- identity/privacy caution
- clean handoff note

3. Sentral Support
id: sentral-support
Focus:
- markbook visibility
- access-key issues
- reporting-period issues
- staff/parent symptom capture
- safe escalation
- do not pretend Josh owns Sentral administration

4. OurDCS / Schoolbox Support
id: ourdcs-schoolbox-support
Focus:
- class pages
- staff workflow issues
- student/parent portal triage
- what to capture before escalating
- distinguish LMS/content issue vs login/access issue

5. Login, Password, Lockout, MFA, and Self-Service Recovery
id: login-password-lockout-mfa-self-service
Focus:
- username format checks
- expired password
- account lockout
- MFA prompts
- self-service reset failures
- suspected compromise
- never ask for passwords
- when to escalate identity/security concerns

6. Permissions, Shared Drives, and Access Requests
id: permissions-shared-drives-access-requests
Focus:
- shared drive access
- group-based access
- role/approval context
- least privilege
- missing permissions
- software access request completeness
- escalation wording

7. Website Filtering and Unblock Request Triage
id: website-filtering-unblock-triage
Focus:
- blocked site symptoms
- exact URL capture
- user, class, curriculum purpose, timeframe
- screenshot/error evidence
- approval/lead-time boundary
- safety/privacy wording

8. New User Onboarding and Missing-Access Checks
id: new-user-onboarding-missing-access
Focus:
- staff, student, and prac-teacher readiness
- missing group/access checks
- device readiness
- software access request completeness
- day-one validation
- escalate cleanly without making unauthorised changes

9. Teams, SharePoint, and OneDrive Support Basics
id: teams-sharepoint-onedrive-support
Focus:
- shared file access
- sync issues
- “I can’t find a file”
- ownership vs permission issue
- sharing boundaries
- Level 1 triage
- escalation wording

10. iPad and Jamf Workflow Basics
id: ipad-jamf-workflow-basics
Focus:
- managed iPad first-line triage
- app missing / app won’t install
- Wi-Fi/profile symptoms
- device ownership boundaries
- Jamf concept awareness
- evidence capture before escalation

For each new module:
- Use the existing TrainingModule structure exactly.
- Add 3 to 5 short sections.
- Add at least 10 flashcards.
- Add at least 8 mixed quiz items.
- Include a mixture of:
  - MCQ
  - short-answer
  - order-steps
  - scenario-response
- Use the existing helper functions if present, such as mcq(), shortAnswer(), orderSteps(), scenarioResponse().
- Include dcsRelevance, tags, learningObjectives, sections, flashcards, quiz, scenarioPrompts, and practicalOutputs.
- Include at least one practical output, such as a checklist, triage guide, escalation-note template, or support-flow card.
- Include one privacy-safe example escalation note.
- Keep wording practical, calm, and DCS Level 1-safe.
- Do not simulate unsafe production admin actions as if Josh is authorised to perform them.
- Content should teach triage, evidence capture, first-line support, and escalation quality.

Also lightly expand these existing modules:
1. Printer Troubleshooting
Add:
- PaperCut / Follow-Me print release
- photocopier faults
- queue-vs-device reasoning
- service-call handoff details

2. Classroom Display and ViewBoard Troubleshooting
Add:
- Windows + P
- duplicate vs extend
- HDMI / USB-C / adapters
- no audio
- touch not working
- input/source selection
- projector thermal/lamp symptoms
- recurring room-fault capture

3. DNS, DHCP, Gateway, and IP Basics
Add:
- SSID mistakes
- forget/rejoin
- compare with another device
- BYOD and iPad onboarding context
- 169.254/APIPA reasoning

4. DCS IT Support Foundations
Add:
- multi-campus context
- role boundaries
- internal workflow/source awareness
- safe escalation rules

5. Ticket Notes and Escalation Quality
Add:
- stronger Jira-style examples
- scope and urgency writing
- privacy-safe wording drills

Add these missing Scenario Lab scenarios to src/data/scenarios.ts, matching the existing scenario structure:
- HDMI works but no audio
- student laptop has 169.254 IP
- printer jobs stuck in queue
- laser printer toner rubs off
- guest Wi-Fi segmentation rules
- phishing email reported by staff
- Parent Portal registration problem
- Sentral markbook or access-key issue
- password lockout or self-service reset failure
- new user onboarding with missing system access

Each scenario must include:
- 4 to 6 turns where possible
- realistic reveal steps
- correct and incorrect choices
- an escalation point
- an ideal troubleshooting path
- a risk/privacy note
- a model ticket/Jira note
- recommended module IDs

Add practical-output templates if the current module model supports them:
- Parent Portal registration guide
- Parent Portal detail-update guide
- password-reset guide
- Wi-Fi onboarding checklist
- website-unblock checklist
- onboarding request template
- Sentral triage cheat sheet
- OurDCS quick-reference guide
- Teams / SharePoint / OneDrive issue triage guide
- iPad / Jamf first-response checklist
- printer symptom matrix
- classroom AV quick-fix flow

A+ Core 1 coverage:
Do not create a huge generic A+ course yet.
Instead, add small DCS-relevant references inside existing or new modules for:
- laptop hardware basics
- mobile device connectivity
- USB-C / HDMI / adapters
- network devices
- network tools
- printer types and symptoms
- storage symptoms
- power/cooling symptoms
- basic hardware troubleshooting
- virtualisation/cloud concepts where relevant to school support

Acceptance criteria:
1. npm run build passes.
2. npm run lint passes if lint is configured.
3. Existing modules and routes still work.
4. All new modules appear in the modules list.
5. No TypeScript errors.
6. No unsafe admin instructions are presented as Josh-owned actions.
7. No confidential DCS data is included.
8. New content is question-first, practical, and focused on DCS Level 1 support with early Level 2 growth.

Implementation order:
1. Add the 10 missing DCS modules.
2. Expand the 5 existing high-frequency modules.
3. Add the 10 missing scenarios.
4. Add/extend practical outputs.
5. Run build and fix TypeScript issues.
6. Update README or TODO briefly to note what was added.
```

My strong recommendation: paste that into Copilot **as one task**, but tell it to implement in small commits/steps. The safest first win is modules 5, 6, 8, and 9: login/password, permissions/access, onboarding, and Teams/SharePoint/OneDrive.
