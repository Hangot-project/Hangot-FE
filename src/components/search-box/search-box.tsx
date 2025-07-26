"use client";

import Image from "next/image";
import styles from "./search-box.module.css";
import { SearchSymbol } from "../../../public/svgs";
import React, {
  CSSProperties,
  FormEvent,
  useCallback,
  useState,
  useEffect,
} from "react";

type Props = {
  value: string;
  onSubmit: (value: string) => void;
  onClear?: () => void;
  style?: CSSProperties;
  boxstyle?: CSSProperties;
  placeholder?: string;
  inputstyle?: CSSProperties;
  iconstyle?: CSSProperties;
  className?: string;
};

export function SearchBox({
  value,
  onSubmit,
  onClear,
  boxstyle,
  inputstyle,
  iconstyle,
  className,
}: Props) {
  const [inputValue, setInputValue] = useState(value);

  // value prop이 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const handleChange = useCallback((newValue: string) => {
    setInputValue(newValue);
  }, []);

  const handleSubmitAction = useCallback(() => {
    const trimmedInput = inputValue.trim();
    onSubmit(trimmedInput);
    setInputValue(""); // 직접 초기화
    onClear?.(); // 상위 컴포넌트에게도 알림
  }, [onSubmit, inputValue, onClear]);

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmitAction();
    },
    [handleSubmitAction],
  );

  // 엔터 키는 자동으로 폼 제출을 트리거하므로 별도 처리 불필요
  // handleKeyDown 제거하고 폼 제출만 사용

  return (
    <form
      className={`${styles.searchbox_container} ${className}`}
      style={boxstyle}
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        placeholder="제목 검색 또는 #해시태그 추가"
        className={styles.searchbox_input}
        onChange={(e) => handleChange(e.target.value)}
        value={inputValue}
        style={inputstyle}
      />
      <button type="submit" className={styles.searchbox_button} style={iconstyle}>
        <Image alt="검색창 로고" src={SearchSymbol} width={27} height={27} />
      </button>
    </form>
  );
}
