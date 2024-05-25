import { NOTICE_SORT_VALUES } from "../../constants";

export type NOTICE_SORT_TYPES = (typeof NOTICE_SORT_VALUES)[number];

export interface Notice {
  noticeId: number;
  title: string;
  createDate: string;
  view: number;
  adminName: string;
}
