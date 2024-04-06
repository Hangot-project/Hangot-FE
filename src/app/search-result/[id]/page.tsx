import { BarChart } from "../../../components";
import { dataset as _dataset } from "../../../dummy-data/datasets";
import Loading from "../../loading";
import { getAllDatasets, getDatasetDetail } from "../../../api/dataset";
import { Suspense } from "react";

export async function generateStaticParams() {
  const datasets = await getAllDatasets();

  return datasets.map((dataset) => ({
    id: dataset.datasetId.toString(),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const datasetDetail = await getDatasetDetail(parseInt(params.id));
  // TODO: 데이터셋 시각화 api 연결
  const dataset = { ..._dataset };

  return (
    <div>
      <p>id: {params.id}</p>
      <Suspense fallback={<Loading />}>
        {dataset && <BarChart x_axis_name={dataset.x_axis_name} dataset={dataset} />}
      </Suspense>
    </div>
  );
}
