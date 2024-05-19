import React from "react";
import SearchResult from "./search-result";
import { notFound } from "next/navigation";
import { ParamToSearchResultProps } from "../../../utils/param-to-search-result-props";
import { getSearchResults } from "../../../api/dataset/getSearchResults";

export default async function Page({ searchParams }) {
  const keyword = searchParams["keyword"];
  const pageStr = searchParams["page"];
  const theme = ParamToSearchResultProps(searchParams["theme"]);
  const type = ParamToSearchResultProps(searchParams["type"]);
  const organization = ParamToSearchResultProps(searchParams["organization"]);
  const sort = searchParams["sort"];

  if (pageStr && pageStr !== "0" && !/^[1-9]\d*$/.test(pageStr)) {
    notFound();
  }

  const response = await getSearchResults(
    keyword,
    pageStr,
    theme,
    type,
    organization,
    sort,
  );

  if (response === null) {
    notFound();
  }

  const result = response.result;
  return (
    <SearchResult
      results={result.data}
      totalElement={result.totalElement}
      totalPage={result.totalPage}
      initPage={pageStr ? parseInt(pageStr) : 0}
    />
  );
}
