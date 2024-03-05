"use client";

import React from "react";
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
import _ from "lodash";
import { dataset as result } from "@/dummy-data/datasets";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: result.labelName,
    },
  },
};

const datasets = _.map(result.labelList, (value, index) => ({
  label: result.labelList[index],
  data: result.dataList.map((datas) => datas[index]),
  borderColor: "rgb(255, 99, 132)",
  backgroundColor: "rgba(255, 99, 132, 0.5)",
}));

// const dataset1 = {
//   label: result.dataName[0],
//   data: result.dataList.map((dataList) => dataList[0]),
//   borderColor: "rgb(255, 99, 132)",
//   backgroundColor: "rgba(255, 99, 132, 0.5)",
// };

const data = {
  labels: result.dataName,
  datasets,
};

export default function Test() {
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
