export enum ResumeComponentType {
  TITLE = "TITLE",
  PARAGRAPH = "PARAGRAPH",
  HEADING = "HEADING",
  DATES = "DATES",
  BLOCK_QUOTE = "BLOCK_QUOTE",
  LINK = "LINK",
  SPACE = "SPACE",
  HEADING_2 = "HEADING_2",
  DIVIDER = "DIVIDER",
  BULLET = "BULLET",
  SUB_BULLET = "SUB_BULLET",
  SUB_TITLE = "SUB_TITLE",
}

export interface Link {
  text: string;
  url: string;
  label: string;
}

export interface ResumeComponent {
  type: ResumeComponentType;
  text?: string;
  bold?: string;
  url?: string;
  testId?: string;
  smallFont?: boolean;
  links?: Link[];
  position?: string;
  company?: string;
  dates?: string;
  location?: string;
}

export const getResume = (): ResumeComponent[] => {
  if (process.env.NEXT_PUBLIC_RESUME_JSON) {
    return JSON.parse(process.env.NEXT_PUBLIC_RESUME_JSON);
  }
  throw new Error("NEXT_PUBLIC_RESUME_JSON not set!");
};

export const getCoverBlurb = (): ResumeComponent[] => {
  if (process.env.NEXT_PUBLIC_COVER_BLURB_JSON) {
    return JSON.parse(process.env.NEXT_PUBLIC_COVER_BLURB_JSON);
  }
  throw new Error("NEXT_PUBLIC_COVER_BLURB_JSON not set!");
};

export const WithBoldText = (props: {
  component: ResumeComponent;
}): JSX.Element => {
  const { bold, text, smallFont, testId, links } = props.component;

  if (bold && text && text.indexOf(bold) > -1) {
    const boldStart = text.indexOf(bold);
    const boldEnd = boldStart + bold.length;
    const beforeText = text.substring(0, boldStart);
    const afterText = text.substring(boldEnd, text.length);
    let linkMatches: Link[] = [];

    if (links != null) {
      linkMatches = links.filter((link) => link.text === bold);
    }

    return (
      <p
        className={`${smallFont != null && smallFont === true ? "text-xs" : "text-sm"}`}
        data-testid={testId}
      >
        {beforeText}
        {linkMatches.length > 0 && (
          <a
            className="font-bold link"
            data-testid={testId ? `${testId}_bold` : ""}
            href={linkMatches[0].url}
            title={linkMatches[0].label}
          >
            {bold}
          </a>
        )}
        {linkMatches.length === 0 && (
          <span
            className="font-bold"
            data-testid={testId ? `${testId}_bold` : ""}
          >
            {bold}
          </span>
        )}
        {afterText}
      </p>
    );
  }

  return (
    <p
      className={`${smallFont != null && smallFont === true ? "text-xs" : "text-sm"}`}
      data-testid={testId}
    >
      {text ?? ""}
    </p>
  );
};

export const formatResume = (resume: ResumeComponent[]): JSX.Element => {
  return (
    <>
      {resume.map((component, index) => {
        const {
          type,
          text,
          url,
          testId,
          links,
          position,
          company,
          dates,
          location,
        } = component;

        switch (type) {
          case ResumeComponentType.TITLE:
            return (
              <p
                key={index}
                className="text-lg font-bold mb-5"
                data-testid={testId}
              >
                {text ?? ""}
              </p>
            );
          case ResumeComponentType.SUB_TITLE:
            return (
              <div
                key={index}
                className="flex flex-row justify-between items-center"
              >
                <p className=" text-sm" data-testid={testId}>
                  {text ?? ""}
                </p>
                <div className="flex flex-row gap-x-3">
                  {(links ?? []).map((link, index) => (
                    <a
                      key={index}
                      className="link text-sm font-bold"
                      data-testid={testId}
                      href={link.url ?? ""}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.text ?? ""}
                    </a>
                  ))}
                </div>
              </div>
            );
          case ResumeComponentType.PARAGRAPH:
            return <WithBoldText key={index} component={component} />;
          case ResumeComponentType.BULLET:
            return (
              <ul key={index} className="list-disc pl-6">
                <li>
                  <WithBoldText component={component} />
                </li>
              </ul>
            );
          case ResumeComponentType.SUB_BULLET:
            return (
              <ul key={index} className="list-disc pl-12">
                <li>
                  <WithBoldText component={component} />
                </li>
              </ul>
            );
          case ResumeComponentType.HEADING:
            return (
              <p
                key={index}
                className="font-semibold text-sm"
                data-testid={testId}
              >
                {text ?? ""}
              </p>
            );
          case ResumeComponentType.HEADING_2:
            return (
              <p key={index} className="mb-2 text-sm" data-testid={testId}>
                <span className="font-semibold">{position ?? ""}</span> |{" "}
                <span className="font-semibold">{company ?? ""}</span>
                {" | "}
                <i>
                  <span>{dates ?? ""}</span>, <span>{location ?? ""}</span>
                </i>
              </p>
            );
          case ResumeComponentType.DATES:
            return (
              <p key={index} className="mb-2 mt-1 text-xs" data-testid={testId}>
                {text ?? ""}
              </p>
            );
          case ResumeComponentType.BLOCK_QUOTE:
            return (
              <p
                key={index}
                className="border-l-black border-l-3 pl-4 py-2 mt-3"
              >
                <i data-testid={testId}>{text ?? ""}</i>
              </p>
            );
          case ResumeComponentType.LINK:
            return (
              <div key={index}>
                <a
                  className="link text-sm"
                  data-testid={testId}
                  href={url ?? ""}
                  rel="noreferrer"
                  target="_blank"
                >
                  {text ?? ""}
                </a>
              </div>
            );
          case ResumeComponentType.SPACE:
            return <br key={index} data-testid={testId} />;
          case ResumeComponentType.DIVIDER:
            return <hr key={index} className="my-4" />;
          default:
            return (
              <div key={index} data-testid={testId}>
                {text ?? ""}
              </div>
            );
        }
      })}
    </>
  );
};
