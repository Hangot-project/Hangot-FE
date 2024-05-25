import { SERVER_API } from "../config";
import { LoginResponse } from "./type";

/**
 * 액세스 토큰을 재발급받는 메서드
 * @returns
 */
export async function reissueToken(): Promise<LoginResponse> {
  try {
    const response = await fetch(`${SERVER_API}/api/user/token`, {
      method: "POST",
      credentials: "include",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
