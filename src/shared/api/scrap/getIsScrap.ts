import { SERVER_API } from "../config";
import { IsScrapResponse } from "./type";

/**
 * 로그인 유저의 데이터셋 스크랩 여부
 * @param datasetId
 */
export async function getIsScrap(
  datasetId: number,
  grantType: string,
  token: string,
): Promise<boolean | null> {
  try {
    const _result = await fetch(`${SERVER_API}/api/scrap/dataset/${datasetId}`, {
      headers: {
        Authorization: `${grantType} ${token}`,
      },
    });

    if (_result.status === 401) {
      return false;
    }
    const result: IsScrapResponse = await _result.json();
    if (!result.success) {
      console.error(result.msg);
      return null;
    }
    return result.result.scrap;
  } catch (error) {
    console.error(error);
    return null;
  }
}
