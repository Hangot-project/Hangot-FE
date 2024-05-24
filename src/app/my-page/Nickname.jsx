"use client";

import { useState } from "react";
import styles from "./edit-screen.module.css";
import Image from "next/image";
import { ScreenClose } from "../../../public/svgs";

export default function Nickname({ onClose }) {
  return (
    <div className={styles.container}>
      {/* 회원정보 수정 헤더 */}
      <div className={styles.header}>
        <div>회원정보 수정</div>
        <Image src={ScreenClose} onClick={onClose}/>
      </div>

      {/* 회원번호 수정 양식 (이름, 이메일) */}
      <form className={styles.mainForm}>

        {/* 새 이름 입력란 */}
        <div>
          <label>이름</label>
          <div>
            <input className={styles.formInput} type="name"></input>
          </div>
        </div>

        {/* 이메일 확인란 */}
        <div>
          <label>이메일</label>
          <div>
            <input className={styles.formInput} type="text"></input>
            <div className={styles.infoTxt}>
              이메일은 수정할 수 없습니다.
            </div>
          </div>
        </div>
      </form>

      {/* 비밀번호 변경 취소, 저장 버튼 */}
      <div className={styles.submit}>
        <button onClick={onClose}>취소</button>
        <button>저장</button>
      </div>
    </div>
  );
}