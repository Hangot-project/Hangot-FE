"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./scrap-button.module.css";
import { LikeEmpty, LikeFilled } from "../../../public/svgs";
import { deleteScrap, getIsScrap, setScrap } from "../../api/scrap";
import { useRouter } from "next/navigation";
import { getDatasetDetail } from "../../api/dataset";

export function ScrapButton({
  datasetId,
  scrap,
}: {
  datasetId: number;
  scrap: number;
}) {
  const router = useRouter();

  const [like, setLike] = useState<boolean>();
  const [scrapCnt, setScrapCnt] = useState<number>(scrap);

  //* 스크랩 버튼을 클릭할 때마다 스크랩 수정 반영 및 스크랩 수 fetch
  const handleLike = useCallback(async () => {
    const func = like ? deleteScrap : setScrap;

    const response = await func(datasetId);

    if (response.status === 401) {
      alert("로그인이 필요한 서비스입니다.");
      return router.push("/test-page");
    }

    if (!response || response.status >= 400) {
      alert("오류가 발생했습니다.\n다시 시도해주세요.");
      return;
    }

    await getDatasetDetail(datasetId).then((res) => setScrapCnt(res.scrap));
    setLike(!like);
  }, [like]);

  //* 첫 렌더링시 유저의 스크랩 여부 확인
  useEffect(() => {
    async function fetchLike() {
      await getIsScrap(datasetId).then((res) => {
        if (res === null) alert("스크랩 정보를 불러오는데 실패했습니다.");
        else setLike(res);
      });
    }
    fetchLike();
  }, []);

  return (
    <div className={styles.root}>
      <button onClick={handleLike}>
        {like ? (
          <Image src={LikeFilled} alt="스크랩 활성화" className={styles.img} />
        ) : (
          <Image src={LikeEmpty} alt="스크랩 비활성화" className={styles.img} />
        )}
      </button>
      <p
        style={{
          marginLeft: 8,
        }}
        className={styles.scrapText}
      >
        {scrapCnt}
      </p>
    </div>
  );
}
