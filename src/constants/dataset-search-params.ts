export const THEME_VALUES = [
  "입학",
  "학생",
  "학사",
  "국제",
  "복지",
  "재정",
  "취창업",
  "학술",
  "장학",
] as const;

export const ORGANIZATION_VALUES = [
  "소프트융합대학",
  "공과대학",
  "경상대학",
  "과학기술융합대학",
  "국제문화대학",
  "디자인대학",
  "약학대학",
  "언론정보대학",
  "예체능대학",
  "입학처",
] as const;

export const DATA_TYPES = ["csv", "xls", "xlsx", "pdf", "docx", "json"] as const;

export const SORT_VALUES = ["최신순", "스크랩순", "조회순", "다운로드순"] as const;

export const SERVER_PARAMS_KEY = {
  KEYWORD: "keyword",
  PAGE: "page",
  THEME: "theme",
  TYPE: "type",
  ORGANIZATION: "organization",
  SORT: "sort",
} as const;
