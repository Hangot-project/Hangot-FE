"use client";

import Image from "next/image";
import styles from "./search-box.module.css";
import { SearchSymbol } from "../../../public/svgs";
import { useCallback, useState } from "react";

/**
 *
 * @param {{handleSubmit: FormEventHandler<HTMLButtonElement>; style?: CSSProperties; initKeyword?: string}} param0
 * @returns
 */
export function SearchBox({ handleSubmit, style, initKeyword }) {
  const [input, setInput] = useState(initKeyword ? initKeyword : "");

  const handleChange = useCallback(
    (value) => {
      setInput(value);
    },
    [setInput],
  );

  return (
    <form
      className={styles.searchbox_container}
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
        <Image src={SearchSymbol} width={27} height={27} />
      </button>
    </form>
  );
}
