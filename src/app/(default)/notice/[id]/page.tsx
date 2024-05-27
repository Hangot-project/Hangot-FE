"use client";

import styles from "./notice-detail.module.css";

export default function News() {
  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2 className={styles.title}>공지사항</h2>
        </header>
        <div className={styles.body}>
          <div className={styles.contentHeader}>개인정보 처리방침 개정 안내</div>
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
      </div>
    </section>
  );
}
