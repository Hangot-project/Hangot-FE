import { SERVER_API } from "../config";

/**
 * 로그인 유저의 스크랩 내역을 생성하는 메서드
 * @param datasetId
 * @returns
 */
export async function createScrap(
  datasetId: number,
  grantType: string,
  token: string,
) {
  try {
    const response = await fetch(`${SERVER_API}/api/scrap/dataset/${datasetId}`, {
      method: "POST",
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
