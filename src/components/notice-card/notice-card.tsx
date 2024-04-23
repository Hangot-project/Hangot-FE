"use client";

import React from "react";
import { Notice } from "../../api/notice";
import styles from "./notice-card.module.css";

export function NoticeCard({ notice }: { notice: Notice }) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>
        <p>{notice.noticeId}.</p>
        {notice.title}
      </h1>
      <p className={styles.info}>{notice.createDate}</p>
    </div>
  );
}
