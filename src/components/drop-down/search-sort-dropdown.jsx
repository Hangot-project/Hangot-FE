"use client";

import React, { useCallback, useRef } from "react";
import styles from "./search-sort-dropdown.module.css";
import { useOutsideClick } from "../../hooks";
import Image from "next/image";
import { ArrowDown } from "../../../public/svgs";

/**
 * @param {{selectedItem: string; setSelectedItem: React.Dispatch<React.SetStateAction<string>>; items: string[]; style?: React.CSSProperties;}}
 * @param {string} selectedItem - 선택된 항목(문자열)
 * @param {*} setSelectedItem - 선택 항목을 변경하는 setState 함수
 * @param {string[]} items - 드롭다운 항목 배열(문자열 배열)
 * @param {} style - 드롭다운 박스에 입힐 스타일 객체
 */
export const SearchSortDropdown = ({
  selectedItem,
  setSelectedItem,
  items,
  style,
}) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useOutsideClick(dropdownRef, false);

  const handleButtonClick = useCallback(() => {
    setIsActive((prev) => !prev);
  }, [setIsActive]);

  const selectedContainerStyle = isActive
    ? {
        borderBottomColor: "transparent",
      }
    : {};

  const containerStyle = Object.assign({}, selectedContainerStyle, style);

  return (
    <div>
      <div
        className={styles.selectedContainer}
        style={containerStyle}
        onClick={handleButtonClick}
        ref={dropdownRef}
      >
        <p>{selectedItem || "항목선택"}</p>
        <Image src={ArrowDown} style={styles.arrow} />
      </div>

      {isActive && (
        <ul className={styles.listContainer}>
          {items?.length ? (
            items.map((value, index) => (
              <li
                key={index}
                className={styles.listItem}
                onClick={() => setSelectedItem(value)}
              >
                {value}
              </li>
            ))
          ) : (
            <li className={styles.listItem}>항목 없음</li>
          )}
        </ul>
      )}
    </div>
  );
};
