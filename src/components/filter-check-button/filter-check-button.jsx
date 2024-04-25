"use client";

import React from "react";
import styles from "./filter-check-button.module.css";
import Image from "next/image";
import { CheckRadioBlue, CheckRadioGray } from "../../../public/svgs";

/**
 *
 * @param {{ isSelected: boolean; text: string; handleClick: React.MouseEventHandler<HTMLDivElement; style?: React.CSSProperties; }}
 * @param isSelected - 선택여부
 * @param text - 라벨 텍스트
 * @param handleClick - 선택여부 변경시 실행할 이벤트 핸들러 함수
 * @param style - 컴포넌트 최상단 스타일
 * @returns
 */
export function FilterCheckButton({ isSelected, text, handleClick, style }) {
  return (
    <div className={styles.root} style={style} onClick={handleClick}>
      {isSelected ? (
        <Image src={CheckRadioBlue} alt="선택 취소 버튼" />
      ) : (
        <Image src={CheckRadioGray} alt="선택 버튼" />
      )}
      <p className={styles.labelText}>{text}</p>
    </div>
  );
}
