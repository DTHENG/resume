import FormerTwitterIcon from "../icons/former-twitter";
import GitHubIcon from "../icons/github";
import InstagramIcon from "../icons/instagram";
import LinkedInIcon from "../icons/linkedin";

import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-16 md:py-10">
        <img
          alt="Profile"
          className="size-24 rounded-full mb-4"
          src="https://storage.googleapis.com/com-dtheng/profile.jpg"
        />
        <h1 className="font-semibold text-xl mb-4">Daniel Thengvall</h1>
        <p className="w-96 text-base mb-4">
          Daniel is an engineer living in{" "}
          <a
            className="font-semibold link"
            href="https://en.wikipedia.org/wiki/San_Francisco"
          >
            San Francisco
          </a>
          , currently a Senior Software Engineer at{" "}
          <a className="font-semibold link" href="https://getcruise.com/">
            Cruise
          </a>
          , previously worked at{" "}
          <a className="font-semibold link" href="https://sendwyre.com/">
            Wyre
          </a>
          ,{" "}
          <a className="font-semibold link" href="https://snapcard.io/">
            SnapCard
          </a>{" "}
          and{" "}
          <a className="font-semibold link" href="https://rixty.com/">
            Rixty
          </a>
          .
        </p>
        <p className="w-96 text-base mb-16">
          <a className="font-semibold link" href="/resume">
            Web
          </a>{" "}
          or{" "}
          <a
            className="font-semibold link"
            href="https://storage.googleapis.com/com-dtheng/DanielThengvallResume.pdf"
            rel="noreferrer"
            target="_blank"
          >
            PDF
          </a>{" "}
          Resume
        </p>
        <div className="flex flex-row gap-x-14">
          <a
            className="w-10 h-10"
            href="https://github.com/DTHENG"
            rel="noreferrer"
            target="_blank"
          >
            <GitHubIcon />
          </a>
          <a
            className="w-10 h-10"
            href="https://www.linkedin.com/in/daniel-thengvall-75601918"
            rel="noreferrer"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
          <a
            className="w-10 h-10"
            href="https://x.com/DTHENG"
            rel="noreferrer"
            target="_blank"
          >
            <FormerTwitterIcon />
          </a>
          <a
            className="w-10 h-10"
            href="https://instagram.com/dtheng"
            rel="noreferrer"
            target="_blank"
          >
            <InstagramIcon />
          </a>
        </div>
      </section>
    </DefaultLayout>
  );
}
