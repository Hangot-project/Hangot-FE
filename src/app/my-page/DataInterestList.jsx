"use client";

import styles from "./my-page.module.css";
import Image from "next/image";

export default function DataDownloadList() {
  return (
    <div className={styles.mainBody}>

      {/* 데이터 관심 목록 개수 */}
      <div className={styles.resultNum}>
        <div className={styles.resultNumText}>0개의 데이터</div>
      </div>

      {/* 데이터 관심 목록 */}
      <div className={styles.searchResult}>
        <div className={styles.searchResultBody}>
          <table>
            <thead>
              <tr>
                <th className={styles.gridCol3}>제목</th>
                <th className={styles.gridCol4}>데이터유형</th>
                <th className={styles.gridCol5}>데이터명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>첫 번째 데이터 제목</td>
                <td>데이터 유형 A</td>
                <td>데이터명 A</td>
              </tr>
              <tr>
                <td>두 번째 데이터 제목</td>
                <td>데이터 유형 B</td>
                <td>데이터명 B</td>
              </tr>
              <tr>
                <td>세 번째 데이터 제목</td>
                <td>데이터 유형 C</td>
                <td>데이터명 C</td>
              </tr>
              <tr>
                <td>네 번째 데이터 제목</td>
                <td>데이터 유형 D</td>
                <td>데이터명 D</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}