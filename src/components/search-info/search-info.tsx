"use client";

import React from "react";
import styles from "./search-info.module.css";

interface SearchInfoProps {
  currentKeyword: string;
}

export function SearchInfo({ currentKeyword }: SearchInfoProps) {
  if (!currentKeyword) {
    return null;
  }

  return (
    <div className={styles.searchInfoDisplay}>
      <span className={styles.keywordText}>검색어: "{currentKeyword}"</span>
    </div>
  );
}
