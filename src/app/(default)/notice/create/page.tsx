"use client";

import { FormEvent, useState } from "react";
import styles from "./notice-create.module.css";

export default function NewsUpload() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2>공지사항 등록</h2>
        </header>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.body}>
            <div className={styles.contentHeader}>공지사항 정보</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <tbody>
                    {/* 공지사항 제목 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputTitle"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공지사항 제목
                        </label>
                      </th>
                      <td>
                        <div className={styles.inputType}>
                          <input
                            type="text"
                            title="공지사항 제목 입력"
                            placeholder="공지사항 제목을 입력하세요."
                            id="inputTitle"
                            className={styles.inputText}
                            maxLength={100}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                      </td>
                    </tr>

                    {/* 공지사항 유형 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputType"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공지사항 유형
                        </label>
                      </th>
                      <td>
                        <select
                          id="inputType"
                          title="유형"
                          className={styles.selection}
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value="">선택해주세요</option>
                          <option value="일반">일반</option>
                          <option value="업데이트">업데이트</option>
                          <option value="중요">중요</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.contentHeader}>공지사항 상세 내용</div>
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
          </div>
        </form>
      </div>
    </section>
  );
}
