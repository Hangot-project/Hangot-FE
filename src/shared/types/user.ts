import { ROLE } from "../../constants/role";

export interface LoginInput {
  email: string;
  password: string;
  autoLogin: boolean;
}

export interface LoginResponseDto {
  grantType: string;
  accessToken: string;
}

export interface SetPasswordRequestDto {
  password: string;
}

export interface SignupResponseDto {
  userId: number;
  name: string;
  email: string;
}

export type UserRole = (typeof ROLE)[keyof typeof ROLE];
