"use client";

import styles from "./vertical-divider.module.css";

/**
 * 
 * @param {{style?: StyleSheet}} param0 
 * @returns 
 */
export function VerticalDivider({style}) {
  return (
    <div className={styles.divider} style={style} />
  );
}
