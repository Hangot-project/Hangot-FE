"use client";

import React, { useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FilterCheckButton,
  SearchBox,
  SearchSortDropdown,
  SimpleDatasetCard,
} from "../../components";
import styles from "./searchResult.module.css";
import Image from "next/image";
import { NextButton, PreviousButton, ResetIcon } from "../../../public/svgs";
import { StickHorizonSmall } from "../../../public/svgs";
import { DatasetInfo } from "../../api/dataset";
import Link from "next/link";
import { useEffect } from "react";
import {
  THEME_VALUES,
  ORGANIZATION_VALUES,
  DATA_TYPES,
  SORT_VALUES,
} from "../../constants";
import { updateQueryString } from "../../utils";
import { getPageArray } from "../../utils/search/get-page-array";

/**
 *
 * @param {{
 *    results: DatasetInfo[];
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
  // ? 페이지 값 없이 렌더링하는 경우 -> 1페이지를 기본 페이지로 설정
  const _initPage = initPage ? initPage : "0";

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  const keyword = searchParams.get("keyword");

  const [selectedSort, setSelectedSort] = useState();

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
        searchParams,
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
        router.push(`${pathName}?${updateQuery("append", queryName, value)}`);
        return;
      }

      router.push(`${pathName}?${updateQuery("remove", queryName, value)}`);
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

    router.push(`${pathName}?${params.toString()}`);
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
      router.push(`${pathName}?${updateQuery("create", "sort", selectedSort)}`);
    }
  }, [selectedSort]);

  return (
    <>
      {/* //* navigate info box */}
      <div className={styles.navigateInfoContainer}>
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
              href={`/search-result/${dataset.datasetId}`}
              key={`result${index}`}
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
            <div
              className={"pagesContainer"}
              style={{
                margin: "5.625rem 0 2.25rem 0",
              }}
            >
              <div className={"pagesWrapper"}>
                {/* //? 이전 페이지 버튼 */}
                {parseInt(_initPage) > 0 && (
                  <Link
                    href={
                      _initPage == 1
                        ? `${pathName}?${updateQuery("remove", "page")}`
                        : `${pathName}?${updateQuery(
                            "create",
                            "page",
                            Math.max(1, parseInt(_initPage) - 1),
                          )}`
                    }
                  >
                    <Image src={PreviousButton} alt="이전 페이지 버튼" />
                  </Link>
                )}

                {/* //? 페이지 버튼 목록 */}
                {getPageArray(parseInt(_initPage), totalPage, 10).map(
                  (num, index) => (
                    <Link
                      // 첫 페이지의 경우 page 파라미터를 넘기면 안 되므로, 파라미터 삭제
                      href={`${pathName}?${updateQuery("create", "page", num - 1)}`}
                      key={`page${num}`}
                      className={`pageButton ${
                        _initPage == num - 1 ? "active" : ""
                      }`}
                    >
                      {num}
                    </Link>
                  ),
                )}

                {/* //? 다음 페이지 버튼 */}
                {parseInt(_initPage) < totalPage - 1 && (
                  <Link
                    href={`${pathName}?${updateQuery(
                      "create",
                      "page",
                      Math.min(totalPage, parseInt(_initPage) + 1),
                    )}`}
                  >
                    <Image src={NextButton} alt="다음 페이지 버튼" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
