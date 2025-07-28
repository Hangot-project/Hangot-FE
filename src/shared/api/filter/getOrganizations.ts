import { BASE_URL } from "../config";

interface OrganizationResponse {
  success: boolean;
  msg: string;
  result: string[];
}

export async function getFilterOrganizations(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/api/datasets/organizations`);
  const result: OrganizationResponse = await response.json();

  if (!result.success) {
    throw new Error(result.msg);
  }

  return result.result;
}
