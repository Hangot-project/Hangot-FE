import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const Role = {
  USER: "ROLE_USER",
  ADMIN: "ROLE_ADMIN",
} as const;

type Role = (typeof Role)[keyof typeof Role]; // "ROLE_USER" | "ROLE_ADMIN"

type UserState = {
  isActive: boolean; // 로그인 상태
  accessToken: string; // 발급받은 액세스 토큰
  role: Role | null;
};

type InitialState = {
  value: UserState;
};

const initialState: InitialState = {
  value: {
    isActive: false,
    accessToken: "",
    role: null,
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * 사용자가 로그인 했을 때, 사용자 정보를 업데이트
     * @param _state
     * @param action
     * @returns
     */
    login(_state, action: PayloadAction<string>) {
      return {
        value: {
          isActive: true,
          accessToken: action.payload,
          role: "ROLE_USER",
        },
      };
    },
    /**
     * 사용자가 로그아웃 했을 때, 사용자 정보를 초기화
     * @returns
     */
    logout() {
      return initialState;
    },
    /**
     * 액세스 토큰을 재발급 받을 때, 재발급받은 토큰 저장
     * @param state
     * @param action
     * @returns
     */
    updateToken(state, action: PayloadAction<string>) {
      return {
        value: {
          ...state.value,
          accessToken: action.payload,
        },
      };
    },
  },
});

export const { login, logout, updateToken } = auth.actions;
export default auth.reducer;
