"use client";

import Image from "next/image";
import styles from "./quick-menu.module.css";
import { CSSProperties } from "react";

interface Props {
  image: string;
  title: string;
  className?: string;
  style?: CSSProperties;
}

export function QuickMenu({ image, title, className, style }: Props) {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <Image alt={`${title}`} className={styles.image} src={image} />
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}
