"use client";

import { FormEvent, useState } from "react";
import styles from "./qna-answer.module.css";
import Image from "next/image";
import { UpdatedDate } from "../../../../../public/svgs";

export default function QAnswerB({ contentHeader, questionDate, questionBody }) {
  const [answer, setAnswer] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const formattedquestionBody = questionBody.split('\n').map((line, index) => (
    <p key={index}>
      {line}
      <br />
    </p>
  ));

  const handleFormVisible = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2>Q&A</h2>
        </header>

        {/* 사용자 문의 내용 */}
        <div className={styles.body}>
        
          {/* 문의 제목, 등록 날짜, 관리자 답변 버튼 */}
          <div className={styles.contentHeader}>
            <div>
                <div className={styles.title}>{contentHeader}</div>
                <div className={styles.date}>
                    <Image alt="등록 날짜" src={UpdatedDate} width={20} height={20} />
                    <p>Updated : {questionDate}</p>
                </div>
            </div>
            <div className={styles.answerBtn}>
                <button
                  type="button"
                  id="answerForm"
                  className={`${styles.button} ${styles.blue}`}
                  onClick={handleFormVisible}
                >
                {isFormVisible ? '등록하기' : '답변하기'}
                </button>
            </div>
          </div>

          {/* 사용자 문의 세부 내용 */}
          <div className={styles.contentWrapper}>
            <div className={`${styles.content} ${styles.question}`}>
              <div>{formattedquestionBody}</div>
            </div>
          </div>
        </div>

        {/* 관리자 버튼 클릭 시 나타나는 답변 텍스트 상자 */}
        {isFormVisible && (
          <form onSubmit={handleSubmit}>
            <textarea
              title="문의사항 답변 입력"
              placeholder="문의사항에 대한 답변을 상세히 입력하세요."
              id="answerForm"
              className={styles.answerText}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </form>
        )}
      </div>
    </section>
  );
}