"use client";

import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { SearchSortDropdown } from "../../components";
import styles from "./searchResult.module.css";
import Image from "next/image";
import { NextButton, PreviousButton, ResetIcon } from "../../../public/svgs";
import { StickHorizonSmall } from "../../../public/svgs";
import { Dataset } from "../../api/search-result";
import Link from "next/link";
import { useCallback } from "react";

/**
 *
 * @param {{
 *    keyword: string | null;
 *    results: Dataset[];
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
  const _initPage = initPage ? initPage : "1";

  const searchParams = useSearchParams();
  const pathName = usePathname();

  const keyword = searchParams.get("keyword");

  const [selectedFilter, setSelectedFilter] = useState("");

  //TODO: reset button event handler
  const handleResetClick = () => {
    alert("초기화 버튼 클릭");
  };

  /**
   * 원하는 쿼리 문자열을 생성하는 함수
   * @param {string} name
   * @param {string} value
   */
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <>
      {/* //* navigate info box */}
      <div className={styles.navigateInfoContainer}>
        <p>Home {" > "} 데이터 찾기</p>
      </div>

      {/* //* 검색창 */}
      {/* //TODO */}

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
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionSubtitle}>주제별</h2>
            <Image src={StickHorizonSmall} alt="" />
          </div>
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
                selectedItem={selectedFilter}
                setSelectedItem={setSelectedFilter}
              />
              <SearchSortDropdown style={{ marginLeft: "0.25rem" }} />
            </div>
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //* 검색 결과 리스트 */}
          {/* //TODO: 실제 데이터 정보에 맞게 변경 */}
          {results.map((dataset) => (
            <div key={dataset.datasetId}>
              <h1>{dataset.title}</h1>
              <p>{dataset.description}</p>
              <h5>조회수: {dataset.view}</h5>
            </div>
          ))}

          {/* //* 페이지 리스트 */}
          <div
            className={styles.pagesContainer}
            style={{
              margin: "0.75rem 0 2.25rem 0",
            }}
          >
            <div className={styles.pagesWrapper}>
              {/* //? 이전 페이지 버튼 */}
              <Link
                href={`${pathName}?${createQueryString(
                  "page",
                  Math.max(1, parseInt(_initPage) - 1),
                )}`}
              >
                <Image src={PreviousButton} alt="이전 페이지 버튼" />
              </Link>

              {/* //? 페이지 버튼 목록 */}
              {new Array(totalPage).fill(0).map((_, index) => (
                <Link
                  href={`${pathName}?${createQueryString("page", index + 1)}`}
                  key={index}
                  className={styles.pageButton}
                  style={
                    _initPage == index + 1
                      ? {
                          backgroundColor: "#767676",
                          color: "white",
                        }
                      : {}
                  }
                >
                  {index + 1}
                </Link>
              ))}

              {/* //? 다음 페이지 버튼 */}
              <Link
                href={`${pathName}?${createQueryString(
                  "page",
                  Math.min(totalPage, parseInt(_initPage) + 1),
                )}`}
              >
                <Image src={NextButton} alt="다음 페이지 버튼" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
