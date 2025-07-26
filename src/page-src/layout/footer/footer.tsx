"use client";

import Image from "next/image";
import styles from "./footer.module.css";
import { VerticalDivider } from "../../../components";
import { MainLogo } from "../../../../public/images";

export function Footer() {
  return (
    <div className={styles.container}>
      <ul className={styles.navContainer}>
        <li>
          <Image alt="한곳 로고" src={MainLogo} width={70} height={25} />
        </li>
        <VerticalDivider
          style={{
            backgroundColor: "#bdbdbb",
          }}
        />
        <li>
          <a
            href="https://github.com/Hangot-project"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.9rem" }}
          >
            Github
          </a>
        </li>
        <VerticalDivider
          style={{
            backgroundColor: "#bdbdbb",
          }}
        />
        <p>© 한 곳. ALL RIGHTS RESERVED</p>
      </ul>
    </div>
  );
}
