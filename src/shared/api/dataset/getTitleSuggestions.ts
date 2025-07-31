import { BASE_URL } from "../config";
import { logApiError } from "../../../utils/api/error-handler";

export async function getTitleSuggestions(query: string): Promise<string[] | null> {
  try {
    const params = new URLSearchParams();
    params.append("query", query);

    const endpoint = `${BASE_URL}/api/datasets/titles/search?${params.toString()}`;
    const response = await fetch(endpoint, {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      logApiError(
        `HTTP error! status: ${response.status}`,
        endpoint,
        response.status,
      );
      return null;
    }

    const data = await response.json();
    return data.success ? data.result : null;
  } catch (error) {
    logApiError(
      error instanceof Error ? error.message : String(error),
      `${BASE_URL}/api/datasets/titles/search`,
    );
    return null;
  }
}
