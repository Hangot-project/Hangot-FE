import Image from "next/image";
import styles from "./footer.module.css";
import { VerticalDivider } from "../vertical-divider/vertical-divider";
import { Facebook, HYU, Instagram, Twitter, Youtube } from "../../../public/svgs";

export function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <ul className={styles.navContainer}>
          <li>
            <Image src={HYU} />
          </li>
          <VerticalDivider className={styles.divisionLine} />
          <li>개인정보처리방침</li>
          <VerticalDivider className={styles.divisionLine} />
          <li>이용약관</li>
          <VerticalDivider className={styles.divisionLine} />
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
        <Image src={Instagram} />

        <Image src={Youtube} />

        <Image src={Facebook} />

        <Image src={Twitter} />
      </div>
    </div>
  );
}
