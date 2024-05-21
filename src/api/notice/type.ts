import { Notice } from "../../types/notice";
import { GeneralResponse } from "../config";

export interface NoticeResult {
  totalPage: number;
  totalElement: number;
  data: Notice[];
}

export interface NoticesResponse extends GeneralResponse {
  result: NoticeResult;
}
