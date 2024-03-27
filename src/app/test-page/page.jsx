"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/lib/hooks";
import { login, logout } from "@/lib/slice/auth-slice";
import { dataset as result } from "@/dummy-data/datasets";
import { BarChart } from "@/components";

export default function Test() {
  const { isActive, accessToken, role } = useAppSelector(
    (state) => state.authReducer.value,
  );
  const [username, setUsername] = useState();
  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(login(username));
  };

  const onRemoveSubmit = () => {
    dispatch(logout());
  };

  return (
    <>
      <div>
        <p>store에 저장된 isActive: {isActive ? "login" : "logout"}</p>
        <p>store에 저장된 accessToken: {accessToken}</p>
        <p>store에 저장된 role: {role}</p>
      </div>
      <input
        type="text"
        placeholder="유저 아이디 입력"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        <button type="button" onClick={onSubmit}>
          유저 이름 submit
        </button>
      </div>
      <div>
        <button type="button" onClick={onRemoveSubmit}>
          유저 정보 삭제 submit
        </button>
      </div>
    </>
  );
}
