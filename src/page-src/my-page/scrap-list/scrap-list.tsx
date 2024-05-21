import styles from "./scrap-list.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function ScrapList() {
  const { data: session, status } = useSession();

  useEffect(() => {}, []);

  return (
    <div className={"mainBody"}>
      {/* 데이터 검색 결과 개수 */}
      <div className={"resultNum"}>
        <div className={"resultNumText"}>0개의 데이터</div>
      </div>

      {/* 데이터 검색 결과 */}
      {/* TODO : 데이터 검색 결과 불러오기 */}
      <div className={"searchResult"}>
        <div className={"searchResultBody"}>
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
