"use client"; //? client componet - NextJS 13

import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import { ID, PW } from "../../../../public/svgs";
import { VerticalDivider, FilterCheckButton } from "../../../components";
import { userLogin } from "../../../api/user";
import { handleToken } from "../../../lib/actions";
import { useRouter } from "next/navigation";
import { KakaoLoginLarge } from "../../../../public/images";

export default function Login() {
  console.log("this is Login client component");

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [autoLogin, setAutoLogin] = useState<boolean>(false);

  const router = useRouter();

  const handleLogin = async () => {
    const response = await userLogin({
      email: email,
      password,
      autoLogin: autoLogin,
    });

    if (!response.success) {
      alert(response.msg);
      return;
    }
    const result = response.result;

    handleToken(result.grantType, result.accessToken);
    console.log("!!!");
    router.push("/");
    router.refresh();
  };

  return (
    <div className={styles.Wrapper}>
      {/* //* 로그인, 비밀번호 찾기, 회원가입, 간편로그인 영역 */}
      {/* 이메일 및 비밀번호 입력 */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputLine}>
            <Image alt="아이디 입력" src={ID} width={16} height={16} />
            <input
              className={styles.input}
              placeholder="이메일"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className={styles.divisionLine} />
          <div className={styles.inputLine}>
            <Image alt="비밀번호 입력" src={PW} width={16} height={16} />
            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        {/* //? 로그인 상태 유지 체크박스 */}
        {/* 라벨 텍스트 스타일 수정 불가능? -> 컴포넌트 따로 구현*/}
        <div className={styles.keep_check}>
          <FilterCheckButton
            isSelected={autoLogin}
            handleClick={() => setAutoLogin(!autoLogin)}
            text="로그인 상태 유지"
          />
        </div>

        {/* 로그인 제출 버튼 */}
        <button className={styles.button} type="button" onClick={handleLogin}>
          로그인
        </button>
      </div>

      {/* 비밀번호 찾기 및 회원가입 페이지 연결 */}
      <nav className={styles.bottomBar}>
        <ul className={styles.navWrapper}>
          <Link href="">비밀번호 찾기</Link>
          <VerticalDivider
            style={{
              width: "1px",
              height: "12px",
              borderRadius: "0.5px",
              backgroundColor: "#DADADA",
              margin: "0 15px",
            }}
          />
          <Link href="/sign-up">회원가입</Link>
        </ul>
      </nav>

      {/* //* 카카오 간편 로그인 연동 */}
      <div className={styles.social}>
        <div className={styles.socialText}>
          <div className={styles.divideLine} />
          <p>다른 방법으로 로그인</p>
          <div className={styles.divideLine} />
        </div>

        <Link className={styles.kakaoContainer} href="">
          <Image alt="카카오 로그인" src={KakaoLoginLarge} />
        </Link>
      </div>

      <Link href="/" style={{ display: "none" }} />
    </div>
  );
}
