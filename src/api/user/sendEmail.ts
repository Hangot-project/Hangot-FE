import { GeneralResponse, SERVER_API } from "../config";

interface EmailRequestDto {
  email: string;
}

export async function sendEmail(body: EmailRequestDto) {
  try {
    const response: GeneralResponse = await fetch(`${SERVER_API}/api/user/email`, {
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
