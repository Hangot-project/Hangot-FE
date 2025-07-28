import { BASE_URL } from "../config";
import { IsScrapResponse } from "./type";
import { logApiError } from "../../../utils/api/error-handler";

/**
 * 로그인 유저의 데이터셋 스크랩 여부
 * @param datasetId
 * @param grantType
 * @param token
 */
export async function getIsScrap(
  datasetId: number,
  grantType: string,
  token: string,
): Promise<boolean | null> {
  try {
    const endpoint = `${BASE_URL}/api/scrap/dataset/${datasetId}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `${grantType} ${token}`,
      },
    });

    if (response.status === 401) {
      return false;
    }

    const result: IsScrapResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result.result.scrap;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/scrap/dataset/${datasetId}`,
    );
    return null;
  }
}
