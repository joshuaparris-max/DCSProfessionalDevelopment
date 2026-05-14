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

## Completed in the latest pass

- Fixed gamification state migration so older saved state without `stickers` does not break recalculation.
- Added clearer assertion labels to module catalogue tests.
- Deepened these newer modules to satisfy the shared content baseline:
  - `microsoft-intune-fundamentals`
  - `cybersecurity-incident-response-nist`
  - `accessibility-inclusive-design`
  - `itil-foundations-service-management`
- Each of those now has enough flashcards and assessment prompts, plus scenario/practical output coverage where it was missing.
- Verified the full test suite passes: 9 files, 21 tests.

## Remaining work that is still real

These items are useful next steps, but they are not blockers for a working Vercel deployment.

1. Browser QA
   - Manually inspect core routes on desktop and mobile widths.
   - Priority routes: `/`, `/modules`, `/modules/[moduleId]`, `/strict-quiz`, `/due-today`, `/scenarios`, `/pd-log`, `/readiness`, `/settings`, `/knowledge-base-lab`, `/evidence-pack`, `/academic-pd`, `/team-challenges`.

2. Local-first limits
   - Progress is still browser-local.
   - Team challenges and leaderboards are demo/local-first until a real backend is added.
   - Notifications can request permission and show immediate reminders, but real scheduled push needs a backend push service.

3. Offline depth
   - The app has a PWA shell and per-module IndexedDB save path.
   - Future work could add scenario packs, asset downloads, storage quota UI, and background sync.

4. Academic PD expansion
   - Add more exact weekly SLG rows where source data is available.
   - Add richer interactive practice for more RBC/SMITB assessments.
   - Keep evidence-pack wording careful so academic alignment is not overstated as formal credit.

5. Production hardening
   - Add a backend only if multi-user sync, real auth, team competitions, or admin reporting become required.
   - Add SSO/MFA/RBAC only if the app moves beyond a personal PD tool.
   - Keep privacy guardrails: no live student, staff, credential, incident, or network-sensitive details in app content or local notes.

## Verification checklist

- [x] `npm test -- --run`
- [x] `npm run lint`
- [x] `npm run build`
