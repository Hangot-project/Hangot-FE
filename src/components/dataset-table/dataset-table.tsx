"use client";

import { DatasetTableType } from "../../shared/types/dataset";
import styles from "./dataset-table.module.css";
import styled from "@emotion/styled";

interface Props {
  tableData: DatasetTableType | null;
}

export function DatasetTable({ tableData }: Props) {
  const colWidthPercent = tableData ? 100 / tableData.label.length : 0;

  return (
    <>
      {tableData && (
        <Wrapper>
          <table className={styles.table}>
            <colgroup>
              {new Array(tableData.label.length).fill(0).map((value, index) => (
                <col key={`cg${index}`} width={`${colWidthPercent}%`} />
              ))}
            </colgroup>
            {/* 1번 행 - 라벨 표시 */}
            <tr>
              {tableData.label.map((label, index) => (
                <th key={index}>{label}</th>
              ))}
            </tr>
            {/* 데이터 표시 영역 */}
            {tableData.dataList.map((_, index) => (
              <tr key={`row${index}`}>
                {tableData.dataList[index].map((value, index) => (
                  <td key={`col${index}`}>{value}</td>
                ))}
              </tr>
            ))}
          </table>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  overflow-x: auto;
  overflow-y: auto;
  height: 40rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;
