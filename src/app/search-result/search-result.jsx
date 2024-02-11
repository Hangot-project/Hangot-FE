"use client";

import React, { useState } from "react";
import { SearchSortDropdown } from "../../components";
import styles from "./searchResult.module.css";
import Image from "next/image";
import { ResetIcon } from "../../../public/svgs";
import { StickHorizonSmall } from "../../../public/svgs";
import { Dataset } from "../../api/search-result";

/**
 *
 * @param {{keyword: string | null; results: Dataset[]; totalPage: number;}} param0
 * @returns
 */
export default function SearchResult({ keyword = null, results, totalPage }) {
  //TODO: reset button event handler
  const handleResetClick = () => {
    alert("초기화 버튼 클릭");
  };

  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedPagination, setSelectedPagination] = useState(1);

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
          <span>' {keyword} '</span> 에 대한 {results.length.toLocaleString()}개의
          검색 결과
        </h1>
      ) : (
        <h1 className={styles.keywordTitle}>
          {results.length.toLocaleString()}개의 데이터 열람 가능
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
                {results.length.toLocaleString()}
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
          {results.map((dataset) => (
            <div key={dataset.datasetId}>
              <h1>{dataset.title}</h1>
              <p>{dataset.description}</p>
              <h5>조회수: {dataset.view}</h5>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
