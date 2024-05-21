import { SERVER_API } from "../config";
import { SignupResponse } from "./type";

interface SignupRequestDto {
  email: string;
  password: string;
  name: string;
}

export async function userSignup(body: SignupRequestDto) {
  try {
    const response: SignupResponse = await fetch(`${SERVER_API}/api/user/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());

    if (!response.success) {
      console.error(response.msg);
      return response;
    }

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
