import { PDFDocument } from 'pdf-lib';
import { buildResume } from '../pdf-builder';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('pdf-lib');
jest.mock('fs');
jest.mock('path');

describe('pdf-builder', () => {
  it('should build pdf', async () => {
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFileSyncSpy = jest.spyOn(fs, 'readFileSync');
    readFileSyncSpy.mockReturnValueOnce('[]'); // ../copy/resume.json
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-Regular.ttf
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-SemiBold.ttf
    readFileSyncSpy.mockReturnValueOnce(''); // fonts/OpenSans-Italic.ttf
    readFileSyncSpy.mockReturnValueOnce('Fake PDF Subject'); // ../copy/blurb.160.txt

    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync');
    const resolveSpy = jest.spyOn(path, 'resolve').mockReturnValue('');
    const createSpy = jest.spyOn(PDFDocument, 'create').mockResolvedValue({
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
      })),
      registerFontkit: jest.fn(),
      embedFont: jest.fn(() => ({
        widthOfTextAtSize: jest.fn(() => 100),
      })),
      save: jest.fn(() => Promise.resolve()),
    } as any);
    await buildResume('/fake/out/file.pdf');
    expect(createSpy).toHaveBeenCalledTimes(1);
  });
});
