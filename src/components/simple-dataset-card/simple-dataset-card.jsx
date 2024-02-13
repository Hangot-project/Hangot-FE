import Image from "next/image";
import styles from "./simple-dataset-card.module.css";
import { DataType, DataOrganization } from "../../../public/svgs";

/**
 *
 * @param {{title: string; subtitle: string; type: string; from: string; onClick?: MouseEventHandler<HTMLDivElement>; style?: CSSProperties }} param0
 * @returns
 */
export function SimpleDatasetCard({ title, subtitle, type, from, onClick, style }) {
  return (
    <div onClick={onClick} className={styles.container} style={style}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.infoContainer}>
        <div>
          <Image
            className={styles.imageContainer}
            src={DataType}
            alt="파일 아이콘"
          />
          <p>{type}</p>
        </div>

        <p className={styles.dot}>•</p>

        <div>
          <Image
            className={styles.imageContainer}
            src={DataOrganization}
            alt="조직 아이콘"
          />
          <p>{from}</p>
        </div>
      </div>
    </div>
  );
}
