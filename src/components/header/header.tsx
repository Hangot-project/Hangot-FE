"use client";

import styles from "./header.module.css";
import { MainLogoBlue } from "../../../public/svgs";
import Image from "next/image";
import { VerticalDivider } from "../vertical-divider/vertical-divider";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  const onLogout = async () => {
    if (status === "unauthenticated") {
      alert("로그인 상태가 아닙니다.");
      return;
    }

    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      {/* //* 네비게이션 바 */}
      <header className={`layoutPadding ${styles.container}`}>
        {/* //* 상단바 */}
        <nav className={styles.topBar}>
          <ul className={styles.navWrapper}>
            {status === "authenticated" ? (
              <li onClick={onLogout}>로그아웃</li>
            ) : (
              <>
                <Link href={"/login"}>
                  <li>로그인</li>
                </Link>
                <VerticalDivider />
                <Link href={"/sign-up"}>
                  <li>회원가입</li>
                </Link>
              </>
            )}
            <VerticalDivider />
            <Link href={"/test-page"}>
              <li>사이트맵</li>
            </Link>
            <VerticalDivider />
            <Link href={"/"}>
              <li>ENGLISH</li>
            </Link>
          </ul>
        </nav>

        <div className={styles.headerWrapper}>
          {/* //* logo */}
          <div className={styles.logoContainer}>
            <Link href="/">
              {/* //? logo img */}
              <Image
                alt="메인 로고"
                className={styles.logoImg}
                src={MainLogoBlue}
                width={286.15}
                height={58.29}
              />
            </Link>
          </div>

          {/* //* navigation list */}
          <ul className={styles.menuWrapper}>
            {/* <li>주제별 데이터</li>
            <li>조직별 데이터</li> */}
            <li>
              <Link href={"/search-result"}>데이터 찾기</Link>
            </li>
            <li>
              <Link href={""}>데이터 요청</Link>
            </li>
            <li>
              <Link href={""}>이용안내</Link>
            </li>
            <li>
              <Link href={""}>마이페이지</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
