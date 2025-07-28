import { BASE_URL } from "../config";
import { DatasetChartResponse } from "./type";

export async function getDatasetChart(datasetId: number, colName: string) {
  try {
    const response: DatasetChartResponse = await fetch(
      `${BASE_URL}/api/datasets/${datasetId}/chart?colName=${colName}`,
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    return response.result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
