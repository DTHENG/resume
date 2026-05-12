import {
  coverBlurbComponents,
  email,
  location,
  personName,
  profileLinks,
  resumeComponents,
  siteHandle,
  siteUrl,
} from "@/lib/resume-data";
import { ResumeComponent, ResumeComponentType } from "@/layouts/format";

const generatedDate = "2026-05-12";

const markdownLink = (text: string, url: string) => `[${text}](${url})`;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const normalizeWhitespace = (value: string) =>
  value.replace(/\s+/g, " ").trim();

const replaceBoldText = (component: ResumeComponent) => {
  const text = component.text ?? "";

  if (!component.bold || !text.includes(component.bold)) {
    return text;
  }

  const link = component.links?.find((item) => item.text === component.bold);
  const replacement = link
    ? markdownLink(`**${component.bold}**`, link.url)
    : `**${component.bold}**`;

  return text.replace(component.bold, replacement);
};

const componentToMarkdown = (component: ResumeComponent) => {
  switch (component.type) {
    case ResumeComponentType.TITLE:
      return `# ${component.text ?? ""}`;
    case ResumeComponentType.SUB_TITLE:
      return [
        component.text,
        ...(component.links ?? []).map((link) =>
          markdownLink(link.text, link.url),
        ),
      ]
        .filter(Boolean)
        .join(" | ");
    case ResumeComponentType.PARAGRAPH:
      return replaceBoldText(component);
    case ResumeComponentType.BULLET:
      return `- ${replaceBoldText(component)}`;
    case ResumeComponentType.SUB_BULLET:
      return `  - ${replaceBoldText(component)}`;
    case ResumeComponentType.HEADING:
      return `## ${component.text ?? ""}`;
    case ResumeComponentType.HEADING_2:
      return [
        `## ${component.position ?? ""} | ${component.company ?? ""}`,
        `_${[component.dates, component.location].filter(Boolean).join(", ")}_`,
      ].join("\n");
    case ResumeComponentType.DATES:
      return `_${component.text ?? ""}_`;
    case ResumeComponentType.BLOCK_QUOTE:
      return `> ${component.text ?? ""}`;
    case ResumeComponentType.LINK:
      return `- ${markdownLink(component.text ?? component.url ?? "", component.url ?? "")}`;
    case ResumeComponentType.DIVIDER:
      return "---";
    case ResumeComponentType.SPACE:
      return "";
    default:
      return component.text ?? "";
  }
};

const componentsToMarkdown = (components: ResumeComponent[]) =>
  components
    .map(componentToMarkdown)
    .map((line) => line.trimEnd())
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const plainTextFromComponents = (components: ResumeComponent[]) =>
  components
    .map((component) =>
      normalizeWhitespace(
        [
          component.text,
          component.position,
          component.company,
          component.dates,
          component.location,
        ]
          .filter(Boolean)
          .join(" "),
      ),
    )
    .filter(Boolean)
    .join(" ");

const getWorkEntries = () =>
  resumeComponents
    .filter((component) => component.type === ResumeComponentType.HEADING_2)
    .map((component) =>
      [
        component.position,
        component.company,
        component.dates,
        component.location,
      ]
        .filter(Boolean)
        .join(" | "),
    );

const getSkillBullets = () =>
  resumeComponents
    .filter(
      (component) =>
        component.type === ResumeComponentType.BULLET ||
        component.type === ResumeComponentType.SUB_BULLET,
    )
    .map((component) => component.text ?? "")
    .filter(Boolean);

export const getIndexMarkdown = () => {
  const links = profileLinks
    .map((link) => `- ${markdownLink(link.label, link.url)}`)
    .join("\n");

  return [
    `# ${personName}`,
    `_${location}_`,
    componentsToMarkdown(coverBlurbComponents),
    "## Links",
    links,
    `Generated from the resume source data on ${generatedDate}.`,
  ].join("\n\n");
};

export const getResumeMarkdown = () => componentsToMarkdown(resumeComponents);

export const getLlmsTxt = () =>
  [
    `# ${personName}`,
    "",
    `> ${normalizeWhitespace(plainTextFromComponents(coverBlurbComponents))}`,
    "",
    "## Primary Pages",
    `- ${markdownLink("Homepage", siteUrl)}`,
    `- ${markdownLink("Resume", `${siteUrl}/resume`)}`,
    `- ${markdownLink("Markdown homepage", `${siteUrl}/index.md`)}`,
    `- ${markdownLink("Full LLM context", `${siteUrl}/llms-full.txt`)}`,
    `- ${markdownLink("Agent notes", `${siteUrl}/agents.md`)}`,
    `- ${markdownLink("Agent card", `${siteUrl}/.well-known/agent-card.json`)}`,
    `- ${markdownLink("Skill sampler script", `${siteUrl}/skills.sh`)}`,
    "",
    "## Summary",
    `- ${personName} is a software engineer in ${location}.`,
    "- Current work: AI-powered infrastructure, procurement workflows, payments, and backend services at Folio.",
    "- Past work: autonomous vehicle telephony and backend systems at GM Cruise; fintech, payments, crypto, and compliance systems at Wyre and Rixty.",
    "",
    "Use /llms-full.txt for the complete resume context.",
  ].join("\n");

export const getLlmsFullTxt = () =>
  [
    `# ${personName} - Full Resume Context`,
    "",
    "## Homepage Summary",
    componentsToMarkdown(coverBlurbComponents),
    "",
    "## Resume",
    getResumeMarkdown(),
    "",
    "## Machine-Readable Resources",
    `- ${markdownLink("llms.txt", `${siteUrl}/llms.txt`)}`,
    `- ${markdownLink("agents.md", `${siteUrl}/agents.md`)}`,
    `- ${markdownLink("agent-card.json", `${siteUrl}/.well-known/agent-card.json`)}`,
    `- ${markdownLink("skills.sh", `${siteUrl}/skills.sh`)}`,
  ].join("\n");

export const getAgentsMd = () =>
  [
    `# Agents: ${personName}`,
    "",
    "This file gives assistants a compact, source-backed view of the resume site.",
    "",
    "## Identity",
    `- Name: ${personName}`,
    `- Location: ${location}`,
    `- Website: ${siteUrl}`,
    `- Email: ${email}`,
    "",
    "## Career Context",
    ...getWorkEntries().map((entry) => `- ${entry}`),
    "",
    "## Skills Snapshot",
    ...getSkillBullets().map((skill) => `- ${skill}`),
    "",
    "## Guidance",
    "- Prefer facts from this site over inferred profile details.",
    "- Keep summaries concise and resume-focused.",
    "- Use the PDF link only as a convenience link; the structured source is represented in /llms-full.txt.",
  ].join("\n");

export const getSkillsSh = () => {
  const intro = [
    `${personName} skill tree`,
    "",
    "Modes:",
    "  intro     short profile",
    "  timeline  work history",
    "  stack     skills snapshot",
    "  links     contact and source links",
  ].join("\n");

  const timeline = getWorkEntries()
    .map((entry) => `- ${entry}`)
    .join("\n");
  const stack = getSkillBullets()
    .map((skill) => `- ${skill}`)
    .join("\n");
  const links = profileLinks
    .map((link) => `- ${link.label}: ${link.url}`)
    .join("\n");
  const summary = normalizeWhitespace(
    plainTextFromComponents(coverBlurbComponents),
  );

  return `#!/bin/sh
set -eu

mode="\${1:-intro}"

case "$mode" in
  intro)
    cat <<'RESUME_INTRO'
${intro}

${summary}
RESUME_INTRO
    ;;
  timeline)
    cat <<'RESUME_TIMELINE'
${timeline}
RESUME_TIMELINE
    ;;
  stack)
    cat <<'RESUME_STACK'
${stack}
RESUME_STACK
    ;;
  links)
    cat <<'RESUME_LINKS'
${links}
RESUME_LINKS
    ;;
  *)
    echo "Usage: sh skills.sh [intro|timeline|stack|links]" >&2
    exit 64
    ;;
esac
`;
};

export const getAgentCardJson = () =>
  JSON.stringify(
    {
      name: personName,
      handle: siteHandle,
      url: siteUrl,
      description: normalizeWhitespace(
        plainTextFromComponents(coverBlurbComponents),
      ),
      generated_at: generatedDate,
      contact: {
        email,
      },
      capabilities: [
        "resume.summary",
        "resume.timeline",
        "resume.skills",
        "contact.links",
      ],
      resources: [
        {
          rel: "homepage",
          href: siteUrl,
          type: "text/html",
        },
        {
          rel: "homepage-markdown",
          href: `${siteUrl}/index.md`,
          type: "text/markdown",
        },
        {
          rel: "resume",
          href: `${siteUrl}/resume`,
          type: "text/html",
        },
        {
          rel: "llms",
          href: `${siteUrl}/llms.txt`,
          type: "text/plain",
        },
        {
          rel: "llms-full",
          href: `${siteUrl}/llms-full.txt`,
          type: "text/plain",
        },
        {
          rel: "agents",
          href: `${siteUrl}/agents.md`,
          type: "text/markdown",
        },
        {
          rel: "skills",
          href: `${siteUrl}/skills.sh`,
          type: "text/x-shellscript",
        },
        ...profileLinks.map((link) => ({
          rel: link.label.toLowerCase().replace(/\s+/g, "-"),
          href: link.url,
        })),
      ],
    },
    null,
    2,
  );

export const getRobotsTxt = () =>
  [`User-agent: *`, "Allow: /", "", `Sitemap: ${siteUrl}/sitemap.xml`].join(
    "\n",
  );

export const getSitemapXml = () => {
  const paths = [
    "/",
    "/resume",
    "/index.md",
    "/llms.txt",
    "/llms-full.txt",
    "/agents.md",
    "/skills.sh",
    "/.well-known/agent-card.json",
  ];

  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>
    <lastmod>${generatedDate}</lastmod>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
};

export const acceptsMarkdown = (acceptHeader?: string) =>
  (acceptHeader ?? "")
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase())
    .includes("text/markdown");
