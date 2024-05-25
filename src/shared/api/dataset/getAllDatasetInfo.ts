import { DatasetInfo } from "../../types/dataset";
import { SERVER_API } from "../config";
import { DatasetListResponse } from "./type";

export async function getAllDatasetInfo(): Promise<DatasetInfo[]> {
  try {
    const response: DatasetListResponse = await fetch(
      `${SERVER_API}/api/datasets`,
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
