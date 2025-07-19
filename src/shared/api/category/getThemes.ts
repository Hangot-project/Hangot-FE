import { BASE_URL } from "../config";
import { ThemeListResponse } from "./type";

export async function getThemes() {
  try {
    const response: ThemeListResponse = await fetch(`${BASE_URL}/api/themes`).then(
      (res) => res.json(),
    );

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    return response.result.themeList;
  } catch (error) {
    console.error(error);
    return null;
  }
}
