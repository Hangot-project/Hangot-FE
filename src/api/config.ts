export interface GeneralResponse {
  success: boolean;
  msg: string;
}

export const SERVER_API = `${process.env.NEXT_PUBLIC_SERVER_API}`;
