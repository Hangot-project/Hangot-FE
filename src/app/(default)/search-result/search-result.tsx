"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  SearchSortDropdown,
  SimpleDatasetCard,
  Pagination,
} from "../../../components";
import { FilterModal } from "../../../components/filter-modal/filter-modal";
import { SearchHeader } from "../../../components/search-header/search-header";
import { FilterTags } from "../../../components/filter-tags/filter-tags";
import { TagsContainer } from "../../../components/tags-container/tags-container";
import styles from "./searchResult.module.css";
import Link from "next/link";
import { SORT_VALUES } from "../../../constants";
import { DatasetInfo } from "../../../shared/types/dataset";
import { SERVER_PARAMS_KEY } from "../../../constants/dataset-search-params";
import { useSearchFilters } from "../../../hooks/useSearchFilters";
import { useSearchQuery } from "../../../hooks/useSearchQuery";

interface Props {
  results: DatasetInfo[];
  totalElement: number;
  totalPage: number;
  initPage: number;
}

export default function SearchResult({
  results,
  totalElement,
  totalPage,
  initPage,
}: Props) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const initSort = searchParams.get("sort");

  const [selectedSort, setSelectedSort] = useState(initSort);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const {
    activeFiltersCount,
    activeFilters,
    handleFilterApply,
    handleRemoveFilter,
    handleClearAllFilters,
    handleSearchSubmit,
    updateQuery,
  } = useSearchFilters();

  const { currentKeyword } = useSearchQuery();

  // 태그 관리
  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    handleFilterApply({
      selectedTypes: activeFilters.types,
      selectedOrganizations: activeFilters.organizations,
      selectedTags: updatedTags,
    });
  };

  // 검색 입력 처리
  const handleSearchInputSubmit = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue.startsWith("#")) {
      // 태그 검색 - URL을 통해 직접 처리
      const tagName = trimmedValue.substring(1).trim();
      if (tagName && !tags.includes(tagName)) {
        const currentTags = [...tags, tagName];
        setTags(currentTags); // 즉시 상태 업데이트
        handleFilterApply({
          selectedTypes: activeFilters.types,
          selectedOrganizations: activeFilters.organizations,
          selectedTags: currentTags,
        });
      }
      setSearchInput(""); // 검색창 초기화
    } else {
      // 일반 키워드 검색 - 즉시 API 호출
      const fakeEvent = {
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>;
      handleSearchSubmit(fakeEvent, trimmedValue);
      setSearchInput(""); // 검색창 초기화
    }
  };

  // 초기 로드 시 URL에서 태그 추출
  useEffect(() => {
    const tagParam = searchParams.get(SERVER_PARAMS_KEY.TAG);
    if (tagParam) {
      const tagNames = tagParam.split(",").filter((tag: string) => tag.trim());
      setTags(tagNames);
    }
  }, []);

  useEffect(() => {
    if (selectedSort) {
      const updatedQuery = updateQuery(
        "create",
        SERVER_PARAMS_KEY.SORT,
        selectedSort,
      );
      const queryString = new URLSearchParams(updatedQuery).toString();
      router.push(`${pathName}${queryString ? `?${queryString}` : ""}` as any, {
        scroll: false,
      });
    }
  }, [selectedSort, router, pathName, updateQuery]);

  return (
    <div className={styles.root}>
      <SearchHeader
        searchValue={searchInput}
        onSearchSubmit={handleSearchInputSubmit}
        onSearchClear={() => setSearchInput("")}
        onFilterClick={() => setIsFilterModalOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      <TagsContainer
        tags={tags}
        onRemoveTag={handleRemoveTag}
        currentKeyword={currentKeyword}
      />

      <FilterTags
        activeFilters={activeFilters}
        activeFiltersCount={activeFiltersCount}
        onRemoveFilter={handleRemoveFilter}
        onClearAll={handleClearAllFilters}
      />

      {/* 검색 결과 */}
      <main className={styles.mainContainer}>
        <section className={styles.resultsSection}>
          <div className={styles.sectionTitleWrapper}>
            <h2 className={styles.sectionTitle}>
              전체{" "}
              <span className={styles.highlightText}>
                {totalElement.toLocaleString()}
              </span>
              건
            </h2>

            <div className={styles.rowWrapper}>
              <SearchSortDropdown
                items={[...SORT_VALUES]}
                selectedItem={selectedSort}
                setSelectedItem={setSelectedSort}
              />
            </div>
          </div>

          <div className={styles.resultsGrid}>
            {results.map((dataset) => (
              <Link
                key={dataset.datasetId}
                href={{
                  pathname: `/search-result/${dataset.datasetId}`,
                }}
                prefetch={false}
              >
                <SimpleDatasetCard
                  title={dataset.title}
                  from={dataset.organization}
                  view={dataset.view}
                  type={dataset.type}
                  scrap={dataset.scrap}
                  createDate={dataset.createDate}
                  updateDate={dataset.updateDate}
                  tagList={dataset.tagList}
                  description={dataset.description}
                />
              </Link>
            ))}
          </div>

          {totalPage > 0 && (
            <Pagination
              pathName={pathName}
              searchParams={searchParams.toString()}
              currentPage={initPage}
              totalPage={totalPage}
            />
          )}
        </section>
      </main>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
      />
    </div>
  );
}
