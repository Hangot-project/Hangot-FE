import { BASE_URL } from "../config";
import { logApiError } from "../../../utils/api/error-handler";

interface OrganizationResponse {
  success: boolean;
  msg: string;
  result: string[];
}

export async function getFilterOrganizations(): Promise<string[] | null> {
  try {
    const endpoint = `${BASE_URL}/api/datasets/organizations`;
    const response = await fetch(endpoint);
    const result: OrganizationResponse = await response.json();

    if (!result.success) {
      logApiError(result.msg, endpoint, response.status);
      return null;
    }

    return result.result;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets/organizations`,
    );
    return null;
  }
}
