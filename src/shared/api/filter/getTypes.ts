import { BASE_URL } from "../config";
import { logApiError } from "../../../utils/api/error-handler";

interface TypesResponse {
  success: boolean;
  msg: string;
  result: string[];
}

export async function getFilterTypes(): Promise<string[] | null> {
  try {
    const endpoint = `${BASE_URL}/api/datasets/types`;
    const response = await fetch(endpoint);
    const result: TypesResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result.result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets/types`,
    );
    return null;
  }
}
