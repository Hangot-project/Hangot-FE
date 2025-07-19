"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { KaKaoLogin, MainLogo } from "../../../public/images";
import styles from "./LoginModal.module.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      sessionStorage.setItem(
        "prevPath",
        window.location.pathname + window.location.search,
      );
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.content}>
          <Image
            alt="데이터포털 로고"
            src={MainLogo}
            className={styles.logo}
            width={110}
          />
          <div>
            <Link
              className={styles.kakaoContainer}
              href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${window.location.origin}/api/user/login/kakao`}
            >
              <Image alt="카카오 로그인" src={KaKaoLogin} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
