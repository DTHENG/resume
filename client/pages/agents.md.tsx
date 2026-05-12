import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getAgentsMd } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "text/markdown; charset=utf-8",
  getAgentsMd,
);

export default RawResponsePage;
