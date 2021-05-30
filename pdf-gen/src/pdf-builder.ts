import { readFileSync, writeFileSync } from "fs";
import { PDFDocument } from "pdf-lib";
import { resolve } from "path";
import { getResume, toEntries } from "./utils";
import fontkit from "@pdf-lib/fontkit";

export default class PdfBuilder {
	async buildResume(outputFile: string): Promise<void> {
		const doc = await PDFDocument.create();

		// Add a blank page to the document
		const page = doc.addPage([550, 710]);

		// Get the width and height of the page
		const { height } = page.getSize();

		doc.registerFontkit(fontkit);

		const resumeData = getResume();

		const { text, rectangles } = await toEntries(resumeData, height, doc);

		text.forEach((entry) => page.drawText(entry.text, entry.options));
		rectangles.forEach((rectangle) => page.drawRectangle(rectangle));

		doc.setTitle("Daniel Thengvall's Resume");
		doc.setAuthor("Daniel Thengvall");
		doc.setSubject(readFileSync(resolve("../copy/blurb.160.txt")).toString());
		doc.setCreator("pdf-lib (https://github.com/Hopding/pdf-lib)");
		doc.setCreationDate(new Date());
		doc.setModificationDate(new Date());

		// Serialize the PDFDocument to bytes (a Uint8Array)
		const pdfBytes = await doc.save();

		writeFileSync(outputFile, pdfBytes);
		// For example, `pdfBytes` can be:
		//   • Written to a file in Node
		//   • Downloaded from the browser
		//   • Rendered in an <iframe>
	}
}
