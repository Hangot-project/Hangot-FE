import { BASE_URL } from "../config";
import {
  ApiError,
  handleApiResponse,
  isError,
  safeApiCall,
} from "../../types/error";

interface OrganizationResponse {
  success: boolean;
  msg: string;
  result: string[];
}

export async function getFilterOrganizations(): Promise<string[] | null | ApiError> {
  return safeApiCall(async () => {
    const res = await fetch(`${BASE_URL}/api/datasets/organizations`);
    const result = await handleApiResponse<OrganizationResponse>(res);

    if (isError(result)) {
      return result;
    }

    return result.result;
  });
}
