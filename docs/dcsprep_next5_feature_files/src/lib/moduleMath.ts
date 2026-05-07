import type { ModuleData } from '../data/modules';
import type { UserProgress } from './progress';

export function getModuleCompletion(moduleId: string, progress: UserProgress, moduleData: ModuleData) {
  const moduleProgress = progress.modules[moduleId];
  if (!moduleProgress || moduleData.sections.length === 0) {
    return 0;
  }

  const completedCount = Object.values(moduleProgress.sectionsRead).filter(Boolean).length;
  return (completedCount / moduleData.sections.length) * 100;
}

export function getOverallProgress(modules: ModuleData[], progress: UserProgress) {
  if (modules.length === 0) {
    return 0;
  }

  const total = modules.reduce((sum, moduleData) => sum + getModuleCompletion(moduleData.id, progress, moduleData), 0);
  return total / modules.length;
}
