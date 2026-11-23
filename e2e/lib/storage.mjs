import { homedir } from 'node:os';
import { join, resolve } from 'node:path';

const DEFAULT_ROOT = join(homedir(), '.cache', 'angular-ui-kit', 'e2e');

/** Внешнее хранилище отчётов, артефактов и baseline: по умолчанию вне репозитория. */
export const STORAGE_ROOT = resolve(process.env.E2E_STORAGE_ROOT || DEFAULT_ROOT);
export const reportsDir = join(STORAGE_ROOT, 'reports');
export const artifactsDir = join(STORAGE_ROOT, 'artifacts');
export const baselinesDir = join(STORAGE_ROOT, 'baselines');
export const storybookBaselinesDir = join(baselinesDir, 'storybook');
