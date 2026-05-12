import type { ResumeComponent } from "@/layouts/format";

import blurbData from "../../copy/blurb.full.json";
import resumeData from "../../copy/resume.json";

export const siteUrl = "https://dtheng.com";
export const personName = "Daniel Thengvall";
export const siteHandle = "DTHENG";
export const location = "San Francisco, CA";
export const email = "thengvall.daniel@gmail.com";

export const profileLinks = [
  {
    label: "Website",
    text: "dtheng.com",
    url: siteUrl,
  },
  {
    label: "Email",
    text: email,
    url: `mailto:${email}`,
  },
  {
    label: "Resume",
    text: "Resume",
    url: `${siteUrl}/resume`,
  },
  {
    label: "PDF Resume",
    text: "PDF Version",
    url: "https://storage.googleapis.com/com-dtheng/DanielThengvallResume.pdf",
  },
  {
    label: "GitHub",
    text: "github.com/DTHENG",
    url: "https://github.com/DTHENG",
  },
  {
    label: "LinkedIn",
    text: "linkedin.com/in/daniel-thengvall-75601918",
    url: "https://www.linkedin.com/in/daniel-thengvall-75601918",
  },
  {
    label: "Instagram",
    text: "instagram.com/dtheng",
    url: "https://instagram.com/dtheng",
  },
  {
    label: "X",
    text: "x.com/DTHENG",
    url: "https://x.com/DTHENG",
  },
];

export const resumeComponents = resumeData as ResumeComponent[];
export const coverBlurbComponents = blurbData as ResumeComponent[];
