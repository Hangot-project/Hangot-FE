import { SERVER_PARAMS_KEY } from "../../../constants/dataset-search-params";
import { BASE_URL } from "../config";
import { DatasetListResponse } from "./type";
import { logApiError } from "../../../utils/api/error-handler";

/**
 * 검색 키워드에 해당하는 데이터셋 리스트를 불러온다.
 * @param keyword 검색 키워드
 * @param page 요청 페이지
 * @param type 파일 유형 항목에서 선택한 내역
 * @param organization 조직 항목에서 선택한 내역
 * @param tag
 * @param sort 정렬 기준
 * @returns
 */
export async function getSearchResults(
  keyword: string | undefined,
  page: string | undefined,
  type: string[] | undefined,
  organization: string[] | undefined,
  tag: string[] | undefined,
  sort: string | undefined,
): Promise<DatasetListResponse | null> {
  try {
    const params = new URLSearchParams();

    if (keyword) {
      params.append(SERVER_PARAMS_KEY.KEYWORD, keyword);
    }

    if (page) {
      params.append(SERVER_PARAMS_KEY.PAGE, page);
    }

    type?.forEach((typeStr) => {
      params.append(SERVER_PARAMS_KEY.TYPE, typeStr.toLowerCase());
    });

    organization?.forEach((orgStr) => {
      params.append(SERVER_PARAMS_KEY.ORGANIZATION, orgStr);
    });

    tag?.forEach((tagStr) => {
      params.append(SERVER_PARAMS_KEY.TAG, tagStr);
    });

    if (sort) {
      if (sort[sort.length - 1] == "순") {
        sort = sort.slice(0, sort.length - 1);
      }
      params.append(SERVER_PARAMS_KEY.SORT, sort);
    }

    const endpoint = `${BASE_URL}/api/datasets?${params.toString()}`;
    const response = await fetch(endpoint, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const result: DatasetListResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets?`,
    );
    return null;
  }
}
