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
export function SearchBox({ handleSubmit, boxstyle, placeholder, inputstyle, iconstyle, initKeyword }) {
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
      style={boxstyle}
      onSubmit={(e) => handleSubmit(e, input)}
    >
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchbox_input}
        style={inputstyle}
        onChange={(e) => handleChange(e.target.value)}
        value={input}
      />
      <button type="submit">
        <Image src={SearchSymbol} style={iconstyle} />
      </button>
    </form>
  );
}
