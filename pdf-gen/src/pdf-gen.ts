import { existsSync, mkdirSync } from "fs";
import { uploadFile } from "./gcs-client";
import PdfBuilder from "./pdf-builder";

export default class PdfGen {
	builder = new PdfBuilder();

	async buildAndUpload(): Promise<void> {
		if (!existsSync("tmp")) mkdirSync("tmp");
		await this.builder.buildResume("tmp/DanielThengvallResume.pdf");
		console.log("PDF Resume Created!");
		await uploadFile("tmp/DanielThengvallResume.pdf", "com-dtheng");
		console.log("PDF Resume Upload!");
	}
}