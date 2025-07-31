"use client";

import Image from "next/image";
import styles from "./search-box.module.css";
import { SearchSymbol } from "../../../public/svgs";
import React, {
  CSSProperties,
  FormEvent,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import { Autocomplete, AutocompleteSuggestion } from "../autocomplete/autocomplete";
import { getTagSuggestions } from "../../shared/api/dataset/getTagSuggestions";
import { getTitleSuggestions } from "../../shared/api/dataset/getTitleSuggestions";

type Props = {
  value: string;
  onSubmit: (value: string) => void;
  onClear?: () => void;
  style?: CSSProperties;
  boxstyle?: CSSProperties;
  placeholder?: string;
  inputstyle?: CSSProperties;
  iconstyle?: CSSProperties;
  className?: string;
};

export function SearchBox({
  value,
  onSubmit,
  onClear,
  boxstyle,
  inputstyle,
  iconstyle,
  className,
}: Props) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // value prop이 변경되면 내부 상태도 업데이트
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  // 자동완성 검색 로직
  useEffect(() => {
    const searchSuggestions = async () => {
      if (!inputValue.trim() || inputValue.length < 1) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoading(true);
      try {
        const trimmedValue = inputValue.trim();
        const promises: Promise<string[] | null>[] = [];

        if (trimmedValue.startsWith("#")) {
          // 태그 검색
          const tagQuery = trimmedValue.slice(1);
          if (tagQuery.length > 0) {
            promises.push(getTagSuggestions(tagQuery));
          }
        } else {
          // 제목 검색
          promises.push(getTitleSuggestions(trimmedValue));
          // 태그도 함께 검색 (# 없이)
          promises.push(getTagSuggestions(trimmedValue));
        }

        const results = await Promise.all(promises);
        const newSuggestions: AutocompleteSuggestion[] = [];

        if (trimmedValue.startsWith("#")) {
          // 태그만 추가
          const tagResults = results[0];
          if (tagResults && Array.isArray(tagResults)) {
            tagResults.slice(0, 5).forEach((tag) => {
              newSuggestions.push({ value: tag, type: "tag" });
            });
          }
        } else {
          // 제목 결과 추가
          const titleResults = results[0];
          if (titleResults && Array.isArray(titleResults)) {
            titleResults.slice(0, 3).forEach((title) => {
              newSuggestions.push({ value: title, type: "title" });
            });
          }

          // 태그 결과 추가
          const tagResults = results[1];
          if (tagResults && Array.isArray(tagResults)) {
            tagResults.slice(0, 3).forEach((tag) => {
              newSuggestions.push({ value: tag, type: "tag" });
            });
          }
        }

        setSuggestions(newSuggestions);
        setShowSuggestions(true); // 빈 결과여도 항상 표시
      } catch (error) {
        console.error("자동완성 검색 오류:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  // 외부 클릭 시 자동완성 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = useCallback((newValue: string) => {
    setInputValue(newValue);
  }, []);

  const handleSuggestionSelect = useCallback(
    (suggestion: AutocompleteSuggestion) => {
      const newValue =
        suggestion.type === "tag" ? `#${suggestion.value}` : suggestion.value;
      setShowSuggestions(false);
      onSubmit(newValue);
      setInputValue("");
      onClear?.();
    },
    [onSubmit, onClear],
  );

  const handleSubmitAction = useCallback(() => {
    const trimmedInput = inputValue.trim();
    onSubmit(trimmedInput);
    setInputValue(""); // 직접 초기화
    onClear?.(); // 상위 컴포넌트에게도 알림
    setShowSuggestions(false);
  }, [onSubmit, inputValue, onClear]);

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmitAction();
    },
    [handleSubmitAction],
  );

  // 엔터 키는 자동으로 폼 제출을 트리거하므로 별도 처리 불필요
  // handleKeyDown 제거하고 폼 제출만 사용

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <form
        className={`${styles.searchbox_container} ${className}`}
        style={boxstyle}
        onSubmit={handleFormSubmit}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="제목 검색 또는 #해시태그 추가"
          className={styles.searchbox_input}
          onChange={(e) => handleChange(e.target.value)}
          value={inputValue}
          style={inputstyle}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
        />
        <button type="submit" className={styles.searchbox_button} style={iconstyle}>
          <Image alt="검색창 로고" src={SearchSymbol} width={27} height={27} />
        </button>
      </form>
      <Autocomplete
        suggestions={suggestions}
        onSelect={handleSuggestionSelect}
        visible={showSuggestions}
        loading={loading}
      />
    </div>
  );
}
