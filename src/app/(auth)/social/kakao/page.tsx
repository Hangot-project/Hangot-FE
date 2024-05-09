"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { Provider } from "../../../../api/user";

function Page() {
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

export default Page;
