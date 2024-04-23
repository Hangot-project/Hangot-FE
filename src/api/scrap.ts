import { DataType, Organization } from "../constants/dataset-search-params";
import { decrypt } from "../utils/secure/token";
import { GeneralResponse, SERVER_API } from "./config";

type IsScrap = {
  scrap: boolean;
};

type Scrap = {
  scrapId: number;
  datasetId: number;
  title: string;
  description: string;
  type: DataType;
  organization: Organization;
};

interface IsScrapResponse extends GeneralResponse {
  result: IsScrap;
}

interface ScrapResponse extends GeneralResponse {
  result: Scrap;
}

/**
 * 로그인 유저의 데이터셋 스크랩 여부
 * @param datasetId
 */
export async function getIsScrap(datasetId: number): Promise<boolean | null> {
  try {
    const decryptedToken = decrypt(localStorage.getItem("session"));
    const _result = await fetch(`${SERVER_API}/api/scrap/dataset/${datasetId}`, {
      headers: {
        Authorization: decryptedToken,
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

/**
 * 로그인 유저의 스크랩 내역을 생성하는 메서드
 * @param datasetId
 * @returns
 */
export async function setScrap(datasetId: number) {
  try {
    const decryptedToken = decrypt(localStorage.getItem("session"));
    const response = await fetch(`${SERVER_API}/api/scrap/dataset/${datasetId}`, {
      method: "POST",
      headers: {
        Authorization: decryptedToken,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * 유저의 스크랩 내역을 삭제하는 메서드
 * @param datasetId
 * @returns
 */
export async function deleteScrap(datasetId: number) {
  try {
    const decryptedToken = decrypt(localStorage.getItem("session"));
    const response = await fetch(`${SERVER_API}/api/scrap/dataset/${datasetId}`, {
      method: "DELETE",
      headers: {
        Authorization: decryptedToken,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
