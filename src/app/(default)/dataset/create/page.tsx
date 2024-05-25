"use client";

import { useState } from "react";
import styles from "./data-upload.module.css";

export default function DataUpload() {
  const [detailText, setDetailText] = useState("");
  const [file, setFile] = useState(null);

  const handleDetailChange = (event) => {
    setDetailText(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileButtonClick = () => {
    document.getElementById("inputFile").click();
  };

  const handleFileDelete = () => {
    setFile(null);
  };

  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2 className={styles.title}>공공데이터 등록</h2>
        </header>

        {/* 공공데이터 등록 양식 */}
        <form>
          <div className={styles.body}>
            <div className={styles.contentHeader}>공공데이터 정보</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <colgroup>
                    <col />
                  </colgroup>
                  <tbody>
                    {/* 공공데이터 명 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputDataName"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 명
                        </label>
                      </th>
                      <td>
                        <div className={styles.inputType}>
                          <input
                            type="text"
                            title="공공데이터 명칭 입력"
                            placeholder="공공데이터의 명칭을 구체적으로 명시하여 기재합니다. (예:기상청 동네예보정보, 교육부 교육기본통계 등)"
                            id="inputDataName"
                            className={styles.inputText}
                            maxLength={100}
                          />
                        </div>
                      </td>
                    </tr>

                    {/* 공공데이터 상세 내용 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputDetail"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 세부 내용
                        </label>
                      </th>
                      <td>
                        <textarea
                          rows={5}
                          cols={10}
                          title="공공데이터 상세 내용 입력"
                          placeholder="공공데이터의 구체적인 내용을 상세하게 기재해주시기 바랍니다."
                          id="inputDetail"
                          className={`${styles.inputTextArea} ${styles.dataContPlaceholder}`}
                          style={{ height: 160 }}
                          maxLength={4000}
                          value={detailText}
                          onChange={handleDetailChange}
                        />
                        <div className={styles.charCount}>
                          {detailText.length} / 4000
                        </div>
                      </td>
                    </tr>

                    {/* 공공데이터 주제 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputDataTitle"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 주제
                        </label>
                      </th>
                      <td>
                        <select
                          id="inputDataTitle"
                          title="주제"
                          className={styles.selection}
                        >
                          <option>선택해주세요</option>
                          <option>입학</option>
                          <option>학생</option>
                          <option>학사</option>
                          <option>국제</option>
                          <option>복지</option>
                          <option>재정</option>
                          <option>취창업</option>
                          <option>학술</option>
                          <option>장학</option>
                        </select>
                      </td>
                    </tr>

                    {/* 공공데이터 제공 기관 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputInsttName"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 제공 기관
                        </label>
                      </th>
                      <td>
                        <div
                          className={`${styles.inputType} ${styles.inputInsttName}`}
                        >
                          <input
                            type="text"
                            title="기관명 입력"
                            placeholder="기관 검색 버튼을 클릭해주세요."
                            id="inputInsttName"
                            className={`${styles.inputText} ${styles.inttName}`}
                          />
                          <div className={styles.insttSearchList}>
                            <button
                              id="insttSearchBtn"
                              className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                              style={{ marginLeft: 0 }}
                            >
                              기관검색
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* 공공데이터 제3저작권자 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputCopyRight"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 제3저작권자
                        </label>
                      </th>
                      <td>
                        <div className={styles.inputType}>
                          <input
                            type="text"
                            title="공공데이터 명칭 입력"
                            placeholder="공공데이터의 제3저작권자를 명시하여 기재합니다."
                            id="inputCopyRight"
                            className={styles.inputText}
                            maxLength={50}
                          />
                        </div>
                      </td>
                    </tr>

                    {/* 공공데이터 라이선스 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputLicense"
                          className={`${styles.required} ${styles.label}`}
                        >
                          라이선스
                        </label>
                      </th>
                      <td>
                        <select
                          id="inputLicense"
                          title="라이선스"
                          className={styles.selection}
                        >
                          <option>선택해주세요</option>
                          <option>CC BY</option>
                          <option>CC BY-NC</option>
                          <option>CC BY-ND</option>
                          <option>CC BY-SA</option>
                          <option>CC BY-NC-SA</option>
                          <option>CC BY-NC-ND</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 공공데이터 파일 등록 */}
            <div className={styles.contentHeader}>공공데이터 파일 등록</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <colgroup>
                    <col></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputFile"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 파일
                        </label>
                      </th>
                      <td>
                        <div className={styles.insttSearchList}>
                          <input
                            type="file"
                            id="inputFile"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          <button
                            type="button"
                            onClick={handleFileButtonClick}
                            className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                            style={{ marginLeft: 0 }}
                          >
                            파일 찾기
                          </button>
                          {file && (
                            <div className={styles.fileContainer}>
                              <button onClick={handleFileDelete}>x</button>
                              <span className={styles.fileName}>{file.name}</span>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.requestBtn}>
              <button
                type="button"
                id="cancelBtn"
                className={`${styles.button} ${styles.gray}`}
              >
                취소
              </button>
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
