---
name: Remaining App Work
overview: Current, code-checked remaining work after the May 14 completion pass.
todos:
  - id: validate-surface-area
    content: Cross-check shipped routes/components against the older roadmap documents.
    status: completed
  - id: complete-small-content-gaps
    content: Bring newer Intune, NIST, accessibility, and ITIL modules up to catalogue minimums.
    status: completed
  - id: verify-release-health
    content: Run tests, lint, and production build before deployment.
    status: completed
isProject: false
---

# Remaining App Work

## Current status

The app is broadly complete for the local-first DCSPrep use case. The core learning loops now exist:

- DCS workflow modules, A+ modules, Academic PD/RBC/SMITB modules, and support-tool routes.
- Question-first module detail flow with diagnostics, learn/review/assessment tabs, flashcards, scenario prompts, labs, practical outputs, and offline download controls.
- Scenario Lab with Jira-style note scoring and due-review hooks.
- Due Today, Error Log, Readiness, PD Log, Evidence Pack, Knowledge Base Lab, Scheduler, Usage Insights, Career Paths, Final Projects, Mobile Audit, Settings, and PWA shell.
- Local-first points, streaks, badges, stickers, progress backup/restore, storage status, and notification permission support.
- Advanced M365/Entra/Intune, Group Policy, VLAN rule-writing, and DaaS/BYOD judgement content.
- Full Academic PD pages for CSE1OOF and SMITB subjects, plus per-assessment SLG practice prompts for extracted assessment tasks.

## Completed in the latest pass

- Fixed gamification state migration so older saved state without `stickers` does not break recalculation.
- Added clearer assertion labels to module catalogue tests.
- Deepened these newer modules to satisfy the shared content baseline:
  - `microsoft-intune-fundamentals`
  - `cybersecurity-incident-response-nist`
  - `accessibility-inclusive-design`
  - `itil-foundations-service-management`
- Each of those now has enough flashcards and assessment prompts, plus scenario/practical output coverage where it was missing.
- Verified the full test suite passes: 10 files, 27 tests.
- Added deeper technical judgement sections for M365/Entra/Intune, Group Policy, VLAN rules, and DaaS/BYOD scenarios.
- Added Academic PD subject pages for CSE1OOF and SMITB subjects generated from extracted SLG assessment summaries.
- Added per-assessment Academic PD practice prompts and tests that verify every extracted SLG summary has a full subject page.
- Added PD Log and Evidence Pack wording for informal RBC/SMITB academic-alignment evidence without claiming formal credit.
- Added IndexedDB stores for scenario packs, offline assets, and offline sync queue items.
- Added local review reminder storage, service-worker background sync/push event hooks, and settings controls that surface the backend boundary.

## Remaining work that is still real

These items are useful next steps, but they are not blockers for a working Vercel deployment.

1. Browser QA
   - Manually inspect core routes on desktop and mobile widths before each deployment.
   - Priority routes: `/`, `/modules`, `/modules/[moduleId]`, `/strict-quiz`, `/due-today`, `/scenarios`, `/pd-log`, `/readiness`, `/settings`, `/knowledge-base-lab`, `/evidence-pack`, `/academic-pd`, `/team-challenges`.

2. Local-first limits
   - Progress is still browser-local.
   - Team challenges and leaderboards remain demo/local-first until a real backend is added.
   - Notifications can request permission, show immediate reminders, and save local reminder metadata, but true scheduled push needs a backend push service.

3. Offline depth
   - The app has a PWA shell and per-module IndexedDB save path.
   - Scenario packs, asset records, and sync queue storage are now available in IndexedDB.
   - Future work could add storage quota UI and a hosted sync endpoint.

4. Academic PD expansion
   - Add richer external resource sets for non-CSE1PE subjects.
   - Add exact weekly SLG rows only when the extracted source includes enough week-by-week detail.

5. Production hardening
   - Add a backend only if multi-user sync, real auth, team competitions, or admin reporting become required.
   - Add SSO/MFA/RBAC only if the app moves beyond a personal PD tool.
   - Keep privacy guardrails: no live student, staff, credential, incident, or network-sensitive details in app content or local notes.

## Verification checklist

- [x] `npm test -- --run`
- [x] `npm run lint`
- [x] `npm run build`
- [x] Desktop/mobile browser route smoke QA
