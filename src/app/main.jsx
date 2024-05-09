"use client"

import React from "react";
import styles from "./main.module.css";
import Image from "next/image";
import { Banner, Menu } from "../../public/svgs";
import { SearchBox, QuickMenu, DataBoard } from "../../src/components";

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

export default function Main({ listData }) {
  return (
    <>
      {/* 메인페이지 배너 */}
      <section>
        <div className={styles.banner}>
          <div className={styles.bannerWrapper}>
            <div className={styles.banner_info}>
              <p className={styles.info_heading}>2,379 개 데이터가<br />데이터 포털에 있습니다.</p>
              <p className={styles.info_text}>한양대학교 ERICA 데이터포털에서는 <br />한양대학교 ERICA에서 보유하고 있는 공공데이터를 <br />발굴/개방하고 있습니다.</p>
            </div>
            <Image src={Banner} />
          </div>
        </div>
      </section>

      {/* 검색창 및 퀵메뉴 */}
      <section>
        <div className={styles.search}>
            {/* 검색창 */}
            <div className={styles.searchbox}>
                <div className={styles.line} />
                <SearchBox
                  style={{
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    borderRadius: "75px",
                    zIndex: 1,
                  }} 
                />
            </div>

            {/* 퀵메뉴 */}        
            <div className={styles.menuGrid}>
                {QUICK_MENU.map((menu) => (
                    <QuickMenu
                    image={menu.src}
                    title={menu.title}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* 인기데이터 및 신규데이터 */}
      <section>
        {/* 인기데이터 */}
        <div className={styles.databoardGrid}>
          <DataBoard
            title="인기데이터"
            dataList={listData}
            url={"search-result"}
          />

          {/* 신규데이터 */}
          <DataBoard
            title="신규데이터"
            dataList={listData}
            url={"search-result"}
          />
        </div>
      </section>
    </>
  );
}