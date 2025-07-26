"use client";

import React from "react";
import { SearchBox } from "../search-box/search-box";
import { FilterIcon } from "../../../public/svgs";
import Image from "next/image";
import styles from "./search-header.module.css";

interface SearchHeaderProps {
  searchValue: string;
  onSearchSubmit: (value: string) => void;
  onSearchClear?: () => void;
  onFilterClick: () => void;
  activeFiltersCount: number;
}

export function SearchHeader({
  searchValue,
  onSearchSubmit,
  onSearchClear,
  onFilterClick,
}: SearchHeaderProps) {
  return (
    <div className={styles.searchContainer}>
      <SearchBox
        value={searchValue}
        onSubmit={onSearchSubmit}
        onClear={onSearchClear}
      />
      <button className={styles.filterButton} onClick={onFilterClick}>
        <Image src={FilterIcon} alt="필터" className={styles.filterIcon} />
      </button>
    </div>
  );
}
