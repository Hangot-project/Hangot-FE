"use client";

import React from "react";
import styles from "./main.module.css";
import Image from "next/image";
import { Banner, Menu } from "../../../public/svgs";
import { SearchBox, QuickMenu, DataBoard } from "../../components";
import { useIncreaseCount } from "../../hooks";

const DATA_COUNT = 2379;

const QUICK_MENU = [
  {
    src: Menu,
    title: "입학",
  },
  {
    src: Menu,
    title: "학생",
  },
  {
    src: Menu,
    title: "학사",
  },
  {
    src: Menu,
    title: "국제",
  },
  {
    src: Menu,
    title: "복지",
  },
  {
    src: Menu,
    title: "재정",
  },
  {
    src: Menu,
    title: "취창업",
  },
  {
    src: Menu,
    title: "학술",
  },
  {
    src: Menu,
    title: "장학",
  },
];

export default function Main({ populars, news }) {
  const dataCount = useIncreaseCount(DATA_COUNT);
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
            width: "65.5rem",
          }}
        />
      </div>

      {/* 퀵메뉴 */}
      <section>
        <div className={styles.search}>
          {/* 퀵메뉴 */}
          <div className={styles.menuGrid}>
            {QUICK_MENU.map((menu) => (
              <QuickMenu image={menu.src} title={menu.title} />
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
            url={`search-result?sort=스크랩순`}
          />

          {/* 신규데이터 */}
          <DataBoard title="신규 데이터" dataList={news} url={"search-result"} />
        </div>
      </section>
    </div>
  );
}
