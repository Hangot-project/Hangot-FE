import { DATASET_API } from "../config";
import { DatasetChartResponse } from "./type";

export async function getDatasetChart(datasetId: number, colName: string) {
  try {
    const response: DatasetChartResponse = await fetch(
      `${DATASET_API}/${datasetId}/chart?colName=${colName}`,
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
