import { Question, QuestionSimple } from "../../types/question";
import { GeneralResponse } from "../config";

export interface QuestionResponse extends GeneralResponse {
  result: Question;
}

export interface MyQuestionResponse extends GeneralResponse {
  result: {
    totalPage: number;
    totalElement: number;
    data: QuestionSimple[];
  };
}
