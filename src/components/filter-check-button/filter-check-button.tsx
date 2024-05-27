"use client";

import React, { CSSProperties, MouseEventHandler } from "react";
import styles from "./filter-check-button.module.css";
import Image from "next/image";
import { CheckRadioBlue, CheckRadioGray } from "../../../public/svgs";

interface Props {
  isSelected: boolean;
  text: string;
  handleClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

export function FilterCheckButton({ isSelected, text, handleClick, style }: Props) {
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
