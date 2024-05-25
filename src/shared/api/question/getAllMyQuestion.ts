import { SERVER_API } from "../config";
import { MyQuestionResponse } from "./type";

export async function getAllMyQuestion(page: number = 0) {
  try {
    const response: MyQuestionResponse = await fetch(
      `${SERVER_API}/api/my/questions?page=${page}`,
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
