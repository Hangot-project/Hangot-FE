import { BASE_URL } from "../config";
import { logApiError } from "../../../utils/api/error-handler";

/**
 * 로그인 유저의 모든 스크랩 내역을 불러오는 메서드
 * @param grantType
 * @param token
 * @returns
 */
export async function getAllScrap(
  grantType: string,
  token: string,
): Promise<Response | null> {
  try {
    const endpoint = `${BASE_URL}/api/scrap`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `${grantType} ${token}`,
      },
    });

    if (!response.ok) {
      logApiError(
        `HTTP error! status: ${response.status}`,
        endpoint,
        response.status,
      );
      return null;
    }

    return response;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/scrap`,
    );
    return null;
  }
}
