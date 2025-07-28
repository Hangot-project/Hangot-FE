import { BASE_URL } from "../config";
import { DatasetChartResponse } from "./type";
import { DatasetChartType } from "../../types/dataset";

export async function getDatasetChart(
  datasetId: number,
  colName: string,
): Promise<DatasetChartType> {
  const response = await fetch(
    `${BASE_URL}/api/datasets/${datasetId}/chart?colName=${colName}`,
  );
  const result: DatasetChartResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.result;
}
