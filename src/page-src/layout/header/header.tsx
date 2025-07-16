"use client";

import { useState } from "react";
import styles from "./header.module.css";
import { DataPortalLogo } from "../../../../public/svgs";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { userLogout } from "../../../shared/api/user/userLogout";
import LoginModal from "../../../components/modal/LoginModal";
import styled from "@emotion/styled";

export function Header() {
  const { data: session, status } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
      <Container>
        <HeaderWrapper>
          {/* //* logo */}
          <div className={styles.logoContainer}>
            <Link href="/">
              {/* //? logo img */}
              <Image
                alt="하이데이터 로고"
                className={styles.logoImg}
                src={DataPortalLogo}
                width={180}
                height={56}
              />
            </Link>
          </div>

          {/* //* navigation list */}
          <MenuWrapper>
            <Menu>
              <Link href={"/search-result"}>데이터 찾기</Link>
            </Menu>
            <Menu>
              <Link href={"/search-result?sort=인기순"}>인기 데이터</Link>
            </Menu>
            <Menu>
              <Link href={"/my-page"}>마이페이지</Link>
            </Menu>
            {status === "authenticated" ? (
              <Menu>
                <div onClick={onLogout} style={{ cursor: "pointer" }}>
                  로그아웃
                </div>
              </Menu>
            ) : (
              <Menu>
                <div
                  onClick={() => setIsLoginModalOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  로그인
                </div>
              </Menu>
            )}
          </MenuWrapper>
        </HeaderWrapper>
      </Container>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}

const Container = styled.header`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const MenuWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
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
const HoverMenuContainer = styled.div`
  display: none;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  padding: 8px;
`;

const Menu = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  &:hover ${HoverMenuContainer}, ${HoverMenuWrapper} {
    display: block;
  }

  & > a {
    color: #333;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, transparent 0%, transparent 100%);
    border: 2px solid transparent;
  }

  & > a:hover,
  & > div:hover {
    background: #003b71;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 59, 113, 0.3);
  }

  & > div {
    color: #333;
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(135deg, transparent 0%, transparent 100%);
    border: 2px solid transparent;
    cursor: pointer;
  }
`;
