"use client"; //? client componet - NextJS 13

import { useState } from "react";
import styles from "./faq.module.css";
import Image from "next/image";
import Link from "next/link";
import { } from "../../../public/svgs";
import { } from "../../components";

export default function FAQ() {
  return (
    <section className={styles.faq_section}>
      <div className={styles.container}>
        <p className={styles.faq_heading}>
          궁금한 점이 있으신가요? <br />
          먼저 아래의 자주 묻는 질문 FAQ 리스트를 확인해주세요!
        </p>
        <div className={`${styles.asked_category_list} ${styles.type_sub}`}>
          <ul>
            <li className={styles.active}>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
            <li>
              <a href="#" className={styles.zero}>
                <span className={styles.text}>BEST 10</span>
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.title_wrap} ${styles.title_size_md}`}>
          <p id="category_title" className={styles.title_heading}>BEST 10</p>
        </div>
        <ul className={`${styles.accordions} ${styles.list}`}>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
          <li className={`${styles.accordion} ${styles.qna_box}`}>
            <div className={`${styles.accordion_header} ${styles.question}`}>
              <button className={styles.click_button}>
                <div className={`${styles.plus_minus_toggle} ${styles.collapsed}`}></div>
                <p className={styles.text}>[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.</p>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}