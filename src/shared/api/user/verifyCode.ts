import { GeneralResponse, SERVER_API } from "../config";

interface VerifyCodeRequestBody {
  email: string;
  code: string;
}

export async function verifyCode(body: VerifyCodeRequestBody) {
  try {
    const response: GeneralResponse = await fetch(`${SERVER_API}/api/user/code`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
