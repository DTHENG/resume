import * as pdfBuilder from '../pdf-builder';
import * as gcsClient from '../gcs-client';
import { buildAndUpload } from '../pdf-gen';
import * as fs from 'fs';

jest.mock('fs');
jest.mock('../pdf-builder');
jest.mock('../gcs-client');

describe('pdf-gen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call build and upload methods', async () => {
    const buildResumeSpy = jest.spyOn(pdfBuilder, 'buildResume');
    const uploadFileSpy = jest.spyOn(gcsClient, 'uploadFile');
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync');
    await buildAndUpload();
    expect(existsSyncSpy).toHaveBeenCalledTimes(1);
    expect(existsSyncSpy).toHaveBeenCalledWith('tmp');
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
    expect(mkdirSyncSpy).toHaveBeenCalledWith('tmp');
    expect(buildResumeSpy).toHaveBeenCalledTimes(1);
    expect(buildResumeSpy).toHaveBeenCalledWith(
      'tmp/DanielThengvallResume.pdf',
    );
    expect(uploadFileSpy).toHaveBeenCalledTimes(1);
    expect(uploadFileSpy).toHaveBeenCalledWith(
      'tmp/DanielThengvallResume.pdf',
      'com-dtheng',
    );
  });

  it('should call build and upload methods, tmp dir exists', async () => {
    const buildResumeSpy = jest.spyOn(pdfBuilder, 'buildResume');
    const uploadFileSpy = jest.spyOn(gcsClient, 'uploadFile');
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const mkdirSyncSpy = jest.spyOn(fs, 'mkdirSync');
    await buildAndUpload();
    expect(existsSyncSpy).toHaveBeenCalledTimes(1);
    expect(existsSyncSpy).toHaveBeenCalledWith('tmp');
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(0);
    expect(buildResumeSpy).toHaveBeenCalledTimes(1);
    expect(buildResumeSpy).toHaveBeenCalledWith(
      'tmp/DanielThengvallResume.pdf',
    );
    expect(uploadFileSpy).toHaveBeenCalledTimes(1);
    expect(uploadFileSpy).toHaveBeenCalledWith(
      'tmp/DanielThengvallResume.pdf',
      'com-dtheng',
    );
  });
});
