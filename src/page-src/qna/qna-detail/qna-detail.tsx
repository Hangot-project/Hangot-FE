"use client";

import { UpdatedDate } from "../../../../public/svgs";
import styles from "./qna-detail.module.css";
import Image from "next/image";

export default function QADetail({ contentHeader, Date, contentBody }) {
  const formattedContentBody = contentBody.split("\n").map((line, index) => (
    <p key={index}>
      {line}
      <br />
    </p>
  ));

  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2>Q&A</h2>
        </header>

        <div className={styles.body}>
          <div className={styles.contentHeader}>
            <div className={styles.title}>{contentHeader}</div>
            <div className={styles.date}>
              <Image alt="등록 날짜" src={UpdatedDate} width={20} height={20} />
              <p>Updated : {Date}</p>
            </div>
          </div>

          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <div>
                <p>
                  안녕하세요. <strong>HY-DATA</strong> 운영팀입니다.
                </p>{" "}
                <br />
                <p>
                  HY-DATA(하이데이터)를 이용해 주시는 여러분께 항상 감사드립니다.
                </p>{" "}
                <br />
              </div>

              <div>{formattedContentBody}</div>

              <div>
                <br />
                <p>감사합니다.</p>
                <p>하이데이터 팀 드림</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
