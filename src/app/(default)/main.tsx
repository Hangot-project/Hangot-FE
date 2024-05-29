"use client";

import React, { FormEvent, useCallback } from "react";
import styles from "./main.module.css";
import Image from "next/image";
import { Banner } from "../../../public/svgs";
import { SearchBox, QuickMenu, DataBoard } from "../../components";
import { useIncreaseCount } from "../../hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  QUICK_MENU,
  SERVER_PARAMS_KEY,
} from "../../constants/dataset-search-params";
import { SortValueType } from "../../shared/types/dataset";

const DATA_COUNT = 2379;

const POPULAR_SORT_VALUE: SortValueType = "인기순";

export default function Main({ populars, news }) {
  const dataCount = useIncreaseCount(DATA_COUNT);

  const router = useRouter();

  // 검색 제출시 실행되는 함수. 파라미터는 search-box 컴포넌트 내에서 전달한다.
  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>, keyword: string) => {
      event.preventDefault();

      if (keyword) {
        router.push(`search-result?${SERVER_PARAMS_KEY.KEYWORD}=${keyword}`);
        return;
      }
    },
    [],
  );

  return (
    <div>
      {/* 메인페이지 배너 */}
      <main className={`noLayoutPadding ${styles.main}`}>
        <div>
          <p className={styles.info_heading}>
            {dataCount.toLocaleString()} 개 데이터가
            <br />
            데이터 포털에 있습니다.
          </p>
          <p className={styles.info_text}>
            한양대학교 ERICA 데이터포털에서는 <br />
            한양대학교 ERICA에서 보유하고 있는 공공데이터를 <br />
            발굴/개방하고 있습니다.
          </p>
        </div>
        <Image alt="메인 배너" src={Banner} />
      </main>

      {/* 검색창 */}
      <div className={`noLayout ${styles.searchbox}`}>
        <div className={`${styles.line}`} />
        <SearchBox
          boxstyle={{
            position: "absolute",
            backgroundColor: "#ffffff",
            borderRadius: "75px",
            zIndex: 1,
            width: "70%",
          }}
          handleSubmit={handleSearchSubmit}
        />
      </div>

      {/* 퀵메뉴 */}
      <section>
        <div className={styles.search}>
          {/* 퀵메뉴 */}
          <div className={styles.menuGrid}>
            {QUICK_MENU.map((menu) => (
              <Link href={`search-result?${SERVER_PARAMS_KEY.THEME}=${menu.title}`}>
                <QuickMenu image={menu.src} title={menu.title} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 인기데이터 및 신규데이터 */}
      <section>
        {/* 인기데이터 */}
        <div className={styles.databoardGrid}>
          <DataBoard
            title="인기 데이터"
            dataList={populars}
            url={`search-result?${SERVER_PARAMS_KEY.SORT}=${POPULAR_SORT_VALUE}`}
          />

          {/* 신규데이터 */}
          <DataBoard title="신규 데이터" dataList={news} url={"search-result"} />
        </div>
      </section>
    </div>
  );
}
