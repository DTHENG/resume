import { resolve } from 'path';
import { Storage } from '@google-cloud/storage';
import { existsSync } from 'fs';

export const uploadFile = async (
  path: string,
  bucket: string,
): Promise<void> => {
  if (!existsSync(resolve('../../key.json'))) {
    console.log('GCS auth key not found. Skipping upload.');
    return;
  }
  const storage = new Storage({
    keyFilename: resolve('../../key.json'),
    projectId: 'smooth-verve-252121',
  });
  await storage.bucket(bucket).upload(path);
};
