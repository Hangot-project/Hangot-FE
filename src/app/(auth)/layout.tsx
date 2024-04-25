import Image from "next/image";
import React from "react";
import { MainLogoBlue } from "../../../public/svgs";
import styles from "./layout.module.css";
import Link from "next/link";

export const metadata = {
  title: "한양대학교 데이터 포털 로그인",
};

function Layout({ children }) {
  return (
    <html lang="ko">
      <body>
        <div className={styles.root}>
          <div className={styles.header}>
            <Link href={"/"}>
              <Image
                className={styles.logoContainer}
                src={MainLogoBlue}
                alt="한양대 ERICA 데이터포털"
              />
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}

export default Layout;
