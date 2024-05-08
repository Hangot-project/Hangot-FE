"use client";

import React, { useRef, useState } from "react";
import { reissueToken, userLogin, userLogout } from "../../api/user";
import { handleToken } from "../../lib/actions";
import { useDispatch } from "react-redux";
import { logout } from "../../lib/slice/auth-slice";

export default function Test() {
  const dispatch = useDispatch();
  const yesRef = useRef<HTMLInputElement>();

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [message, setMessage] = useState<string>("");

  const onLoginSubmit = async () => {
    const response = await userLogin({
      email: username,
      password,
      autoLogin: yesRef.current.checked,
    });

    if (!response.success) {
      setMessage(response.msg);
      return;
    }
    setMessage("");
    const result = response.result;

    await handleToken(result.grantType, result.accessToken);
  };

  const onLogoutSubmit = async () => {
    // dispatch(logout());
    const response = await userLogout();

    if (!response.success) {
      setMessage(response.msg);
      return;
    }
    setMessage("");
    dispatch(logout());
  };

  const onReissueClick = async () => {
    const response = await reissueToken();
    const result = response.result;
    await handleToken(result.grantType, result.accessToken);
  };

  return (
    <>
      {/* <div>
        <p>store에 저장된 isActive: {isActive ? "login" : "logout"}</p>
        <p>store에 저장된 accessToken: {accessToken}</p>
        <p>store에 저장된 role: {role}</p>
      </div> */}
      <div>
        <input
          type="email"
          placeholder="유저 이메일 입력"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="유저 비밀번호 입력"
          name=""
          id=""
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <h3>{message}</h3>
      <div>
        <p>자동 로그인 선택</p>
        <input ref={yesRef} type="radio" name="autoLogin" id="yes" />
        <label htmlFor="yes">예</label>
        <input type="radio" name="autoLogin" id="no" />
        <label htmlFor="no">아니오</label>
      </div>

      <button type="button" onClick={onLoginSubmit}>
        유저 로그인
      </button>
      <hr />
      <button type="button" onClick={onLogoutSubmit}>
        유저 로그아웃
      </button>

      <hr />
      <button type="button" onClick={onReissueClick}>
        토큰 재발급
      </button>
    </>
  );
}
