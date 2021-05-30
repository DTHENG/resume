import React from "react";
import ReactGA from "react-ga";
import { angelListIcon, gitHubIcon, instagramIcon, twitterIcon } from "./icons";
import { Link } from "./layout";

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
	testId?: string | null;
}

export interface SocialLink {
	icon: JSX.Element;
	href: string;
	title: string;
	category: string;
	action: string;
	label: string;
	color: SocialLinkColorScheme;
	testId?: string | null;
}

export interface SocialLinkColorScheme {
	default: string;
	hover: string;
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
	if (links.length == 0) {
		return <span>{blurbText}</span>;
	}
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
		const { text, url, category, action, label, testId } = link;
		elements.push(
			<Link
				href={url}
				title={label}
				onClick={() => {
					ReactGA.event({
						category,
						action,
						label,
					});
				}}
				data-testid={testId}
			>
				{text}
			</Link>
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

export const socialLinks: SocialLink[] = [
	{
		icon: gitHubIcon,
		href: "https://github.com/DTHENG",
		title: "GitHub",
		category: "Links",
		action: "Social",
		label: "GitHub",
		color: {
			default: "#9d00fb",
			hover: "#5700f4",
		},
		testId: "gitHubTestId",
	},
	{
		icon: angelListIcon,
		href: "https://angel.co/daniel-thengvall",
		title: "AngelList",
		category: "Links",
		action: "Social",
		label: "AngelList",
		color: {
			default: "#c300c2",
			hover: "#94009b",
		},
	},
	{
		icon: twitterIcon,
		href: "https://twitter.com/DTHENG",
		title: "Twitter",
		category: "Links",
		action: "Social",
		label: "Twitter",
		color: {
			default: "#e90080",
			hover: "#d70031",
		},
	},
	{
		icon: instagramIcon,
		href: "https://instagram.com/dtheng",
		title: "Instagram",
		category: "Links",
		action: "Social",
		label: "Instagram",
		color: {
			default: "#fb0046",
			hover: "#f80000",
		},
	},
];
