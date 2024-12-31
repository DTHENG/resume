export enum ResumeComponentType {
  TITLE = "TITLE",
  PARAGRAPH = "PARAGRAPH",
  HEADING = "HEADING",
  DATES = "DATES",
  BLOCK_QUOTE = "BLOCK_QUOTE",
  LINK = "LINK",
  SPACE = "SPACE",
}

export interface ResumeComponent {
  type: ResumeComponentType;
  text?: string | null;
  bold?: string | null;
  url?: string | null;
  testId?: string | null;
  smallFont?: boolean | null;
}

export const getResume = (): ResumeComponent[] => {
  if (process.env.NEXT_PUBLIC_RESUME_JSON) {
    return JSON.parse(process.env.NEXT_PUBLIC_RESUME_JSON);
  }
  throw new Error("NEXT_PUBLIC_RESUME_JSON not set!");
};

export const formatResume = (resume: ResumeComponent[]): JSX.Element => {
  return (
    <>
      {resume.map((component, index) => {
        const { type, text, bold, url, testId, smallFont } = component;

        switch (type) {
          case ResumeComponentType.TITLE:
            return (
              <p
                key={index}
                className="text-xl font-bold mb-5"
                data-testid={testId}
              >
                {text ?? ""}
              </p>
            );
          case ResumeComponentType.PARAGRAPH:
            if (bold && text && text.indexOf(bold) > -1) {
              const boldStart = text.indexOf(bold);
              const boldEnd = boldStart + bold.length;
              const beforeText = text.substring(0, boldStart);
              const afterText = text.substring(boldEnd, text.length);

              return (
                <p
                  key={index}
                  className={`${smallFont != null && smallFont === true ? "text-sm" : ""}`}
                  data-testid={testId}
                >
                  {beforeText}
                  <span
                    className="font-bold"
                    data-testid={testId ? `${testId}_bold` : ""}
                  >
                    {bold}
                  </span>
                  {afterText}
                </p>
              );
            }

            return (
              <p
                key={index}
                className={`${smallFont != null && smallFont === true ? "text-sm" : ""}`}
                data-testid={testId}
              >
                {text ?? ""}
              </p>
            );
          case ResumeComponentType.HEADING:
            return (
              <p
                key={index}
                className="mt-8 font-semibold text-lg"
                data-testid={testId}
              >
                {text ?? ""}
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
                  className="link"
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
