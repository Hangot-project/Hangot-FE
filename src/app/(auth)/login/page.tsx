"use client";

import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import { KaKaoLogin } from "../../../../public/images";
import DataPortalLogo from "../../../../public/svgs/DataPortalLogo.svg";

export default function Login() {
  return (
    <div className={styles.Wrapper}>
      {/* //* 카카오 간편 로그인 연동 */}
      <div className={styles.social}>
        <Image alt="데이터포털 로고" src={DataPortalLogo} />
        <div className={styles.socialTextContainer}></div>
        <Link
          className={styles.kakaoContainer}
          href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`}
        >
          <Image alt="카카오 로그인" src={KaKaoLogin} />
        </Link>
      </div>
    </div>
  );
}
