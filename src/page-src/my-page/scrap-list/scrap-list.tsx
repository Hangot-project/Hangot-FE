import React, { useEffect, useState } from "react";
import styles from "./scrap-list.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scrap } from "../../../shared/types/scrap";
import { ScrapListResponse } from "../../../shared/api/scrap/type";
import { getAllScrap } from "../../../shared/api/scrap/getAllScrap";

export function ScrapList() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [scrapList, setScrapList] = useState<Scrap[]>([]);

  useEffect(() => {
    if (status !== "authenticated") {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/login");
    }

    async function fetchData() {
      const response = await getAllScrap(
        session.user.grantType,
        session.user.accessToken,
      );

      if (!response.ok) {
        alert(`스크랩 내역을 불러오는데 실패했습니다.\n다시 시도해주세요.`);
        return;
      }

      const result: ScrapListResponse = await response.json();
      setScrapList(result.result);
    }

    fetchData();
  }, []);

  return (
    <div className={"mainBody"}>
      {/* 데이터 검색 결과 개수 */}
      <div className={"resultNum"}>
        <div className={"resultNumText"}>
          {scrapList.length.toLocaleString()} 개의 스크랩 내역
        </div>
      </div>

      <div className={"searchResult"}>
        <div className={"searchResultBody"}>
          <table>
            <thead>
              <tr>
                <th className={styles.gridCol3}>제목</th>
                <th className={styles.gridCol4}>데이터 유형</th>
                <th className={styles.gridCol5}>데이터 설명</th>
              </tr>
            </thead>
            <tbody>
              {scrapList.length === 0 ? (
                <td colSpan={3}>스크랩 내역이 존재하지 않습니다.</td>
              ) : (
                scrapList.map((scrap) => (
                  <tr>
                    <td>
                      <Link
                        className={styles.dataTitle}
                        href={`/search-result/${scrap.datasetId}`}
                      >
                        {scrap.title}
                      </Link>
                    </td>
                    <td>{scrap.type ? scrap.type : "X"}</td>
                    <td>{scrap.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
