import Image from "next/image";
import React from "react";
import { MainLogoBlue } from "../../../public/svgs";
import styles from "./layout.module.css";
import "../../styles/globals.css";
import Providers from "../../components/providers/providers";

export const metadata = {
  title: "한양대학교 데이터 포털 로그인",
};

function Layout({ children }) {
  return (
    <Providers>
      <html lang="ko">
        <body>
          <div className={styles.root}>
            <div className={styles.header}>
              <a href={"/"}>
                <Image
                  className={styles.logoContainer}
                  src={MainLogoBlue}
                  alt="한양대 ERICA 데이터포털"
                />
              </a>
            </div>
            {children}
          </div>
        </body>
      </html>
    </Providers>
  );
}

export default Layout;
