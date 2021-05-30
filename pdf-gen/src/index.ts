import { existsSync, mkdirSync } from "fs";
import PdfBuilder from "./pdf-builder";

const builder = new PdfBuilder();

if (!existsSync("tmp")) mkdirSync("tmp");

builder
	.buildResume("tmp/test.pdf")
	.then(() => {
		console.log("PDF Resume Created!");
	})
	.catch((error) => {
		console.error("Got an error creating PDF", error);
	});
