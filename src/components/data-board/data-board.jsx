"use client";

import Link from "next/link";
import styles from "./data-board.module.css";

export function DataBoard({ title, url, dataList }) {
  return (
    <div className={styles.container}>
      {/* 메인페이지 인기 및 신규데이터 파트 헤더 */}
      <hgroup className={styles.headerContainer}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/${url}`}>
          <span className={styles.more}>더 보기 &gt;</span>
        </Link>
      </hgroup>

      {/* 메인페이지 인기 및 신규데이터 파트 바디 */}
      <div className={styles.dataBoard}>
        {dataList.map((value) => (
            <Link
              href={`/${url}/${value.id}`}
              key={value.id}
              className={styles.dataCard}
            >
              {/* 데이터 제목, 데이터 유형, 데이터 제공 기관 */}
              {/* TODO : 데이터 유형, 데이터 제공 기관 param에 추가 */}
              <section>
                <div>
                  <h3 className={styles.dataTitle}>{value.title}</h3>
                  <div className={styles.labelGroup}>
                    <span className={`${styles.boardLabel} ${styles.labelColor1}`}>데이터 유형</span>
                    <span className={`${styles.boardLabel} ${styles.labelColor2}`}>다운로드 가능</span>
                    <span className={`${styles.boardLabel} ${styles.labelColor3}`}>데이터 신청 필수</span>
                  </div>
                </div>
                <div className={styles.dataConst}>
                  <div>
                    <span className={styles.dataConstText}>기관명</span>
                  </div>
                </div>
              </section>
            </Link>
        ))}
      </div>
    </div>
  );
}