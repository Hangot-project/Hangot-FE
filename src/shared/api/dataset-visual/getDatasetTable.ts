import { BASE_URL } from "../config";
import { DatasetTableResponse } from "./type";
import { DatasetTableType } from "../../types/dataset";

export async function getDatasetTable(datasetId: number): Promise<DatasetTableType> {
  const response = await fetch(`${BASE_URL}/api/datasets/${datasetId}/table`);
  const result: DatasetTableResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.result;
}
