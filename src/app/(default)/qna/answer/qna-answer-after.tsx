"use client";

import styles from "./qna-answer.module.css";
import Image from "next/image";
import { UpdatedDate } from "../../../../../public/svgs";

export default function QAnswerA({ contentHeader, questionDate, questionBody, answerDate, answerBody }) {
  
  const formattedquestionBody = questionBody.split('\n').map((line, index) => (
    <p key={index}>
      {line}
      <br />
    </p>
  ));

  const formattedanswerBody = answerBody.split('\n').map((line, index) => (
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

        {/* 사용자 문의 내용 */}
        <div className={styles.body}>
        
          {/* 문의 제목, 등록 날짜, 관리자 답변 완료 마크 */}
          <div className={styles.contentHeader}>
            <div>
                <div className={styles.title}>{contentHeader}</div>
                <div className={styles.date}>
                    <Image alt="등록 날짜" src={UpdatedDate} width={20} height={20} />
                    <p>Updated : {questionDate}</p>
                </div>
            </div>
            <div className={styles.answerBtn}>
                <div className={`${styles.button} ${styles.white}`}>
                  답변완료
                </div>
            </div>
          </div>

          {/* 사용자 문의 세부 내용 */}
          <div className={styles.contentWrapper}>
            <div className={`${styles.content} ${styles.question}`}>
              <div>{formattedquestionBody}</div>
            </div>
          </div>
        </div>

        {/* 관리자 문의 답변 */}
        <div className={styles.body}>
        
          {/* 답변 등록 날짜 */}
          <div className={styles.contentHeader}>
            <div>
                <div className={styles.title}>Q&A 답변</div>
                <div className={styles.date}>
                    <Image alt="등록 날짜" src={UpdatedDate} width={20} height={20} />
                    <p>Updated : {answerDate}</p>
                </div>
            </div>
          </div>

          {/* 관리자 답변 세부 내용 */}
          <div className={styles.contentWrapper}>
            <div className={styles.content}>
              <div>
                <p>안녕하세요. <strong>HY-DATA</strong> 운영팀입니다.</p> <br />
                <p>HY-DATA(하이데이터)를 이용해 주시는 여러분께 항상 감사드립니다.</p> <br />   
              </div>

              <div>{formattedanswerBody}</div>

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