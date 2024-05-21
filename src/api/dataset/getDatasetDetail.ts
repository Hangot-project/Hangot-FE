import { DatasetInfoDetail } from "../../types/dataset";
import { SERVER_API } from "../config";
import { DatasetDetailResponse } from "./type";

export async function getDatasetDetail(id: number): Promise<DatasetInfoDetail> {
  try {
    const result: DatasetDetailResponse = await fetch(
      `${SERVER_API}/api/dataset/${id}`,
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
