"use client";

import { useEffect, useState } from "react";
import Home from "./home";

export default async function Page() {
  const [listData, setListData] = useState();

  useEffect(() => {
    async function fetchListData() {
      // TODO: server api fetch
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const all = await res.json();
      const listData = all.slice(0, 5).map((value) => ({
        id: value.id,
        label: "일반행정",
        title: value.title,
      }));
      setListData(listData);
    }

    fetchListData();
  }, []);

  return <Home listData={listData} />;
}
