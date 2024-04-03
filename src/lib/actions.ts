"use client";

import { encrypt } from "../utils/secure/token";
// import { cookies } from "next/headers";

/**
 * 응답받은 토큰을 암호화하여 쿠키에 저장하는 메서드
 * @param grantType
 * @param token
 * @returns
 */
export async function handleToken(grantType: string, token: string) {
  const encryptedToken = encrypt(grantType + " " + token);
  const accessExpiredInSeconds = process.env.NEXT_PUBLIC_ACCESS_EXPIRE;

  if (!accessExpiredInSeconds) {
    return process.env.EXPIRE_ENV_NOT_EXIST;
  }

  localStorage.setItem("session", encryptedToken);

  // cookies().set("session", encryptedToken, {
  //   // sameSite: "strict", // 배포 후 적용
  //   path: "/",
  // });
}
