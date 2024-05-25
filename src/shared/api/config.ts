export interface GeneralResponse {
  success: boolean;
  msg: string;
}

export const SERVER_API = `${process.env.NEXT_PUBLIC_SERVER_API}`;
export const DATASET_API = `${process.env.NEXT_PUBLIC_DATASET_API}/api/dataset`;
