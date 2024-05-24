import { GeneralResponse } from "../config";

export interface DatasetAxisResult {
  axis: string[];
}

export interface DatasetAxisResponse extends GeneralResponse {
  result: DatasetAxisResult;
}
