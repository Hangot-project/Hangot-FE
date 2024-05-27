import { QuestionDetail, QuestionSimple } from "../../types/question";
import { GeneralResponse } from "../config";

export interface QuestionDetailResponse extends GeneralResponse {
  result: QuestionDetail;
}

export interface MyQuestionResponse extends GeneralResponse {
  result: {
    totalPage: number;
    totalElement: number;
    data: QuestionSimple[];
  };
}

export interface QuestionListResult {
  totalPage: number;
  totalElement: number;
  data: QuestionSimple[];
}

export interface QuestionListResponse extends GeneralResponse {
  result: QuestionListResult;
}
