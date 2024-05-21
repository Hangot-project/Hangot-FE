import { getNewDataset } from "../../api/dataset/getNewDatasetInfo";
import { getPopularDatasetInfo } from "../../api/dataset/getPopularDatasetInfo";
import Main from "./main";

async function getListData() {
  const popularDatasets = await getPopularDatasetInfo();
  const newDatasets = await getNewDataset();
  return { popularDatasets, newDatasets };
}

export default async function Page() {
  const { popularDatasets, newDatasets } = await getListData();
  return <Main populars={popularDatasets} news={newDatasets} />;
}
