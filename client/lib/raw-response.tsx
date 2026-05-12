import type { GetServerSideProps, GetServerSidePropsContext } from "next";

type BodyFactory = (context: GetServerSidePropsContext) => string;

export const createRawResponse =
  (contentType: string, getBody: BodyFactory): GetServerSideProps =>
  async (context) => {
    const body = getBody(context);

    context.res.statusCode = 200;
    context.res.setHeader("Content-Type", contentType);
    context.res.setHeader(
      "Cache-Control",
      "public, max-age=3600, s-maxage=86400",
    );
    context.res.write(body);
    context.res.end();

    return {
      props: {},
    };
  };

export default function RawResponsePage() {
  return null;
}
