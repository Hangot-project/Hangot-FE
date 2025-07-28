import { BASE_URL } from "../config";
import { DatasetTableResponse } from "./type";
import { DatasetTableType } from "../../types/dataset";
import {
  ApiError,
  handleApiResponse,
  isError,
  safeApiCall,
} from "../../types/error";

export async function getDatasetTable(
  datasetId: number,
): Promise<DatasetTableType | null | ApiError> {
  return safeApiCall(async () => {
    const res = await fetch(`${BASE_URL}/api/datasets/${datasetId}/table`);
    const result = await handleApiResponse<DatasetTableResponse>(res);

    if (isError(result)) {
      return result;
    }

    return result.result;
  });
}
