import express from "express";
import { resolve } from "path";

const app = express();

app.use(express.static(resolve("../client/build")));
app.get("/resume", (req, res) =>
	res.sendFile(resolve("../client/build/resume.html"))
);
app.get("*", (req, res) =>
	res.sendFile(resolve("../client/build/not-found.html"))
);
app.listen("3456");
console.log("Listening on port 3456...");
