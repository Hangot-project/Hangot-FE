import Image from "next/image";
import styles from "./simple-dataset-card.module.css";
import { LikeFilled } from "../../../public/svgs";
import { CSSProperties } from "react";
import { colorMatch } from "../../constants/dataset-color";

interface SimpleDatasetCardProps {
  title: string;
  type: string;
  from: string;
  view: number;
  scrap: number;
  createDate: string;
  description: string;
  tagList?: string[];
  onClick?: () => any;
  style?: CSSProperties;
  updateDate?: string;
}

/**
 *
 * @param param0
 * @returns
 */
export function SimpleDatasetCard({
  title,
  type,
  from,
  view,
  scrap,
  createDate,
  tagList,
  onClick,
  style,
  updateDate,
  description,
}: SimpleDatasetCardProps) {
  return (
    <div onClick={onClick} className={styles.container} style={style}>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <p className={styles.title}>{title}</p>
          <span
            className={styles.type}
            style={{
              backgroundColor:
                colorMatch[type as keyof typeof colorMatch] || colorMatch.default,
              color: "black",
            }}
          >
            {type}
          </span>
        </div>
        <p className={styles.description}>{description}</p>
        <div className={styles.metadataRow}>
          <span className={styles.organization}>{from}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.date}>생성: {createDate}</span>
          {updateDate && (
            <>
              <span className={styles.separator}>•</span>
              <span className={styles.date}>수정: {updateDate}</span>
            </>
          )}
          <span className={styles.separator}>•</span>
          <span className={styles.views}>조회 {view.toLocaleString()}</span>
          <span className={styles.separator}>•</span>
          <span className={styles.scraps}>
            <Image src={LikeFilled} alt="스크랩" className={styles.scrapIcon} />
            {scrap}
          </span>
        </div>
        {tagList && tagList.length > 0 && (
          <div className={styles.tagContainer}>
            {tagList.map((theme, index) => (
              <span key={index} className={styles.tag}>
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
