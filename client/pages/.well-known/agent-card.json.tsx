import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getAgentCardJson } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "application/json; charset=utf-8",
  getAgentCardJson,
);

export default RawResponsePage;
