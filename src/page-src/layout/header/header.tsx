"use client";

import styles from "./header.module.css";
import { MainLogoBlue } from "../../../../public/svgs";
import Image from "next/image";
import { VerticalDivider } from "../../../components/vertical-divider/vertical-divider";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { userLogout } from "../../../shared/api/user/userLogout";
import styled from "@emotion/styled";

export function Header() {
  const { data: session, status } = useSession();

  const onLogout = async () => {
    if (status === "unauthenticated") {
      alert("로그인 상태가 아닙니다.");
      return;
    }

    const success = await userLogout(
      session.user.grantType,
      session.user.accessToken,
    );
    if (success) {
      window.location.reload();
      return;
    }

    alert("[error] 로그아웃 오류");
  };

  return (
    <>
      {/* //* 네비게이션 바 */}
      <Container className={`layoutPadding`}>
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
            <Link href={""}>
              <li>사이트맵</li>
            </Link>
          </ul>
        </nav>

        <HeaderWrapper>
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
          <MenuWrapper>
            <Menu>
              <Link href={"/search-result"}>데이터 찾기</Link>
            </Menu>
            <Menu>
              {status !== "authenticated" || session.user.role === "ROLE_USER" ? (
                <Link href={"/dataset/request"}>데이터 요청</Link>
              ) : (
                <Link href={"/dataset/create"}>데이터 등록</Link>
              )}
            </Menu>
            <Menu>
              <Link href={""}>이용안내</Link>
              <HoverMenuContainer>
                <HoverMenuWrapper>
                  <HoverMenu>
                    <Link href={"/faq"}>FAQ</Link>
                  </HoverMenu>
                  <HoverMenu>
                    <Link href={"/qna"}>QNA</Link>
                  </HoverMenu>
                  <HoverMenu>
                    <Link href={"/notice"}>공지사항</Link>
                  </HoverMenu>
                </HoverMenuWrapper>
              </HoverMenuContainer>
            </Menu>
            <Menu>
              <Link href={"/my-page"}>마이페이지</Link>
            </Menu>
          </MenuWrapper>
        </HeaderWrapper>
      </Container>
    </>
  );
}

const Container = styled.header`
  padding-top: 2.125rem;
  padding-bottom: 2.125rem;
  background-color: white;
`;

const HeaderWrapper = styled.div`
  margin-top: 0.906rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuWrapper = styled.ul`
  width: 46rem;
  height: 100%;
  margin-left: auto;
  display: table;
  table-layout: fixed;
`;

const HoverMenuWrapper = styled.ul`
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 12px;
  border-radius: 8px;
`;

const HoverMenu = styled.li`
  padding: 0.5rem 1rem;
  text-align: left;

  & > a {
    color: #555555;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
  }

  & > a:hover {
    color: #0066ff;
    font-weight: bolder;
  }
`;

const HoverMenuContainer = styled.div`
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  padding: 8px;
`;

const Menu = styled.li`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  position: relative; /* 추가 */

  &:hover ${HoverMenuContainer}, ${HoverMenuWrapper} {
    display: block;
  }

  & > a {
    color: #003b71;
    font-size: 1.125rem;
    font-weight: bold;
    transition: all 0.12s ease-in;
  }

  & > a:hover {
    font-size: 1.3rem;
  }
`;
