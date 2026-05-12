import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getLlmsTxt } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "text/plain; charset=utf-8",
  getLlmsTxt,
);

export default RawResponsePage;
