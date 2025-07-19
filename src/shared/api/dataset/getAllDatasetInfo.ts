import { DatasetInfo } from "../../types/dataset";
import { BASE_URL } from "../config";
import { DatasetListResponse } from "./type";

export async function getAllDatasetInfo(): Promise<DatasetInfo[]> {
  try {
    const response: DatasetListResponse = await fetch(
      `${BASE_URL}/api/datasets`,
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }
    return response.result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
