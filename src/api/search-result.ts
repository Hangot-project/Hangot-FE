interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Dataset {
  datasetId: number;
  title: string;
  description: string;
  view: number;
}

interface DatasetListResponse {
  totalPage: number;
  totalElement: number;
  simpleDatasetList: Dataset[];
}

// TODO: theme, organization, sort 파라미터 추가
/**
 * 검색 키워드에 해당하는 데이터셋 리스트를 불러온다.
 * @param keyword 검색 키워드
 * @param page 검색 페이지
 * @returns
 */
export async function getSearchResults(
  keyword: string | undefined,
  page: string | undefined,
  theme: string[] | undefined,
  organization: string[] | undefined,
  sort: string | undefined,
): Promise<DatasetListResponse | null> {
  try {
    console.log("다음 키워드로 검색 api 호출됨 >>>", keyword);
    const params = new URLSearchParams();

    if (keyword) {
      params.append("keyword", keyword);
    }

    if (page) {
      params.append("_page", page);
    }
    //! 실제 백엔드 api에서는 불필요한 코드
    else {
      params.append("_page", "1");
    }

    // TODO: 주제 파라미터 추가
    // theme.forEach((themeStr) => {
    //   params.append("theme", themeStr);
    // });

    // TODO: 조직 파라미터 추가
    // organization?.forEach((orgStr) => {
    //   params.append("organization", orgStr);
    // });

    // TODO: 정렬 파라미터 추가
    // if (sort) {
    //   params.append("sort", sort);
    // }

    //! 마찬가지로 실제 백엔드 api에서는 불필요함
    params.append("_per_page", "10");

    // console.log(`${process.env.SERVER_URL}/posts?${params.toString()}`);

    const res = await fetch(`${process.env.SERVER_URL}/posts?${params.toString()}`, {
      cache: "no-store",
    });
    const _results: JsonPlaceholderPost[] = await res.json();

    const result = {
      totalPage: 10,
      totalElement: 100,
      simpleDatasetList: _results.map(
        (value): Dataset => ({
          datasetId: value.id,
          title: value.title,
          description: value.body,
          view: 0,
        }),
      ),
    };

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
