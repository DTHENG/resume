import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getRobotsTxt } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "text/plain; charset=utf-8",
  getRobotsTxt,
);

export default RawResponsePage;
