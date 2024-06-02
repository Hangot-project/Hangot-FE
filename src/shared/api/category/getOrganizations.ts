import { SERVER_API } from "../config";
import { OrganizationListResponse } from "./type";
import { SERVER_PARAMS_KEY } from "../../../constants/dataset-search-params";

export async function getOrganizations(keyword?: string) {
  try {
    const params = new URLSearchParams();
    if (keyword) {
      params.append(SERVER_PARAMS_KEY.KEYWORD, keyword);
    }

    const response: OrganizationListResponse = await fetch(
      `${SERVER_API}/api/organizations?${params.toString()}`,
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    return response.result.organizationList;
  } catch (error) {
    console.error(error);
    return null;
  }
}
