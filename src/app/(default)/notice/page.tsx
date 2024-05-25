import { getAllNotice } from "../../../shared/api/notice/getAllNotice";
import { Notice } from "./notice";

async function Page({ searchParams }) {
  const sort = searchParams["sort"];
  const page = searchParams["page"] ? parseInt(searchParams["page"]) : 0;

  const response = await getAllNotice({
    sort,
    page,
  });

  return <Notice result={response} initPage={page} />;
}

export default Page;
