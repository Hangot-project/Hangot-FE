import { BASE_URL } from "../config";
import { DatasetAxisResponse, DatasetAxisResult } from "./type";
import { logApiError } from "../../../utils/api/error-handler";

export async function getDatasetAxis(
  datasetId: number,
): Promise<DatasetAxisResult | null> {
  try {
    const endpoint = `${BASE_URL}/api/datasets/${datasetId}/axis`;
    const response = await fetch(endpoint);
    const result: DatasetAxisResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result.result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets/${datasetId}/axis`,
    );
    return null;
  }
}
