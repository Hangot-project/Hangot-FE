import { getNewDataset } from "../../shared/api/dataset/getNewDatasetInfo";
import { getPopularDatasetInfo } from "../../shared/api/dataset/getPopularDatasetInfo";
import Main from "./main";

export default async function Page() {
  const { popularDatasets } = await getListData();
  return <Main populars={popularDatasets} />;
}

async function getListData() {
  const popularDatasets = await getPopularDatasetInfo();
  const newDatasets = await getNewDataset();
  return { popularDatasets, newDatasets };
}
