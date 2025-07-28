import { BASE_URL } from "../config";
import { DatasetAxisResponse } from "./type";

export async function getDatasetAxis(datasetId: number) {
  try {
    const response: DatasetAxisResponse = await fetch(
      `${BASE_URL}/api/datasets/${datasetId}/axis`,
    ).then((res) => res.json());

    if (!response.success) {
      return null;
    }

    return response.result;
  } catch (error) {
    return null;
  }
}
