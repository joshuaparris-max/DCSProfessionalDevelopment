# RBC + SMITB Integration Change Log

## 2026-05-07

- Created `RBC/RBC-SMITB-subject-map.md` as the source-to-app mapping document.
- Added optional academic source metadata to `TrainingModule` via `sourceSubjects`.
- Added new module domains and levels for RBC/SMITB-aligned content.
- Added weak-topic keys and labels for RBC/SMITB assessment tracking.
- Added/expanded RBC priority modules in `src/data/modules.ts`:
  - RBC cybersecurity awareness.
  - RBC hardware, network, and web basics.
  - RBC programming/script literacy.
  - RBC professional practice and ethical reflection.
- Added first-pass source-aligned modules with detailed SILO metadata:
  - `rbc-cybersecurity-school-it`.
  - `rbc-scripting-code-reading`.
  - `rbc-professional-responsibility-school-it`.
  - `smitb-cloud-ai-school-it`.
- Added SMITB cloud/AI scenario coverage in `src/data/scenarios.ts`.
- Added an `/rbc` app route for academic-aligned modules.
- Added `RBC + SMITB` to app navigation.
- Added linked subject outcomes to module detail pages.
- Validation:
  - `npm test -- --run` passed.
  - `npm run build` passed on the second run after a transient Next page-data collection failure.

## 2026-05-07 Assessment Summary Pass

- Extracted "Assessment and Feedback Summary" content from local SLG PDFs with `pypdf`.
- Added `src/data/academicAssessmentSummaries.ts` with structured assessment tasks for:
  - CSE1IIT, CSE1ICB, CSE1PE, STA1DCT, CSE1OOF, CSE1IS, CSE3PE.
  - CSE4002, CSE5006, CSE5BDC, CSE5DL, CSE5ML, CSE5NLP, CSE5CV.
- Added SLG assessment-summary types to `src/types/academic.ts`.
- Attached assessment summaries to existing Academic PD subject records.
- Rendered official SLG assessment plans on Academic PD subject pages.
- Added a full assessment-summary map to `/academic-pd` for subjects that do not yet have full subject pages.
- Validation:
  - `npm test -- --run` passed.
  - `npm run build` passed on retry after the existing transient `/api/ai/feedback` page-data issue.
