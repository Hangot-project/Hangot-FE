import styles from "./dataset-type-icon.module.css";
import { colorMatch } from "../../constants";

export function DatasetTypeIcon({ type }: { type: string }) {
  const bgColor =
    colorMatch[type.toUpperCase() as keyof typeof colorMatch] || colorMatch.default;
  return (
    <div
      style={{
        marginLeft: "1.25rem",
        backgroundColor: bgColor,
        color: "black",
      }}
      className={styles.typeBox}
    >
      {type.toUpperCase()}
    </div>
  );
}
