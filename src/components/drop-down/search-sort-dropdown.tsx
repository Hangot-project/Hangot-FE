"use client";

import { CSSProperties, Dispatch, SetStateAction, useCallback, useRef } from "react";
import styles from "./search-sort-dropdown.module.css";
import { useOutsideClick } from "../../hooks";
import Image from "next/image";
import { ArrowDown } from "../../../public/svgs";

interface Props {
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  items: string[];
  defaultText?: string;
  style?: CSSProperties;
  width?: string | number;
  maxHeight?: string;
}

export const SearchSortDropdown = ({
  selectedItem,
  setSelectedItem,
  items,
  defaultText,
  style,
  width,
  maxHeight = "20rem",
}: Props) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useOutsideClick(dropdownRef, false);

  const selectedContainerStyle = isActive
    ? {
        borderBottomColor: "transparent",
      }
    : {};

  const itemsWidth = typeof width === "number" ? `${width}px` : width;
  const containerStyle = Object.assign({}, selectedContainerStyle, style, {
    width: itemsWidth,
  });

  const handleButtonClick = useCallback(() => {
    setIsActive((prev) => !prev);
  }, [setIsActive]);

  const handleItemClick = useCallback((item: string) => {
    setSelectedItem(item);
    setIsActive(false);
  }, []);

  return (
    <div>
      <div
        className={styles.selectedContainer}
        style={containerStyle}
        onClick={handleButtonClick}
        ref={dropdownRef}
      >
        <p>{selectedItem || defaultText || "항목선택"}</p>
        <Image alt="드롭다운 화살표" src={ArrowDown} className={styles.arrow} />
      </div>

      {isActive && (
        <ul
          className={styles.listContainer}
          style={{ width: itemsWidth, maxHeight: maxHeight, overflowY: "scroll" }}
        >
          {items?.length ? (
            items.map((value, index) => (
              <li
                key={index}
                className={styles.listItem}
                onClick={() => handleItemClick(value)}
                style={{
                  width: itemsWidth,
                }}
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
