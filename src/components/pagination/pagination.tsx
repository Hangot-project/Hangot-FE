"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { getPageArray } from "../../utils";
import { updateQueryString } from "../../utils/search/update-query-string";
import Image from "next/image";
import { NextButton, PreviousButton } from "../../../public/svgs";

export function Pagination({
  pathName,
  searchParams,
  currentPage,
  totalPage,
}: {
  pathName: string;
  searchParams: string;
  currentPage: number;
  totalPage: number;
}) {
  const updateQuery = useCallback(
    (type: "create" | "append" | "remove", name: string, value?: any) => {
      return updateQueryString({
        type,
        name,
        value,
        searchParams,
      });
    },
    [searchParams],
  );

  return (
    <div
      className="pagesContainer"
      style={{
        margin: "3.5rem 0 9.75rem 0",
      }}
    >
      <div className="pagesWrapper">
        <Link
          href={{
            pathname: pathName,
            query: updateQuery(
              "create",
              "page",
              Math.max(Math.floor((currentPage - 1) / 5) * 5 + 1, 1),
            ),
          }}
        >
          <Image src={PreviousButton} alt="이전 페이지 버튼" />
        </Link>
        {getPageArray(currentPage, totalPage).map((num) => (
          <Link
            href={{
              pathname: pathName,
              query: updateQuery("create", "page", num),
            }}
            key={`page${num}`}
            className={`pageButton ${currentPage == num ? "active" : ""}`}
          >
            {num}
          </Link>
        ))}
        <Link
          href={{
            pathname: pathName,
            query: updateQuery(
              "create",
              "page",
              Math.min(totalPage, Math.floor((currentPage - 1) / 5) * 5 + 6),
            ),
          }}
        >
          <Image src={NextButton} alt="다음 페이지 버튼" />
        </Link>
      </div>
    </div>
  );
}
