import React from "react";
import "./index.css";
import { render } from "react-snapshot";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./Home";
import Resume from "./Resume";
import NotFound from "./NotFound";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID ?? "", {
	debug: process.env.REACT_APP_DEBUG_ANALYTICS === "true",
});

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
