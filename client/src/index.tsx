import React from "react";
import "./index.css";
import App from "./App";
import { render } from "react-snapshot";

render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
