"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { getAllScrap } from "../../../shared/api/scrap/getAllScrap";
import { Scrap } from "../../../shared/types/scrap";
import { ScrapListResponse } from "../../../shared/api/scrap/type";
import { reissueToken } from "../../../shared/api/user/reissueToken";

function Page() {
  const { data: session, update } = useSession();
  const [scrapList, setScrapList] = useState<Scrap[]>([]);

  useEffect(() => {
    if (session === undefined) return;

    async function fetchData() {
      const response = await getAllScrap(
        session.user.grantType,
        session.user.accessToken,
      );

      if (response.ok) {
        const result: ScrapListResponse = await response.json();
        setScrapList(result.result);
        return;
      }

      if (response.status === 401) {
        const tokenResponse = await reissueToken();
        if (tokenResponse.success) {
          await update({
            grantType: tokenResponse.result.grantType,
            accessToken: tokenResponse.result.accessToken,
          });
        } else {
          alert("액세스가 만료되어 재로그인이 필요합니다.");
          await signOut({ callbackUrl: "/login" });
        }
      }
    }

    fetchData();
  }, [session]);

  return (
    <div>
      마이페이지
      <p>id: {session?.user.id}</p>
      <p>name: {session?.user.name}</p>
      <p>token: {session?.user.accessToken}</p>
    </div>
  );
}

export default Page;
