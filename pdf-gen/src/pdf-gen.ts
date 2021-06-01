import { existsSync, mkdirSync } from 'fs';
import { uploadFile } from './gcs-client';
import { buildResume } from './pdf-builder';

export const buildAndUpload = async (): Promise<void> => {
  if (!existsSync('tmp')) mkdirSync('tmp');
  await buildResume('tmp/DanielThengvallResume.pdf');
  await uploadFile('tmp/DanielThengvallResume.pdf', 'com-dtheng');
};
