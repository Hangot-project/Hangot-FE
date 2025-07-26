"use client";

import React from "react";
import styles from "./filter-tags.module.css";

interface FilterTagsProps {
  activeFilters: {
    types: string[];
    organizations: string[];
  };
  activeFiltersCount: number;
  onRemoveFilter: (type: "types" | "organizations", value: string) => void;
  onClearAll: () => void;
}

export function FilterTags({
  activeFilters,
  activeFiltersCount,
  onRemoveFilter,
  onClearAll,
}: FilterTagsProps) {
  if (activeFiltersCount === 0) {
    return null;
  }

  return (
    <div className={styles.activeFiltersContainer}>
      <div className={styles.activeFiltersHeader}>
        <span className={styles.activeFiltersTitle}>
          적용된 필터 ({activeFiltersCount}개)
        </span>
        <button className={styles.clearAllButton} onClick={onClearAll}>
          필터 해제
        </button>
      </div>
      <div className={styles.filterTags}>
        {activeFilters.types.map((type) => (
          <div key={`type-${type}`} className={styles.filterTag} data-type="types">
            <span className={styles.filterTagLabel}>타입</span>
            <span className={styles.filterTagValue}>{type}</span>
            <button
              className={styles.filterTagRemove}
              onClick={() => onRemoveFilter("types", type)}
            >
              ×
            </button>
          </div>
        ))}
        {activeFilters.organizations.map((org) => (
          <div
            key={`org-${org}`}
            className={styles.filterTag}
            data-type="organizations"
          >
            <span className={styles.filterTagLabel}>제공 기관</span>
            <span className={styles.filterTagValue}>{org}</span>
            <button
              className={styles.filterTagRemove}
              onClick={() => onRemoveFilter("organizations", org)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
