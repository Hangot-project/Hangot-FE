"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./autocomplete.module.css";

export interface AutocompleteSuggestion {
  value: string;
  type: "tag" | "title";
}

interface Props {
  suggestions: AutocompleteSuggestion[];
  onSelect: (suggestion: AutocompleteSuggestion) => void;
  visible: boolean;
  loading?: boolean;
}

export function Autocomplete({ suggestions, onSelect, visible, loading }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!visible || suggestions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            onSelect(suggestions[selectedIndex]);
          }
          break;
        case "Escape":
          setSelectedIndex(-1);
          break;
      }
    },
    [visible, suggestions, selectedIndex, onSelect],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!visible) return null;

  return (
    <div className={styles.autocomplete_container}>
      <div className={styles.autocomplete_list} ref={listRef}>
        {loading ? (
          <div className={styles.empty_state}>검색 중...</div>
        ) : suggestions.length === 0 ? (
          <div className={styles.empty_state}>검색 결과가 없습니다</div>
        ) : (
          suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.value}`}
              className={`${styles.autocomplete_item} ${
                suggestion.type === "tag" ? styles.tag : ""
              } ${index === selectedIndex ? styles.selected : ""}`}
              onClick={() => onSelect(suggestion)}
            >
              {suggestion.value}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
