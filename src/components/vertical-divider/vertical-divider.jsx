"use client";

import styles from "./vertical-divider.module.css";

export function VerticalDivider(props) {
  return (
    <div className={`${styles.divider} ${props.className}`} style={props.style} />
  );
}
