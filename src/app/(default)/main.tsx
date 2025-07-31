"use client";

import React, { useState } from "react";
import styles from "./main.module.css";
import { SearchBox } from "../../components";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BackgroundPattern,
  DataIllustration,
  FilterIcon,
} from "../../../public/svgs";
import { FilterModal } from "../../components/filter-modal/filter-modal";
import { useSearchFilters } from "../../hooks/useSearchFilters";

export default function Main() {
  const router = useRouter();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const { activeFiltersCount, handleFilterApply, handleSearchSubmit } =
    useSearchFilters();

  // 검색 입력 처리 - search-result와 동일한 로직
  const handleSearchInputSubmit = (value: string) => {
    const trimmedValue = value.trim();

    if (trimmedValue.startsWith("#")) {
      // 태그 검색 - URL을 통해 직접 처리
      const tagName = trimmedValue.substring(1).trim();
      if (tagName && !tags.includes(tagName)) {
        const currentTags = [...tags, tagName];
        setTags(currentTags);
        // 태그와 함께 검색 결과 페이지로 이동
        router.push(
          `/search-result?tags=${encodeURIComponent(currentTags.join(","))}`,
        );
      }
    } else {
      // 일반 키워드 검색
      const fakeEvent = {
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>;
      handleSearchSubmit(fakeEvent, trimmedValue);
    }
  };

  return (
    <div className={styles.root}>
      {/* Background Pattern */}
      <div className={styles.backgroundPattern}>
        <Image
          src={BackgroundPattern}
          alt="Background Pattern"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                모든 공공데이터를
                <br />
                <span className={styles.brandName}>한 곳</span>에서 찾아보세요
              </h1>
              <p className={styles.heroSubtitle}>
                흩어져있는 대한민국 공공데이터를 실시간으로 수집하여 제공합니다.
              </p>
            </div>

            {/* Search Box */}
            <div className={styles.searchContainer}>
              <SearchBox
                value=""
                onSubmit={handleSearchInputSubmit}
                boxstyle={{
                  position: "relative",
                  backgroundColor: "#ffffff",
                  borderRadius: "25px",
                  width: "30rem",
                  maxWidth: "100%",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              />
              <button
                className={styles.filterButton}
                onClick={() => setIsFilterModalOpen(true)}
              >
                <Image src={FilterIcon} alt="필터" className={styles.filterIcon} />
                {activeFiltersCount > 0 && (
                  <span className={styles.filterBadge}>{activeFiltersCount}</span>
                )}
              </button>
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.illustrationContainer}>
              <Image
                src={DataIllustration}
                alt="Data Illustration"
                width={600}
                height={400}
                className={styles.illustration}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3 className={styles.featureTitle}>실시간 데이터 수집</h3>
            <p className={styles.featureDescription}>
              전국 공공기관의 데이터를 실시간으로 수집하여 최신 정보를 제공합니다.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3 className={styles.featureTitle}>통합 검색</h3>
            <p className={styles.featureDescription}>
              수십만 개의 공공데이터를 한 번에 검색하고 필요한 정보를 빠르게
              찾으세요.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h3 className={styles.featureTitle}>데이터 시각화</h3>
            <p className={styles.featureDescription}>
              복잡한 데이터를 직관적인 차트와 그래프로 쉽게 이해할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={handleFilterApply}
      />
    </div>
  );
}
