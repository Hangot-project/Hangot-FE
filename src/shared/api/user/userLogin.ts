import { LoginInput } from "../../types/user";
import { SERVER_API } from "../config";

/**
 * 입력받은 이메일, 비밀번호를 통해 유저 로그인을 진행하는 메서드
 * @param params
 * @returns
 */
export async function userLogin(params: LoginInput): Promise<Response> {
  try {
    const response = await fetch(`${SERVER_API}/api/user/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(params),
      credentials: "include",
    });

    return response;
  } catch (error) {
    return null;
  }
}
