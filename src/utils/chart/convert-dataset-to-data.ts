"use client";

import { Dataset } from "@/api/dataset";
import { ChartData } from "chart.js";
import _ from "lodash";

/**
 * dataset 타입을 chartjs data 타입으로 변환하는 함수
 * @param dataset 백엔드 api로 전달받은 dataset 타입
 */
export const ConvertDatasetToData = (
  dataset: Dataset,
): ChartData<"bar", string[], string> => {
  const colors = new Array(dataset.dataList.length).fill(0).map(() => {
    const rgb1 = Math.floor(Math.random() * 256);
    const rgb2 = Math.floor(Math.random() * 256);
    return `rgb(${rgb1}, ${rgb2}, ${200}, 0.5)`; // 파란색 계열
  });

  const datasets = _.map(dataset.dataList, (value, index) => ({
    label: dataset.dataName[index],
    data: value,
    backgroundColor: colors[index],
  }));

  return {
    labels: dataset.x_label,
    datasets,
  };
};
