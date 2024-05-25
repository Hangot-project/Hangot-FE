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
import { getDatasetAxis } from "../../shared/api/dataset-visual/getDatasetAxis";
import { SearchSortDropdown } from "../drop-down/search-sort-dropdown";

export function DatasetViewer({
  datasetId,
  title,
  style,
}: {
  datasetId: number;
  title: string;
  style?: CSSProperties;
}) {
  const [isBarActive, setIsBarActive] = useState<boolean>(true);
  const [axis, setAxis] = useState<string[]>([]);
  const [selectedAxis, setSelectedAxis] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const result = await getDatasetAxis(datasetId);

      if (result === null) {
        alert(`데이터 시각화 정보를 불러오는데 실패했습니다.`);
        return;
      }

      setAxis(result.axis);
      setSelectedAxis(result.axis[0]);
    }

    fetchData();
  }, []);

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
          {isBarActive && (
            <SearchSortDropdown
              items={axis}
              selectedItem={selectedAxis}
              setSelectedItem={setSelectedAxis}
              width={"20rem"}
              style={{
                marginRight: "1rem",
              }}
            />
          )}
          <Buttons />
        </div>
      </div>

      {/* //* 그래프 */}
      {isBarActive ? (
        <BarChart datasetId={datasetId} colName={selectedAxis} />
      ) : (
        <DatasetTable datasetId={datasetId} />
      )}
    </div>
  );
}
