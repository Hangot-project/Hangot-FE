import Image from "next/image";
import styles from "./simple-dataset-card.module.css";
import {
  DataType as DataTypeImage,
  DataOrganization,
  LikeFilled,
} from "../../../public/svgs";
import { CSSProperties } from "react";
import { DataType } from "../../shared/types/dataset";

interface SimpleDatasetCardProps {
  title: string;
  subtitle: string;
  type: DataType;
  from: string;
  view: number;
  scrap: number;
  createDate: string;
  themeList?: string[];
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
  createDate,
  themeList,
  onClick,
  style,
}: SimpleDatasetCardProps) {
  return (
    <div onClick={onClick} className={styles.container} style={style}>
      <p className={styles.title}>{title}</p>
      <p className={styles.subtitle}>{subtitle}</p>

      {themeList && themeList.length > 0 && (
        <div className={styles.tagContainer}>
          {themeList.slice(0, 3).map((theme, index) => (
            <span key={index} className={styles.tag}>
              {theme}
            </span>
          ))}
          {themeList.length > 3 && (
            <span className={styles.moreTag}>+{themeList.length - 3}</span>
          )}
        </div>
      )}

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

        <div>
          <p>생성 일자:{createDate}</p>
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
