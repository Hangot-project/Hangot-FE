import styles from "./dataset-type-icon.module.css";
import { DataType, colorMatch } from "../../constants";

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
