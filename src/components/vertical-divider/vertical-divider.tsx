"use client";

import { CSSProperties } from "react";
import styles from "./vertical-divider.module.css";

interface Props {
  style?: CSSProperties;
}

export function VerticalDivider({ style }: Props) {
  return <div className={styles.divider} style={style} />;
}
