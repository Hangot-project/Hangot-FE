import React, { useCallback, useRef } from "react";
import styles from "./search-sort-dropdown.module.css";
import { useOutsideClick } from "../../hooks";
import Image from "next/image";
import { ArrowDown } from "../../../public/svgs";

/**
 *
 * @param {string} selectedItem - 선택된 항목(문자열)
 * @param {*} setSelectedItem - 선택 항목을 변경하는 setState 함수
 * @param {string[]} items - 드롭다운 항목 배열(문자열 배열)
 * @returns
 */
export const SearchSortDropdown = ({ selectedItem, setSelectedItem, items }) => {
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useOutsideClick(dropdownRef, false);

  const handleButtonClick = useCallback(() => {
    setIsActive((prev) => !prev);
  }, [setIsActive]);

  const selectedContainerStyle = isActive
    ? {
        borderBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }
    : {};

  return (
    <>
      <div
        className={styles.selectedContainer}
        style={selectedContainerStyle}
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
            <li>항목이 존재하지 않습니다.</li>
          )}
        </ul>
      )}
    </>
  );
};
