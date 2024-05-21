import { SERVER_API } from "../config";
import { DatasetBannerResponse } from "./type";

export async function getNewDataset() {
  try {
    const result: DatasetBannerResponse = await fetch(
      `${SERVER_API}/api/dataset/new`,
      {
        cache: "no-cache",
      },
    ).then((res) => res.json());

    if (!result.success) {
      console.error(result.msg);
      return null;
    }

    return result.result.dataset;
  } catch (error) {
    console.error(error);
    return null;
  }
}
