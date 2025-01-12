import { PDFDocument } from 'pdf-lib';
import { buildResume } from '../pdf-builder';
import * as fs from 'fs';
import * as path from 'path';
import { ResumeComponentType } from '../utils';

jest.mock('pdf-lib');
jest.mock('fs');
jest.mock('path');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockDocument: any = {
  setTitle: jest.fn(),
  setAuthor: jest.fn(),
  setSubject: jest.fn(),
  setCreator: jest.fn(),
  setCreationDate: jest.fn(),
  setModificationDate: jest.fn(),
  addPage: jest.fn(() => ({
    getSize: jest.fn(() => ({ height: 100 })),
    drawText: jest.fn(),
    drawRectangle: jest.fn(),
    drawCircle: jest.fn(),
  })),
  registerFontkit: jest.fn(),
  embedFont: jest.fn(() => ({
    widthOfTextAtSize: jest.fn(() => 100),
  })),
  save: jest.fn(() => Promise.resolve()),
};

describe('pdf-builder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should build pdf, no data', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
    readFileSyncSpy.mockReturnValueOnce(JSON.stringify([])); // ../copy/resume.json
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-Regular.ttf
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-SemiBold.ttf
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-Italic.ttf
    readFileSyncSpy.mockReturnValueOnce('Fake PDF Subject'); // ../copy/blurb.160.txt
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    jest.spyOn(path, 'resolve').mockReturnValue('');
    const createSpy = jest
      .spyOn(PDFDocument, 'create')
      .mockResolvedValue(mockDocument);
    const saveSpy = jest
      .spyOn(mockDocument, 'save')
      .mockResolvedValue('fakeByteArray');
    await buildResume('/fake/out/file.pdf');
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      '/fake/out/file.pdf',
      'fakeByteArray',
    );
  });

  it('should throw error, resume json missing', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(path, 'resolve').mockReturnValue('');
    jest.spyOn(PDFDocument, 'create').mockResolvedValue(mockDocument);
    expect(buildResume('/fake/out/file.pdf')).rejects.toThrowError(
      new Error('Unable to find resume json file!'),
    );
  });

  it('should build pdf, with data', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync');

    // ../copy/resume.json
    readFileSyncSpy.mockReturnValueOnce(
      JSON.stringify([
        {
          type: ResumeComponentType.TITLE,
          text: 'Title',
        },
        {
          type: ResumeComponentType.BLOCK_QUOTE,
          text: 'Blockquote',
        },
        {
          type: ResumeComponentType.BULLET,
          text: 'Blockquote',
        },
      ]),
    );
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-Regular.ttf
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-SemiBold.ttf
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-Italic.ttf
    readFileSyncSpy.mockReturnValueOnce('Fake PDF Subject'); // ../copy/blurb.160.txt
    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    jest.spyOn(path, 'resolve').mockReturnValue('');
    const createSpy = jest
      .spyOn(PDFDocument, 'create')
      .mockResolvedValue(mockDocument);
    const saveSpy = jest
      .spyOn(mockDocument, 'save')
      .mockResolvedValue('fakeByteArray');
    await buildResume('/fake/out/file.pdf');
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(1);
    expect(writeFileSyncSpy).toHaveBeenCalledWith(
      '/fake/out/file.pdf',
      'fakeByteArray',
    );
  });
});
