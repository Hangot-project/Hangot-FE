"use client";

import { FormEvent, useState } from "react";
import styles from "./qna-answer.module.css";

export default function QAnswer() {
  const [detail, setDetail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2 className={styles.title}>Q&A</h2>
        </header>

        <div className={styles.body}>
          <div className={styles.contentHeader}>데이터 요청 관련 문의 드립니다.</div>
          <div className={styles.content}>
            <div className={styles.article_body}>
              <div className={styles.body1}>
                <p>안녕하세요. HY-DATA 운영팀입니다.</p>
                <p>
                  HY-DATA (하이데이터)를 이용해 주시는 여러분께 항상 감사드립니다.
                </p>{" "}
                <br />
                <p>
                  2024년 5월 4일부터 하이데이터 개인정보 처리방침이 아래와 같이
                  개정될 예정이니 이용에 참고하여 주시기 바랍니다.
                </p>{" "}
                <br />
              </div>
              <div className={styles.body2}>
                <p className={styles.text}>
                  <strong> ◾&nbsp;</strong>
                  <strong>개정 사유 : </strong>
                  하이데이터와 카카오의 간편 인증 통합을 위해 아래 내용을 개정함
                </p>
              </div>
              <div className={styles.body3}>
                <p>감사합니다.</p>
                <p>하이데이터 팀 드림</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.contentHeader}>Q&A 답변</div>
          <textarea
            title="공지사항 상세 내용 입력"
            placeholder="공지사항 상세 내용을 입력하세요."
            id="inputDetail"
            className={styles.textArea}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />

          <div className={styles.requestBtn}>
            <button
              type="submit"
              id="saveBtn"
              className={`${styles.button} ${styles.blue}`}
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
