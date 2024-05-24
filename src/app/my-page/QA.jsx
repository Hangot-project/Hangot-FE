"use client";

import styles from "./my-page.module.css";

export default function QA() {
  return (
    <div className={styles.mainBody}>
      <div className={styles.resultNum}>
        <div className={styles.resultNumText}>0개의 데이터</div>
      </div>
      <div className={styles.searchResult}>
        <div className={styles.searchResultBody}>
          <table>
            <colgroup>
              <col style={{width:"5.5%"}} className={styles.tableCol}></col>
              <col style={{width:"15%"}}></col>
              <col></col>
              <col style={{width:"10%"}}></col>
              <col style={{width:"10%"}}></col>
              <col style={{width:"10%"}}></col>
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className={styles.tableCol}>NO.</th>
                <th scope="col">문의유형</th>
                <th scope="col">제목</th>
                <th scope="col">등록자</th>
                <th scope="col">등록일</th>
                <th scope="col">답변현황</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6}>
                  데이터가 없습니다. 다른 검색 조건을 선택해주세요.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}