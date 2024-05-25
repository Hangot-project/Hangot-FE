"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Loading } from "../../../../components";
import { Provider } from "../../../../constants/oauth-provider";
import { socialLogin } from "../../../../shared/api/user/socialLogin";
import { LoginResponse } from "../../../../shared/api/user/type";

function Social() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      alert("잘못된 접근입니다.");
      window.location.replace("/");
    }

    async function fetchData() {
      // await kakao(code);

      const res: LoginResponse = await socialLogin("kakao", {
        code,
      }).then((res) => res.json());

      if (res.success) {
        await signIn("credentials", {
          provider: Provider.kakao,
          grantType: res.result.grantType,
          token: res.result.accessToken,
          redirect: true,
          callbackUrl: "/",
        });
      }
    }

    fetchData();

    // signIn("credentials", {
    //   provider: Provider.kakao,
    //   code,
    //   isAuto: true,
    //   redirect: true,
    //   callbackUrl: "/",
    // });
  }, []);

  return <div></div>;
}

function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Social />
    </Suspense>
  );
}

export default Page;
