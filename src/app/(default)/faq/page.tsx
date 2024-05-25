"use client";

import { useState } from "react";
import styles from "./faq.module.css";
import Link from "next/link";
import { Accordion } from "../../../components";

const faqData = {
  "계정 관리": [
    {
      title: "[계정] 계정을 어떻게 만들어요?",
      content: "계정을 만드는 방법입니다.",
    },
    {
      title: "[계정] 비밀번호를 잊어버렸어요.",
      content: "비밀번호를 재설정하는 방법입니다.",
    },
  ],
  "서비스 이용": [
    {
      title: "[서비스오류] 하이데이터 서비스 이용 중 오류가 발생해요.",
      content: "FAQ 상세 내용입니다.",
    },
    {
      title: "[서비스] 새로운 기능이 추가되었습니다.",
      content: "새로운 기능에 대한 상세 내용입니다.",
    },
  ],
  "문제 해결": [
    {
      title: "[문제] 문제를 어떻게 해결하나요?",
      content: "문제를 해결하는 방법입니다.",
    },
  ],
  "데이터 라이선스": [
    {
      title: "[라이선스] 데이터 라이선스는 무엇인가요?",
      content: "데이터 라이선스에 대한 설명입니다.",
    },
  ],
  기타: [
    { title: "[기타] 기타 질문이 있어요.", content: "기타 질문에 대한 답변입니다." },
  ],
};

export default function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState("계정 관리");

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className={styles.faq_section}>
      <div className={styles.container}>
        <p className={styles.faq_heading}>
          궁금한 점이 있으신가요? <br />
          먼저 아래의 자주 묻는 질문 FAQ 리스트를 확인해주세요!
        </p>

        <div className={`${styles.asked_category_list} ${styles.type_sub}`}>
          <ul>
            {Object.keys(faqData).map((category, index) => (
              <li
                key={index}
                className={selectedCategory === category ? styles.active : ""}
                onClick={() => handleCategoryClick(category)}
              >
                <Link href="#" className={styles.zero}>
                  <span className={styles.text}>{category}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${styles.title_wrap} ${styles.title_size_md}`}>
          <p id="category_title" className={styles.title_heading}>
            {selectedCategory}
          </p>
        </div>
        <ul className={`${styles.accordions} ${styles.list}`}>
          {faqData[selectedCategory].map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </ul>
      </div>
    </section>
  );
}
