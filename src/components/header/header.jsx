"use client";

import styles from "./header.module.css";
import { MainLogo } from "../../../public/svgs";
import Image from "next/image";
import { VerticalDivider } from "../vertical-divider/vertical-divider";
import Link from "next/link";
import { useAppSelector } from "../../lib/hooks";
import { useDispatch } from "react-redux";
import { login, logout } from "../../lib/slice/auth-slice";
import { useEffect } from "react";

export function Header() {
  const { isActive, accessToken, role } = useAppSelector(
    (state) => state.authReducer.value,
  );
  const dispatch = useDispatch();

  const onLogout = () => {
    //TODO: logout api 호출
    dispatch(logout());
  };

  //? 새로고침시 토큰이 사라지는 버그
  useEffect(() => {
    // token api로 access token 발급 요청
    // -> 401 에러(REFRESH_EXPIRED)가 발생하는 경우: 비로그인 상태로 설정
    // -> 정상 응답: login reducer 호출하여 로그인 상태로 전환
  }, []);

  return (
    <>
      {/* //* 네비게이션 바 */}
      <header className={styles.container}>
        {/* //* 상단바 */}
        <nav className={styles.topBar}>
          <ul className={styles.navWrapper}>
            {isActive ? (
              <li onClick={onLogout}>로그아웃</li>
            ) : (
              <>
                <Link href={"/"}>
                  <li>로그인</li>
                </Link>
                <VerticalDivider />
                <Link href={"/"}>
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
                className={styles.logoImg}
                src={MainLogo}
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
