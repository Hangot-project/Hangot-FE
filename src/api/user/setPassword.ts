import { GeneralResponse, SERVER_API } from "../config";

type Props = {
  password: string;
  grantType: string;
  token: string;
};

export async function setPassword({ password, grantType, token }: Props) {
  try {
    const response: GeneralResponse = await fetch(
      `${SERVER_API}/api/user/password`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${grantType} ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({ password }),
      },
    ).then((res) => res.json());

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
