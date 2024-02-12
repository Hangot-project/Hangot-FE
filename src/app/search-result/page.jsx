import React from "react";
import SearchResult from "./search-result";
import { getSearchResults } from "../../api/search-result";

export default async function Page({ searchParams }) {
  const pageStr = searchParams["page"];
  const theme = searchParams["theme"];
  // console.log(theme); // ex. [ '입학', '취업' ]

  if (pageStr && /^[^0]\d*/.test(pageStr)) {
    // TODO: 404 page
  }

  // TODO:
  const response = await getSearchResults(searchParams["keyword"], pageStr, theme);
  return (
    <SearchResult
      results={response.simpleDatasetList}
      totalElement={response.totalElement}
      totalPage={response.totalPage}
      initPage={pageStr}
    />
  );
}
