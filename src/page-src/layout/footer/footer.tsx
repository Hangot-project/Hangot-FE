"use client";

import Image from "next/image";
import styles from "./footer.module.css";
import { VerticalDivider } from "../../../components";
import { Facebook, HYU, Instagram, Twitter, Youtube } from "../../../../public/svgs";

export function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <ul className={styles.navContainer}>
          <li>
            <Image alt="footer logo" src={HYU} />
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
          <VerticalDivider
            style={{
              backgroundColor: "#bdbdbb",
            }}
          />
          <li>대학 홈페이지</li>
        </ul>

        <p>
          (주)꿀떡 | 대표자: 오민택 | 사업자번호: 000-00-000000 사업자 정보 확인
          <br />
          전화번호: 031-400-5114 | 주소: (15588) 경기도 안산시 상록구 한양대학로 55
        </p>

        <p>© 꿀떡. ALL RIGHTS RESERVED</p>
      </div>
      <div className={styles.snsContainer}>
        <Image alt="인스타그램 로고" src={Instagram} />

        <Image alt="유튜브 로고" src={Youtube} />

        <Image alt="페이스북 로고" src={Facebook} />

        <Image alt="트위터 로고" src={Twitter} />
      </div>
    </div>
  );
}
