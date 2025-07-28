import { BASE_URL } from "../config";

interface TypesResponse {
  success: boolean;
  msg: string;
  result: string[];
}

export async function getFilterTypes(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/api/datasets/types`);
  const result: TypesResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.result;
}
