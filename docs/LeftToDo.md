---
name: Remaining App Work
overview: Extracts the app’s own roadmap checklist from `toDOlist.md` plus RBC/SMITB integration backlog, then summarizes every unchecked item grouped by priority (highest impact first).
todos:
  - id: extract-checklists
    content: Extract and group all unchecked items from `toDOlist.md` and `RBC-SMITB-Integration-TODO.md` by priority.
    status: pending
  - id: validate-surface-area
    content: Cross-check existence of the corresponding app routes/components under `app/` to avoid listing already-shipped gaps.
    status: pending
  - id: produce-final-summary
    content: Output the remaining-work checklist ordered by priority with the key file references.
    status: pending
isProject: false
---

# Remaining App Work

## Scope
- Core DCSPrep roadmap + any remaining RBC/SMITB integration work.

## Priority P0: Foundation for making the app “complete”
1. Finalize content architecture + progress/storage model (otherwise everything else needs redesign later)
   - [DCSPrepApp (2)/DCSPrepApp/toDOlist.md](DCSPrepApp%20(2)/DCSPrepApp/toDOlist.md):
     - Extend shared types for modules, question types, flashcards, study techniques, scenario turns, scenario note scoring, practical outputs, knowledge-base drafts, evidence-pack summaries, and internal-source metadata.
     - Add a single DCS workflow taxonomy (systems, ticket themes, ownership boundaries, support level, escalation category).
     - Add `localStorage` schema entries for: assessment attempts, confidence ratings, self-rubric scores, scenario note scores, flashcard box state, due-review state, practical outputs, knowledge-base drafts, evidence-pack settings.
     - [x] Add storage versioning + migration.
     - Add privacy-safe metadata fields.
     - [x] Add helper functions for loading/saving/validating.
     - Add tests for schema validation, migrations, and default-state creation.

2. Rebuild the module experience to be fully question-first and consistent
   - Standardize *every* module to: diagnostic questions → flashcards → short-answer recall → explain-it-simply prompt → concept sort/categorization (where relevant) → scenario step/prompt → practical output → review queue.
   - [x] Add a reusable module progress model tracking completion by activity type (not just reads/quiz).
   - Show weak areas, due review, and next best action at the top of each module.
   - Ensure explanation content placement stays retrieval-first.
   - Update module cards + detail pages to show due items/weak topics/estimated time/practical status.
   - Add tests for module completion math + next-step recommendation.

3. Implement the study-technique layer the roadmap depends on
   - Active Recall mode (hide answers until recall).
   - Feynman-style prompts + rubric (clarity/correctness/practical relevance).
   - Leitner-style flashcard boxes/labels on top of current spaced repetition.
   - Concept-sorting exercises (symptoms/systems/ownership boundaries/escalation decisions).
   - Mnemonic-builder prompts (ports/workflows/system distinctions).
   - Cornell-style guided note templates.
   - SQ3R-style reading companions (turn internal resources into questions/summaries safely).
   - Micro-learning task cards (short quiet windows).
   - Pomodoro-style timer tied to one learning task.
   - End-of-session reflection prompts.
   - [x] Add mindfulness pause widget to scenario pages.

## Priority P0/P1: Content completeness for Tier 1 + assessment + scenario loops
4. Build “missing” Tier 1 workflow modules to full completeness criteria
   - For each required module, complete: 3–5 lessons, 10+ flashcards, 8+ mixed assessment items, 1+ scenario prompt/embedded step, 1+ practical output, ownership-boundary notes, privacy-safe ticket/escalation wording.
   - Required modules:
     - Parent Portal Registration
     - Parent Portal Details Updates
     - Sentral Support
     - OurDCS / Schoolbox Support
     - Login, Password, Lockout, MFA, and Self-Service Recovery
     - Permissions, Shared Drives, and Access Requests
     - Website Filtering and Unblock Request Triage
     - New User Onboarding and Missing-Access Checks
     - Teams, SharePoint, and OneDrive Support Basics
     - iPad and Jamf Workflow Basics

5. Deepen existing modules so they teach real DCS work
   - DCS IT Support Foundations (multi-campus context, role boundaries, internal workflow/source awareness, safe escalation rules).
   - Printer Troubleshooting (PaperCut/Follow-Me release, photocopier faults, queue-vs-device reasoning, service-call handoff).
   - Classroom Display and ViewBoard Troubleshooting (Windows+P, no-audio workflows, touch calibration, projector thermal/lamp faults, recurring room-fault capture).
   - DNS/DHCP/Gateway/IP Basics (SSID errors, forget/rejoin, compare-another-device checks, BYOD/iPad onboarding context).
   - Ports and Protocols (troubleshooting use cases, school-device/service examples, memory aids).
   - M365 Identity and Offboarding Basics (block sign-in, session revocation, sign-in logs, MFA cleanup, shared resource cleanup, visibility-delay explanation).
   - MDM/Intune/Group Policy Concepts (startup/sign-in/background refresh, OU placement, security filtering, printer deployment, work-profile/managed-data concepts).
   - VLANs and Network Segmentation (guest-internet-only patterns, source-destination rule writing, staff/student/printer access examples).
   - Cloud Models SaaS/PaaS/IaaS/DaaS (school support use cases, DaaS vs local trade-offs, BYOD application scenarios).
   - Ticket Notes and Escalation Quality (stronger Jira examples, better scope/urgency writing, privacy-safe wording practice).

6. Expand the strict assessment bank to roadmap level
   - Raise strict question bank to 80+ scored items.
   - Ensure every Tier 1 module has at least 8 scored items.
   - Ensure expanded technical modules have enough questions for real application.
   - Include all required question types (MCQ, short answer, order-the-steps, scenario response, reflection).
   - Store correctness, reasoning, judgement, next review outcome for every attempt.
   - Add model answers + self-rating rubrics where auto-marking isn’t possible.
   - Add mixed-domain drills so weak topics get revisited.
   - Add tests for scoring logic, confidence capture, and review-scheduling output.

7. Finish Scenario Lab properly
   - Add the full 10-scenario set:
     - HDMI works but no audio
     - Student laptop has 169.254 IP
     - Printer jobs stuck in queue
     - Laser printer toner rubs off
     - Guest Wi-Fi segmentation rules
     - Phishing email reported by staff
     - Parent Portal registration problem
     - Sentral access-key or markbook issue
     - Password lockout or self-service reset failure
     - New user onboarding with missing system access
   - Ensure each scenario has: 4–6 turns, realistic reveal steps, escalation point, ideal troubleshooting path, risk/privacy note, model answer summary, and a Jira-style note at the end.
   - [x] Add Jira-style note scoring rubric (who/where/device, symptom, scope, steps tried, urgency/impact, privacy-safe wording).
   - [x] Store scenario attempts, note scores, and revisit flags in `localStorage`.
   - [x] Add due-review hooks for missed scenario decisions. (Implemented in `src/lib/dueReview.ts` and `app/due-today/page.tsx`)
   - [x] Add tests for scenario note-scoring math + scenario-to-module revisit mappings. (Implemented in `src/tests/scenarios.test.ts`)
   - Add browser-level test coverage for full scenario progression and save flow.

## Priority P1/P2: Due Today + quiet-window + outputs (learning must loop back to practice)
8. Upgrade Due Today + spaced repetition + Error Log into one unified due-review system
   - [x] Merge flashcards + missed questions + weak scenario steps + note-writing weak points into one due system. (Implemented in `src/lib/dueReview.ts`)
   - [x] Show due items by topic/system/review type. (Implemented in `app/due-today/page.tsx`)
   - [x] Add Leitner-style box visibility and map Again/Hard/Good/Easy to due dates + box movement. (Implemented in `app/due-today/page.tsx`)
   - Improve Error Log entries (what Josh answered, what was correct, why it matters at DCS, next review date, linked module, linked practice action).
   - Add “practise again” flows from Error Log entries into drills or scenarios.
   - Add weak-area rollups across systems/workflows/judgement-note quality.
   - Add tests for due-item calculation, box movement, and error-group rollups.

9. Build the quiet-window workflow and focus modes
   - [x] Start tiny mode. (Implemented in `app/due-today/page.tsx`)
   - “I’m overwhelmed” mode with 3 simple actions.
   - One-click quick starts from dashboard (10-question drill, scenario step, due flashcards, PD log entry, readiness view).
   - Ticket-theme-weighted recommendations based on weak areas + due items.
   - Single-task session view (low clutter).
   - [x] Pomodoro-style timer tied to one learning task. (Implemented in `app/due-today/page.tsx`)
   - End-of-session reflection capture.
   - Tests for recommendation logic + task-mode routing.

10. Practical-output + Knowledge Base Lab workflow
   - Add practical output templates (Parent Portal, Sentral, login help, Wi‑Fi onboarding, unblock requests, onboarding checklists, onboarding request template, Sentral triage cheat sheet, OurDCS quick-reference, Teams/SharePoint/OneDrive triage guide, iPad/Jamf first-response checklist, printer symptom matrix, classroom AV quick-fix flow).
   - Add/complete `/knowledge-base-lab` route.
   - Build workflow turning repeated ticket themes into OurDCS-ready draft articles.
   - Add rubric for article quality (title, audience fit, step order, brevity, safety/privacy, likely deflection value).
   - Store drafts locally and allow Markdown export.
   - Link module practical outputs into the Knowledge Base Lab.

11. Enhance PD Log + evidence pack
   - Extend PD log to link entries with modules, scenarios, practical outputs, and focus blocks.
   - Add quick templates (scenario practice, internal workflow review, article/SOP creation, reflection on a repeated ticket theme).
   - Improve monthly summaries (minutes, modules touched, scenarios completed, outputs created, weak areas improved, current weak areas, suggested next focus).
   - Generate manager-safe Markdown summary from `localStorage`.
   - Include certificate/link placeholders without external systems.
   - Add copy-to-clipboard support.
   - Add privacy reminders excluding confidential ticket/student/staff/network details.

12. Make readiness graphs evidence-based
   - Reduce unsupported guesswork.
   - Rework readiness scoring inputs to use assessment performance, scenario completion, scenario note quality, flashcard retention, practical output completion, repeated weak areas.
   - Label unsupported domains as “estimate”.
   - Adjust weighting toward DCS-relevant performance.
   - Add tests for readiness math + domain weighting.

13. Build internal-resource companion workflow (safe content authoring)
   - Add content-author workflow for safely converting internal DCS knowledge into app content.
   - Add source-intake template (source area, system, workflow theme, privacy review status, safe concepts, risky details to exclude).
   - Add transformation checklist (extract steps/errors/boundaries; write flashcards/questions/scenario/practical output).
   - Add author notes for using Teams posts/Sentral training/OurDCS guides/local SOPs without copying verbatim.
   - Link this workflow from repo docs.

14. Finish testing + docs + release readiness
   - [x] Run `npm run lint`.
   - [x] Run `npm run build`.
   - [x] Run tests and add missing tests for storage migrations, scoring, spaced repetition, scenario note scoring, readiness math, module completion math, gamification, and PWA manifest metadata. (Verified full `npm test -- --run` passes: 8 files, 18 tests.)
   - Verify routes work desktop + mobile: `/`, `/modules`, `/strict-quiz`, `/due-today`, `/scenarios`, `/pd-log`, `/error-log`, `/readiness`, `/trainer-guide`, `/settings`, `/knowledge-base-lab`, `/evidence-pack`.
   - Verify old routes + existing saved progress still work after migrations.
   - Review visible copy for professionalism + clarity.
   - Review generated content for privacy safety + Level 1 boundaries.
   - Update `README.md`, `TODO.md`, and roadmap/audit docs so they match final shipped behavior.

## Priority P10: “Platform excellence” extras (lower priority)
- Soft Skills Integration: “Soft Skills for DCS Support” module.
- Gamified reinforcement:
  - [x] Daily streak counter. (Implemented in `src/lib/gamification.ts` and shown on `app/page.tsx`)
  - [x] Local-first points and task badges for PD logs, scenarios, strong ticket notes, practical outputs, module milestones, and imaging readiness.
  - [x] Bite-sized daily challenge (1-minute MCQ) resetting every 24 hours. (Implemented in `src/components/DailyChallenge.tsx`)
- Interactive learning: in-app playground for Python + HTML/CSS previews.
- Structured learning paths: group modules into “Career Paths”.
- Project-based mastery: “Final Projects” per path.
- Micro-learning optimization: one-thumb UI audit.
- [x] PWA install metadata and offline app-shell fallback. (Implemented with `app/manifest.ts`, `public/sw.js`, and `src/components/pwa/ServiceWorkerRegistration.tsx`)
- Offline module/scenario content packs, IndexedDB downloads, background sync, and push reminders remain open.

## RBC/SMITB integration backlog (from `RBC-SMITB-Integration-TODO.md`)
All unchecked items below are part of “what’s left” if academic PD integration is in scope:
1. Content/data expansion
   - Add second-wave modules/sections for Data literacy (STA1DCT), Information systems/SDLC (CSE1IS), Big-data/cloud context (CSE5BDC), and ML/deep learning/NLP/computer vision context (CSE5ML/DL/NLP/CV).
   - Avoid duplicating existing A+ modules unless the RBC/SMITB alignment adds a clear new angle.

2. Scenario + assessment additions
   - Create first-pass scenarios for camera/Windows Hello/accessibility issues (CSE5CV) and dashboard/log interpretation (STA1DCT).
   - Add questions for: cybersecurity regs/standards + safeguards, network/endpoint fundamentals, script reasoning, SDLC + system security requirements, cloud service models/deployment/CI/CD vocabulary, AI/ML/NLP/CV limitations + school-data risks, data interpretation/dashboard/log reasoning, professional ethics/privacy/copyright/reflection.

3. PD log + evidence pack integration decisions
   - Decide how RBC/SMITB learning appears in `app/pd-log/page.tsx`.
   - Decide how completed RBC/SMITB modules appear in `app/evidence-pack/page.tsx`.
   - Add evidence-pack wording for academic alignment claims.
   - Include reflective prompts for CSE3PE.
   - Ensure privacy-safe language for school data, screenshots, ticket notes, and AI-tool examples.

4. Weekly SLG topic rows + richer academic content
   - Add exact weekly SLG topic rows for CSE1IIT once full rows exist.
   - Add exact weekly/topic boxes for CSE1ICB, STA1DCT, CSE1OOF, CSE1IS, CSE3PE where the source has enough detail.
   - Add richer resource sets for each non-CSE1PE subject.
   - Add exact weekly/topic boxes for SMITB subjects after confirming which are actively taught at Bendigo.

5. Subject pages + interactive practice
   - Add full academic subject pages for CSE1OOF and SMITB subjects (not overview-only).
   - Add per-assessment interactive practice questions for each extracted SLG task.

6. Testing/validation + UI/docs polish
   - Update or add tests under `src/tests/` and add tests for extended type/schema assumptions.
   - Validate `recommendedModuleId` exists for every mapping.
   - Validate new scenario IDs and choice IDs are unique.
   - Manually inspect new/updated UI at desktop + mobile widths.
   - Update README/internal docs if a new RBC route/data file/content workflow is introduced.
