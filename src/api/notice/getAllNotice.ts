import { NOTICE_SORT_TYPES } from "../../types/notice";
import { SERVER_API } from "../config";
import { NoticeResult, NoticesResponse } from "./type";

type NoticeParam = {
  sort: NOTICE_SORT_TYPES | undefined;
  page: number;
};

export async function getAllNotice(filter: NoticeParam): Promise<NoticeResult> {
  try {
    const params = new URLSearchParams();

    params.append("page", filter.page.toString());
    params.append("sort", filter.sort ? filter.sort : "최신순");

    const response: NoticesResponse = await fetch(
      `${SERVER_API}/api/notices?${params.toString()}`,
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
