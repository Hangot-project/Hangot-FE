"use client";

import styles from "./my-page.module.css";

export default function DataRequestList() {
  return (
    <div className={styles.mainBody}>
      <div className={styles.resultNum}>
        <div className={styles.resultNumText}>0개의 데이터</div>
      </div>
      <div className={styles.searchResult}>
        <div className={styles.searchResultBody}>
          <table>
            <thead>
              <tr>
                <th className={styles.gridCol1}>처리상태</th>
                <th className={styles.gridCol2}>데이터명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>
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