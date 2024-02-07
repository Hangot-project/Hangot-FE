import Link from "next/link";
import styles from "./list-board.module.css";

/**
 *
 * @param {{title: string; url: string; dataList: DataBoard[];}}
 * @param {*} title - 리스트 보드의 제목
 * @param {*} url - 리스트 보드 more 버튼 연결 url
 * @param {*} DataBoard - {id: number; title: string; label: string;}
 * @returns
 */
export function ListBoard({ title, url, dataList }) {
  return (
    <div className={styles.container}>
      {/* //* list board header */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>{title}</h1>
        <Link href={`/${url}`}>
          <p className={styles.more}>+ more</p>
        </Link>
      </div>

      {/* //* division line */}
      <div className={styles.divider} />

      {/* //* list board contents */}
      {dataList.map((value) => (
        <Link
          href={`/${url}/${value.id}`}
          key={value.id}
          className={styles.dataListWrapper}
        >
          <label className={styles.dataLabel}>{value.label}</label>
          <p className={styles.dataListTitle}>{value.title}</p>
        </Link>
      ))}
    </div>
  );
}
