import {
  getBoldStartAndEndForRow,
  getTextAsRows,
  ResumeComponentType,
  toEntries,
} from '../utils';
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
      expect(result).toEqual({ text: [], rectangles: [], circles: [] });
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
      expect(result).toEqual({ text: [], rectangles: [], circles: [] });
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
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(61);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-SemiBold.ttf',
      );
    });

    it('should return sub title entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.SUB_TITLE,
            text: 'Sub Title',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Sub Title');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(61);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
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
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(57.75);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-SemiBold.ttf',
      );
    });

    it('should return header 2 entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.HEADING_2,
            position: 'Position',
            company: 'Company',
            dates: 'From - To',
            location: 'Location',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(5);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Position');
      expect(result.text[1].text).toBe(' | ');
      expect(result.text[2].text).toBe('Company');
      expect(result.text[3].text).toBe(' | ');
      expect(result.text[4].text).toBe('From - To, Location');
    });

    it('should return header 2 entry, no data', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.HEADING_2,
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(5);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('');
      expect(result.text[1].text).toBe(' | ');
      expect(result.text[2].text).toBe('');
      expect(result.text[3].text).toBe(' | ');
      expect(result.text[4].text).toBe('undefined, undefined');
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
      expect(result.text[0].options.size).toEqual(7.4750000000000005);
      expect(result.text[0].options.x).toEqual(88.4);
      expect(result.text[0].options.y).toEqual(55.8);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Italic.ttf',
      );
      expect(result.rectangles).toHaveLength(1);
      expect(result.rectangles[0].height).toEqual(15.924999999999997);
      expect(result.rectangles[0].width).toEqual(1.365);
      expect(result.rectangles[0].x).toEqual(81.25);
      expect(result.rectangles[0].y).toEqual(50.275);
    });

    it('should return divider entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.DIVIDER,
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.text[0].text).toBe('');
      expect(result.rectangles).toHaveLength(1);
      expect(result.rectangles[0].height).toEqual(0.52);
      expect(result.rectangles[0].width).toEqual(390);
    });

    it('should return bullet entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.BULLET,
            text: 'Bullet',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.text[0].text).toBe('Bullet');
      expect(result.circles).toHaveLength(1);
      expect(result.circles[0].size).toEqual(0.78);
      expect(result.circles[0].x).toEqual(85.8);
      expect(result.circles[0].y).toEqual(61);
    });

    it('should return sub bullet entry', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      jest.spyOn(fs, 'readFileSync').mockImplementation((file) => file as any);
      jest.spyOn(path, 'resolve').mockImplementation((file) => file);
      jest
        .spyOn(mockDocument, 'embedFont')
        .mockImplementation((file) => Promise.resolve({ ...mockFont, file }));
      const result = await toEntries(
        [
          {
            type: ResumeComponentType.SUB_BULLET,
            text: 'Sub Bullet',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.text[0].text).toBe('Sub Bullet');
      expect(result.circles).toHaveLength(1);
      expect(result.circles[0].size).toEqual(0.78);
      expect(result.circles[0].x).toEqual(95.55);
      expect(result.circles[0].y).toEqual(61);
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
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });

    it('should return paragraph entry, with small font', async () => {
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
            smallFont: true,
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(1);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('Paragraph');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(6.5);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });

    it('should return paragraph entry, with bold text, single row', async () => {
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
            text: 'The quick brown fox jumps over the lazy dog',
            bold: 'fox jumps',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(3);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe('The quick brown ');
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
      expect(result.text[1].text).toBe('fox jumps');
      expect(result.text[1].options).toBeDefined();
      expect(result.text[1].options.size).toEqual(8.775);
      expect(result.text[1].options.x).toEqual(97.25);
      expect(result.text[1].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[1].options.font as any).file).toBe(
        'fonts/OpenSans-SemiBold.ttf',
      );
      expect(result.text[2].text).toBe(' over the lazy dog');
      expect(result.text[2].options).toBeDefined();
      expect(result.text[2].options.size).toEqual(8.775);
      expect(result.text[2].options.x).toEqual(106.25);
      expect(result.text[2].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[2].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });

    it('should return paragraph entry, with bold text, multiple rows', async () => {
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
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            bold: 'Duis aute irure dolor in reprehenderit',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(4);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      );
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
      expect(result.text[1].text).toBe(
        'Duis aute irure dolor in reprehenderit',
      );
      expect(result.text[1].options).toBeDefined();
      expect(result.text[1].options.size).toEqual(8.775);
      expect(result.text[1].options.x).toEqual(313.25);
      expect(result.text[1].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[1].options.font as any).file).toBe(
        'fonts/OpenSans-SemiBold.ttf',
      );
      expect(result.text[2].text).toBe(
        ' in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
      );
      expect(result.text[2].options).toBeDefined();
      expect(result.text[2].options.size).toEqual(8.775);
      expect(result.text[2].options.x).toEqual(351.25);
      expect(result.text[2].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[2].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
      expect(result.text[3].text).toBe(
        'sunt in culpa qui officia deserunt mollit anim id est laborum.',
      );
      expect(result.text[3].options).toBeDefined();
      expect(result.text[3].options.size).toEqual(8.775);
      expect(result.text[3].options.x).toEqual(81.25);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[3].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
    });

    it('should return paragraph entry, with bold text + line break, multiple rows', async () => {
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
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            bold: 'sunt in culpa qui',
          },
        ],
        100,
        mockDocument,
      );
      expect(result.text).toHaveLength(3);
      expect(result.rectangles).toHaveLength(0);
      expect(result.text[0].text).toBe(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,',
      );
      expect(result.text[0].options).toBeDefined();
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(58.4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[0].options.font as any).file).toBe(
        'fonts/OpenSans-Regular.ttf',
      );
      expect(result.text[1].text).toBe('sunt in culpa qui');
      expect(result.text[1].options).toBeDefined();
      expect(result.text[1].options.size).toEqual(8.775);
      expect(result.text[1].options.x).toEqual(81.25);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[1].options.font as any).file).toBe(
        'fonts/OpenSans-SemiBold.ttf',
      );
      expect(result.text[2].text).toBe(
        ' officia deserunt mollit anim id est laborum.',
      );
      expect(result.text[2].options).toBeDefined();
      expect(result.text[2].options.size).toEqual(8.775);
      expect(result.text[2].options.x).toEqual(98.25);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result.text[2].options.font as any).file).toBe(
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
      expect(result.text[0].options.size).toEqual(0);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(61);
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
      expect(result.text[0].options.size).toEqual(7.15);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(61);
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
      expect(result.text[0].options.size).toEqual(8.775);
      expect(result.text[0].options.x).toEqual(81.25);
      expect(result.text[0].options.y).toEqual(61);
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

  describe('getBoldStartAndEndForRow', () => {
    it('should return null values, no bold', () => {
      expect(getBoldStartAndEndForRow('', null, 0, 1, 0, 1)).toEqual([
        null,
        null,
      ]);
    });

    it('should return null values, no full text start', () => {
      expect(getBoldStartAndEndForRow('', '', null, 1, 0, 1)).toEqual([
        null,
        null,
      ]);
    });

    it('should return null values, no full text end', () => {
      expect(getBoldStartAndEndForRow('', '', 0, null, 0, 1)).toEqual([
        null,
        null,
      ]);
    });

    it('should return full bold match', () => {
      expect(
        getBoldStartAndEndForRow(
          'The quick brown fox jumps over the lazy dog',
          'fox jumps',
          16,
          25,
          0,
          43,
        ),
      ).toEqual([16, 25]);
    });

    it('should return partial leading bold match', () => {
      expect(
        getBoldStartAndEndForRow(
          'quick brown fox jumps over the lazy dog',
          'The quick',
          0,
          9,
          4,
          43,
        ),
      ).toEqual([0, 5]);
    });

    it('should return partial trailing bold match', () => {
      expect(
        getBoldStartAndEndForRow(
          'The quick brown fox jumps over the lazy',
          'lazy dog',
          35,
          43,
          0,
          39,
        ),
      ).toEqual([35, 39]);
    });

    it('should return null values, no match', () => {
      expect(
        getBoldStartAndEndForRow(
          'The quick brown fox jumps over the lazy dog',
          'no match',
          100,
          108,
          0,
          43,
        ),
      ).toEqual([null, null]);
    });

    it('should return null values, invalid input', () => {
      expect(
        getBoldStartAndEndForRow(
          'The quick brown fox jumps over the lazy dog',
          'no match',
          0,
          1,
          1,
          0,
        ),
      ).toEqual([null, null]);
    });
  });
});
