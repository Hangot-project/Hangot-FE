"use client";

import React from "react";
import styles from "./post-list-card.module.css";

interface Props {
  id: number;
  title: string;
  date: string;
}

export function PostListCard({ id, title, date }: Props) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <p>{id}.</p>
        {title}
      </h1>
      <p className={styles.info}>{date}</p>
    </div>
  );
}
