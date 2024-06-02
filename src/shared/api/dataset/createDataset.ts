import { CreateDatasetBody } from "../../types/dataset";
import { SERVER_API } from "../config";
import { CreateDatasetResponse } from "./type";

type Props = {
  grantType: string;
  token: string;
  body: CreateDatasetBody;
  file: any;
};

export async function createDataset({ grantType, token, body, file }: Props) {
  try {
    //* 1. dataset post
    // 빈 값 제거
    const notEmptyTheme = body.theme.filter(
      (value) => value !== null && value !== undefined,
    );
    // 중복 제거
    body.theme = Array.from(new Set(notEmptyTheme));

    const response = await fetch(`${SERVER_API}/api/dataset`, {
      method: "POST",
      headers: {
        Authorization: `${grantType} ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(response);
      return null;
    }

    //* 2. file post
    const res: CreateDatasetResponse = await response.json();

    const formData = new FormData();
    formData.append(`file`, file);

    const fileResponse = await fetch(
      `${SERVER_API}/api/dataset/${res.result.datasetId}/resource`,
      {
        method: "PUT",
        headers: {
          Authorization: `${grantType} ${token}`,
          //   "Content-Type": "multipart/form-data",
        },
        body: formData,
      },
    );

    return fileResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
}
