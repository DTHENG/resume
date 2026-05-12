import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getSitemapXml } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "application/xml; charset=utf-8",
  getSitemapXml,
);

export default RawResponsePage;
