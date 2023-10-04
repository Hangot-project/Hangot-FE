import styles from "./header.module.css";
import { MainLogo } from "../../../public/svgs";
import Image from "next/image";
import { VerticalDivider } from "../vertical-divider/vertical-divider";
import Link from "next/link";

export function Header() {
  return (
    <>
      {/* //* 네비게이션 바 */}
      <header className={styles.container}>
        {/* //* 상단바 */}
        <nav className={styles.topBar}>
          <ul className={styles.navWrapper}>
            <li>로그인</li>
            <VerticalDivider />
            <li>회원가입</li>
            <VerticalDivider />
            <li>사이트맵</li>
            <VerticalDivider />
            <li>ENGLISH</li>
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
            <li>데이터 찾기</li>
            <li>주제별 데이터</li>
            <li>조직별 데이터</li>
            <li>데이터 요청</li>
            <li>이용안내</li>
          </ul>
        </div>
      </header>
    </>
  );
}
