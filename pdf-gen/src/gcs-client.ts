import { statSync } from "fs";
import { resolve } from "path";

export const uploadFile = async (
	path: string,
	bucket: string
): Promise<void> => {
	console.log(statSync(resolve("../../key.json")));
	return null;
};
