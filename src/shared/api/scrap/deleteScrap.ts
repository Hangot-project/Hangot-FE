import { BASE_URL } from "../config";

/**
 * 유저의 스크랩 내역을 삭제하는 메서드
 * @param datasetId
 * @param grantType
 * @param token
 * @returns
 */
export async function deleteScrap(
  datasetId: number,
  grantType: string,
  token: string,
): Promise<Response> {
  const response = await fetch(`${BASE_URL}/api/scrap/dataset/${datasetId}`, {
    method: "DELETE",
    headers: {
      Authorization: `${grantType} ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}
