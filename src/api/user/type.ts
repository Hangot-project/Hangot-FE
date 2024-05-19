import { LoginResponseDto } from "../../types/user";
import { GeneralResponse } from "../config";

export interface LoginResponse extends GeneralResponse {
  result: LoginResponseDto;
}
