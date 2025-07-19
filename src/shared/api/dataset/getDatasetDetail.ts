import { DatasetInfoDetail } from "../../types/dataset";
import { DatasetDetailResponse } from "./type";
import { BASE_URL } from "../config";

export async function getDatasetDetail(id: number): Promise<DatasetInfoDetail> {
  try {
    const result: DatasetDetailResponse = await fetch(
      `${BASE_URL}/api/dataset/${id}`,
      { cache: "no-store" },
    ).then((res) => res.json());

    if (!result.success) {
      console.error(result.msg);
      return null;
    }
    return result.result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
