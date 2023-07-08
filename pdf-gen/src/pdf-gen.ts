import { existsSync, mkdirSync } from 'fs';
import { buildResume } from './pdf-builder';

export const build = async (): Promise<void> => {
  if (!existsSync('tmp')) mkdirSync('tmp');
  await buildResume('tmp/DanielThengvallResume.pdf');
};
