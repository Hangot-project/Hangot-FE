import React from "react";
import { getNotices } from "../../api/notice";
import { Notice } from "./notice";

async function Page({ searchParams }) {
  const sort = searchParams["sort"];
  const page = searchParams["page"] ? parseInt(searchParams["page"]) : 0;

  const response = await getNotices({
    sort,
    page,
  });

  return <Notice result={response} initPage={page} />;
}

export default Page;
