"use client";

import Image from "next/image";
import styles from "./search-box.module.css";
import { SearchSymbol } from "../../../public/svgs";
import { CSSProperties, FormEvent, useCallback, useState } from "react";

type Props = {
  handleSubmit?: (event: FormEvent<HTMLFormElement>, keyword: string) => void;
  style?: CSSProperties;
  initKeyword?: string;
  className?: string;
};

export function SearchBox({ handleSubmit, style, initKeyword, className }: Props) {
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
      style={style}
      onSubmit={(e) => handleSubmit(e, input)}
    >
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        className={styles.searchbox_input}
        onChange={(e) => handleChange(e.target.value)}
        value={input}
      />
      <button type="submit">
        <Image alt="검색창 로고" src={SearchSymbol} width={27} height={27} />
      </button>
    </form>
  );
}
