"use client";

import React from "react";
import styles from "./tags-container.module.css";

interface TagsContainerProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
  currentKeyword?: string;
}

export function TagsContainer({
  tags,
  onRemoveTag,
  currentKeyword,
}: TagsContainerProps) {
  if (tags.length === 0 && !currentKeyword) {
    return null;
  }

  return (
    <div className={styles.tagsContainer}>
      {currentKeyword && (
        <div className={styles.keywordItem}>
          <span>검색어: "{currentKeyword}"</span>
        </div>
      )}
      {tags.map((tag) => (
        <button
          key={tag}
          className={styles.tagItem}
          onClick={() => onRemoveTag(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}
