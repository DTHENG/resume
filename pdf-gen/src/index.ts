import { existsSync, mkdirSync } from "fs";
import { uploadFile } from "./gcs-client";
import PdfBuilder from "./pdf-builder";

const builder = new PdfBuilder();

if (!existsSync("tmp")) mkdirSync("tmp");

builder
	.buildResume("tmp/DanielThengvallResume.pdf")
	.then(() => {
		console.log("PDF Resume Created!");

		uploadFile("tmp/DanielThengvallResume.pdf", "com-dtheng")
			.then(() => {
				console.log("PDF Resume Upload!");
			})
			.catch((error) => {
				console.error("Got an error uploading PDF", error);
			});
	})
	.catch((error) => {
		console.error("Got an error creating PDF", error);
	});
