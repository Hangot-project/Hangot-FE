export interface ApiError {
  success: false;
  msg: string;
  status: number;
}

export function isApiError(response: any): response is ApiError {
  return response && response.success === false && typeof response.msg === "string";
}

export function createApiError(status: number, msg: string): ApiError {
  return {
    success: false,
    msg,
    status,
  };
}

export async function handleApiResponse<T>(
  response: Response,
): Promise<T | ApiError> {
  const data = await response.json();

  if (!response.ok) {
    return createApiError(
      response.status,
      data.msg || "알 수 없는 오류가 발생했습니다.",
    );
  }

  if (data.success === false) {
    return createApiError(response.status, data.msg);
  }

  return data;
}

export async function safeApiCall<T>(
  apiCall: () => Promise<T | ApiError>,
): Promise<T | ApiError> {
  try {
    return await apiCall();
  } catch (error) {
    console.error(error);
    return createApiError(500, "네트워크 연결을 확인해주세요.");
  }
}

export function isError<T>(result: T | ApiError): result is ApiError {
  return (result as ApiError).success === false;
}
