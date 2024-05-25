import { DatasetChartType, DatasetTableType } from "../../types/dataset";
import { GeneralResponse } from "../config";

export interface DatasetAxisResult {
  axis: string[];
}

export interface DatasetAxisResponse extends GeneralResponse {
  result: DatasetAxisResult;
}

export interface DatasetChartResponse extends GeneralResponse {
  result: DatasetChartType;
}

export interface DatasetTableResponse extends GeneralResponse {
  result: DatasetTableType;
}
