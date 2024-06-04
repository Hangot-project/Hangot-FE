"use client";

import Link from "next/link";
import styles from "./data-board.module.css";
import { colorMatch } from "../../constants";
import { DatasetInfoBanner } from "../../shared/types/dataset";
import styled from "@emotion/styled";
import { hexToRgba } from "../../utils/style/hexToRgb";
import Image from "next/image";
import { LikeEmpty } from "../../../public/svgs";

const THEME_TEXT_COLOR = "#0950bc";

type Props = {
  title: string;
  url: string;
  dataList: DatasetInfoBanner[];
};

export function DataBoard({ title, url, dataList }: Props) {
  return (
    <div className={styles.container}>
      {/* 메인페이지 인기 및 신규데이터 파트 헤더 */}
      <hgroup className={styles.headerContainer}>
        <h2 className={styles.title}>{title}</h2>
        <Link href={`/${url}`}>
          <span className={styles.more}>더 보기 &gt;</span>
        </Link>
      </hgroup>

      {/* 메인페이지 인기 및 신규데이터 파트 바디 */}
      <div className={styles.dataBoard}>
        {dataList?.map((dataset) => (
          <Link
            href={`/search-result/${dataset.datasetId}`}
            key={dataset.datasetId}
            className={styles.dataCard}
          >
            {/* 데이터 제목, 데이터 유형, 데이터 제공 기관 */}
            {/* TODO : 데이터 유형, 데이터 제공 기관 param에 추가 */}
            <section>
              <div>
                <h3 className={styles.dataTitle}>{dataset.title}</h3>
                <LabelGroup>
                  {dataset.type && (
                    <TypeContainer
                      color={hexToRgba(colorMatch[dataset.type.toUpperCase()], 0.2)}
                    >
                      <TypeText color={colorMatch[dataset.type.toUpperCase()]}>
                        {dataset.type.toUpperCase()}
                      </TypeText>
                    </TypeContainer>
                  )}
                  {dataset.themeList.map((theme, index) => (
                    <TypeContainer
                      key={index}
                      color={hexToRgba(THEME_TEXT_COLOR, 0.2)}
                    >
                      <TypeText color={THEME_TEXT_COLOR}>{theme}</TypeText>
                    </TypeContainer>
                  ))}
                </LabelGroup>
              </div>
              <div className={styles.dataConst}>
                <span className={styles.dataConstText}>{dataset.organization}</span>
                <ScrapContainer>
                  <Image alt="스크랩 로고" src={LikeEmpty} />
                  <span style={{ marginLeft: "5px" }}>{dataset.scrap}</span>
                </ScrapContainer>
              </div>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
}

const LabelGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
`;

const TypeContainer = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  padding: 4px 6px;
  border-radius: 4px;
`;

const TypeText = styled.p<{ color: string }>`
  font-family: "NotoSansMedium";
  color: ${(props) => props.color};
`;

const ScrapContainer = styled.span`
  display: flex;
  align-items: center;
`;
