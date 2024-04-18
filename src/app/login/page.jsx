"use client"; //? client componet - NextJS 13

import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import { MainLogoBlue, ID, PW, Kakao } from "../../../public/svgs";
import { VerticalDivider, FilterCheckButton } from "../../components";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault(); 
  };

  return (
    <div className={styles.Wrapper}>

      {/* 로그인 헤더 */}
      <div className={styles.header}>
        <a href="">
          <Image
            className={styles.logoContainer}
            src={MainLogoBlue}
            alt="한양대 ERICA 데이터포털" />   
        </a>
      </div>

      {/* 로그인, 비밀번호 찾기, 회원가입, 간편로그인 영역 */}
      <div className={styles.loginWrapper}>
        {/* 로그인 정보 입력 및 제출 */}
        <form className={styles.id_pw_Wrapper} onSubmit={handleLogin}>
          
          {/* 이메일 및 비밀번호 입력 */}
          <div className={styles.idWrapper}>
            <Image src={ID} width={16} height={16}/>
            <input 
              className={styles.input}
              placeholder="이메일"
              value={email}
              onChange={(event) => setEmail(event.target.value)} 
            />
          </div>
          <div className={styles.pwWrapper}>
            <Image src={PW} width={16} height={16}/>
            <input 
              className={styles.input}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          {/* 로그인 상태 유지 체크박스 */}
          {/* 라벨 텍스트 스타일 수정 불가능? -> 컴포넌트 따로 구현*/}
          <div className={styles.keep_check}>
            <FilterCheckButton 
              isSelected={false}
              text="로그인 상태 유지"
              style={{
                height: '14px'
              }}
            />
          </div>

          {/* 로그인 제출 버튼 */}
          <button className={styles.button} type="submit">
            로그인
          </button>
        </form>

        {/* 비밀번호 찾기 및 회원가입 페이지 연결 */}
        <nav className={styles.bottomBar}>
          <ul className={styles.navWrapper}>
            <Link href="">비밀번호 찾기</Link>
            <VerticalDivider style={{
                width: "1px",
                hegith: "12px",
                borderRadius: "0.5px",
                backgroundColor: "#DADADA",
                margin: "0 15px"
            }} />
            <Link href="/sign-up">회원가입</Link>
          </ul>
        </nav>

        {/* 카카오 간편 로그인 연동 */}
        <div className={styles.social}>
          <div className={styles.socialText}>
            <div className={styles.divideLine}/>
            <p>다른 방법으로 로그인</p>
            <div className={styles.divideLine}/>
          </div>

          <Link className={styles.kakaoContainer} href="">
            <Image src={Kakao}/>
            <p>카카오로 간편 로그인</p>
          </Link>
        </div>
      </div>
    </div>
  );
}