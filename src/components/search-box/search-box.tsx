"use client";

import Image from "next/image";
import styles from "./search-box.module.css";
import { SearchSymbol } from "../../../public/svgs";
import { CSSProperties, FormEvent, useCallback, useState } from "react";

type Props = {
  handleSubmit?: (event: FormEvent<HTMLFormElement>, keyword: string) => void;
  style?: CSSProperties;
  boxstyle?: CSSProperties;
  placeholder?: string;
  inputstyle?: CSSProperties;
  iconstyle?: CSSProperties;
  initKeyword?: string;
  className?: string;
};

export function SearchBox({
  handleSubmit,
  boxstyle,
  placeholder = "검색어를 입력해주세요.",
  inputstyle,
  iconstyle,
  initKeyword,
  className,
}: Props) {
  const [input, setInput] = useState(initKeyword ? initKeyword : "");

  const handleChange = useCallback(
    (value) => {
      setInput(value);
    },
    [setInput],
  );

  return (
    <form
      className={`${styles.searchbox_container} ${className}`}
      style={boxstyle}
      onSubmit={(e) => handleSubmit(e, input)}
    >
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchbox_input}
        onChange={(e) => handleChange(e.target.value)}
        value={input}
        style={inputstyle}
      />
      <button type="submit">
        <Image
          alt="검색창 로고"
          src={SearchSymbol}
          width={27}
          height={27}
          style={iconstyle}
        />
      </button>
    </form>
  );
}
