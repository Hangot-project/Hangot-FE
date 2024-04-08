import styles from "./dataset-type-icon.module.css";
import { DataType } from "../../constants/dataset-search-params";

const colorMatch = Object.freeze({
  CSV: "#FFD361",
  XLS: "#4CE23F",
  XLSX: "#4CE23F",
  JSON: "#BA83FF",
  PDF: "#FF9061",
  DOCX: "#61D9FF",
});

export function DatasetTypeIcon({ type }: { type: DataType }) {
  const bgColor = colorMatch[type.toUpperCase()];
  return (
    <div
      style={{
        marginLeft: "1.25rem",
        backgroundColor: bgColor,
      }}
      className={styles.typeBox}
    >
      {type.toUpperCase()}
    </div>
  );
}
