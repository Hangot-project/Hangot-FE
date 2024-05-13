"use client";

import Image from "next/image";
import styles from "./quick-menu.module.css";

export function QuickMenu(props) {
  const { image, title, className, style } = props;
  return (
    <div className={styles.container} style={style}>
      <Image className={styles.image} src={image} />
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}