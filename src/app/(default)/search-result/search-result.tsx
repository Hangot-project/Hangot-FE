"use client";

import React, { useState, useCallback, FormEvent, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  SearchBox,
  SearchSortDropdown,
  SimpleDatasetCard,
  Pagination,
} from "../../../components";
import styles from "./searchResult.module.css";
import Link from "next/link";
import { SORT_VALUES } from "../../../constants";
import { updateQueryString } from "../../../utils";
import { DatasetInfo } from "../../../shared/types/dataset";
import { SERVER_PARAMS_KEY } from "../../../constants/dataset-search-params";

interface Props {
  results: DatasetInfo[];
  totalElement: number;
  totalPage: number;
  initPage: number;
}

export default function SearchResult({
  results,
  totalElement,
  totalPage,
  initPage,
}: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const initSort = searchParams.get("sort");

  const [selectedSort, setSelectedSort] = useState(initSort);

  /**
   * URLSearchParams를 Record<string, string>으로 변환
   */
  const parseParamsToRecord = (params: string): Record<string, string> => {
    const parsed = new URLSearchParams(params);
    const result: Record<string, string> = {};
    parsed.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  };

  const updateQuery = useCallback(
    (
      type: "create" | "append" | "remove",
      name: string,
      value?: any,
      resetPage?: boolean,
    ): Record<string, string> => {
      const updated = updateQueryString({
        type,
        name,
        value,
        searchParams: searchParams.toString(),
        resetPage,
      });
      return parseParamsToRecord(updated);
    },
    [searchParams],
  );

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>, keyword: string) => {
      event.preventDefault();

      const updatedQuery = keyword
        ? updateQuery("create", SERVER_PARAMS_KEY.KEYWORD, keyword, true)
        : updateQuery("remove", SERVER_PARAMS_KEY.KEYWORD);

      const queryString = new URLSearchParams(updatedQuery).toString();
      router.push(`/search-result${queryString ? `?${queryString}` : ""}` as any);
    },
    [router, pathName, updateQuery],
  );

  useEffect(() => {
    if (selectedSort) {
      const updatedQuery = updateQuery(
        "create",
        SERVER_PARAMS_KEY.SORT,
        selectedSort,
      );
      const queryString = new URLSearchParams(updatedQuery).toString();
      router.push(`${pathName}${queryString ? `?${queryString}` : ""}` as any, {
        scroll: false,
      });
    }
  }, [selectedSort, router, pathName, updateQuery]);

  return (
    <div className={styles.root}>
      {/* 검색창 */}
      <div className={styles.searchContainer}>
        <SearchBox
          className={styles.searchBox}
          handleSubmit={handleSearchSubmit}
          initKeyword={searchParams.get(SERVER_PARAMS_KEY.KEYWORD)}
        />
      </div>

      {/* 검색 결과 */}
      <main className={styles.mainContainer}>
        <section className={styles.resultsSection}>
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionTitle}>
              전체{" "}
              <span className={styles.highlightText}>
                {totalElement.toLocaleString()}
              </span>
              건
            </h2>

            <div className={styles.rowWrapper}>
              <SearchSortDropdown
                items={[...SORT_VALUES]}
                selectedItem={selectedSort}
                setSelectedItem={setSelectedSort}
              />
            </div>
          </div>

          <div className={styles.divisionLine} style={{ marginBottom: "2rem" }} />

          <div className={styles.resultsGrid}>
            {results.map((dataset) => (
              <Link
                key={dataset.datasetId}
                href={{
                  pathname: `/search-result/${dataset.datasetId}`,
                }}
                prefetch={false}
              >
                <SimpleDatasetCard
                  title={dataset.title}
                  subtitle={dataset.description}
                  from={dataset.organization}
                  view={dataset.view}
                  type={dataset.type}
                  scrap={dataset.scrap}
                  createDate={dataset.createDate}
                  themeList={dataset.themeList}
                />
              </Link>
            ))}
          </div>

          {totalPage > 0 && (
            <Pagination
              pathName={pathName}
              searchParams={searchParams.toString()}
              currentPage={initPage}
              totalPage={totalPage}
            />
          )}
        </section>
      </main>
    </div>
  );
}
