import RawResponsePage, { createRawResponse } from "@/lib/raw-response";
import { getLlmsFullTxt } from "@/lib/resume-content";

export const getServerSideProps = createRawResponse(
  "text/plain; charset=utf-8",
  getLlmsFullTxt,
);

export default RawResponsePage;
