"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { getPageArray, updateQueryString } from "../../utils";
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
    [searchParams, updateQueryString],
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
          href={`${pathName}?${updateQuery(
            "create",
            "page",
            Math.max(currentPage - 1, 0),
          )}`}
        >
          <Image src={PreviousButton} alt="이전 페이지 버튼" />
        </Link>
        {getPageArray(currentPage, totalPage).map((num) => (
          <Link
            href={`${pathName}?${updateQuery("create", "page", num - 1)}`}
            key={`page${num}`}
            className={`pageButton ${currentPage == num - 1 ? "active" : ""}`}
          >
            {num}
          </Link>
        ))}
        <Link
          href={`${pathName}?${updateQuery(
            "create",
            "page",
            Math.min(totalPage - 1, currentPage + 1),
          )}`}
        >
          <Image src={NextButton} alt="다음 페이지 버튼" />
        </Link>
      </div>
    </div>
  );
}
