import React from "react";
import "./index.css";
import { render } from "react-snapshot";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Home";
import Resume from "./Resume";
import NotFound from "./NotFound";

render(
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/resume" component={Resume} />
				<Route path="/not-found" component={NotFound} />
				<Route path="*" component={NotFound} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
