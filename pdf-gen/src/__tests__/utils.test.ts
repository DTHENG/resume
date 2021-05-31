import { getTextAsRows, ResumeComponentType, toEntries } from '../utils';
import { mockDocument } from './pdf-builder.test';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');
jest.mock('path');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockFont: any = {
  widthOfTextAtSize: (text: string) => text.length,
};

describe('utils', () => {
  describe('toEntries', () => {
    it('should return no entries', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries([], 100, mockDocument);
      expect(result).toEqual({ text: [], rectangles: [] });
    });

    it('should return no non-web entries', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.LINK,
            webOnly: true,
          },
        ],
        100,
        mockDocument,
      );
      expect(result).toEqual({ text: [], rectangles: [] });
    });

    it('should return title entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.TITLE,
            text: 'Title',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Title');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(9);
      expect(result.text[0].options.x).toEqual(80);
      expect(result.text[0].options.y).toEqual(40);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-SemiBold.ttf',
      );
    });

    it('should return heading entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.HEADING,
            text: 'Heading',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Heading');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(9);
      expect(result.text[0].options.x).toEqual(80);
      expect(result.text[0].options.y).toEqual(45);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-SemiBold.ttf',
      );
    });

    it('should return blockquote entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.BLOCK_QUOTE,
            text: 'Blockquote',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.text[0].text).toBe('Blockquote');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(7.5);
      expect(result.text[0].options.x).toEqual(88);
      expect(result.text[0].options.y).toEqual(50);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Italic.ttf',
      );
      expect(result.rectangles).toHaveLength(1);
      expect(result.rectangles[0].height).toEqual(17.5);
      expect(result.rectangles[0].width).toEqual(1.4);
      expect(result.rectangles[0].x).toEqual(80);
      expect(result.rectangles[0].y).toEqual(44);
    });

    it('should return paragraph entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.PARAGRAPH,
            text: 'Paragraph',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Paragraph');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(9);
      expect(result.text[0].options.x).toEqual(80);
      expect(result.text[0].options.y).toEqual(60);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });

    it('should return space entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.SPACE,
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(9);
      expect(result.text[0].options.x).toEqual(80);
      expect(result.text[0].options.y).toEqual(60);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });

    it('should return dates entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.DATES,
            text: 'Dates',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Dates');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(7);
      expect(result.text[0].options.x).toEqual(80);
      expect(result.text[0].options.y).toEqual(60);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });

    it('should return link entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.LINK,
            text: 'Link',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Link');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(8);
      expect(result.text[0].options.x).toEqual(80);
      expect(result.text[0].options.y).toEqual(60);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });
  });

  describe('getTextAsRows', () => {
    it('should return single row', () => {
      expect(getTextAsRows('text', mockFont, 10, 100)).toEqual(['text']);
    });

    it('should return empty string', () => {
      expect(getTextAsRows(null, mockFont, 10, 100)).toEqual(['']);
    });

    it('should return multiple rows, small amount of text', () => {
      expect(
        getTextAsRows(
          'The quick brown fox jumps over the lazy dog',
          mockFont,
          10,
          10,
        ),
      ).toEqual(['The quick', 'brown fox', 'jumps over', 'the lazy', 'dog']);
    });
    it('should return multiple rows, large amount of text', () => {
      expect(
        getTextAsRows(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          mockFont,
          10,
          40,
        ),
      ).toEqual([
        'Lorem ipsum dolor sit amet, consectetur',
        'adipiscing elit, sed do eiusmod tempor',
        'incididunt ut labore et dolore magna',
        'aliqua. Ut enim ad minim veniam, quis',
        'nostrud exercitation ullamco laboris',
        'nisi ut aliquip ex ea commodo consequat.',
        'Duis aute irure dolor in reprehenderit',
        'in voluptate velit esse cillum dolore eu',
        'fugiat nulla pariatur. Excepteur sint',
        'occaecat cupidatat non proident, sunt in',
        'culpa qui officia deserunt mollit anim',
        'id est laborum.',
      ]);
    });
  });
});
