import { SERVER_API } from "../config";

/**
 * 유저의 스크랩 내역을 삭제하는 메서드
 * @param datasetId
 * @returns
 */
export async function deleteScrap(
  datasetId: number,
  grantType: string,
  token: string,
) {
  try {
    const response = await fetch(`${SERVER_API}/api/scrap/dataset/${datasetId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${grantType} ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
