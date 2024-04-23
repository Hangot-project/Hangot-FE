/**
 * search params 값을 string 배열로 변환하는 메서드
 * @param param
 * @returns
 */
export function ParamToSearchResultProps(param: string | string[]) {
  if (typeof param === "string") return new Array(param);
  return param;
}
