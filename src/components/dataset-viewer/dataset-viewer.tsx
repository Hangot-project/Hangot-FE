"use client";

import React, { CSSProperties, useCallback, useState } from "react";
import { Dataset } from "../../api/dataset";
import { BarChart } from "../bar-chart/bar-chart";
import styles from "./dataset-viewer.module.css";
import { DatasetTable } from "../dataset-table/dataset-table";
import Image from "next/image";
import {
  GraphActive,
  GraphInactive,
  TableActive,
  TableInactive,
} from "../../../public/svgs";

export function DatasetViewer({
  title,
  dataset,
  style,
}: {
  title: string;
  dataset: Dataset;
  style?: CSSProperties;
}) {
  const [isBarActive, setIsBarActive] = useState<boolean>(true);

  //* 데이터 시각화 선택 버튼
  const Buttons = useCallback(() => {
    if (isBarActive) {
      return (
        <>
          <Image
            src={GraphActive}
            alt="그래프 활성화"
            className={styles.selectBtn}
            onClick={() => setIsBarActive(true)}
          />
          <Image
            style={{
              marginLeft: 8,
            }}
            src={TableInactive}
            alt="표 비활성화"
            className={styles.selectBtn}
            onClick={() => setIsBarActive(false)}
          />
        </>
      );
    }
    return (
      <>
        <Image
          src={GraphInactive}
          alt="그래프 비활성화"
          className={styles.selectBtn}
          onClick={() => setIsBarActive(true)}
        />
        <Image
          style={{
            marginLeft: 8,
          }}
          src={TableActive}
          alt="표 활성화"
          className={styles.selectBtn}
          onClick={() => setIsBarActive(false)}
        />
      </>
    );
  }, [isBarActive]);

  return (
    <div style={{ ...style }}>
      {/* //* 제목 & 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2.5rem",
        }}
      >
        {/* //? 제목 */}
        <h3 className={styles.sheetSubtitle}>{title}</h3>
        {/* //? 버튼 */}
        <div
          style={{
            display: "flex",
          }}
        >
          <Buttons />
        </div>
      </div>

      {/* //* 그래프 */}
      {isBarActive ? (
        <BarChart x_axis_name={dataset.x_axis_name} dataset={dataset} />
      ) : (
        <DatasetTable dataset={dataset} />
      )}
    </div>
  );
}
