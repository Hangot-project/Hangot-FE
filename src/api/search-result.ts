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

/**
 * 검색 키워드에 해당하는 데이터셋 리스트를 불러온다.
 * @param keyword 검색 키워드
 * @returns
 */
export async function getSearchResults(
  keyword: string,
): Promise<DatasetListResponse> {
  let _results: JsonPlaceholderPost[];

  //* 1. 키워드가 입력되지 않은 경우, 전체 데이터셋 리스트를 불러온다.
  if (!keyword) {
    //? [cache: 'no-store'] 검색 기능의 경우, 매 요청마다 결과 데이터를 갱신해야 하므로 캐싱하지 않는다.
    //-> 참고: https://nextjs.org/docs/pages/building-your-application/upgrading/app-router-migration#step-6-migrating-data-fetching-methods
    const res = await fetch(`${process.env.SERVER_URL}/posts`, {
      cache: "no-store",
    });
    _results = await res.json();
  }
  //* 2. 키워드가 입력된 경우, 해당 키워드에 해당하는 리스트만 불러온다.
  else {
    //TODO: keyword -> api 쿼리에 추가
    const res = await fetch(`${process.env.SERVER_URL}/posts`, {
      cache: "no-store",
    });
    _results = await res.json();
  }

  const result = {
    totalPage: 3,
    totalElement: _results.length,
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
}
