import { Dataset } from "../../api/dataset";
import styles from "./dataset-table.module.css";

function DatasetTable({ dataset }: { dataset: Dataset }) {
  const colWidthPercent = 100 / (dataset.x_label.length + 1);
  return (
    <>
      <table className={styles.table}>
        <colgroup>
          {new Array(dataset.x_label.length + 1).fill(0).map((value, index) => (
            <col key={`cg${index}`} width={`${colWidthPercent}%`} />
          ))}
        </colgroup>
        {/* 1번 행 - 라벨 표시 */}
        <tr>
          <th></th>
          {dataset.x_label.map((label, index) => (
            <th key={index}>{label}</th>
          ))}
        </tr>
        {/* 데이터 표시 영역 */}
        {dataset.dataName.map((label, index) => (
          <tr key={`row${index}`}>
            <th>{label}</th>
            {dataset.dataList[index].map((value, index) => (
              <td key={`col${index}`}>{value}</td>
            ))}
          </tr>
        ))}
      </table>
    </>
  );
}

export default DatasetTable;
