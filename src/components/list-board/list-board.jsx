import Link from "next/link";
import styles from "./list-board.module.css";

export function ListBoard(props) {
  const { title, children } = props;

  return (
    <div className={styles.container}>
      {/* //* list board header */}
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>{title}</h1>
        <Link href={"/"}>
          <p className={styles.more}>+ more</p>
        </Link>
      </div>

      {/* //* division line */}
      <div className={styles.divider} />

      {/* //* list board contents */}
      {children}
    </div>
  );
}
