"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ConvertDatasetChartToData } from "../../utils";
import { getDatasetChart } from "../../shared/api/dataset-visual/getDatasetChart";

interface Props {
  datasetId: number;
  colName: string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const default_options = {
  maxBarThickness: 50,
  interaction: {
    mode: "index",
  },
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
};

export async function BarChart({ datasetId, colName }: Props) {
  const dataset = await getDatasetChart(datasetId, colName);

  const options = Object.assign(
    {},
    default_options,
    dataset
      ? {
          scales: {
            x: {
              title: {
                display: true,
                text: dataset.x_axis_name,
              },
            },
          },
        }
      : {},
  );

  return (
    <>
      {dataset && (
        <Bar
          //@ts-ignore
          options={options}
          data={ConvertDatasetChartToData(dataset)}
        />
      )}
    </>
  );
}
