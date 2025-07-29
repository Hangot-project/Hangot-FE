"use client";

import { useEffect, useState } from "react";
import { DatasetTableType } from "../../shared/types/dataset";
import styles from "./dataset-table.module.css";
import { getDatasetTable } from "../../shared/api/dataset-visual/getDatasetTable";
import styled from "@emotion/styled";
import { isApiError } from "../../shared/types/error";

interface Props {
  datasetId: number;
  onNotSupported?: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
}

export function DatasetTable({ datasetId, onNotSupported, onLoadingChange }: Props) {
  const [dataset, setDataset] = useState<DatasetTableType>();

  useEffect(() => {
    async function fetchData() {
      const res = await getDatasetTable(datasetId);
      if (isApiError(res)) {
        if (res.status === 404) onNotSupported?.();
        onLoadingChange?.(false);
        return;
      }
      setDataset(res);
      onLoadingChange?.(false);
    }
    fetchData();
  }, [datasetId, onNotSupported, onLoadingChange]);

  const colWidthPercent = dataset ? 100 / dataset.label.length : 0;

  return (
    <>
      {dataset && (
        <Wrapper>
          <table className={styles.table}>
            <colgroup>
              {new Array(dataset.label.length).fill(0).map((value, index) => (
                <col key={`cg${index}`} width={`${colWidthPercent}%`} />
              ))}
            </colgroup>
            {/* 1번 행 - 라벨 표시 */}
            <tr>
              {dataset.label.map((label, index) => (
                <th key={index}>{label}</th>
              ))}
            </tr>
            {/* 데이터 표시 영역 */}
            {dataset.dataList.map((_, index) => (
              <tr key={`row${index}`}>
                {dataset.dataList[index].map((value, index) => (
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
