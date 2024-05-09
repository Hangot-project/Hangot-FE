"use client";

import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { SERVER_API } from "../../api/config";
import { reissueToken } from "../../api/user";

function Page() {
  const { data: session, update } = useSession();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${SERVER_API}/api/scrap`);
      if (response.status === 401) {
        const tokenResponse = await reissueToken();
        if (tokenResponse.success) {
          await update({
            grantType: tokenResponse.result.grantType,
            accessToken: tokenResponse.result.accessToken,
          });

          const response = await fetch(`${SERVER_API}/api/scrap`);
        } else {
          alert("리프레시 토큰 재발급 실패");
        }
      }
    }

    fetchData();
  }, []);

  return <div>마이페이지</div>;
}

export default Page;
