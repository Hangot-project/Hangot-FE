import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth-slice";

//? 이 파일은 NextJS에 도입된 Server Component 때문에 추가해야 한다.
//     -> SPA에서는 state 값이 global하게 관리되고 모든 request마다 서로 공유되지만, RSC에서는 각 request마다 store를 새로 생성해주어야 한다.
// 출처: https://redux.js.org/usage/nextjs#the-app-router-architecture-and-redux
export const makeStore = () => {
  return configureStore({
    reducer: {
      authReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
