import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getSkillsSh } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "text/x-shellscript; charset=utf-8",
  getSkillsSh,
);

export default RawResponsePage;
