"use client";

import Image from "next/image";
import styles from "./main-service-card.module.css";

export function MainServiceCard(props) {
  const { image, title, subtitle, className, style } = props;
  return (
    <div className={styles.container} style={style}>
      <Image className={styles.image} src={image} />
      <div className={styles.textContainer}>
        <h3 className={styles.title}>{title}</h3>
        <h4 className={styles.subtitle}>{subtitle}</h4>
      </div>
    </div>
  );
}
