import { SERVER_API } from "../config";
import { QuestionListResponse } from "./type";

type QuestionParam = {
  page: number;
  category?: string;
  answerStatus?: string;
};

export async function getAllQuestionList({
  page,
  category,
  answerStatus,
}: QuestionParam) {
  try {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    if (category) params.append("category", category);
    if (answerStatus) params.append("answerStatus", answerStatus);

    //! no-cache ?
    const response: QuestionListResponse = await fetch(
      `${SERVER_API}/api/questions?${params.toString()}`,
      {
        cache: "no-cache",
      },
    ).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return null;
    }

    return response.result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
