import { SERVER_PARAMS_KEY } from "../constants/dataset-search-params";
import { GeneralResponse } from "./config";

export interface Dataset {
  datasetId: number;
  title: string;
  description: string;
  organization: string;
  view: number;
  type: string;
  themeList: string[];
}

type DatasetResult = {
  totalPage: number;
  totalElement: number;
  data: Dataset[];
};

interface DatasetListResponse extends GeneralResponse {
  result: DatasetResult;
}

// TODO: theme, organization, sort 파라미터 추가
/**
 * 검색 키워드에 해당하는 데이터셋 리스트를 불러온다.
 * @param keyword 검색 키워드
 * @param page 요청 페이지
 * @param theme 주제별 항목에서 선택한 내역
 * @param type 파일 유형 항목에서 선택한 내역
 * @param organization 조직 항목에서 선택한 내역
 * @param sort 정렬 기준
 * @returns
 */
export async function getSearchResults(
  keyword: string | undefined,
  page: string | undefined,
  theme: string[] | undefined,
  type: string[] | undefined,
  organization: string[] | undefined,
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

    theme?.forEach((themeStr) => {
      params.append(SERVER_PARAMS_KEY.THEME, themeStr);
    });

    type?.forEach((typeStr) => {
      params.append(SERVER_PARAMS_KEY.TYPE, typeStr.toLowerCase());
    });

    organization?.forEach((orgStr) => {
      params.append(SERVER_PARAMS_KEY.ORGANIZATION, orgStr);
    });

    if (sort) {
      if (sort[sort.length - 1] == "순") {
        sort = sort.slice(0, sort.length - 1);
      }
      params.append(SERVER_PARAMS_KEY.SORT, sort);
    }

    console.log(
      "api >>> ",
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/datasets?${params.toString()}`,
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/api/datasets?${params.toString()}`,
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    );
    const result: DatasetListResponse = await res.json();

    console.log("result :", result);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
