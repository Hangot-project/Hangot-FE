import React from "react";
import SearchResult from "./search-result";
import { notFound } from "next/navigation";
import { ParamToSearchResultProps } from "../../../utils/param-to-search-result-props";
import { getSearchResults } from "../../../shared/api/dataset/getSearchResults";

export const dynamic = "force-dynamic";

export default async function Page({ searchParams }) {
  const keyword = searchParams["keyword"];
  const pageStr = searchParams["page"];
  const type = ParamToSearchResultProps(searchParams["types"]);
  const organization = ParamToSearchResultProps(searchParams["organizations"]);
  const tag = ParamToSearchResultProps(searchParams["tags"]);
  const sort = searchParams["sort"];

  if (pageStr && !/^[1-9]\d*$/.test(pageStr)) {
    notFound();
  }

  const response = await getSearchResults(
    keyword,
    pageStr,
    type,
    organization,
    tag,
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
      initPage={pageStr ? parseInt(pageStr) : 1}
    />
  );
}
