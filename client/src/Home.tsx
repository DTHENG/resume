import React from "react";
import { formatBlurb, getBlurb } from "./utils";

function Home() {
	const blurb = formatBlurb(getBlurb());

	return <>{blurb}</>;
}

export default Home;
