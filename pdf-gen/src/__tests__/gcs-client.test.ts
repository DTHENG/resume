import { uploadFile } from '../gcs-client';

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
  it('should upload file', async () => {
    const bucketSpy = jest.spyOn(mockedStorage, 'bucket');
    const uploadSpy = jest.spyOn(mockedBucket, 'upload');
    await uploadFile('/fake/document/path.pdf', 'fake-bucket');

    expect(bucketSpy).toHaveBeenCalledTimes(1);
    expect(bucketSpy).toHaveBeenCalledWith('fake-bucket');
    expect(uploadSpy).toHaveBeenCalledTimes(1);
    expect(uploadSpy).toHaveBeenCalledWith('/fake/document/path.pdf');
  });
});
