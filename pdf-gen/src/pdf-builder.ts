import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument } from 'pdf-lib';
import { resolve } from 'path';
import { getResume, inchesToPixels, toEntries } from './utils';
import fontkit from '@pdf-lib/fontkit';

export const buildResume = async (outputFile: string): Promise<void> => {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const page = doc.addPage([inchesToPixels(8.5), inchesToPixels(11)]);
  const { height } = page.getSize();
  const resumeData = getResume();
  const { text, rectangles, circles } = await toEntries(
    resumeData,
    height,
    doc,
  );
  text.forEach((entry) => page.drawText(entry.text, entry.options));
  rectangles.forEach((rectangle) => page.drawRectangle(rectangle));
  circles.forEach((circle) => page.drawCircle(circle));
  doc.setTitle("Daniel Thengvall's Resume");
  doc.setAuthor('Daniel Thengvall');
  doc.setSubject(readFileSync(resolve('../copy/blurb.160.txt')).toString());
  doc.setCreator('pdf-lib (https://github.com/Hopding/pdf-lib)');
  doc.setCreationDate(new Date());
  doc.setModificationDate(new Date());
  const pdfBytes = await doc.save();
  writeFileSync(outputFile, pdfBytes);
};
