import styles from "./dataset-type-icon.module.css";
import { colorMatch } from "../../constants";

export function DatasetTypeIcon({ type }: { type: string }) {
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
