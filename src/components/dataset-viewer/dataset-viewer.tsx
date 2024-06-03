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
import { SearchSortDropdown } from "../drop-down/search-sort-dropdown";
import styled from "@emotion/styled";
import { DatasetAxisResult } from "../../shared/api/dataset-visual/type";

export function DatasetViewer({
  datasetId,
  axisResult,
  title,
  style,
}: {
  datasetId: number;
  axisResult: DatasetAxisResult;
  title: string;
  style?: CSSProperties;
}) {
  const [isBarActive, setIsBarActive] = useState<boolean>(true);
  const [selectedAxis, setSelectedAxis] = useState<string>("");

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
          {axisResult !== null && isBarActive && (
            <SearchSortDropdown
              items={axisResult.axis}
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
      {axisResult !== null &&
        (isBarActive ? (
          <BarChart datasetId={datasetId} colName={selectedAxis} />
        ) : (
          <DatasetTable datasetId={datasetId} />
        ))}

      {axisResult === null && (
        <SuccessFailContainer>
          <SuccessFailTitle>
            ⚠️ 시각화 기능이 지원되지 않는 데이터 입니다.
          </SuccessFailTitle>
        </SuccessFailContainer>
      )}
    </div>
  );
}

const SuccessFailContainer = styled.div`
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessFailTitle = styled.h1``;
