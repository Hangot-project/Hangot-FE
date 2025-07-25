import { BASE_URL } from "../config";
import { DatasetTableResponse } from "./type";
import { DatasetTableType } from "../../types/dataset";

export async function getDatasetTable(
  datasetId: number,
): Promise<DatasetTableType | null | { error: string; status: number }> {
  try {
    const res = await fetch(`${BASE_URL}/api/datastore/${datasetId}/chart/table`);

    if (res.status === 404) {
      return { error: "NOT_SUPPORTED", status: 404 };
    }

    const response: DatasetTableResponse = await res.json();

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
