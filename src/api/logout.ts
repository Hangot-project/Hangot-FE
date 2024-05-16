"use client";

import { signOut } from "next-auth/react";
import { SERVER_API } from "./config";

export async function logout(grantType: string, token: string) {
  try {
    const response = await fetch(`${SERVER_API}/api/user/logout`, {
      headers: {
        Authorization: `${grantType} ${token}`,
      },
      method: "POST",
      credentials: "include",
    });

    if (response.ok || response.status === 401) {
      await signOut({
        redirect: false,
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
}
