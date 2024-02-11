import React from "react";
import SearchResult from "./search-result";
import { getSearchResults } from "../../api/search-result";

export default async function Page({ searchParams }) {
  const pageStr = searchParams["page"];

  if (pageStr && /^[^0]\d*/.test(pageStr)) {
    // TODO: 404 page
  }

  const response = await getSearchResults(searchParams["keyword"], pageStr);
  return (
    <SearchResult
      results={response.simpleDatasetList}
      totalElement={response.totalElement}
      totalPage={response.totalPage}
      initPage={pageStr}
    />
  );
}
