"use client";

import React, { useState } from "react";
import styles from "./sign-up.module.css";
import Image from "next/image";
import Link from "next/link";
import { Name, SID, SPW } from "../../../../public/svgs";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleEmail = (event) => {};

  const handleVerificationCode = (event) => {};

  const handleSignUp = (event) => {};

  return (
    <div className={styles.Wrapper}>
      <div className={styles.signupWrapper}>
        {/* //? 이름 입력 */}
        <p className={styles.title}>이름</p>
        <div className={styles.lineContainer}>
          <Image src={Name} width={20} height={20} />
          <input
            className={styles.input}
            placeholder="이름을 입력해 주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* //? 이메일 입력 */}
        <p className={styles.title}>이메일</p>
        <div className={styles.row}>
          <div className={styles.lineContainer}>
            <Image src={SID} width={20} height={20} />
            <input
              type="email"
              name=""
              id=""
              className={styles.input}
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className={styles.certificate_button} type="submit">
            인증
          </button>
        </div>

        {/* //? 인증번호 입력 */}
        <p className={styles.title}>인증번호</p>
        <div className={styles.row}>
          <div className={styles.lineContainer}>
            <Image src={SID} width={20} height={20} />
            <input
              type="number"
              className={styles.input}
              placeholder="인증번호를 입력해주세요"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <button className={styles.certificate_button} type="submit">
            확인
          </button>
        </div>

        {/* //? 비밀번호 */}
        <p className={styles.title}>비밀번호</p>
        <div className={styles.lineContainer}>
          <Image src={SPW} width={20} height={20} />
          <input
            type="password"
            name=""
            id=""
            className={styles.input}
            placeholder="영문자, 숫자, 특수문자 포함 최소 8~20자"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* //? 비밀번호 재입력 */}
        <div style={{ marginTop: "6px" }} className={styles.lineContainer}>
          <Image src={SPW} width={20} height={20} />
          <input
            type="password"
            name=""
            id=""
            className={styles.input}
            placeholder="비밀번호를 재입력 해주세요"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </div>

        <button className={styles.signup_button} type="submit">
          회원가입
        </button>

        {/* //* 로그인 화면 이동 */}
        <div className={styles.loginContainer}>
          <p>이미 회원이신가요?</p>
          <Link className={styles.loginLink} href="/login">
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
