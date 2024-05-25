"use client";

import { useEffect, useState } from "react";
import { DatasetTableType } from "../../shared/types/dataset";
import styles from "./dataset-table.module.css";
import { getDatasetTable } from "../../shared/api/dataset-visual/getDatasetTable";

interface Props {
  datasetId: number;
}

export function DatasetTable({ datasetId }: Props) {
  const [dataset, setDataset] = useState<DatasetTableType>();

  useEffect(() => {
    async function fetchData() {
      const res = await getDatasetTable(datasetId);

      if (res === null) {
        alert(`데이터 시각화 정보를 불러오는데 실패했습니다.`);
        return;
      }

      setDataset(res);
    }
    fetchData();
  }, []);

  const colWidthPercent = dataset ? 100 / dataset.label.length : 0;

  return (
    <>
      {dataset && (
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
      )}
    </>
  );
}
