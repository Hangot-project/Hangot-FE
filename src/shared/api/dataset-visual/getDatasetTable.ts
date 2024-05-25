import { DATASET_API } from "../config";
import { DatasetTableResponse } from "./type";

export async function getDatasetTable(datasetId: number) {
  try {
    const response: DatasetTableResponse = await fetch(
      `${DATASET_API}/${datasetId}/chart/table`,
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
