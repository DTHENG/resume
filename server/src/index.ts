import express from "express";
import { resolve } from "path";

const app = express();

app.use(express.static(resolve("../client/build")));

app.listen("3456");

console.log("Listening on port 3456...");