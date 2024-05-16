import { GeneralResponse, SERVER_API } from "./config";

export type LoginInput = {
  email: string;
  password: string;
  autoLogin: boolean;
};

type LoginResult = {
  grantType: string;
  accessToken: string;
};

export interface LoginResponse extends GeneralResponse {
  result: LoginResult;
}

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

/**
 * 현재 로그인 중인 유저를 로그아웃 시키는 메서드
 * @returns
 */
export async function userLogout(
  grantType: string,
  token: string,
): Promise<GeneralResponse> {
  try {
    const response = await fetch(`${SERVER_API}/api/user/logout`, {
      headers: {
        Authorization: grantType + " " + token,
      },
      method: "POST",
      credentials: "include",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

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

export const Provider = {
  kakao: "kakao",
} as const;
export type ProviderType = (typeof Provider)[keyof typeof Provider];
type SocialLoginBody = {
  code: string;
};

export async function socialLogin(provider: ProviderType, body: SocialLoginBody) {
  try {
    const response = await fetch(`${SERVER_API}/api/user/login/${provider}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    console.log("response.status", response.status);

    return response;
  } catch (error) {
    console.error(error);
  }
}
