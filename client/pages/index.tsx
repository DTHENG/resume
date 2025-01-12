import ArrowIcon from "../icons/arrow";
import FormerTwitterIcon from "../icons/former-twitter";
import GitHubIcon from "../icons/github";
import InstagramIcon from "../icons/instagram";
import LinkedInIcon from "../icons/linkedin";
import { formatResume, getCoverBlurb } from "../layouts/format";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-16 md:py-10">
        <img
          alt="Profile"
          className="size-24 rounded-full mb-4"
          src={
            process.env.NEXT_PUBLIC_PROFILE_URL ??
            "https://storage.googleapis.com/com-dtheng/profile.jpg"
          }
        />
        <div className="flex flex-col items-center justify-center ">
          <h1 className="font-semibold text-lg mb-2">Daniel Thengvall</h1>
          <p className="mb-2 text-xs">San Francisco, CA</p>
        </div>
        <div className="md:w-5/12 text-base mb-4 px-6">
          {formatResume(getCoverBlurb())}
        </div>
        <div className="md:w-5/12 w-full h-20 px-6 flex flex-row justify-between items-center">
          <div className="flex flex-row gap-x-3">
            <a
              className="w-6 h-6"
              href="https://www.linkedin.com/in/daniel-thengvall-75601918"
              rel="noreferrer"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a
              className="w-6 h-6"
              href="https://github.com/DTHENG"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon />
            </a>
            <a
              className="w-6 h-6"
              href="https://instagram.com/dtheng"
              rel="noreferrer"
              target="_blank"
            >
              <InstagramIcon />
            </a>
            <a
              className="w-6 h-6"
              href="https://x.com/DTHENG"
              rel="noreferrer"
              target="_blank"
            >
              <FormerTwitterIcon />
            </a>
          </div>
          <a
            className="link flex flex-row justify-between items-center"
            href="/resume"
          >
            <span className="mr-1 text-xs font-semibold">Enter Resume</span>
            <ArrowIcon />
          </a>
        </div>
      </section>
    </DefaultLayout>
  );
}
