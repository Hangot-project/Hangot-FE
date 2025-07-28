import { BASE_URL } from "../config";
import { DatasetAxisResponse, DatasetAxisResult } from "./type";

export async function getDatasetAxis(datasetId: number): Promise<DatasetAxisResult> {
  const response = await fetch(`${BASE_URL}/api/datasets/${datasetId}/axis`);
  const result: DatasetAxisResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.result;
}
