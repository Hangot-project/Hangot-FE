"use client";

import React, { useCallback, useEffect, useState } from "react";
import styles from "./notice.module.css";
import { SearchSortDropdown, NoticeCard } from "../../components";
import { NOTICE_SORT_TYPES, NOTICE_SORT_VALUES } from "../../constants";
import { NoticeResult } from "../../api/notice";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { updateQueryString } from "../../utils";
import Link from "next/link";
import { getPageArray } from "../../utils/search/get-page-array";
import { Pagination } from "../../components";

export function Notice({
  result,
  initPage,
}: {
  result: NoticeResult;
  initPage: number;
}) {
  const page = initPage ? initPage : 0;
  const [selectedSort, setSelectedSort] = useState<NOTICE_SORT_TYPES>("최신순");
  const pathName = usePathname();
  const searchParams = useSearchParams().toString();
  const router = useRouter();

  console.log(getPageArray(page, result.totalPage));

  const updateQuery = useCallback(
    (type: "create" | "append" | "remove", name: string, value?: any) => {
      return updateQueryString({
        type,
        name,
        value,
        searchParams,
      });
    },
    [searchParams, updateQueryString],
  );

  useEffect(() => {
    if (selectedSort) {
      router.push(`${pathName}?${updateQuery("create", "sort", selectedSort)}`);
    }
  }, [selectedSort]);

  return (
    <div>
      {/* //* 제목 */}
      <h1 className={styles.title}>공지사항</h1>
      <div className={styles.contents}>
        {/* //* 주제 항목 */}
        <div className={styles.nav}>
          <p>전체</p>
        </div>
        {/* //* 검색결과 수 & 정렬 */}
        <div className={styles.filterContainer}>
          <p>{result.totalElement.toLocaleString()}개의 공지</p>
          <SearchSortDropdown
            items={[...NOTICE_SORT_VALUES]}
            selectedItem={selectedSort}
            setSelectedItem={setSelectedSort}
          />
        </div>

        {/* //* 검색 결과 리스트 */}
        <div className={styles.noticeList}>
          {result.data.map((notice, index) => (
            <div key={index}>
              <Link href={`/notice/${notice.noticeId}`}>
                <NoticeCard notice={notice} />
              </Link>
              {index !== result.data.length - 1 && (
                <div className={styles.divisionLine} />
              )}
            </div>
          ))}
        </div>

        {result.totalElement > 0 && (
          <Pagination
            pathName={pathName}
            searchParams={searchParams}
            currentPage={page}
            totalPage={result.totalPage}
          />
        )}
      </div>
    </div>
  );
}
