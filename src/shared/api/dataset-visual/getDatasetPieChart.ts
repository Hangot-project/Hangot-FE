import { BASE_URL } from "../config";
import { DatasetPieChartResponse } from "./type";

export async function getDatasetPieChart(
  datasetId: number,
  colName: string,
): Promise<DatasetPieChartResponse> {
  const response = await fetch(
    `${BASE_URL}/api/datasets/${datasetId}/pie-chart?colName=${colName}`,
  );
  const result: DatasetPieChartResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result;
}
