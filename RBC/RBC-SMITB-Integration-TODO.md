# RBC + SMITB Integration TODO

This file lists the work needed to integrate the RBC and SMITB content from `DCSPrep_SLG_SILO_Reference.md` into the DCSPrep app.

## 1. Source review and content governance

- [x] Review `DCSPrep_SLG_SILO_Reference.md` and confirm the subject list to integrate.
- [x] Treat this reference as the source of truth for the first implementation pass.
- [x] Preserve the source subject codes, names, course labels, SILOs, weekly topics, and DCSPrep mapping notes in structured metadata.
- [x] Add a short "source notes" field for each subject that records SLG year/currency risks.
- [x] Flag older or uncertain SLGs before turning them into strong claims:
  - CSE1IS and CSE3PE are from 2018 and should be marked directional.
  - CSE1OOF is from 2020 and may need checking against newer delivery.
  - Confirm which SMITB subjects are actively taught at Bendigo vs Bundoora/online.
- [x] Create a missing-source register for subjects mentioned but not captured:
  - RBC Year 2 and Year 3 subjects, such as CSE2NPD, CSE2DBF, CSE3PAT, CSE3NET, CSE3SAD, CSE3IDP.
  - CSE4IP, which appears as a prerequisite but has no included SLG.
- [x] Decide whether RBC/SMITB content is displayed as formal university alignment, informal PD context, or both.

## 2. Subject-to-app mapping

- [x] Create a structured mapping document or data file in `RBC/`, such as `RBC-SMITB-subject-map.md` or `RBC-SMITB-subject-map.json`.
- [x] Map each subject to DCSPrep domains, levels, modules, scenarios, assessments, and practical outputs.
- [x] Include all RBC subjects from the reference:
  - CSE1IIT -> hardware fundamentals, networking, web basics, troubleshooting framing.
  - CSE1ICB -> cybersecurity awareness, data security, device/account hygiene, incident response.
  - CSE1PE -> programming environment, scripting literacy, automation logic, Python concepts.
  - STA1DCT -> data literacy, dashboard/log interpretation, probability and decision making.
  - CSE1OOF -> debugging mindset, code reasoning, testing, development environment awareness.
  - CSE1IS -> information systems, SDLC, requirements, UI critique, security requirements.
- [x] Include all SMITB/postgraduate subjects from the reference:
  - CSE4002 -> AI fundamentals, responsible AI, expert systems, Azure AI awareness.
  - CSE5006 -> cloud web architecture, Git, Docker, React/API concepts, CI/CD, AWS storage.
  - CSE5BDC -> big data cloud concepts, AWS services, Hadoop/Spark/NoSQL awareness.
  - CSE5DL -> deep learning concepts, cloud deployment and maintenance of AI systems.
  - CSE5ML -> machine learning concepts, model evaluation, data regression/classification.
  - CSE5NLP -> NLP, Copilot/chatbot/search behaviour, AI answer evaluation.
  - CSE5CV -> computer vision, Azure vision tools, Windows Hello/camera/accessibility contexts.
  - CSE3PE -> professional ethics, legal responsibility, privacy, social impact, reflection.
- [x] Build a cross-subject coverage matrix from the reference table and mark each DCSPrep module as:
  - Existing coverage.
  - Needs new module.
  - Needs scenario only.
  - Needs quiz/practical output only.
  - Stretch/background context.

## 3. App architecture decisions

- [x] Decide whether RBC/SMITB appears as:
  - a dedicated route, such as `app/rbc/page.tsx`;
  - a filtered shelf on `app/modules/page.tsx`;
  - metadata badges inside existing module detail pages;
  - or a combination of these.
- [x] Audit current integration points:
  - `src/data/modules.ts`
  - `src/data/scenarios.ts`
  - `src/data/questions.ts`
  - `src/data/skillDomains.ts`
  - `src/types/training.ts`
  - `src/types/scenarios.ts`
  - `src/types/assessment.ts`
  - `src/components/modules/ModuleCard.tsx`
  - `src/components/modules/ModuleDetail.tsx`
  - `src/components/modules/ModuleTabs.tsx`
  - `src/components/modules/SectionReader.tsx`
  - `src/components/shell/navigation.ts`
  - `app/modules/page.tsx`
  - `app/modules/[moduleId]/page.tsx`
  - `app/scenarios/page.tsx`
  - `app/progress/page.tsx`
  - `app/evidence-pack/page.tsx`
- [x] Decide whether to extend existing `TrainingModule` types with optional academic metadata:
  - `sourceSubjects`
  - `sourceCourse`
  - `sourceSilos`
  - `sourceWeeklyTopics`
  - `alignmentNotes`
  - `slgCurrency`
- [x] Decide whether new module domains are required beyond the current domain union:
  - Current domains are `Foundations`, `Networking`, `Endpoint Support`, `Identity and Access`, `Cloud and Platforms`, `Operations`.
  - Possible additions: `Cybersecurity`, `Programming and Automation`, `Data and AI`, `Professional Practice`.
- [x] Decide whether new module levels are required beyond `A+`, `L1`, `L2`, `IT Manager`, and `DCS Context`.
  - Possible additions: `RBC`, `SMITB`, `Academic Alignment`, or `Stretch`.

## 4. Data and module creation

- [x] Add RBC/SMITB source metadata to the app data layer.
- [x] Add or update modules in `src/data/modules.ts` for the highest-value subjects first:
  - Cybersecurity awareness from CSE1ICB.
  - Hardware/networking/web fundamentals from CSE1IIT.
  - Scripting and code-reading literacy from CSE1PE and CSE1OOF.
  - Professional responsibility and reflective practice from CSE3PE.
  - Cloud and AI awareness from CSE4002 and CSE5006.
- [ ] Add second-wave modules or module sections for:
  - Data literacy from STA1DCT.
  - Information systems and SDLC from CSE1IS.
  - Big-data/cloud context from CSE5BDC.
  - ML/deep learning/NLP/computer vision context from CSE5ML, CSE5DL, CSE5NLP, and CSE5CV.
- [x] Keep each learning module DCS-practical, not university-lecture shaped.
- [x] Convert SILOs into plain-English learning objectives.
- [x] Convert weekly topics into concise section summaries where they support DCS work.
- [x] Add DCS relevance bullets for every new or amended module.
- [x] Add flashcards for every new module.
- [x] Add practical outputs where the app already expects them, such as:
  - escalation-note templates;
  - troubleshooting checklists;
  - privacy-safe evidence notes;
  - AI/vendor-claim evaluation notes;
  - cloud-service dependency maps.
- [ ] Avoid duplicating existing A+ modules unless the RBC/SMITB alignment adds a clear new angle.

## 5. Scenario content

- [x] Add scenario-based learning in `src/data/scenarios.ts` for RBC/SMITB topics.
- [x] Create first-pass scenarios for:
  - phishing or suspicious email triage linked to CSE1ICB.
  - classroom device/network troubleshooting linked to CSE1IIT.
  - "read this simple script or automation logic" linked to CSE1PE/CSE1OOF.
  - SaaS/cloud service outage or dependency mapping linked to CSE5006/CSE5BDC.
  - AI tool gives a wrong or risky answer linked to CSE4002/CSE5NLP/CSE5ML.
  - privacy or ethical dilemma linked to CSE3PE.
- [ ] Create first-pass scenarios for:
  - camera/Windows Hello/accessibility feature issue linked to CSE5CV.
  - dashboard/log interpretation linked to STA1DCT.

_Added complementary DCS workflow scenarios in `src/data/scenarios.ts` (HDMI audio, APIPA, Follow-Me queues, toner faults, guest-print segmentation, Parent Portal/Sentral/login/onboarding) alongside the RBC/SMITB Lab scenarios._
- [x] Ensure every scenario includes:
  - initial report;
  - context bullets;
  - safe/unsafe choices;
  - ideal troubleshooting path;
  - escalation point;
  - risk note;
  - ticket note example.

## 6. Assessment and practice

- [x] Add quiz questions or practice items aligned to each priority subject/SILO.
- [x] Use existing assessment styles where possible:
  - MCQ.
  - short answer.
  - ordered steps.
  - scenario response.
  - explain-it-simply.
- [x] Add explicit subject-level assessments for every academic subject, including:
  - multiple-choice questions for quick correctness checks.
  - written/long-form prompts with model answers and rubric guidance.
  - live LLM feedback on text responses where the app can judge correctness and suggest improvements.
- [ ] Add questions for:
  - cybersecurity regulations/standards and practical safeguards.
  - network and endpoint fundamentals.
  - script sequence/selection/iteration reasoning.
  - SDLC and system security requirements.
  - cloud service models, deployment, and CI/CD vocabulary.
  - AI/ML/NLP/CV limitations and school-data risks.
  - data interpretation and dashboard/log reasoning.
  - professional ethics, privacy, copyright, and reflection.
- [x] Add weak-topic IDs consistently so readiness/progress features can group RBC/SMITB gaps.
- [x] Check that new questions include model answers, explanations, common mistakes, DCS context, and review schedules.
- [x] Connect subject assessment questions to `app/academic-pd/subjects/[subjectCode]/page.tsx` so each subject has its own assessment experience.

## 7. UI and navigation

- [x] Add a RBC/SMITB landing page or module shelf if the integration is substantial enough to warrant its own view.
- [x] If adding a route, update `src/components/shell/navigation.ts`.
- [x] Surface source subject codes and SILO links in module previews without making the UI feel like a university handbook.
- [x] Add compact labels or badges for:
  - RBC.
  - SMITB.
  - subject code.
  - core/stretch/background.
- [x] Update module detail views so users can see:
  - "What you'll learn".
  - "Why it matters for school IT".
  - "Linked subject outcomes".
  - "Practice tasks".
- [x] Ensure RBC/SMITB content contributes to progress tracking and due-today review if it uses existing module/quiz structures.
- [x] Keep card layout, spacing, and navigation consistent with the current app.

## 8. Evidence pack and PD log integration

- [ ] Decide how RBC/SMITB learning should appear in `app/pd-log/page.tsx`.
- [ ] Decide how completed RBC/SMITB modules should appear in `app/evidence-pack/page.tsx`.
- [ ] Add evidence-pack wording for academic-alignment claims without overstating formal credit or certification.
- [ ] Include reflective prompts for CSE3PE-aligned professional practice.
- [ ] Ensure privacy-safe language for school data, student information, screenshots, ticket notes, and AI-tool examples.

## 8A. Academic PD weekly subject boxes

- [x] Extend academic subject types with weekly topic modules, resources, and integrated assessment prompts.
- [x] Add explicit CSE1PE Week 1-12 topic boxes based on the SLG weekly schedule.
- [x] Add CSE1PE assessment sections for weekly checks, lab/coding evidence, and assignment readiness.
- [x] Add DCSPrep internal links and official external learning resources inside CSE1PE topic boxes.
- [x] Render weekly topic boxes on `/academic-pd/subjects/[subjectCode]`.
- [x] Add fallback topic boxes for subjects that do not yet have exact weekly SLG rows.
- [x] Add the 24-week Academic PD implementation roadmap to `/academic-pd`.
- [x] Add Academic PD to app navigation.
- [ ] Add exact weekly SLG topic rows for CSE1IIT once the full week-by-week rows are available.
- [ ] Add exact weekly SLG topic rows for CSE1ICB, STA1DCT, CSE1OOF, CSE1IS, and CSE3PE where the source has enough detail.
- [ ] Add exact weekly/topic boxes for SMITB subjects after confirming which subjects are actively taught at Bendigo.
- [ ] Add richer resource sets for each non-CSE1PE subject.

## 8B. SLG assessment and feedback summary integration

- [x] Extract assessment and feedback summary tables from available SLGs using local PDF text extraction.
- [x] Add structured SLG assessment-summary data for CSE1IIT, CSE1ICB, CSE1PE, STA1DCT, CSE1OOF, CSE1IS, CSE3PE, CSE4002, CSE5006, CSE5BDC, CSE5DL, CSE5ML, CSE5NLP, and CSE5CV.
- [x] Preserve source weights, due timing, assessment types, feedback methods, key criteria, and SILOs assessed where the SLG included them.
- [x] Translate each SLG assessment into a DCSPrep integration note, linked DCSPrep modules, and practical evidence output.
- [x] Attach SLG assessment summaries to existing Academic PD subject pages.
- [x] Render official SLG assessment plans on `/academic-pd/subjects/[subjectCode]`.
- [x] Render a full assessment-summary map on `/academic-pd`, including subjects that do not yet have full subject pages.
- [ ] Add full Academic PD subject pages for CSE1OOF and SMITB subjects so their extracted assessment summaries are not overview-only.
- [ ] Add per-assessment interactive practice questions for each extracted SLG assessment task.

## 9. Testing and validation

- [ ] Update existing tests or add new tests under `src/tests/`.
- [x] Run module data validation tests after adding modules.
- [ ] Add tests for any extended type/schema assumptions.
- [x] Validate that every new module has:
  - unique ID;
  - title;
  - domain;
  - level;
  - learning objectives;
  - DCS relevance;
  - sections;
  - flashcards;
  - quiz items;
  - scenario prompts/practical outputs as appropriate.
- [ ] Validate that every `recommendedModuleId` points to a real module.
- [ ] Validate that new scenario IDs and choice IDs are unique.
- [x] Run the normal app checks:
  - `npm test` or the repo's available test command.
  - `npm run lint` if configured.
  - `npm run build` before considering the integration complete.
- [ ] Manually inspect the new/updated UI in browser at desktop and mobile widths.

## 10. Documentation

- [x] Document the implemented integration in `RBC/`.
- [x] Add a change log noting which app files were changed.
- [x] Add a content-coverage matrix showing which SILOs are covered by modules, scenarios, quizzes, and practical outputs.
- [x] Add a "not yet covered" section for lower-priority or missing-source subjects.
- [ ] Update the main README or internal docs if a new RBC route, data file, or content workflow is introduced.

## 11. Suggested implementation stages

1. Create the structured subject-to-app mapping file in `RBC/`.
2. Extend types only if needed for source metadata.
3. Add the first priority module set:
   - CSE1ICB cybersecurity.
   - CSE1IIT hardware/network/web foundations.
   - CSE1PE/CSE1OOF scripting and code-reading.
   - CSE3PE professional responsibility.
4. Add matching quizzes, flashcards, practical outputs, and at least one scenario for each priority module.
5. Add UI surfacing for RBC/SMITB alignment.
6. Add SMITB cloud/AI content:
   - CSE4002.
   - CSE5006.
   - CSE5BDC.
   - CSE5ML/CSE5DL/CSE5NLP/CSE5CV as context modules or sections.
7. Wire progress/evidence-pack visibility.
8. Add or update tests.
9. Run build/lint/test checks.
10. Review against `DCSPrep_SLG_SILO_Reference.md` and mark any remaining coverage gaps.

## 12. First-pass deliverables

- [x] `RBC/RBC-SMITB-subject-map.md` or equivalent structured map.
- [x] Updated `src/data/modules.ts` with at least four RBC-aligned modules.
- [x] Updated `src/data/scenarios.ts` with at least four RBC/SMITB-aligned scenarios.
- [x] Updated quizzes/assessment content for priority modules.
- [x] Added academic PD types and subject catalogue in `src/types/academic.ts` and `src/data/academicSubjects.ts`.
- [x] Added academic PD pages under `app/academic-pd` and bridge view.
- [x] Added Academic PD navigation links in sidebar and topbar.
- [x] Tests passing after the data and UI changes.
- [x] Final coverage notes in `RBC/`.
