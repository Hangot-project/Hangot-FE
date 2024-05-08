import { SERVER_PARAMS_KEY } from "../constants/dataset-search-params";
import { GeneralResponse, SERVER_API } from "./config";
import { Organization } from "../constants/dataset-search-params";

export type Dataset = {
  x_axis_name: string;
  x_label: string[];
  dataName: string[];
  dataList: Array<Array<string>>;
};

export interface DatasetDetail {
  datasetId: number;
  title: string;
  description: string;
  organization: Organization;
  theme: string[];
  createdDate: string;
  updateDate: string;
  view: number;
  scrap: number;
  download: number;
  resourceName: string;
  resourceUrl: string;
}

export interface DatasetInfo {
  datasetId: number;
  title: string;
  description: string;
  organization: Organization;
  view: number;
  type: string;
  themeList: string[];
}

type DatasetResult = {
  totalPage: number;
  totalElement: number;
  data: DatasetInfo[];
};

interface DatasetListResponse extends GeneralResponse {
  result: DatasetResult;
}

interface DatasetDetailResponse extends GeneralResponse {
  result: DatasetDetail;
}

export async function getAllDatasets(): Promise<DatasetInfo[]> {
  try {
    const response: DatasetListResponse = await fetch(
      `${SERVER_API}/api/datasets`,
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }
    return response.result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

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

    const result: DatasetListResponse = await fetch(
      `${SERVER_API}/api/datasets?${params.toString()}`,
      {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      },
    ).then((res) => res.json());

    if (!result.success) {
      console.error(result.msg);
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getDatasetDetail(id: number): Promise<DatasetDetail> {
  try {
    const result: DatasetDetailResponse = await fetch(
      `${SERVER_API}/api/dataset/${id}`,
      { cache: "no-store" },
    ).then((res) => res.json());

    if (!result.success) {
      console.error(result.msg);
      return null;
    }
    return result.result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
