import { SetPasswordRequestDto } from "../../types/user";
import { GeneralResponse, SERVER_API } from "../config";

export async function setPassword(body: SetPasswordRequestDto) {
  try {
    const response: GeneralResponse = await fetch(
      `${SERVER_API}/api/user/password`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      },
    ).then((res) => res.json());

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
