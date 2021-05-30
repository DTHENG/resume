import { existsSync, readFileSync } from "fs";
import {
	PDFDocument,
	PDFFont,
	PDFPageDrawRectangleOptions,
	PDFPageDrawTextOptions,
	rgb,
	StandardFonts,
} from "pdf-lib";
import { resolve } from "path";

export enum ResumeComponentType {
	TITLE = "TITLE",
	PARAGRAPH = "PARAGRAPH",
	HEADING = "HEADING",
	DATES = "DATES",
	BLOCK_QUOTE = "BLOCK_QUOTE",
	LINK = "LINK",
	SPACE = "SPACE",
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
}

export type DrawTextEntry = { text: string; options: PDFPageDrawTextOptions };

export const getResume = (): ResumeComponent[] => {
	if (!existsSync(resolve("../copy/resume.json"))) {
		throw new Error("Unable to find resume json file!");
	}
	return JSON.parse(readFileSync(resolve("../copy/resume.json")).toString());
};

export const toEntries = async (
	resume: ResumeComponent[],
	pageHeight: number,
	doc: PDFDocument
): Promise<{
	text: DrawTextEntry[];
	rectangles: PDFPageDrawRectangleOptions[];
}> => {
	const normalFont = await doc.embedFont(
		readFileSync(resolve("fonts/OpenSans-Regular.ttf"))
	);
	const boldFont = await doc.embedFont(
		readFileSync(resolve("fonts/OpenSans-SemiBold.ttf"))
	);
	const italicFont = await doc.embedFont(
		readFileSync(resolve("fonts/OpenSans-Italic.ttf"))
	);

	let runningY = 40;
	const rectangles: PDFPageDrawRectangleOptions[] = [];
	return {
		text: resume
			.filter((component) =>
				component.webOnly != null ? !component.webOnly : true
			)
			.map((component) => {
				const { text, type } = component;

				let font = normalFont;
				let fontSize = 9;
				let marginBottom = 0;
				let marginTop = 0;

				switch (type) {
					case ResumeComponentType.TITLE:
						font = boldFont;
						marginTop = 20;
						marginBottom = 13;
						break;
					case ResumeComponentType.HEADING:
						font = boldFont;
						marginTop = 15;
						marginBottom = 3;
						break;
					case ResumeComponentType.BLOCK_QUOTE:
						font = italicFont;
						fontSize = 7.5;
						marginTop = 10;
						marginBottom = 10;
						break;
					case ResumeComponentType.PARAGRAPH:
						marginBottom = 3;
						break;
					case ResumeComponentType.SPACE:
						marginBottom = 15;
						break;
					case ResumeComponentType.DATES:
						fontSize = 7;
						marginBottom = 7;
						break;
					case ResumeComponentType.LINK:
						fontSize = 8;
						marginBottom = 4;
						break;
				}
				const startingY = marginTop + runningY;
				const textRows = getTextAsRows(text ?? "", font, fontSize, 390);
				const entries = textRows.map((rowText) => {
					const entry = {
						text: rowText,
						options: {
							x: type === ResumeComponentType.BLOCK_QUOTE ? 88 : 80,
							y: pageHeight - (marginTop + runningY),
							size: fontSize,
							font,
							color: rgb(0, 0, 0),
						},
					};
					runningY += marginTop + fontSize + marginBottom;
					return entry;
				});
				if (type === ResumeComponentType.BLOCK_QUOTE) {
					rectangles.push({
						x: 80,
						y: pageHeight - (startingY + 6),
						width: 1.4,
						height: runningY - startingY,
						color: rgb(0, 0, 0),
					});
				}
				return entries;
			})
			.reduce((allEntries, entries) => allEntries.concat(entries), []),
		rectangles,
	};
};

export const getTextAsRows = (
	text: string,
	font: PDFFont,
	fontSize: number,
	maxWidth: number
): string[] => {
	const currentWidth = font.widthOfTextAtSize(text ?? "", fontSize);
	if (currentWidth < maxWidth) {
		return [text];
	}
	const brokenText = text.split(" ");
	const result: string[] = [];
	let runningText: string | null = null;
	brokenText.forEach((value, index) => {
		const runningTextWithValue =
			runningText == null ? value : runningText + " " + value;
		const width = font.widthOfTextAtSize(runningTextWithValue, fontSize);
		if (width > maxWidth) {
			result.push(runningText);
			runningText = value;
			return;
		}
		runningText = runningTextWithValue;
		if (index === brokenText.length - 1) {
			result.push(runningText);
		}
	});

	return result;
};
