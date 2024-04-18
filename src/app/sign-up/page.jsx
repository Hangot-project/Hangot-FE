"use client"; //? client componet - NextJS 13

import React, { useState } from "react";
import styles from "./sign-up.module.css";
import Image from "next/image";
import Link from "next/link";
import { MainLogoBlue, Name, SID, SPW, Kakao } from "../../../public/svgs";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const handleEmail = (event) => {

  };

  const handleVerificationCode = (event) => {

  };

  const handleSignUp = (event) => {

  };

  return (
    <div className={styles.Wrapper}>
        {/* 회원가입 헤더 */}
        <div className={styles.header}>
        <Image
          className={styles.logoContainer}
          src={MainLogoBlue}
          alt="한양대 ERICA 데이터포털" />
        </div>

        {/* 회원가입 메인 파트 */}
        <div className={styles.main}>
            {/* 회원가입 정보 입력, 로그인 화면 이동, 카카오 로그인 영역 */}
            <div className={styles.signupWrapper}>

                {/* 회원가입 정보 입력 (이름, 이메일, 인증번호, 비밀번호) */}
                <form id="signupForm" className={styles.infoWrapper} onSubmit={handleSignUp}>
                    <p>이름</p>
                    <div className={styles.lineContainer}>
                        <Image src={Name} width={20} height={20} />
                        <input 
                          className={styles.input}
                          placeholder="이름을 입력해 주세요"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <p>이메일</p>
                    <form id="emailForm" className={styles.emailWrapper} onSubmit={handleEmail}>
                        <div className={styles.lineContainer}>
                            <Image src={SID} width={20} height={20} />
                            <input 
                              className={styles.input}
                              placeholder="이메일을 입력해 주세요"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className={styles.certificate_button} type="submit">
                            인증
                        </button>
                    </form>
                    <p>인증번호</p>
                    <form id="verificationCodeForm" className={styles.certificateWrapper} onSubmit={handleVerificationCode}>
                        <div className={styles.lineContainer}>
                            <Image src={SID} width={20} height={20}/>
                            <input 
                              className={styles.input}
                              placeholder="인증번호를 입력해주세요"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                            />
                        </div>
                        <button className={styles.certificate_number_button} type="submit">
                            인증번호 확인
                        </button>
                    </form>
                    <p>비밀번호</p>
                    <div className={styles.lineContainer}>
                        <Image src={SPW} width={20} height={20} />
                        <input
                          className={styles.input}
                          placeholder="영문자, 숫자, 특수문자 포함 최소 8~20자"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className={styles.lineContainer}>
                        <Image src={SPW} width={20} height={20} />
                        <input 
                          className={styles.input} 
                          placeholder="비밀번호를 확인해 주세요" 
                          value={confirmedPassword}
                          onChange={(e) => setConfirmedPassword(e.target.value)} 
                        />
                    </div>

                    <button className={styles.signup_button} type="submit">
                        회원가입
                    </button>
                </form>

                {/* 로그인 화면 이동 */}
                <div className={styles.loginLink}>
                    <p>이미 회원이신가요?</p>
                    <Link href="/login">
                        <p>로그인 하기</p>
                    </Link>
                </div>

                {/* 카카오 소셜 로그인 */}
                <div className={styles.social}>
                  <div className={styles.socialText}>
                    <div className={styles.divideLine}/>
                    <p>다른 방법으로 회원가입</p>
                    <div className={styles.divideLine}/>
                  </div>

                  <Link className={styles.kakaoContainer} href="">
                    <Image src={Kakao}/>
                    <p>카카오로 간편 회원가입</p>
                  </Link>
                </div>
                
            </div>
        </div>
    </div>
  );
}