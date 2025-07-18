export const DATA_TYPES = [
  "csv",
  "xls",
  "xlsx",
  "pdf",
  "docx",
  "json",
  "jpeg",
  "png",
] as const;

export const SORT_VALUES = [
  "최신순",
  "스크랩순",
  "조회순",
  "인기순",
] as const;

export const SERVER_PARAMS_KEY = {
  KEYWORD: "keyword",
  PAGE: "page",
  THEME: "theme",
  TYPE: "type",
  ORGANIZATION: "organization",
  SORT: "sort",
} as const;
