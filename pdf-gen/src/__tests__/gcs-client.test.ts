import { uploadFile } from '../gcs-client';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

const mockedBucket = {
  upload: jest.fn(),
};

const mockedStorage = {
  bucket: jest.fn(() => mockedBucket),
};

jest.mock('@google-cloud/storage', () => {
  return {
    Storage: jest.fn(() => mockedStorage),
  };
});

describe('gcs-client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload file', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(path, 'resolve').mockReturnValue('');
    const bucketSpy = jest.spyOn(mockedStorage, 'bucket');
    const uploadSpy = jest.spyOn(mockedBucket, 'upload');
    await uploadFile('/fake/document/path.pdf', 'fake-bucket');
    expect(bucketSpy).toHaveBeenCalledTimes(1);
    expect(bucketSpy).toHaveBeenCalledWith('fake-bucket');
    expect(uploadSpy).toHaveBeenCalledTimes(1);
    expect(uploadSpy).toHaveBeenCalledWith('/fake/document/path.pdf');
  });

  it('should not upload file, no auth key', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(path, 'resolve').mockReturnValue('');
    const bucketSpy = jest.spyOn(mockedStorage, 'bucket');
    const uploadSpy = jest.spyOn(mockedBucket, 'upload');
    await uploadFile('/fake/document/path.pdf', 'fake-bucket');
    expect(bucketSpy).toHaveBeenCalledTimes(0);
    expect(uploadSpy).toHaveBeenCalledTimes(0);
  });
});
