import { SERVER_API } from "../config";
import { NoticeResult, NoticesResponse } from "./type";

type NoticeParam = {
  page: number;
};

export async function getAllNotice(filter: NoticeParam): Promise<NoticeResult> {
  try {
    const params = new URLSearchParams();

    params.append("page", filter.page.toString());

    const response: NoticesResponse = await fetch(
      `${SERVER_API}/api/notices?${params.toString()}`,
      {
        cache: "no-cache",
      },
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    return response.result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
