"use client";

import { notFound, usePathname, useSearchParams } from "next/navigation";
import { QuestionListResult } from "../../../shared/api/question/type";
import { useCallback } from "react";
import { getPageArray, updateQueryString } from "../../../utils";
import Link from "next/link";
import { PostListCard } from "../../../components";
import Image from "next/image";
import { NextButton, PreviousButton } from "../../../../public/svgs";
import styles from "./question-list.module.css";

interface Props {
  result: QuestionListResult;
  initPage: number;
}

export function QuestionList({ result, initPage }: Props) {
  if (result === null) return notFound();

  const page = initPage ? initPage : 0;
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (type: "create" | "append" | "remove", name: string, value?: any) => {
      return updateQueryString({
        type,
        name,
        value,
        searchParams: searchParams.toString(),
      });
    },
    [searchParams, updateQueryString],
  );

  return (
    <div>
      {/* //* 제목 */}
      <h1 className={styles.title}>QnA</h1>
      <div className={styles.contents}>
        {/* //* 주제 항목 */}
        <div className={styles.nav}>
          <p>전체</p>
        </div>
        {/* //* 검색결과 수 & 정렬 */}
        <div className={styles.filterContainer}>
          <p>{result.totalElement.toLocaleString()}개의 질문</p>
        </div>

        {/* //* 검색 결과 리스트 */}
        <div className={styles.noticeList}>
          {result.data.map((question, index) => (
            <div key={index}>
              <Link href={`/qna/${question.questionId}`}>
                <PostListCard
                  id={question.questionId}
                  title={question.title}
                  date={question.createDate}
                />
              </Link>
              {index !== result.data.length - 1 && (
                <div className={styles.divisionLine} />
              )}
            </div>
          ))}
        </div>

        {result.totalElement > 0 && (
          <div
            className="pagesContainer"
            style={{
              margin: "3.5rem 0 9.75rem 0",
            }}
          >
            <div className="pagesWrapper">
              <Link
                href={`${pathName}?${updateQuery(
                  "create",
                  "page",
                  Math.max(page - 1, 0),
                )}`}
              >
                <Image src={PreviousButton} alt="이전 페이지 버튼" />
              </Link>
              {getPageArray(page, result.totalPage).map((num) => (
                <Link
                  href={`${pathName}?${updateQuery("create", "page", num - 1)}`}
                  key={`page${num}`}
                  className={`pageButton ${page == num - 1 ? "active" : ""}`}
                >
                  {num}
                </Link>
              ))}
              <Link
                href={`${pathName}?${updateQuery(
                  "create",
                  "page",
                  Math.min(result.totalPage - 1, page + 1),
                )}`}
              >
                <Image src={NextButton} alt="다음 페이지 버튼" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
