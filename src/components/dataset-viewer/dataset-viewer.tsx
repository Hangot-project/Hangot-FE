"use client";

import React, { CSSProperties, useCallback, useEffect, useState } from "react";
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
import { Dataset } from "../../shared/types/dataset";
import { getDatasetAxis } from "../../shared/api/dataset-visual/getDatasetAxis";

export function DatasetViewer({
  datasetId,
  title,
  dataset,
  style,
}: {
  datasetId: number;
  title: string;
  dataset: Dataset;
  style?: CSSProperties;
}) {
  const [isBarActive, setIsBarActive] = useState<boolean>(true);
  const [axis, setAxis] = useState<string[]>([]);

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

  useEffect(() => {
    async function fetchData() {
      const result = await getDatasetAxis(datasetId);

      if (result === null) {
        alert(`데이터 시각화 정보를 불러오는데 실패했습니다.`);
        return;
      }

      setAxis(result.axis);
    }

    fetchData();
  }, []);

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
