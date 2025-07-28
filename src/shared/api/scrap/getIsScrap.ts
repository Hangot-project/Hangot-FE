import { BASE_URL } from "../config";
import { IsScrapResponse } from "./type";

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
): Promise<boolean> {
  const response = await fetch(`${BASE_URL}/api/scrap/dataset/${datasetId}`, {
    headers: {
      Authorization: `${grantType} ${token}`,
    },
  });

  if (response.status === 401) {
    return false;
  }

  const result: IsScrapResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.result.scrap;
}
