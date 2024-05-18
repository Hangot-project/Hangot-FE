export interface LoginInput {
  email: string;
  password: string;
  autoLogin: boolean;
}

export interface LoginResponseDto {
  grantType: string;
  accessToken: string;
}
