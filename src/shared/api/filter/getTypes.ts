import { BASE_URL } from "../config";
import {
  ApiError,
  handleApiResponse,
  isError,
  safeApiCall,
} from "../../types/error";

interface TypesResponse {
  success: boolean;
  msg: string;
  result: string[];
}

export async function getFilterTypes(): Promise<string[] | null | ApiError> {
  return safeApiCall(async () => {
    const res = await fetch(`${BASE_URL}/api/datasets/types`);
    const response = await handleApiResponse<TypesResponse>(res);

    if (isError(response)) {
      return response;
    }

    return response.result;
  });
}
