import React, { useEffect } from "react";
import styles from "./download-list.module.css";
import { useSession } from "next-auth/react";

export function DlownloadList() {
  const { data: session, status } = useSession();

  // TODO: 로그인 유저 다운로드 리스트 API
  useEffect(() => {}, []);

  return (
    <div className={"mainBody"}>
      {/* 데이터 검색 결과 개수 */}
      <div className={"resultNum"}>
        <div className={"resultNumText"}>0개의 데이터</div>
      </div>

      <div className={"searchResult"}>
        <div className={"searchResultBody"}>
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
