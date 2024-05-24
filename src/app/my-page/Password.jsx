"use client";

import { useState } from "react";
import styles from "./edit-screen.module.css";
import Image from "next/image";
import Link from "next/link";
import { ScreenClose } from "../../../public/svgs";

export default function Password({ onClose }) {
  return (
    <div className={styles.container}>
      {/* 비밀번호 변경 헤더 */}
      <div className={styles.header}>
        <div>비밀번호 변경</div>
        <Image src={ScreenClose} onClick={onClose}/>
      </div>

      {/* 비밀번호 변경 양식 (현재 비밀번호, 비밀번호, 비밀번호 확인) */}
      <form className={styles.mainForm}>

        {/* 현재 비밀번호 입력란 */}
        <div>
          <label>현재 비밀번호</label>
          <div>
            <input className={styles.formInput} type="password"></input>
            <div className={styles.infoTxt}>
                비밀번호를 잊으셨나요?
                <Link href={"/"}>비밀번호 재설정</Link>
            </div>
          </div>
        </div>

        {/* 새 비밀번호 입력란 */}
        <div>
          <label>비밀번호</label>
          <div>
            <input className={styles.formInput} type="password"></input>
            <div className={styles.infoTxt}>
              비밀번호 (영문자, 숫자, 특수문자 포함 최소 8~20자)
            </div>
          </div>
        </div>

        {/* 비밀번호 확인란 */}
        <div>
          <label>비밀번호 확인</label>
          <div>
            <input className={styles.formInput} type="password"></input>
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