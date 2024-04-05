import React from "react";
import SearchResult from "./search-result";
import { getSearchResults } from "../../api/dataset";
import { notFound } from "next/navigation";
import { ParamToSearchResultProps } from "../../utils/param-to-search-result-props";

export default async function Page({ searchParams }) {
  const keyword = searchParams["keyword"];
  const pageStr = searchParams["page"];
  const theme = ParamToSearchResultProps(searchParams["theme"]);
  const type = ParamToSearchResultProps(searchParams["type"]);
  const organization = ParamToSearchResultProps(searchParams["organization"]);
  const sort = searchParams["sort"];

  if (pageStr && !/^[^0]\d*/.test(pageStr)) {
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

  // TODO: 서버 에러에 대한 페이지 별도 추가 필요
  if (!response.success) {
    notFound();
  }

  const result = response.result;
  return (
    <SearchResult
      results={result.data}
      totalElement={result.totalElement}
      totalPage={result.totalPage}
      initPage={pageStr}
    />
  );
}
