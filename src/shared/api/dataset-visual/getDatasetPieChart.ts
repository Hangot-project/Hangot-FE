import { BASE_URL } from "../config";
import { DatasetPieChartResponse } from "./type";
import { logApiError } from "../../../utils/api/error-handler";

export async function getDatasetPieChart(
  datasetId: number,
  colName: string,
): Promise<DatasetPieChartResponse | null> {
  try {
    const endpoint = `${BASE_URL}/api/datasets/${datasetId}/pie-chart?colName=${colName}`;
    const response = await fetch(endpoint);
    const result: DatasetPieChartResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets/${datasetId}/pie-chart?colName=${colName}`,
    );
    return null;
  }
}
