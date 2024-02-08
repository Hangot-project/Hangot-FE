import React from "react";
import SearchResult from "./search-result";
import { getSearchResults } from "../../api/search-result";

export default async function Page({ searchParams }) {
  const response = await getSearchResults(searchParams["search"]);
  return (
    <SearchResult
      keyword={searchParams["search"]}
      results={response.simpleDatasetList}
      totalPage={response.totalPage}
    />
  );
}
