/**
 *
 * @param currentPage 현재 페이지
 * @param totalPage 전체 페이지
 * @param _bound 한 페이지에 몇 개씩 노출할 것인지(디폴트: 5)
 */
export function getPageArray(
  currentPage: number,
  totalPage: number,
  bound: number = 5,
): number[] {
  // Use 1-based indexing
  const adjustedCurrentPage = Math.max(currentPage, 1);
  const index = Math.floor((adjustedCurrentPage - 1) / bound);
  const min = bound * index + 1;
  const max = Math.min(min + bound - 1, totalPage);

  return [...new Array(max - min + 1)].map((value, idx) => min + idx);
}
