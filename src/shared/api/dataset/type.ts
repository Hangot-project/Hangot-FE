import { DatasetInfo, DatasetInfoDetail } from "../../types/dataset";
import { GeneralResponse } from "../config";

export interface DatasetResult {
  totalPage: number;
  totalElement: number;
  data: DatasetInfo[];
}

export interface DatasetListResponse extends GeneralResponse {
  result: DatasetResult;
}

export interface DatasetDetailResponse extends GeneralResponse {
  result: DatasetInfoDetail;
}
