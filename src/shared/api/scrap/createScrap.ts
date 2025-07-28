import { BASE_URL } from "../config";

/**
 * 로그인 유저의 스크랩 내역을 생성하는 메서드
 * @param datasetId
 * @param grantType
 * @param token
 * @returns
 */
export async function createScrap(
  datasetId: number,
  grantType: string,
  token: string,
): Promise<Response> {
  const response = await fetch(`${BASE_URL}/api/scrap/dataset/${datasetId}`, {
    method: "POST",
    headers: {
      Authorization: `${grantType} ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}
