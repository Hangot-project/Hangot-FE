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
import Loading from "../../app/loading";
import { ConvertDatasetToData } from "../../utils";

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

/**
 *
 * @param {{x_axis_name: string; dataset: import("@/api/dataset").Dataset;}} x_axis_name - x축 이름
 * @param {dataset} dataset -  백엔드 api로 전달받은 데이터셋 정보
 * @returns
 */
export function BarChart({ x_axis_name, dataset }) {
  const options = Object.assign({}, default_options, {
    scales: {
      x: {
        title: {
          display: true,
          text: x_axis_name,
        },
      },
    },
  });

  const data = ConvertDatasetToData(dataset);

  return <Bar options={options} data={data} fallbackContent={Loading} />;
}
