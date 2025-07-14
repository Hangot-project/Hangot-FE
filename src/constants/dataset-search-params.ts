import {
  MenuEmploy,
  MenuFinance,
  MenuGraduate,
  MenuSchedule,
  MenuSchool,
  MenuStudent,
  MenuStudy,
  MenuWelfare,
  MenuWorld,
} from "../../public/svgs";

export const QUICK_MENU = [
  {
    src: MenuSchool,
    title: "입학",
  },
  {
    src: MenuStudent,
    title: "학생",
  },
  {
    src: MenuSchedule,
    title: "학사",
  },
  {
    src: MenuWorld,
    title: "국제",
  },
  {
    src: MenuWelfare,
    title: "복지",
  },
  {
    src: MenuFinance,
    title: "재정",
  },
  {
    src: MenuEmploy,
    title: "취창업",
  },
  {
    src: MenuStudy,
    title: "학술",
  },
  {
    src: MenuGraduate,
    title: "장학",
  },
] as const;

export const THEME_VALUES = QUICK_MENU.map((menu) => menu.title);

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

export const DATA_TYPES = ["csv", "xls", "xlsx", "pdf", "docx", "json","jpeg","png"] as const;

export const SORT_VALUES = [
  "최신순",
  "스크랩순",
  "조회순",
  "다운로드순",
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
