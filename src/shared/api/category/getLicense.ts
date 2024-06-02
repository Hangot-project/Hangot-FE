import { SERVER_API } from "../config";
import { LicenseListResponse } from "./type";

export async function getLicense() {
  try {
    const response: LicenseListResponse = await fetch(
      `${SERVER_API}/api/licenses`,
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    return response.result.licensesList;
  } catch (error) {
    console.error(error);
    return null;
  }
}
