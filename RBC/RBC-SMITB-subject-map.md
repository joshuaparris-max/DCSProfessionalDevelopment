# RBC + SMITB Subject Map

Source: `DCSPrep_SLG_SILO_Reference.md`

Purpose: translate La Trobe RBC and SMITB subject material into practical DCSPrep modules, scenarios, assessments, and evidence outputs. This is not a claim of formal credit or substitution for university study; it is an academic-alignment map for professional development content.

## Governance notes

- Use `DCSPrep_SLG_SILO_Reference.md` as the first-pass source of truth.
- Keep subject code, title, course, SILO coverage, and source currency visible wherever the app makes an academic-alignment claim.
- Treat older SLGs as directional:
  - CSE1IS and CSE3PE are from 2018.
  - CSE1OOF is from 2020.
- Confirm current Bendigo delivery for SMITB subjects before using "Bendigo taught" language.
- Missing SLGs to chase later:
  - RBC Year 2 and Year 3 subjects: CSE2NPD, CSE2DBF, CSE3PAT, CSE3NET, CSE3SAD, CSE3IDP.
  - CSE4IP, the postgrad entry programming prerequisite.

## Priority groups

| Priority | DCSPrep content area | Subjects | Implementation shape |
|---|---|---|---|
| 1 | Cybersecurity awareness | CSE1ICB | Dedicated module, scenario, quiz, flashcards |
| 1 | Hardware/network/web foundations | CSE1IIT | Add metadata to existing A+/network modules and create DCS-focused bridge content |
| 1 | Scripting and code-reading literacy | CSE1PE, CSE1OOF | Dedicated practical module for reading automation safely |
| 1 | Professional responsibility | CSE3PE | Dedicated module, reflective practical output, evidence-pack wording |
| 2 | Cloud and AI awareness | CSE4002, CSE5006 | Dedicated SMITB context module |
| 2 | Information systems and SDLC | CSE1IS | Module section or scenario about systems change and requirements |
| 2 | Data literacy | STA1DCT | Module section or scenario about logs, dashboards, metrics |
| 3 | Big data and advanced AI context | CSE5BDC, CSE5DL, CSE5ML, CSE5NLP, CSE5CV | Stretch/background modules or advanced sections |

## Subject mappings

### CSE1IIT - Inside Information Technology

- Course: RBC.
- Source currency: 2023 SLG in current reference.
- DCSPrep domains: Endpoint Support, Networking, Foundations.
- Suggested level: DCS Context / L1.
- Primary app targets:
  - Existing `aplus-core1-hardware-fundamentals`.
  - Existing `aplus-core1-networking-basics`.
  - Existing `dns-dhcp-gateway-ip-basics`.
  - Existing `ports-and-protocols`.
- SILO translation:
  - Explain how devices process and deliver information.
  - Explain hardware, networks, internet, and web basics.
  - Apply web/HTML concepts at awareness level.
  - Use IT concepts to solve practical problems.
- Scenario ideas:
  - A classroom device connects but cannot reach web services.
  - A staff member confuses a web app fault with a local device fault.
- Practical output:
  - Endpoint/network symptom classification checklist.

### CSE1ICB - Introduction to Cybersecurity

- Course: RBC.
- Source currency: 2023 SLG in current reference.
- DCSPrep domains: Identity and Access, Operations, Cybersecurity.
- Suggested level: DCS Context / L1.
- Primary app targets:
  - New module: `rbc-cybersecurity-school-it`.
  - Existing `ticket-notes-escalation-quality`.
  - Existing `m365-identity-offboarding-basics`.
- SILO translation:
  - Recognise cybersecurity practices, regulations, and standards.
  - Safeguard data, systems, and networks at first-line level.
  - Compare risk-management responses.
  - Recognise forensics, application security, network security, data security, web security, and cryptography as specialist areas.
- Scenario ideas:
  - Suspicious email or credential prompt reported by a staff member.
  - Shared device may have exposed sensitive information.
- Practical output:
  - Privacy-safe cyber incident note template.

### CSE1PE - Programming Environment

- Course: RBC.
- Source currency: 2025/2024/2023 SLGs in current reference.
- DCSPrep domains: Operations, Programming and Automation.
- Suggested level: DCS Context / L1.
- Primary app targets:
  - New module: `rbc-scripting-code-reading`.
- SILO translation:
  - Identify input data, processing, and output.
  - Understand sequence, selection, and iteration.
  - Recognise simple data structures such as lists and dictionaries.
  - Read simple Python-like logic without needing to become a developer.
- Scenario ideas:
  - A scheduled script appears to have skipped a group of devices.
  - A PowerShell snippet is proposed and Josh must read it before running or escalating.
- Practical output:
  - "Read before running" automation safety checklist.

### STA1DCT - Data-Based Critical Thinking

- Course: RBC.
- Source currency: 2023 SLG in current reference.
- DCSPrep domains: Operations, Data and AI.
- Suggested level: DCS Context.
- Primary app targets:
  - Existing `ticket-notes-escalation-quality`.
  - Future module or section: log/dashboard interpretation.
- SILO translation:
  - Critique data-based claims.
  - Interpret simple numeric and graphical summaries.
  - Use probability and uncertainty carefully.
  - Recognise common probability misconceptions.
- Scenario ideas:
  - Dashboard shows a spike in failures; decide whether it is a real incident or noisy data.
  - Vendor uptime or AI accuracy claim needs careful interpretation.
- Practical output:
  - Evidence summary with metric, source, timeframe, and uncertainty.

### CSE1OOF - Object-Oriented Programming Fundamentals

- Course: RBC.
- Source currency: 2020 SLG; mark as directional.
- DCSPrep domains: Programming and Automation, Operations.
- Suggested level: DCS Context / L1.
- Primary app targets:
  - New module: `rbc-scripting-code-reading`.
- SILO translation:
  - Use an OS/development environment at awareness level.
  - Analyse a problem and construct logical solution steps.
  - Recognise objects/classes as software structure concepts.
  - Understand test plans and debugging.
- Scenario ideas:
  - A developer ticket asks for reproduction steps and Josh needs to supply clean evidence.
  - A script or app error needs a safe test plan before escalation.
- Practical output:
  - Reproduction and test-note template.

### CSE1IS - Information Systems

- Course: RBC.
- Source currency: 2018 SLG; mark as directional.
- DCSPrep domains: Operations, Cloud and Platforms, Professional Practice.
- Suggested level: DCS Context.
- Primary app targets:
  - Future module or section: systems lifecycle and school software changes.
- SILO translation:
  - Describe information system components.
  - Understand SDLC.
  - Gather requirements for a simple business scenario.
  - Understand DFD/ERD/UI/security requirements at awareness level.
  - Justify implementation and security requirements.
- Scenario ideas:
  - A new school SaaS tool is requested; gather safe requirements and risks.
  - A system change needs basic stakeholder and security notes.
- Practical output:
  - School software change intake checklist.

### CSE4002 - Artificial Intelligence Fundamentals

- Course: SMITB.
- Source currency: 2025/2024 SLGs in current reference.
- DCSPrep domains: Data and AI, Cloud and Platforms.
- Suggested level: SMITB / Stretch.
- Primary app targets:
  - New module: `smitb-cloud-ai-school-it`.
- SILO translation:
  - Understand search, knowledge representation, automated reasoning, expert systems, and machine learning at awareness level.
  - Connect Azure AI platform concepts to school IT context.
  - Recognise responsible AI concerns for school data.
- Scenario ideas:
  - A staff member wants to paste student information into an AI tool.
  - An AI troubleshooting suggestion looks plausible but risky.
- Practical output:
  - AI use risk note and escalation checklist.

### CSE5006 - Cloud-Based Web Application

- Course: SMITB.
- Source currency: 2024 SLG in current reference.
- DCSPrep domains: Cloud and Platforms, Operations.
- Suggested level: SMITB / Stretch.
- Primary app targets:
  - New module: `smitb-cloud-ai-school-it`.
  - Existing `cloud-models-saas-paas-iaas-daas`.
  - Existing `aplus-core1-virtualization-cloud`.
- SILO translation:
  - Understand web app structure, stateless servers, backend requirements, deployment tools, and storage choices.
  - Recognise Git, Docker, API, AWS, and CI/CD vocabulary.
- Scenario ideas:
  - A school web service is down after a deployment.
  - A SaaS vendor describes API/storage/deployment issues and Josh needs to translate the risk.
- Practical output:
  - Cloud service dependency map.

### CSE5BDC - Big Data Management on the Cloud

- Course: SMITB.
- Source currency: current reference, exact year not separately confirmed.
- DCSPrep domains: Data and AI, Cloud and Platforms.
- Suggested level: SMITB / Stretch/background.
- Primary app targets:
  - Future advanced context section under cloud/data.
- SILO translation:
  - Understand cloud solution design and AWS service concepts.
  - Recognise big-data, Hadoop, Spark, MapReduce, NoSQL, and scale trade-offs as background.
- Scenario ideas:
  - A vendor explains slow reports as data-pipeline delay.
  - A school analytics dashboard behaves differently from a live transaction system.
- Practical output:
  - "Live system vs reporting pipeline" explanation note.

### CSE5DL - Deep Learning

- Course: SMITB.
- Source currency: 2024 SLG in current reference.
- DCSPrep domains: Data and AI, Cloud and Platforms.
- Suggested level: SMITB / Stretch/background.
- Primary app targets:
  - Future advanced AI context section.
- SILO translation:
  - Understand the distinction between traditional ML and deep learning.
  - Recognise cloud deployment/maintenance issues for AI systems.
- Scenario ideas:
  - An AI feature degrades after a model update.
  - A vendor makes a broad AI claim and Josh needs to ask better questions.
- Practical output:
  - AI vendor-claim review checklist.

### CSE5ML - Machine Learning

- Course: SMITB.
- Source currency: 2024 SLG in current reference.
- DCSPrep domains: Data and AI.
- Suggested level: SMITB / Stretch/background.
- Primary app targets:
  - Future advanced AI context section.
- SILO translation:
  - Understand ML concepts and applications.
  - Recognise model components, evaluation, regression, classification, and forecasting at awareness level.
- Scenario ideas:
  - A product says its prediction is "accurate"; Josh checks what was measured and how.
- Practical output:
  - ML limitation explanation in plain English.

### CSE5NLP - Natural Language Processing

- Course: SMITB.
- Source currency: 2024 SLG in current reference.
- DCSPrep domains: Data and AI.
- Suggested level: SMITB / Stretch/background.
- Primary app targets:
  - New module: `smitb-cloud-ai-school-it` as first-pass coverage.
  - Future advanced AI context section.
- SILO translation:
  - Understand tokenisation, classification, retrieval, recommendation, and result evaluation at awareness level.
  - Connect NLP to Copilot, chatbots, AI search, and school support questions.
- Scenario ideas:
  - AI search returns a confident but wrong school-policy answer.
  - A chatbot exposes or invents information.
- Practical output:
  - AI answer verification checklist.

### CSE5CV - Computer Vision

- Course: SMITB.
- Source currency: 2023 SLG in current reference.
- DCSPrep domains: Data and AI, Endpoint Support, Cloud and Platforms.
- Suggested level: SMITB / Stretch/background.
- Primary app targets:
  - Future advanced AI context section.
- SILO translation:
  - Understand computer vision use cases and design issues at awareness level.
  - Connect Azure vision, Windows Hello, document scanning, camera-based accessibility, and school surveillance contexts.
- Scenario ideas:
  - Windows Hello/camera-based feature stops working.
  - Staff ask whether an image tool is safe for student data.
- Practical output:
  - Computer-vision feature risk and troubleshooting note.

### CSE3PE - Professional Environment

- Course: RBC/SMITB professional practice.
- Source currency: 2018 SLG; mark as directional but high relevance.
- DCSPrep domains: Professional Practice, Operations, Identity and Access.
- Suggested level: DCS Context.
- Primary app targets:
  - New module: `rbc-professional-responsibility-school-it`.
  - Evidence pack and PD log reflection prompts.
- SILO translation:
  - Apply ethical theory to IT dilemmas.
  - Build a personal ethical framework.
  - Analyse social, legal, and ethical issues.
  - Apply critical thinking.
  - Recognise responsibility to employers, clients, and society.
  - Reflect in professional practice.
- Scenario ideas:
  - Sensitive student data appears during a support session.
  - A staff member pressures Josh to bypass process for convenience.
- Practical output:
  - Professional reflection note with risk, duty, boundary, action, and evidence.

## First-pass module set

| Module ID | Title | Main source subjects | Status |
|---|---|---|---|
| `rbc-cybersecurity-school-it` | RBC Cybersecurity for School IT | CSE1ICB | Planned |
| `rbc-scripting-code-reading` | RBC Scripting and Code-Reading Literacy | CSE1PE, CSE1OOF | Planned |
| `rbc-professional-responsibility-school-it` | RBC Professional Responsibility in School IT | CSE3PE | Planned |
| `smitb-cloud-ai-school-it` | SMITB Cloud and AI Awareness for School IT | CSE4002, CSE5006, CSE5NLP | Planned |

## Coverage gaps after first pass

- CSE1IIT is partly covered by existing hardware/network modules; add explicit source metadata and a bridge section later if needed.
- STA1DCT needs a dedicated log/dashboard/data-interpretation scenario.
- CSE1IS needs a school software change/SDLC module or scenario.
- CSE5BDC, CSE5DL, CSE5ML, and CSE5CV should start as stretch/background sections before becoming full modules.
