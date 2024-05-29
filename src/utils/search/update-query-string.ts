"use client";

import { SERVER_PARAMS_KEY } from "../../constants/dataset-search-params";

interface UpdateQueryStringProps {
  type: "create" | "append" | "remove";
  name: string;
  value?: any;
  searchParams: string;
}

/**
 *
 * @param {"create" | "append" | "remove"} type - 수정할 작업
 * @param {string} name - 수정할 파라미터의 이름
 * @param {any} value - 수정할 파라미터의 값
 * @returns
 */
export function updateQueryString(props: UpdateQueryStringProps): string {
  const { type, name, value, searchParams } = props;
  const params = new URLSearchParams(searchParams);

  switch (type) {
    case "create":
      params.set(name, value);
      return params.toString();

    case "append": // 주제 필터 추가 -> 첫 번째 페이지로 리셋
      params.set(SERVER_PARAMS_KEY.PAGE, `0`);
      params.append(name, value);
      return params.toString();

    case "remove":
      params.delete(name, value);
      return params.toString();

    default:
      return "";
  }
}
