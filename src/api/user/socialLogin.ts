import { ProviderType, SocialLoginRequestDto } from "../../types/oauth";
import { SERVER_API } from "../config";

export async function socialLogin(
  provider: ProviderType,
  body: SocialLoginRequestDto,
) {
  try {
    const response = await fetch(`${SERVER_API}/api/user/login/${provider}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}
