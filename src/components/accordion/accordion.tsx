"use client";

import { useState } from "react";
import styles from "./accordion.module.css";
import Image from "next/image";
import { PlusToggle, MinusToggle } from "../../../public/svgs";

export function Accordion({ title, content }) {
  const [isActive, setIsActive] = useState(false);

  const toggleAccordion = () => {
    setIsActive(!isActive);
  };

  return (
    <li
      className={`${styles.accordion} ${styles.qna_box} ${
        isActive ? styles.isActive : ""
      }`}
    >
      <div className={`${styles.accordion_header} ${styles.question}`}>
        <button className={styles.click_button} onClick={toggleAccordion}>
          <Image
            className={styles.plus_minus_toggle}
            src={isActive ? MinusToggle : PlusToggle}
            alt={isActive ? "접기" : "펼치기"}
          />
          <p className={styles.text}>{title}</p>
        </button>
      </div>
      {isActive && (
        <div className={`${styles.accordionBody} ${styles.answer}`}>
          <div className={styles.accordionContent}>
            <p>{content}</p>
          </div>
        </div>
      )}
    </li>
  );
}
