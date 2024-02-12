import React from "react";
import SearchResult from "./search-result";
import { getSearchResults } from "../../api/search-result";

export default async function Page({ searchParams }) {
  const pageStr = searchParams["page"];
  const theme = searchParams["theme"];
  // console.log(theme); // ex. [ '입학', '취업' ]
  const organization = searchParams["organization"];
  const sort = searchParams["sort"];

  if (pageStr && /^[^0]\d*/.test(pageStr)) {
    // TODO: 404 page
  }

  // TODO:
  const response = await getSearchResults(
    searchParams["keyword"],
    pageStr,
    theme,
    organization,
    sort,
  );
  return (
    <SearchResult
      results={response.simpleDatasetList}
      totalElement={response.totalElement}
      totalPage={response.totalPage}
      initPage={pageStr}
    />
  );
}
