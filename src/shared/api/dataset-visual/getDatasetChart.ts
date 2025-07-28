import { BASE_URL } from "../config";
import { DatasetChartResponse } from "./type";
import { DatasetChartType } from "../../types/dataset";
import { logApiError } from "../../../utils/api/error-handler";

export async function getDatasetChart(
  datasetId: number,
  colName: string,
): Promise<DatasetChartType | null> {
  try {
    const endpoint = `${BASE_URL}/api/datasets/${datasetId}/chart?colName=${colName}`;
    const response = await fetch(endpoint);
    const result: DatasetChartResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result.result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets/${datasetId}/chart?colName=${colName}`,
    );
    return null;
  }
}
