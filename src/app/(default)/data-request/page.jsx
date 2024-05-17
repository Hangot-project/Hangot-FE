"use client"; //? client componet - NextJS 13

import { useState } from "react";
import styles from "./data-request.module.css";
import Image from "next/image";
import Link from "next/link";
import { } from "../../../public/svgs";
import { } from "../../components";

export default function DataRequest() {
  return (
    <form>
      <section className={styles.Container}>
        <div className={styles.main}>
          <header className={styles.header}>
            <h2 className={styles.title}>공공데이터 제공 신청</h2>
          </header>
          <div className={styles.body}>
            <div className={styles.contentHeader}>신청인 정보</div>
            <div className={styles.content}>
              <div className={styles.rowTable}>
                <table>
                  <colgroup>
                    <col></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <label for="inputName" className={styles.label}>성명(단체명 및 대표자 성명)</label>
                      </th>
                      <td>
                        <input 
                          type="text" 
                          title="성명(단체명 및 대표자 성명)"
                          id="inputName"
                          name="applcntNm"
                          className={styles.inputText}
                          maxLength={20}
                        />
                        <p>
                          ※ 실명으로 기입하지 않을 경우 공공데이터 제공신청 서비스에 대해 불이익이 있을 수 있습니다.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="inputBirthday" className={styles.label}>생년월일</label>
                      </th>
                      <td>
                        <div className={styles.inputExtext}>
                          <input
                            type="text"
                            title="생년월일 입력"
                            id="inputBirthday"
                            className={styles.inputText}
                            maxLength={8} 
                          />
                          <span className={styles.exText}>예 19991230</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="inputTelNum" className={styles.label}>전화번호</label>
                      </th>
                      <td>
                        <div className={styles.inputExtext}>
                          <input
                            type="text"
                            title="전화번호 입력"
                            id="inputTelNum"
                            className={styles.inputText}
                            maxLength={11} 
                          />
                          <span className={styles.exText}>예 01012341234</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="inputEmail" className={styles.label}>이메일 주소</label>
                      </th>
                      <td>
                        <div className={styles.inputExtext}>
                          <input
                            type="text"
                            title="이메일주소 입력"
                            id="inputEmail"
                            className={styles.inputText}
                            maxLength={50} 
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
                  <colgroup>
                    <col></col>
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <label for="inputDataName" className={styles.label}>공공데이터 명</label>
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
                          <a href="" className={`${styles.button} ${styles.white}`}>
                            개방여부 확인
                          </a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="inputInsttName" className={styles.label}>기관명</label>
                      </th>
                      <td>
                        <div className={`${styles.inputType} ${styles.inputInsttName}`}>
                          <input
                            type="text"
                            title="기관명 입력"
                            placeholder="기관 검색 버튼을 클릭해주세요."
                            id="inputInttName"
                            className={`${styles.inputText} ${styles.inttName}`}
                          />
                          <div className={styles.insttSearchList}>
                            <a href="" id="insttSearchBtn" 
                              className={`${styles.button} ${styles.white} ${styles.insttSearchBtn}`}
                              style={{marginLeft: 0}}>
                              기관검색
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="inputPublicDataCont1" className={styles.label}>공공데이터 내용</label>
                      </th>
                      <td>
                        <div rows="5" cols="10"
                          title="공공데이터 내용 입력" 
                          id="inputPublicDataCont1" 
                          className={`${styles.inputTextArea} ${styles.dataContPlaceholder}`}
                          style={{overflow: "scroll"}}
                          contentEditable="true"
                        >
                          신청 공공데이터에 포함된 주요 내용을 기재합니다.
                          <br />
                          공공데이터 명칭 개방 여부 확인을 하셔야 입력 가능하며, 아래 내용을 참고하여 작성해 주시기 바랍니다.
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="searchCondition" className={styles.label}>활용 목적</label>
                      </th>
                      <td>
                        <select id="searchCondition" title="유형" className={styles.selection}>
                          <option value>선택해주세요</option>
                          <option value>선택 1</option>
                          <option value>선택 2</option>
                          <option value>선택 3</option>
                          <option value>선택 4</option>
                          <option value>선택 5</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <label for="inputPublicDataCont2" className={styles.label}>데이터 활용 목적</label>
                      </th>
                      <td>
                        <textarea rows="5" cols="10"
                          title="공공데이터 활용 목적 상세 입력" 
                          placeholder="신청 공공데이터에 포함된 신청(활용)목적을 상세하게 기재해주시기 바랍니다."
                          id="inputPublicDataCont2" 
                          className={`${styles.inputTextArea} ${styles.dataContPlaceholder}`}
                          style={{height: 160}}
                          maxLength={4000}
                        >
                        </textarea>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className={styles.requestBtnText}>
                <p className={styles.requestText1}>
                  <span>
                    [공공데이터의 제공 및 이용 활성화에 관한 법률] 제 27조제1항 및 같은 법 시행령 제21조에 따라 공공데이터의 제공을 신청합니다.
                  </span>
                  <span>2024년 04월 11일</span>
                </p>
                <p className={styles.requestText2}>
                  <strong>신청인 이정민</strong>
                </p>
              </div>
              <div className={styles.requestBtn}>
                <a href="" id="cancelBtn" className={`${styles.button} ${styles.gray}`}>취소</a>
                <a href="" id="saveBtn" className={`${styles.button} ${styles.blue}`}>신청</a>
              </div>
          </div>
        </div>
      </section>
    </form>
  );
}