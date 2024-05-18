"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { signIn } from "next-auth/react";
import { Loading } from "../../../../components";
import { Provider } from "../../../../constants/oauth-provider";

function Social() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      alert("잘못된 접근입니다.");
      window.location.replace("/");
    }

    signIn("credentials", {
      provider: Provider.kakao,
      code,
      isAuto: true,
      redirect: true,
      callbackUrl: "/",
    });
  }, [searchParams]);

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
