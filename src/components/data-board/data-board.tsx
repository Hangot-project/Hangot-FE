"use client";

import Link from "next/link";
import styles from "./data-board.module.css";
import { DatasetBanner } from "../../api/dataset";
import { colorMatch } from "../../constants";

type Props = {
  title: string;
  url: string;
  dataList: DatasetBanner[];
};

export function DataBoard({ title, url, dataList }: Props) {
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
        {dataList?.map((dataset) => (
          <Link
            href={`/${url}/${dataset.datasetId}`}
            key={dataset.datasetId}
            className={styles.dataCard}
          >
            {/* 데이터 제목, 데이터 유형, 데이터 제공 기관 */}
            {/* TODO : 데이터 유형, 데이터 제공 기관 param에 추가 */}
            <section>
              <div>
                <h3 className={styles.dataTitle}>{dataset.title}</h3>
                <div className={styles.labelGroup}>
                  {/* //TODO: 백엔드 api dataset 연결시 실제 dataset type으로 연결 */}
                  <span
                    style={{
                      backgroundColor: `${colorMatch["csv".toUpperCase()]}`,
                    }}
                    className={styles.boardLabel}
                  >
                    <p>{"csv".toUpperCase()}</p>
                  </span>
                </div>
              </div>
              <div className={styles.dataConst}>
                <div>
                  <span className={styles.dataConstText}>
                    {dataset.organization}
                  </span>
                </div>
              </div>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
}
