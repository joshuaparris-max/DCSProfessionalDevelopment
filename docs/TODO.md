# SupportOps Career Lab TODO

## P0: Real DCS Ticket Relevance

- [x] Add `Parent Portal Registration` module with access-key flow, common blockers, escalation boundaries, and parent-facing note examples.
- [x] Add `Parent Portal Details Updates` module covering family amendment requests, urgent exceptions, and admin handoff.
- [x] Add `Sentral Support` module covering markbook visibility, parent access keys, reporting-period issues, and safe escalation.
- [x] Add `OurDCS / Schoolbox Support` module covering class pages, staff workflow issues, and portal/LMS triage boundaries.
- [x] Add `Login and Password Support` module covering username checks, lockouts, expired passwords, self-service reset, and compromise suspicion.
- [x] Add `Permissions and Access Requests` module covering shared drives, software access, approvals, role context, and least privilege.
- [x] Add `Website Filtering and Unblock Requests` module covering capture of block details, justification, lead time, and workflow.
- [x] Add `New User Onboarding` module covering staff, student, and prac-teacher request completeness and day-one validation.
- [x] Add `Teams, SharePoint, and OneDrive Support` module covering common access, sync, sharing, and ownership issues at Level 1 scope.
- [x] Add `iPad and Jamf Workflow Basics` module covering first-line triage, ownership boundaries, and evidence capture.

## P0: Deepen Existing High-Frequency Themes

- [x] Expand `Printer Troubleshooting` with PaperCut / Follow-Me release, photocopier faults, queue-vs-device reasoning, and service-call handoff.
- [x] Expand `Classroom Display and ViewBoard Troubleshooting` with projector inputs, Windows+P, audio-path faults, SMART/touch calibration, and lamp/thermal issues.
- [x] Expand `DNS, DHCP, Gateway, and IP Basics` with Wi-Fi onboarding, SSID mistakes, signal checks, forget/rejoin, and cross-device comparison.
- [x] Expand `DCS IT Support Foundations` with multi-campus context, role boundaries, and where DCS workflow knowledge usually lives internally.

## P0: Retrieval-First Learning Design

- [X] Rework module structure so each topic starts with questions before explanatory reading.
- [x] Define a standard module pattern: diagnostic questions, flashcards, short-answer retrieval, explain-it-simply prompt, scenario, and practical output. _(See `docs/module-pattern.md`.)_
- [x] Make flashcards and practice questions the primary way to learn SupportOps workflow areas that come from internal resources. _(Workflow modules emphasise cards + eight scored prompts each.)_
- [x] Add explicit support for converting internal DCS workflow knowledge into safe app prompts without copying sensitive documents into the repo. _(See `docs/internal-source-workflow.md`.)_

## P1: Stronger Scenario Lab

- [x] Add scenario: HDMI works but no audio.
- [x] Add scenario: student laptop has 169.254 IP.
- [x] Add scenario: printer jobs stuck in queue.
- [x] Add scenario: laser printer toner rubs off.
- [x] Add scenario: guest Wi-Fi segmentation rules.
- [x] Add scenario: phishing email reported by staff. _(Existing `rbc-cybersecurity-phishing-triage` scenario.)_
- [x] Add scenario: Parent Portal registration problem.
- [x] Add scenario: Sentral access-key or markbook issue.
- [x] Add scenario: password lockout or self-service reset failure.
- [x] Add scenario: new user onboarding with missing system access.
- [x] Require a Jira-style escalation note at the end of every scenario. _(Ticket note example block + completion rubric prompts.)_
- [x] Score scenario notes with a rubric for symptom clarity, scope, steps tried, urgency, and privacy-safe wording. _(Self-check checklist on Scenario Lab completion screen.)_
- [x] Add mindfulness / wellbeing widget to scenario pages for short pause and reset support.

## P1: Stronger Assessment Engine

- [x] Expand the strict question bank to 80+ questions with plausible distractors. _(Strict bank now samples three quiz items per module plus extras.)_
- [x] Weight new questions toward the actual top DCS enquiry themes, not just networking concepts. _(Strict bank now samples more heavily from DCS workflow modules such as login, Sentral, onboarding, permissions, and ticket quality.)_
- [x] Add more Analyse / Evaluate / Create style questions.
- [x] Add more free-response and order-the-steps items for access requests, onboarding, Sentral, and password support.
- [x] Revisit weak topics later in mixed contexts instead of only re-asking same-topic items. _(Strict quiz now blends weak-topic prompts with cross-domain transfer prompts.)_
- [x] Add Feynman-style explain-back prompts to every major module area.
- [x] Add concept-sorting exercises for systems, symptoms, and ownership boundaries.
- [x] Add mnemonic and memory-sheet prompts for ports, processes, and platform distinctions.
- [x] Add guided Cornell-style reflection prompts at the end of study blocks.
- [x] Add SQ3R-style support for turning internal readings into questions and summaries.

## P1: Deeper Technical Judgement

- [x] Deepen M365 / Entra / Intune content with sign-in blocking, session revocation, sign-in logs, MFA, shared mailbox cleanup, and managed mobile retire/wipe concepts.
- [x] Deepen Group Policy content with startup, sign-in, background refresh, OU placement, security filtering, drive mapping, and printer deployment.
- [x] Deepen VLAN content with source-destination allow/block rule writing and guest-internet-only designs.
- [x] Deepen cloud content with DaaS / hosted-desktop school scenarios and BYOD trade-off reasoning.
- [x] Add `Device Imaging and Deployment Workflows` module covering imaging vs provisioning, reference builds, driver/app readiness, rollout evidence, and Level 1-safe deployment handoff.

## P2: Support-Quality Outputs

- [x] Add practical output templates for Parent Portal, Sentral, login help, Wi-Fi onboarding, unblock requests, and onboarding checklists. _(Embedded across new workflow modules + Knowledge Base Lab starters.)_
- [x] Add a self-service article authoring workflow so repeated ticket themes can become OurDCS-ready content. _(Knowledge Base Lab route + Markdown export.)_
- [x] Add a knowledge-base or SOP practice route for writing support articles, not just notes. _( `/knowledge-base-lab` )_

## P2: Remaining Backlog From `_Jira analysis.txt`

- [x] Add `/evidence-pack`.
- [x] Add `Start tiny`.
- [x] Add `20-minute focus block`.
- [x] Add `I'm overwhelmed` mode.
- [x] Add end-of-session reflection prompts.
- [x] Improve readiness scoring so more domains are based on real evidence rather than light estimates.
- [x] Add explicit Leitner-style flashcard buckets or box labels on top of the current spaced repetition flow.
- [x] Add a Pomodoro-style study timer tied to one clear task.
- [x] Add micro-learning task cards sized for short quiet windows, with one question set or one workflow at a time.
- [x] Add local-first gamified progression with dashboard points, daily streaks, and task badges tied to real DCS learning work.
- [x] Add a bite-sized daily dashboard MCQ challenge that resets by date.
- [x] Add a PWA baseline with install manifest, app icon, production service worker registration, and offline app-shell fallback.

## Guardrails

- [x] Keep all new training Level 1-safe and privacy-safe.
- [x] Teach real DCS workflow, but do not simulate unsafe production changes as if Josh is authorized to perform them.
- [x] Prefer triage, first-line troubleshooting, evidence capture, communication, and escalation quality over fake-admin practice.
- [x] Do not copy confidential internal DCS procedures, credentials, student details, staff details, or private system data into app content.
- [x] Use internal DCS documents, Teams posts, and school-owned resources as source material for practice design, not as content to reproduce verbatim.
