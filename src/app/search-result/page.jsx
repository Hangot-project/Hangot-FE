import React from "react";
import SearchResult from "./search-result";
import { getSearchResults } from "../../api/search-result";
import { notFound } from "next/navigation";

export default async function Page({ searchParams }) {
  const keyword = searchParams["keyword"];
  const pageStr = searchParams["page"];
  const theme = searchParams["theme"];
  // console.log(theme); // ex. [ '입학', '취업' ]
  const organization = searchParams["organization"];
  const sort = searchParams["sort"];

  if (pageStr && !/^[^0]\d*/.test(pageStr)) {
    notFound();
  }

  // TODO:
  const response = await getSearchResults(
    keyword,
    pageStr,
    theme,
    organization,
    sort,
  );
  return (
    <SearchResult
      results={response.data}
      totalElement={response.totalElement}
      totalPage={response.totalPage}
      initPage={pageStr}
    />
  );
}
