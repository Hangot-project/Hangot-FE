"use client";

import { decrypt, encrypt } from "../utils/secure/token";
// import { cookies } from "next/headers";

const tokenKey = process.env.NEXT_PUBLIC_TOKEN_KEY;

/**
 * 응답받은 토큰을 암호화하여 쿠키에 저장하는 메서드
 * @param grantType
 * @param token
 * @returns
 */
export async function handleToken(grantType: string, token: string) {
  const encryptedToken = encrypt(grantType + " " + token);

  localStorage.setItem(tokenKey, encryptedToken);

  // cookies().set("session", encryptedToken, {
  //   // sameSite: "strict", // 배포 후 적용
  //   path: "/",
  // });
}

export async function getToken(): Promise<string | null> {
  const item = localStorage.getItem(tokenKey);
  if (item === null) return null;

  const decryptedToken = decrypt(item);
  return decryptedToken;
}
