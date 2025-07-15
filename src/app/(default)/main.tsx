"use client";

import React, { FormEvent, useCallback } from "react";
import styles from "./main.module.css";
import { SearchBox } from "../../components";
import { useRouter } from "next/navigation";
import { SERVER_PARAMS_KEY } from "../../constants/dataset-search-params";
import Image from "next/image";
import { BackgroundPattern, DataIllustration } from "../../../public/svgs";

export default function Main() {
  const router = useRouter();

  // 검색 제출시 실행되는 함수. 파라미터는 search-box 컴포넌트 내에서 전달한다.
  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>, keyword: string) => {
      event.preventDefault();

      if (keyword) {
        router.push(`search-result?${SERVER_PARAMS_KEY.KEYWORD}=${keyword}`);
        return;
      }
    },
    [],
  );

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
                <br />한 곳에서 찾아보세요
              </h1>
              <p className={styles.heroSubtitle}>
                하이데이터는 대한민국 공공데이터를 크롤링하여 한 곳에 모아 제공합니다.
              </p>
            </div>

            {/* Search Box */}
            <div className={styles.searchContainer}>
              <SearchBox
                boxstyle={{
                  position: "relative",
                  backgroundColor: "#ffffff",
                  borderRadius: "25px",
                  width: "100%",
                  maxWidth: "600px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
                handleSubmit={handleSearchSubmit}
              />
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
              수십만 개의 공공데이터를 한 번에 검색하고 필요한 정보를 빠르게 찾으세요.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📈</div>
            <h3 className={styles.featureTitle}>데이터 시각화</h3>
            <p className={styles.featureDescription}>
              복잡한 데이터를 직관적인 차트와 그래프로 쉽게 이해할 수 있습니다.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>빠른 다운로드</h3>
            <p className={styles.featureDescription}>
              원하는 데이터를 다양한 형식으로 빠르게 다운로드할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
