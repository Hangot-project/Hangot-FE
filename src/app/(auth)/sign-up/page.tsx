"use client";

import React, { FormEvent, useCallback, useState } from "react";
import styles from "./sign-up.module.css";
import Image from "next/image";
import Link from "next/link";
import { Name, SID, SPW } from "../../../../public/svgs";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { sendEmail } from "../../../shared/api/user/sendEmail";
import { verifyCode } from "../../../shared/api/user/verifyCode";
import { userSignup } from "../../../shared/api/user/userSignup";
import { REGEX } from "../../../constants/regex";

export default function SignUp() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const validFormEmail = email !== "" && REGEX.EMAIL.test(email);
  const emailMessage = validFormEmail ? "" : `이메일 형식이 올바르지 않습니다.`;

  const [password, setPassword] = useState<string>("");
  const [checkPassword, setCheckPassword] = useState<string>("");
  const isValidPassword = REGEX.PASSWORD.test(password);
  const passwordMessage =
    password !== checkPassword ? `입력한 비밀번호가 서로 다릅니다.` : "";

  const handleEmail = useCallback(async () => {
    const success = await sendEmail({ email });
    if (!success) {
      alert(`메일 전송에 실패했습니다. 다시 시도해주세요.`);
      return;
    }

    alert(`메일이 발송되었습니다.`);
  }, [email]);

  const handleVerificationCode = useCallback(async () => {
    const success = await verifyCode({
      email,
      code: verificationCode,
    });

    if (!success) {
      alert(`인증번호가 다릅니다.`);
      setVerified(false);
      return;
    }

    setVerified(true);
  }, [email, verificationCode]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const response = await userSignup({
        email,
        password,
        name: username,
      });

      if (!response.success) {
        alert(`${response.msg}`);
        return;
      }

      router.push("/");
    },
    [email, password, username],
  );

  const canSubmit =
    username !== "" && verified && isValidPassword && passwordMessage === "";

  return (
    <div className={styles.Wrapper}>
      <div className={styles.signupWrapper}>
        {/* //? 이름 입력 */}
        <p className={styles.title}>이름</p>
        <div className={styles.lineContainer}>
          <Image alt="이름 로고" src={Name} width={20} height={20} />
          <input
            required
            className={styles.input}
            placeholder="이름을 입력해 주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* //? 이메일 입력 */}
        <Row>
          <p className={styles.title}>이메일</p>
          <p style={{ color: "red" }}>{emailMessage}</p>
        </Row>
        <div className={styles.row}>
          <div className={styles.lineContainer}>
            <Image alt="메일 로고" src={SID} width={20} height={20} />
            <input
              required
              type="email"
              className={styles.input}
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <EmailButton
            disabled={!validFormEmail || verified}
            active={validFormEmail && !verified}
            onClick={handleEmail}
          >
            인증
          </EmailButton>
        </div>

        {/* //? 인증번호 입력 */}
        <p className={styles.title}>인증번호</p>
        <div className={styles.row}>
          <div className={styles.lineContainer}>
            <Image alt="메일 로고" src={SID} width={20} height={20} />
            <input
              type="number"
              className={styles.input}
              placeholder="인증번호를 입력해주세요"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>
          <EmailButton
            disabled={!(validFormEmail && verificationCode !== "")}
            active={validFormEmail && verificationCode !== ""}
            onClick={handleVerificationCode}
          >
            확인
          </EmailButton>
        </div>

        {/* //? 비밀번호 */}
        <Row>
          <p className={styles.title}>비밀번호</p>
          <p style={{ color: "red" }}>{passwordMessage}</p>
        </Row>
        <div className={styles.lineContainer}>
          <Image alt="비밀번호 로고" src={SPW} width={20} height={20} />
          <input
            required
            type="password"
            className={styles.input}
            placeholder="영문자, 숫자, 특수문자 포함 최소 8~20자"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* //? 비밀번호 재입력 */}
        <div style={{ marginTop: "6px" }} className={styles.lineContainer}>
          <Image alt="비밀번호 로고" src={SPW} width={20} height={20} />
          <input
            required
            type="password"
            className={styles.input}
            placeholder="비밀번호를 재입력 해주세요"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
          />
        </div>

        <SubmitButton
          type="submit"
          active={canSubmit}
          disabled={!canSubmit}
          onClick={(e) => handleSubmit(e)}
        >
          회원가입
        </SubmitButton>

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

const Row = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

const EmailButton = styled.button<{ active: boolean }>`
  height: 100%;
  border-radius: 4px;

  background-color: ${(props) => (props.active ? "#003b71" : "gray")};

  font-size: 1rem;
  color: white;
`;

const SubmitButton = styled.button<{ active: boolean }>`
  width: 100%;

  margin: 2.25rem 0;

  padding: 0.75rem 0;

  border-radius: 4px;

  background-color: ${(props) => (props.active ? "#003b71" : "gray")};

  font-size: 1rem;
  font-weight: bold;
  color: white;
`;
