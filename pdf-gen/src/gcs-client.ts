import { resolve } from 'path';
import { Storage } from '@google-cloud/storage';

export const uploadFile = async (
  path: string,
  bucket: string,
): Promise<void> => {
  const storage = new Storage({
    keyFilename: resolve('../../key.json'),
    projectId: 'smooth-verve-252121',
  });
  await storage.bucket(bucket).upload(path);
};
