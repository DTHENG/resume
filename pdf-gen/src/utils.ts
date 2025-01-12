import { existsSync, readFileSync } from 'fs';
import {
  PDFDocument,
  PDFFont,
  PDFPageDrawCircleOptions,
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
  HEADING_2 = 'HEADING_2',
  DIVIDER = 'DIVIDER',
  BULLET = 'BULLET',
  SUB_BULLET = 'SUB_BULLET',
  SUB_TITLE = 'SUB_TITLE',
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
  position?: string;
  company?: string;
  dates?: string;
  location?: string;
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
  circles: PDFPageDrawCircleOptions[];
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
  let runningY = inchesToPixels(0.6);
  const width = inchesToPixels(6);
  const rectangles: PDFPageDrawRectangleOptions[] = [];
  const circles: PDFPageDrawCircleOptions[] = [];
  return {
    text: resume
      .filter((component) =>
        component.webOnly != null ? !component.webOnly : true,
      )
      .map((component) => {
        const {
          text,
          type,
          bold,
          smallFont,
          position,
          company,
          dates,
          location,
        } = component;

        let font = normalFont;
        let fontSize = inchesToPixels(0.12);
        let marginBottom = 0;
        let marginTop = 0;

        switch (type) {
          case ResumeComponentType.TITLE:
            font = boldFont;
            marginBottom = inchesToPixels(0.15);
            break;
          case ResumeComponentType.SUB_TITLE:
            break;
          case ResumeComponentType.HEADING:
          case ResumeComponentType.HEADING_2:
            font = boldFont;
            marginTop = inchesToPixels(0.05);
            marginBottom = inchesToPixels(0.05);
            break;
          case ResumeComponentType.BLOCK_QUOTE:
            font = italicFont;
            fontSize = inchesToPixels(0.115);
            marginTop = inchesToPixels(0.08);
            marginBottom = inchesToPixels(0.13);
            break;
          case ResumeComponentType.PARAGRAPH:
          case ResumeComponentType.BULLET:
          case ResumeComponentType.SUB_BULLET:
            marginTop = inchesToPixels(0.04);
            marginBottom = inchesToPixels(0.02);
            if (smallFont != null && smallFont) {
              fontSize = inchesToPixels(0.1);
            }
            break;
          case ResumeComponentType.SPACE:
            fontSize = 0;
            marginBottom = inchesToPixels(0.4);
            break;
          case ResumeComponentType.DIVIDER:
            fontSize = 0;
            break;
          case ResumeComponentType.DATES:
            fontSize = inchesToPixels(0.11);
            marginBottom = inchesToPixels(0.1);
            break;
          case ResumeComponentType.LINK:
            marginBottom = inchesToPixels(0.05);
            break;
        }

        if (type === ResumeComponentType.HEADING_2) {
          let heading2X = x;
          const heading2Entries: DrawTextEntry[] = [];
          const positionText: DrawTextEntry = {
            text: position ?? '',
            options: {
              x: heading2X,
              y: pageHeight - (marginTop + runningY),
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            },
          };
          heading2Entries.push(positionText);
          heading2X += boldFont.widthOfTextAtSize(position ?? '', fontSize);

          const pipeOneText: DrawTextEntry = {
            text: ' | ',
            options: {
              x: heading2X,
              y: pageHeight - (marginTop + runningY),
              size: fontSize,
              font: normalFont,
              color: rgb(0, 0, 0),
            },
          };
          heading2Entries.push(pipeOneText);
          heading2X += normalFont.widthOfTextAtSize(' | ', fontSize);

          const companyText: DrawTextEntry = {
            text: company ?? '',
            options: {
              x: heading2X,
              y: pageHeight - (marginTop + runningY),
              size: fontSize,
              font,
              color: rgb(0, 0, 0),
            },
          };
          heading2Entries.push(companyText);
          heading2X += boldFont.widthOfTextAtSize(company ?? '', fontSize);

          const pipeTwoText: DrawTextEntry = {
            text: ' | ',
            options: {
              x: heading2X,
              y: pageHeight - (marginTop + runningY),
              size: fontSize,
              font: normalFont,
              color: rgb(0, 0, 0),
            },
          };
          heading2Entries.push(pipeTwoText);
          heading2X += normalFont.widthOfTextAtSize(' | ', fontSize);

          const datesAndLocationText: DrawTextEntry = {
            text: `${dates}, ${location}`,
            options: {
              x: heading2X,
              y: pageHeight - (marginTop + runningY),
              size: fontSize,
              font: italicFont,
              color: rgb(0, 0, 0),
            },
          };
          heading2Entries.push(datesAndLocationText);

          runningY += marginTop + fontSize + marginBottom;
          return heading2Entries;
        }
        const startingY = marginTop + runningY;
        let fullTextBoldStart: number | null = null;
        let fullTextBoldEnd: number | null = null;
        if (bold && text.indexOf(bold) > -1) {
          fullTextBoldStart = text.indexOf(bold);
          fullTextBoldEnd = fullTextBoldStart + bold.length;
        }
        let xOffset = 0;
        switch (type) {
          case ResumeComponentType.BLOCK_QUOTE:
            xOffset = inchesToPixels(0.11);
            break;
          case ResumeComponentType.BULLET:
            xOffset = inchesToPixels(0.15);
            break;
          case ResumeComponentType.SUB_BULLET:
            xOffset = inchesToPixels(0.3);
            break;
        }

        const adjustedWidth = width - xOffset - inchesToPixels(0.1);
        const textRows = getTextAsRows(
          text ?? '',
          font,
          fontSize,
          adjustedWidth,
        );
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
            const adjustedX = x + xOffset;
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
              let runningX = adjustedX;
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
            } else {
              entries.push({
                text: rowText,
                options: {
                  x: adjustedX,
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
        if (type === ResumeComponentType.DIVIDER) {
          rectangles.push({
            x,
            y: pageHeight - (startingY + inchesToPixels(0.01)),
            width: width,
            height: inchesToPixels(0.008),
            color: rgb(0.8, 0.8, 0.8),
          });
          runningY += inchesToPixels(0.2);
        }
        if (type === ResumeComponentType.BULLET) {
          circles.push({
            x: x + inchesToPixels(0.07),
            y: pageHeight - (startingY - inchesToPixels(0.04)),
            size: inchesToPixels(0.012),
            color: rgb(0, 0, 0),
          });
        }
        if (type === ResumeComponentType.SUB_BULLET) {
          circles.push({
            x: x + inchesToPixels(0.22),
            y: pageHeight - (startingY - inchesToPixels(0.04)),
            size: inchesToPixels(0.012),
            color: rgb(0, 0, 0),
          });
        }
        return entries;
      })
      .reduce(flattenArray, []),
    rectangles,
    circles,
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
  if (fullTextBoldStart >= textStart || fullTextBoldEnd <= textEnd) {
    // Full text
    if (fullTextBoldStart >= textStart && fullTextBoldEnd <= textEnd) {
      boldStart = fullTextBoldStart - textStart;
      boldEnd = fullTextBoldStart - textStart + bold.length;

      // Partial trailing
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
