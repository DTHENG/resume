import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getIndexMarkdown } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "text/markdown; charset=utf-8",
  getIndexMarkdown,
);

export default RawResponsePage;
