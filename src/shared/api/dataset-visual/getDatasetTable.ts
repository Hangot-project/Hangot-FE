import { BASE_URL } from "../config";
import { DatasetTableResponse } from "./type";
import { DatasetTableType } from "../../types/dataset";
import { logApiError } from "../../../utils/api/error-handler";

export async function getDatasetTable(
  datasetId: number,
): Promise<DatasetTableType | null> {
  try {
    const endpoint = `${BASE_URL}/api/datasets/${datasetId}/table`;
    const response = await fetch(endpoint);
    const result: DatasetTableResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result.result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets/${datasetId}/table`,
    );
    return null;
  }
}
