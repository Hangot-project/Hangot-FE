export const THEME_VALUES = Object.freeze([
  "입학",
  "학생",
  "학사",
  "국제",
  "복지",
  "재정",
  "취창업",
  "학술",
  "장학",
]);

export const ORGANIZATION_VALUES = Object.freeze([
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
]);

export type Organization = (typeof ORGANIZATION_VALUES)[number];

export const DATA_TYPES = Object.freeze([
  "CSV",
  "XLS",
  "XLSX",
  "PDF",
  "DOCX",
  "JSON",
]);

export const SORT_VALUES = Object.freeze([
  "최신순",
  "스크랩순",
  "조회순",
  "다운로드순",
]);

export const SERVER_PARAMS_KEY = Object.freeze({
  KEYWORD: "keyword",
  PAGE: "page",
  THEME: "theme",
  TYPE: "type",
  ORGANIZATION: "organization",
  SORT: "sort",
});
