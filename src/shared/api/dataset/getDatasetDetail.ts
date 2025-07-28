import { DatasetInfoDetail } from "../../types/dataset";
import { DatasetDetailResponse } from "./type";
import { BASE_URL } from "../config";

export async function getDatasetDetail(id: number): Promise<DatasetInfoDetail> {
  const response = await fetch(`${BASE_URL}/api/dataset/${id}`, {
    cache: "no-store",
  });
  const result: DatasetDetailResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.result;
}
