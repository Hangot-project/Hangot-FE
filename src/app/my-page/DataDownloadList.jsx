"use client";

import { useState } from "react";
import styles from "./my-page.module.css";
import Image from "next/image";
import { SearchBox, SearchSortDropdown } from "../../components";

const CNST_VALUES = [
  "기관1",
  "기관2",
  "기관3",
  "기관4",
  "기관5",
  "기관6",
];

const DATE_VALUES = [
  "1개월",
  "3개월",
  "6개월",
  "1년",
];

export default function DataDownloadList() {
  const [selectedCNST, setSelectedCNST] = useState();
  const [selectedDATE, setSelectedDATE] = useState();

  return (
    <div className={styles.mainBody}>

      {/* 데이터 다운로드 목록 필터 */}
      <div className={styles.filterWrapper}>
        <div className={styles.dropdownFilter}>
          <div>
            {/* 기관명 드롭다운 필터 */}
            <SearchSortDropdown
                items={CNST_VALUES}
                selectedItem={selectedCNST}
                setSelectedItem={setSelectedCNST}
            />

            {/* 기간 드롭다운 필터 */}
            <SearchSortDropdown
                items={DATE_VALUES}
                selectedItem={selectedDATE}
                setSelectedItem={setSelectedDATE}
            />
          </div>
        </div>

        {/* 데이터명 검색 필터 */}
        <div className={styles.searchFilter}>
          <div className={styles.searchBox}>
            <SearchBox
              boxstyle={{
                position: "absolute",
                backgroundColor: "#ffffff",
                border: "solid .15rem #d5d5d5",
                borderRadius: "75px",
                zIndex: 1,
              }} 
              iconstyle={{
                width: "14px",
                height: "14px",
              }}
              placeholder="데이터명을 검색해보세요."
              inputstyle={{
                fontSize: "12px"
              }}
            />
          </div>
        </div>
      </div>

      {/* 데이터 다운로드 목록 개수 */}
      <div className={styles.resultNum}>
        <div className={styles.resultNumText}>0개의 데이터</div>
      </div>

      {/* 데이터 다운로드 목록 */}
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