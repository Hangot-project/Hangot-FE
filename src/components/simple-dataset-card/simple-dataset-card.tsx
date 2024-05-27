import Image from "next/image";
import styles from "./simple-dataset-card.module.css";
import {
  DataType as DataTypeImage,
  DataOrganization,
  LikeFilled,
} from "../../../public/svgs";
import { CSSProperties } from "react";
import { DataType, Organization } from "../../shared/types/dataset";

interface SimpleDatasetCardProps {
  title: string;
  subtitle: string;
  type: DataType;
  from: Organization;
  view: number;
  scrap: number;
  onClick?: () => any;
  style?: CSSProperties;
}

/**
 *
 * @param param0
 * @returns
 */
export function SimpleDatasetCard({
  title,
  subtitle,
  type,
  from,
  view,
  scrap,
  onClick,
  style,
}: SimpleDatasetCardProps) {
  return (
    <div onClick={onClick} className={styles.container} style={style}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>
      <div className={styles.infoContainer}>
        <div>
          <Image
            className={styles.imageContainer}
            src={DataTypeImage}
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

      <div className={styles.hoverContainer}>
        <p>
          조회수 {view} <Image src={LikeFilled} alt="스크랩 아이콘" /> {scrap}
        </p>
      </div>
    </div>
  );
}
