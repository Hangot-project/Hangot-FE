import { currentOpenDataDummy } from "../dummy-data/main-datas";
import Main from "./main";

async function getListData() {
  // TODO: server api fetch
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const all = await res.json();
  const listData = all.slice(0, 6).map((value) => ({
    id: value.id,
    label: "일반행정",
    title: value.title,
  }));
  return listData;
}

export default async function Page() {
  const listData = await getListData();
  return <Main listData={listData} />;
}
