import { BarChart } from "../../../components";
import { dataset as _dataset } from "../../../dummy-data/datasets";
import Loading from "../../../app/loading";
import { getAllDatasets, getDatasetDetail } from "../../../api/dataset";

export async function generateStaticParams() {
  const datasets = await getAllDatasets();

  return datasets.map((dataset) => ({
    id: dataset.datasetId,
  }));
}

async function Page({ params }: { params: { id: number } }) {
  const datasetDetail = await getDatasetDetail(params.id);
  // TODO: 데이터셋 시각화 api 연결
  const dataset = { ..._dataset };

  return (
    <div>
      <p>id: {params.id}</p>
      {dataset ? (
        <BarChart x_axis_name={dataset.x_axis_name} dataset={dataset} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Page;
