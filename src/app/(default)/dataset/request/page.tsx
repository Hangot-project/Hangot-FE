"use client"; //? client componet - NextJS 13

import { useState } from "react";
import styles from "./data-request.module.css";

export default function DataRequest() {
  const [detail, setDetail] = useState("");
  const [PurposeDetail, setPurposeDetail] = useState("");

  const handleDetailChange = (event) => {
    setDetail(event.target.value);
  };

  const handlePurposeDetailChange = (event) => {
    setPurposeDetail(event.target.value);
  };

  return (
    <section className={styles.Container}>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2>공공데이터 제공 신청</h2>
        </header>

        {/* 공공데이터 요청 양식 */}
        <form>
          <div className={styles.body}>
            <div className={styles.contentHeader}>신청인 정보</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <tbody>
                    {/* 신청자 이름 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputName"
                          className={`${styles.required} ${styles.label}`}
                        >
                          성명(단체명 및 대표자 성명)
                        </label>
                      </th>
                      <td>
                        <div className={`${styles.inputType} ${styles.inputName}`}>
                          <input
                            type="text"
                            title="성명(단체명 및 대표자 성명)"
                            id="inputName"
                            className={styles.inputText}
                            maxLength={20}
                          />
                        </div>
                        <p className={styles.warningText}>
                          ※ 실명으로 기입하지 않을 경우 공공데이터 제공신청 서비스에
                          대해 불이익이 있을 수 있습니다.
                        </p>
                      </td>
                    </tr>

                    {/* 신청자 생년월일 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputBirthday"
                          className={`${styles.required} ${styles.label}`}
                        >
                          생년월일
                        </label>
                      </th>
                      <td>
                        <div className={`${styles.inputType} ${styles.inputBirth}`}>
                          <input
                            type="text"
                            title="생년월일 입력"
                            id="inputBirthday"
                            className={styles.inputText}
                            maxLength={8}
                          />
                        </div>
                        <span className={styles.exText}>예) 19991230</span>
                      </td>
                    </tr>

                    {/* 신청자 전화번호 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputTelNum"
                          className={`${styles.required} ${styles.label}`}
                        >
                          전화번호
                        </label>
                      </th>
                      <td>
                        <div className={`${styles.inputType} ${styles.inputTelNum}`}>
                          <input
                            type="text"
                            title="전화번호 입력"
                            id="inputTelNum"
                            className={styles.inputText}
                            maxLength={11}
                          />
                        </div>
                        <span className={styles.exText}>예) 01012341234</span>
                      </td>
                    </tr>

                    {/* 신청자 이메일 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputEmail"
                          className={`${styles.required} ${styles.label}`}
                        >
                          이메일 주소
                        </label>
                      </th>
                      <td>
                        <div className={`${styles.inputType} ${styles.inputEmail}`}>
                          <input
                            type="text"
                            title="이메일주소 입력"
                            id="inputEmail"
                            className={styles.inputText}
                            maxLength={50}
                            value={'dalnimjm@naver.com'}
                            readOnly
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.contentHeader}>신청 내용</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
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
                        <div className={`${styles.inputType} ${styles.inputDataName}`}>
                          <input
                            type="text"
                            title="공공데이터 명칭 입력"
                            placeholder="공공데이터의 명칭을 구체적으로 명시하여 기재합니다."
                            id="inputDataName"
                            className={styles.inputText}
                            maxLength={100}
                          />
                        </div>
                        <button
                          type="button"
                          className={`${styles.button} ${styles.white} ${styles.SearchBtn}`}
                        >
                        개방여부 확인
                        </button>
                      </td>
                    </tr>

                    {/* 공공데이터 제공 기관 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputInsttName"
                          className={`${styles.required} ${styles.label}`}
                        >
                          기관명
                        </label>
                      </th>
                      <td>
                        <div className={`${styles.inputType} ${styles.inputInsttName}`}>
                          <input
                            type="text"
                            title="기관명 입력"
                            placeholder="기관 검색 버튼을 클릭해주세요."
                            id="inputInsttName"
                            className={`${styles.inputText} ${styles.inttName}`}
                          />
                        </div>
                        <button
                          type="button"
                          id="insttSearchBtn"
                          className={`${styles.button} ${styles.white} ${styles.SearchBtn}`}
                        >
                        기관검색
                        </button>
                      </td>
                    </tr>

                    {/* 공공데이터 상세 내용 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputDetail"
                          className={`${styles.required} ${styles.label}`}
                        >
                          공공데이터 내용
                        </label>
                      </th>
                      <td>
                        <textarea
                          title="공공데이터 내용 입력"
                          placeholder="공공데이터 세부 사항을 상세히 적어주시기 바랍니다."
                          id="inputDetail"
                          className={`${styles.inputTextArea}`}
                          maxLength={4000}
                          value={detail}
                          onChange={handleDetailChange}
                        />
                        <div className={styles.charCount}>
                          {detail.length} / 4000
                        </div>
                        <div className={styles.warningText}>
                          신청 공공데이터에 포함된 주요 내용을 기재합니다.
                          <br />
                          공공데이터 명칭 개방 여부 확인을 하셔야 입력 가능하며, 아래
                          내용을 참고하여 작성해 주시기 바랍니다.
                        </div>
                      </td>
                    </tr>

                    {/* 공공데이터 활용 목적 */}
                    <tr>
                      <th scope="row">
                        <label
                          htmlFor="inputPurpose"
                          className={`${styles.required} ${styles.label}`}
                        >
                          활용 목적
                        </label>
                      </th>
                      <td>
                        <select
                          id="inputPurpose"
                          title="활용 목적"
                          className={styles.selection}
                        >
                          <option>선택해주세요</option>
                          <option>선택 1</option>
                          <option>선택 2</option>
                          <option>선택 3</option>
                          <option>선택 4</option>
                          <option>선택 5</option>
                        </select>
                      </td>
                    </tr>

                    {/* 공공데이터 활용 목적 상세 내용 */}
                    <tr>
                      <th scope="row">
                        <label htmlFor="inputPurposeDetail" className={styles.label}>
                          데이터 활용 목적
                        </label>
                      </th>
                      <td>
                        <textarea
                          title="공공데이터 활용 목적 상세 입력"
                          placeholder="신청 공공데이터에 포함된 신청(활용)목적을 상세하게 기재해주시기 바랍니다."
                          id="inputPurposeDetail"
                          className={`${styles.inputTextArea}`}
                          maxLength={4000}
                          value={PurposeDetail}
                          onChange={handlePurposeDetailChange}
                        />
                        <div className={styles.charCount}>
                          {PurposeDetail.length} / 4000
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
                신청
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
