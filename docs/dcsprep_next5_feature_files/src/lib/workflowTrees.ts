import { workflowTrees } from '../data/supportCoach';

export function getWorkflowTree(treeId: string) {
  return workflowTrees.find((tree) => tree.id === treeId) || workflowTrees[0];
}

export function getWorkflowStep(treeId: string, stepId: string) {
  const tree = getWorkflowTree(treeId);
  return tree.steps.find((step) => step.id === stepId) || tree.steps.find((step) => step.id === tree.startingStepId);
}
