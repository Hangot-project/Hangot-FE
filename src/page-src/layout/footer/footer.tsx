"use client";

import Image from "next/image";
import styles from "./footer.module.css";
import { VerticalDivider } from "../../../components";
import { MainLogo } from "../../../../public/images";

export function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <ul className={styles.navContainer}>
          <li>
            <Image alt="하이데이터 로고" src={MainLogo} width={100} height={32} />
          </li>
          <VerticalDivider
            style={{
              backgroundColor: "#bdbdbb",
            }}
          />
          <li>개인정보처리방침</li>
          <VerticalDivider
            style={{
              backgroundColor: "#bdbdbb",
            }}
          />
          <li>이용약관</li>
        </ul>

        <p>© 하이데이터. ALL RIGHTS RESERVED</p>
      </div>
    </div>
  );
}
