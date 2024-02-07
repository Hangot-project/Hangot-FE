import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Layout, SearchSortDropdown } from "../components";
import styles from "../styles/searchResult.module.css";
import Image from "next/image";
import { ResetIcon } from "../../public/svgs";
import { StickHorizonSmall } from "../../public/svgs";

export const dynamic = "force-dynamic";

export default function SearchResult() {
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState("");
  const [resultCount, setResultCount] = useState(0);

  //TODO: reset button event handler
  const handleResetClick = useCallback(() => {
    alert("초기화 버튼 클릭");
  }, []);

  //* url에서 검색어 쿼리 추출
  useEffect(() => {
    if (searchParams.has("search")) {
      setKeyword(searchParams.get("search"));
    }
  }, [searchParams]);

  return (
    <Layout>
      {/* //* navigate info box */}
      <div className={styles.navigateInfoContainer}>
        <p>Home {" > "} 데이터 찾기</p>
      </div>

      {/* //* 검색창 */}
      {/* //TODO */}

      {/* //* 검색어 안내 문구 */}
      {keyword ? (
        <h1 className={styles.keywordTitle}>
          <span>' {keyword} '</span> 에 대한 {resultCount.toLocaleString()}개의 검색
          결과
        </h1>
      ) : (
        <h1 className={styles.keywordTitle}>
          {resultCount.toLocaleString()}개의 데이터 열람 가능
        </h1>
      )}

      {/* //* 검색 필터 & 검색 결과 리스트 표출 영역 */}
      <main className={styles.mainContainer}>
        {/* //? 데이터 유형별 필터 */}
        <section>
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionTitle}>필터</h2>
            <div className={styles.resetTextContainer} onClick={handleResetClick}>
              <Image src={ResetIcon} />
              <p className={styles.resetText}>초기화</p>
            </div>
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />

          {/* //? 주제별 */}
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionSubtitle}>주제별</h2>
            <Image src={StickHorizonSmall} />
          </div>
        </section>

        {/* //? 검색 결과 리스트 */}
        <section>
          <div className={styles.sectionTitleWrapper}>
            {/* //* 검색 결과 개수 */}
            <h2 className={styles.sectionTitle}>
              전체{" "}
              <span className={styles.highlightText}>
                {resultCount.toLocaleString()}
              </span>
              건
            </h2>

            {/* //* 검색 필터 */}
            <div className={styles.rowWrapper}>
              <SearchSortDropdown />
              <SearchSortDropdown style={{ marginLeft: "0.25rem" }} />
            </div>
          </div>

          {/* //? division line */}
          <div className={styles.divisionLine} />
        </section>
      </main>
    </Layout>
  );
}
