export interface GeneralResponse {
  success: boolean;
  msg: string;
}

export const BASE_URL = `${process.env.NEXT_PUBLIC_DOMAIN}`;
