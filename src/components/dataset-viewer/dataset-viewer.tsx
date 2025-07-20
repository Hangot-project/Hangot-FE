"use client";

import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { BarChart } from "../bar-chart/bar-chart";
import { LineChart } from "../line-chart/line-chart";
import { PieChart } from "../pie-chart/pie-chart";
import styles from "./dataset-viewer.module.css";
import { DatasetTable } from "../dataset-table/dataset-table";
import Image from "next/image";
import {
  GraphActive,
  GraphInactive,
  TableActive,
  TableInactive,
} from "../../../public/svgs";
import { SearchSortDropdown } from "../drop-down/search-sort-dropdown";
import { DatasetAxisResult } from "../../shared/api/dataset-visual/type";

export function DatasetViewer({
  datasetId,
  axisResult,
  style,
}: {
  datasetId: number;
  axisResult: DatasetAxisResult;
  title: string;
  style?: CSSProperties;
}) {
  const [isBarActive, setIsBarActive] = useState<boolean>(false);
  const [selectedAxis, setSelectedAxis] = useState<string>("");
  const [chartType, setChartType] = useState<"막대" | "선" | "파이">("막대");

  useEffect(() => {
    if (axisResult !== null) {
      setSelectedAxis(axisResult.axis[0]);
    }
  }, []);

  //* 데이터 시각화 선택 버튼
  const Buttons = useCallback(() => {
    if (isBarActive) {
      return (
        <>
          <Image
            src={TableInactive}
            alt="표 비활성화"
            className={styles.selectBtn}
            onClick={() => setIsBarActive(false)}
          />
          <Image
            src={GraphActive}
            alt="그래프 활성화"
            className={styles.selectBtn}
            onClick={() => setIsBarActive(true)}
          />
        </>
      );
    }
    return (
      <>
        <Image
          src={TableActive}
          alt="표 활성화"
          className={styles.selectBtn}
          onClick={() => setIsBarActive(false)}
        />
        <Image
          src={GraphInactive}
          alt="그래프 비활성화"
          className={styles.selectBtn}
          onClick={() => setIsBarActive(true)}
        />
      </>
    );
  }, [isBarActive]);

  return (
    <div
      style={{
        ...style,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* //* 제목 & 버튼 */}
      <div className={styles.headerContainer}>
        {/* //? 제목 */}
        <h3 className={styles.sheetSubtitle}>시각화 데이터</h3>
        {/* //? 버튼 */}
        <div className={styles.controlsContainer}>
          {axisResult !== null && isBarActive && (
            <>
              <SearchSortDropdown
                items={axisResult.axis}
                selectedItem={selectedAxis}
                setSelectedItem={setSelectedAxis}
                width={"12rem"}
              />
              <SearchSortDropdown
                items={["막대", "선", "파이"]}
                selectedItem={chartType}
                setSelectedItem={setChartType}
                width={"8rem"}
              />
            </>
          )}
          <div className={styles.buttonsContainer}>
            <Buttons />
          </div>
        </div>
      </div>

      {/* //* 그래프 */}
      <div style={{ flex: 1 }}>
        {axisResult !== null &&
          (isBarActive && selectedAxis ? (
            <>
              {chartType === "막대" && (
                <BarChart datasetId={datasetId} colName={selectedAxis} />
              )}
              {chartType === "선" && (
                <LineChart datasetId={datasetId} colName={selectedAxis} />
              )}
              {chartType === "파이" && (
                <PieChart datasetId={datasetId} colName={selectedAxis} />
              )}
            </>
          ) : (
            <DatasetTable datasetId={datasetId} />
          ))}
        {axisResult === null && (
          <div className={styles.warningContainer} style={{ flex: 1 }}>
            <h1 className={styles.warningTitle}>
              ⚠️ 시각화 기능이 지원되지 않는 데이터 입니다.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
