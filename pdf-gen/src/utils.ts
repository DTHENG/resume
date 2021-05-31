import { existsSync, readFileSync } from 'fs';
import {
  PDFDocument,
  PDFFont,
  PDFPageDrawRectangleOptions,
  PDFPageDrawTextOptions,
  rgb,
} from 'pdf-lib';
import { resolve } from 'path';

export enum ResumeComponentType {
  TITLE = 'TITLE',
  PARAGRAPH = 'PARAGRAPH',
  HEADING = 'HEADING',
  DATES = 'DATES',
  BLOCK_QUOTE = 'BLOCK_QUOTE',
  LINK = 'LINK',
  SPACE = 'SPACE',
}

export interface ResumeComponent {
  type: ResumeComponentType;
  text?: string | null;
  bold?: string | null;
  url?: string | null;
  category?: string | null;
  action?: string | null;
  label?: string | null;
  testId?: string | null;
  webOnly?: boolean | null;
  smallFont?: boolean | null;
}

export type DrawTextEntry = { text: string; options: PDFPageDrawTextOptions };

export const getResume = (): ResumeComponent[] => {
  if (!existsSync(resolve('../copy/resume.json'))) {
    throw new Error('Unable to find resume json file!');
  }
  return JSON.parse(readFileSync(resolve('../copy/resume.json')).toString());
};

export const toEntries = async (
  resume: ResumeComponent[],
  pageHeight: number,
  doc: PDFDocument,
): Promise<{
  text: DrawTextEntry[];
  rectangles: PDFPageDrawRectangleOptions[];
}> => {
  const normalFont = await doc.embedFont(
    readFileSync(resolve('fonts/OpenSans-Regular.ttf')),
  );
  const boldFont = await doc.embedFont(
    readFileSync(resolve('fonts/OpenSans-SemiBold.ttf')),
  );
  const italicFont = await doc.embedFont(
    readFileSync(resolve('fonts/OpenSans-Italic.ttf')),
  );

  const x = inchesToPixels(1.25);
  let runningY = inchesToPixels(1);
  const width = inchesToPixels(6);
  const rectangles: PDFPageDrawRectangleOptions[] = [];
  return {
    text: resume
      .filter((component) =>
        component.webOnly != null ? !component.webOnly : true,
      )
      .map((component) => {
        const { text, type, bold, smallFont } = component;

        let font = normalFont;
        let fontSize = inchesToPixels(0.14);
        let marginBottom = 0;
        let marginTop = 0;

        switch (type) {
          case ResumeComponentType.TITLE:
            font = boldFont;
            marginBottom = inchesToPixels(0.25);
            break;
          case ResumeComponentType.HEADING:
            font = boldFont;
            marginTop = inchesToPixels(0.25);
            marginBottom = inchesToPixels(0.05);
            break;
          case ResumeComponentType.BLOCK_QUOTE:
            font = italicFont;
            fontSize = inchesToPixels(0.115);
            marginTop = inchesToPixels(0.08);
            marginBottom = inchesToPixels(0.13);
            break;
          case ResumeComponentType.PARAGRAPH:
            marginBottom = inchesToPixels(0.06);
            if (smallFont != null && smallFont) {
              fontSize = inchesToPixels(0.12);
            }
            break;
          case ResumeComponentType.SPACE:
            fontSize = 0;
            marginBottom = inchesToPixels(0.2);
            break;
          case ResumeComponentType.DATES:
            fontSize = inchesToPixels(0.11);
            marginBottom = inchesToPixels(0.1);
            break;
          case ResumeComponentType.LINK:
            fontSize = inchesToPixels(0.12);
            marginBottom = inchesToPixels(0.05);
            break;
        }
        const startingY = marginTop + runningY;
        let fullTextBoldStart: number | null = null;
        let fullTextBoldEnd: number | null = null;
        if (bold && text.indexOf(bold) > -1) {
          fullTextBoldStart = text.indexOf(bold);
          fullTextBoldEnd = fullTextBoldStart + bold.length;
        }
        const textRows = getTextAsRows(text ?? '', font, fontSize, width);
        let textEnd = 0;
        const entries: DrawTextEntry[] = textRows
          .map((rowText, index) => {
            const textStart = textEnd + (index === 0 ? 0 : 1);
            textEnd += rowText.length + (index === 0 ? 0 : 1);
            const [boldStart, boldEnd] = getBoldStartAndEndForRow(
              rowText,
              bold,
              fullTextBoldStart,
              fullTextBoldEnd,
              textStart,
              textEnd,
            );
            const entries: DrawTextEntry[] = [];
            if (boldStart != null && boldEnd != null) {
              const prefixText = rowText.substring(0, boldStart);
              const suffixText = rowText.substring(boldEnd, rowText.length);
              const boldText = rowText.substring(boldStart, boldEnd);
              const prefixTextWidth = font.widthOfTextAtSize(
                prefixText,
                fontSize,
              );
              const boldTextWidth = boldFont.widthOfTextAtSize(
                boldText,
                fontSize,
              );
              const suffixTextWidth = boldFont.widthOfTextAtSize(
                suffixText,
                fontSize,
              );
              let runningX = x;
              if (prefixTextWidth > 0) {
                entries.push({
                  text: prefixText,
                  options: {
                    x: runningX,
                    y: pageHeight - (marginTop + runningY),
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                  },
                });
                runningX += prefixTextWidth;
              }
              entries.push({
                text: boldText,
                options: {
                  x: runningX,
                  y: pageHeight - (marginTop + runningY),
                  size: fontSize,
                  font: boldFont,
                  color: rgb(0, 0, 0),
                },
              });
              runningX += boldTextWidth;
              if (suffixTextWidth > 0) {
                entries.push({
                  text: suffixText,
                  options: {
                    x: runningX,
                    y: pageHeight - (marginTop + runningY),
                    size: fontSize,
                    font,
                    color: rgb(0, 0, 0),
                  },
                });
              }
            } else {
              entries.push({
                text: rowText,
                options: {
                  x:
                    type === ResumeComponentType.BLOCK_QUOTE
                      ? x + inchesToPixels(0.11)
                      : x,
                  y: pageHeight - (marginTop + runningY),
                  size: fontSize,
                  font,
                  color: rgb(0, 0, 0),
                },
              });
            }
            runningY += marginTop + fontSize + marginBottom;
            return entries;
          })
          .reduce(flattenArray, []);
        if (type === ResumeComponentType.BLOCK_QUOTE) {
          rectangles.push({
            x,
            y: pageHeight - (startingY + inchesToPixels(0.085)),
            width: inchesToPixels(0.021),
            height: runningY - startingY,
            color: rgb(0, 0, 0),
          });
        }
        return entries;
      })
      .reduce(flattenArray, []),
    rectangles,
  };
};

export const flattenArray = <T>(all: T[], array: T[]): T[] => all.concat(array);

export const getBoldStartAndEndForRow = (
  rowText: string,
  bold: string | null,
  fullTextBoldStart: number | null,
  fullTextBoldEnd: number | null,
  textStart: number,
  textEnd: number,
): (number | null)[] => {
  if (!bold || fullTextBoldStart == null || fullTextBoldEnd == null)
    return [null, null];
  let boldStart: number | null = null;
  let boldEnd: number | null = null;
  if (
    fullTextBoldStart != null &&
    fullTextBoldEnd != null &&
    (fullTextBoldStart >= textStart || fullTextBoldEnd <= textEnd)
  ) {
    // Full text
    if (fullTextBoldStart >= textStart && fullTextBoldEnd <= textEnd) {
      boldStart = fullTextBoldStart - textStart;
      boldEnd = fullTextBoldStart - textStart + bold.length;

      // Partial leading
    } else if (fullTextBoldStart >= textStart && fullTextBoldStart <= textEnd) {
      boldStart = fullTextBoldStart - textStart;
      boldEnd = rowText.length;

      // Partial leading
    } else if (fullTextBoldEnd >= textStart && fullTextBoldEnd <= textEnd) {
      boldStart = 0;
      boldEnd = fullTextBoldEnd - textStart;
    }
  }
  return [boldStart, boldEnd];
};
export const getTextAsRows = (
  text: string,
  font: PDFFont,
  fontSize: number,
  maxWidth: number,
): string[] => {
  const currentWidth = font.widthOfTextAtSize(text ?? '', fontSize);
  if (currentWidth < maxWidth) {
    return [text ?? ''];
  }
  const brokenText = text.split(' ');
  const result: string[] = [];
  let runningText: string | null = null;
  brokenText.forEach((value, index) => {
    const runningTextWithValue =
      runningText == null ? value : runningText + ' ' + value;
    const width = font.widthOfTextAtSize(runningTextWithValue, fontSize);
    if (width > maxWidth) {
      result.push(runningText);
      runningText = value;
      if (index === brokenText.length - 1) {
        result.push(runningText);
      }
      return;
    }
    runningText = runningTextWithValue;
    if (index === brokenText.length - 1) {
      result.push(runningText);
    }
  });

  return result;
};

export const inchesToPixels = (inches: number): number => {
  return inches * 65;
};
