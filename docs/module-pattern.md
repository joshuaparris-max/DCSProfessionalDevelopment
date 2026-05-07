# Standard DCSPrep module pattern

Each training module should ship with this skeleton so retrieval-first learning stays consistent:

1. **Diagnostic entry** — mixed question types before passive reading (already enforced in the module UI flow).
2. **Micro readings** — short sections with Markdown bodies plus optional takeaways.
3. **Flashcards** — minimum ten cards emphasising workflow judgement, not trivia lists.
4. **Quiz bank** — at least eight scored items spanning MCQ, short answer, ordered steps, scenario response, and explain-it-simply prompts.
5. **Scenario prompt** — one embedded narrative hook tying the topic to classroom pressure.
6. **Practical output** — template/checklist the learner can draft locally without putting confidential detail into the repo.

Author new workflow modules in `src/data/dcsWorkflowModules.ts` (or adjacent data files) and merge them into `modules` so strict quiz sampling and progress migrations stay aligned.
