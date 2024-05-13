import { getNewDataset, getPopularDataset } from "../api/dataset";
import Main from "./main";

async function getListData() {
  const popularDatasets = await getPopularDataset();
  const newDatasets = await getNewDataset();
  return { popularDatasets, newDatasets };
}

export default async function Page() {
  const { popularDatasets, newDatasets } = await getListData();
  return <Main populars={popularDatasets} news={newDatasets} />;
}
