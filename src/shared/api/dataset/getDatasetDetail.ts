import { DatasetInfoDetail } from "../../types/dataset";
import { DatasetDetailResponse } from "./type";
import { BASE_URL } from "../config";
import { logApiError } from "../../../utils/api/error-handler";

export async function getDatasetDetail(
  id: number,
): Promise<DatasetInfoDetail | null> {
  try {
    const endpoint = `${BASE_URL}/api/dataset/${id}`;
    const response = await fetch(endpoint, {
      cache: "no-store",
    });
    const result: DatasetDetailResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result.result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/dataset/${id}`,
    );
    return null;
  }
}
