import { BASE_URL } from "../config";
import { LicenseListResponse } from "./type";

export async function getLicense() {
  try {
    const response: LicenseListResponse = await fetch(
      `${BASE_URL}/api/licenses`,
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
