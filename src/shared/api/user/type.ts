import { LoginResponseDto, SignupResponseDto } from "../../types/user";
import { GeneralResponse } from "../config";

export interface LoginResponse extends GeneralResponse {
  result: LoginResponseDto;
}

export interface SignupResponse extends GeneralResponse {
  result: SignupResponseDto;
}
