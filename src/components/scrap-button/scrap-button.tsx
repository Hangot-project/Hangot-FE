"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./scrap-button.module.css";
import { LikeEmpty, LikeFilled } from "../../../public/svgs";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { deleteScrap } from "../../shared/api/scrap/deleteScrap";
import { createScrap } from "../../shared/api/scrap/createScrap";
import { getDatasetDetail } from "../../shared/api/dataset/getDatasetDetail";
import { getIsScrap } from "../../shared/api/scrap/getIsScrap";

export function ScrapButton({
  datasetId,
  scrap,
}: {
  datasetId: number;
  scrap: number;
}) {
  const { data: session, status } = useSession();

  const router = useRouter();

  const [like, setLike] = useState<boolean>();
  const [scrapCnt, setScrapCnt] = useState<number>(scrap);

  //* 스크랩 버튼을 클릭할 때마다 스크랩 수정 반영 및 스크랩 수 fetch
  const handleLike = useCallback(async () => {
    if (status === "unauthenticated") {
      alert("로그인이 필요한 서비스입니다.");
      return router.push("/login");
    }

    if (session.user.role === "ROLE_ADMIN") {
      alert("관리자는 이용할 수 없는 서비스입니다.");
      return;
    }

    const func = like ? deleteScrap : createScrap;

    const response = await func(
      datasetId,
      session.user.grantType,
      session.user.accessToken,
    );

    if (!response.ok) {
      alert("오류가 발생했습니다.\n다시 시도해주세요.");
      return;
    }

    getDatasetDetail(datasetId).then((res) => setScrapCnt(res.scrap));
    setLike(!like);
  }, [like]);

  //* 첫 렌더링시 유저의 스크랩 여부 확인
  useEffect(() => {
    async function fetchLike() {
      getIsScrap(datasetId, session.user.grantType, session.user.accessToken).then(
        (res) => {
          if (res === null) alert("스크랩 정보를 불러오는데 실패했습니다.");
          else setLike(res);
        },
      );
    }
    if (status === "authenticated" && session.user.role === "ROLE_USER") {
      fetchLike();
    }
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
