import React from "react";
import ReactGA from "react-ga";

export interface Blurb {
	text: string;
	links: BlurbLink[];
}

export interface BlurbLink {
	text: string;
	url: string;
	category: string;
	action: string;
	label: string;
}

export const getBlurb = (): Blurb => {
	if (process.env.REACT_APP_BLURB_JSON) {
		return JSON.parse(process.env.REACT_APP_BLURB_JSON);
	}
	throw new Error("REACT_APP_BLURB_JSON not set!");
};

export const formatBlurb = (blurb: Blurb): JSX.Element => {
	return applyLinks(blurb.text, blurb.links);
};

export const applyLinks = (
	blurbText: string,
	links: BlurbLink[]
): JSX.Element => {
	const linkPositions: { link: BlurbLink; start: number; end: number }[] = links
		.filter((link) => blurbText.indexOf(link.text) > -1)
		.map((link) => ({
			link,
			start: blurbText.indexOf(link.text),
			end: blurbText.indexOf(link.text) + link.text.length,
		}))
		.sort((p1, p2) => (p1.start > p2.start ? 1 : -1));
	const textBeforeFirstLink = blurbText.substring(0, linkPositions[0].start);
	const elements: JSX.Element[] = [<span>{textBeforeFirstLink}</span>];
	for (let i = 0; i < linkPositions.length; i++) {
		const { link, end } = linkPositions[i];
		const { text, url, category, action, label } = link;
		elements.push(
			<a
				href={url}
				title={label}
				onClick={() => {
					ReactGA.event({
						category,
						action,
						label,
					});
				}}
			>
				{text}
			</a>
		);
		if (i === linkPositions.length - 1) {
			elements.push(<span>{blurbText.substring(end, blurbText.length)}</span>);
			break;
		}
		elements.push(
			<span>{blurbText.substring(end, linkPositions[i + 1].start)}</span>
		);
	}
	return <>{elements}</>;
};
