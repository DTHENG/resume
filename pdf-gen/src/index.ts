import { existsSync, mkdirSync } from "fs";
import { uploadFile } from "./gcs-client";
import PdfBuilder from "./pdf-builder";
import PdfGen from "./pdf-gen";

new PdfGen()
	.buildAndUpload()
	.then(() => {})
	.catch((error) => {});
