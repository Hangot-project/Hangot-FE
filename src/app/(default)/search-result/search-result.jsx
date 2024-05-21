"use client";

import React, { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FilterCheckButton,
  SearchBox,
  SearchSortDropdown,
  SimpleDatasetCard,
} from "../../../components";
import styles from "./searchResult.module.css";
import Image from "next/image";
import { ResetIcon } from "../../../../public/svgs";
import { StickHorizonSmall } from "../../../../public/svgs";
import Link from "next/link";
import { useEffect } from "react";
import {
  THEME_VALUES,
  ORGANIZATION_VALUES,
  DATA_TYPES,
  SORT_VALUES,
} from "../../../constants";
import { updateQueryString } from "../../../utils";
import { Pagination } from "../../../components";

/**
 *
 * @param {{
 *    results: import("../../../types/dataset").DatasetInfo[];
 *    totalElement: number;
 *    totalPage: number;
 *    initPage: number;
 * }}
 * @returns
 */
export default function SearchResult({
  results,
  totalElement,
  totalPage,
  initPage,
}) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const keyword = searchParams.get("keyword");
  const initSort = searchParams.get("sort");

  const [selectedSort, setSelectedSort] = useState(initSort);

  /**
   * 쿼리 파라미터를 수정할 때 수정하는 함수
   * @returns {string}
   */
  const updateQuery = useCallback(
    /**
     *
     * @param {"create" | "append" | "remove"} type - 수정할 작업
     * @param {string} name - 수정할 파라미터의 이름
     * @param {any} value - 수정할 파라미터의 값
     * @returns
     */
    (type, name, value) => {
      return updateQueryString({
        type,
        name,
        value,
        searchParams: searchParams.toString(),
      });
    },
    [updateQueryString, searchParams],
  );

  /**
   * 필터 버튼 클릭시 실행되는 함수
   */
  const handleFilterClick = useCallback(
    (queryName, value) => {
      if (!Array.from(searchParams.values()).includes(value)) {
        router.push(`${pathName}?${updateQuery("append", queryName, value)}`, {
          scroll: false,
        });
        return;
      }

      router.push(`${pathName}?${updateQuery("remove", queryName, value)}`, {
        scroll: false,
      });
    },
    [searchParams, updateQuery],
  );

  /**
   * 초기화 버튼 클릭시 실행되는 함수
   */
  const handleResetClick = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("theme");
    params.delete("organization");
    params.delete("type");

    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  }, [searchParams]);

  const handleSearchSubmit = useCallback(
    /**
     * 검색 제출시 실행되는 함수. 파라미터는 search-box 컴포넌트 내에서 전달한다.
     * @param {FormEvent<HTMLFormElement>} event - form 태그의 onSubmit 함수 이벤트 객체
     * @param {string} keyword - 사용자가 입력한 검색 키워드
     * @returns
     */
    (event, keyword) => {
      event.preventDefault();

      if (keyword) {
        router.push(`${pathName}?${updateQuery("create", "keyword", keyword)}`);
        return;
      }

      router.push(`${pathName}?${updateQuery("remove", "keyword")}`);
    },
    [updateQuery],
  );

  /**
   * 정렬 필터 조건이 변경될 때마다 서버측에 다시 요청
   */
  useEffect(() => {
    if (selectedSort) {
      router.push(`${pathName}?${updateQuery("create", "sort", selectedSort)}`, {
        scroll: false,
      });
    }
  }, [selectedSort]);

  return (
    <div>
      {/* //* navigate info box */}
      <div className={`noLayoutPadding ${styles.navigateInfoContainer}`}>
        <p>Home {" > "} 데이터 찾기</p>
      </div>

      {/* //* 검색창 */}
      {/* //TODO */}
      <SearchBox
        style={{
          marginTop: "3.75rem",
          marginBottom: "6rem",
        }}
        handleSubmit={handleSearchSubmit}
        initKeyword={searchParams.get("keyword")}
      />

      {/* //* 검색어 안내 문구 */}
      {keyword ? (
        <h1 className={styles.keywordTitle}>
          <span>' {keyword} '</span> 에 대한 {totalElement.toLocaleString()}개의 검색
          결과
        </h1>
      ) : (
        <h1 className={styles.keywordTitle}>
          {totalElement.toLocaleString()}개의 데이터 열람 가능
        </h1>
      )}

      {/* //* 검색 필터 & 검색 결과 리스트 표출 영역 */}
      <main className={styles.mainContainer}>
        {/* //? 데이터 유형별 필터 */}
        <section>
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionTitle}>필터</h2>
            <div className={styles.resetTextContainer} onClick={handleResetClick}>
              <Image src={ResetIcon} alt="초기화 버튼 이미지" />
              <p className={styles.resetText}>초기화</p>
            </div>
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //? 주제별 */}
          <div className={styles.filterTitleWrapper}>
            <h2 className={styles.sectionSubtitle}>주제별</h2>
            <Image src={StickHorizonSmall} alt="-" />
          </div>

          <div>
            {THEME_VALUES.map((value, index) => (
              <FilterCheckButton
                key={index}
                isSelected={Array.from(searchParams.values()).includes(value)}
                text={value}
                value={value}
                handleClick={() => handleFilterClick("theme", value)}
              />
            ))}
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //? 조직별 */}
          <div className={styles.filterTitleWrapper}>
            <h2 className={styles.sectionSubtitle}>조직별</h2>
            <Image src={StickHorizonSmall} alt="-" />
          </div>

          <div>
            {ORGANIZATION_VALUES.map((value, index) => (
              <FilterCheckButton
                key={index}
                isSelected={Array.from(searchParams.values()).includes(value)}
                text={value}
                value={value}
                handleClick={() => handleFilterClick("organization", value)}
              />
            ))}
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //? 파일 유형별 */}
          <div className={styles.filterTitleWrapper}>
            <h2 className={styles.sectionSubtitle}>제공유형</h2>
            <Image src={StickHorizonSmall} alt="-" />
          </div>

          <div>
            {DATA_TYPES.map((value, index) => (
              <FilterCheckButton
                key={index}
                isSelected={Array.from(searchParams.values()).includes(value)}
                text={value}
                value={value}
                handleClick={() => handleFilterClick("type", value)}
              />
            ))}
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />
        </section>

        {/* //? 검색 결과 리스트 */}
        <section>
          <div className={styles.sectionTitleWrapper}>
            {/* //* 검색 결과 개수 */}
            <h2 className={styles.sectionTitle}>
              전체{" "}
              <span className={styles.highlightText}>
                {totalElement.toLocaleString()}
              </span>
              건
            </h2>

            {/* //* 검색 필터 */}
            <div className={styles.rowWrapper}>
              <SearchSortDropdown
                items={SORT_VALUES}
                selectedItem={selectedSort}
                setSelectedItem={setSelectedSort}
              />
            </div>
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} style={{ marginBottom: "2rem" }} />

          {/* //* 검색 결과 리스트 */}
          {results.map((dataset, index) => (
            <Link
              key={`result${index}`}
              href={`/search-result/${dataset.datasetId}`}
              prefetch={false}
            >
              <SimpleDatasetCard
                key={dataset.datasetId}
                title={dataset.title}
                subtitle={dataset.description}
                from={dataset.organization}
                view={dataset.view}
                type={dataset.type}
                style={{
                  marginTop: "1rem",
                }}
              />
            </Link>
          ))}

          {/* //* 페이지 리스트 */}
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
