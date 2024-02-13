"use client";

import React, { useState } from "react";
import { SearchSortDropdown } from "../../components";

const FilterOptions = ["인기순", "최신순"];

export default function Test() {
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <>
      <SearchSortDropdown
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        items={FilterOptions}
      />
    </>
  );
}
