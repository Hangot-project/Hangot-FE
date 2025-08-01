"use client";

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { getDatasetPieChart } from "../../shared/api/dataset-visual/getDatasetPieChart";
import { DatasetPieChartType } from "../../shared/types/dataset";

interface Props {
  datasetId: number;
  colName: string;
  onLoadingChange?: (isLoading: boolean) => void;
}
export function PieChart({ datasetId, colName, onLoadingChange }: Props) {
  const [dataset, setDataset] = useState<DatasetPieChartType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      onLoadingChange?.(true);
      const response = await getDatasetPieChart(datasetId, colName);
      setDataset(response.result);
      onLoadingChange?.(false);
    };
    fetchData();
  }, [datasetId, colName, onLoadingChange]);

  // Convert dataset to recharts format
  const allData = [];
  if (dataset) {
    for (let i = 0; i < dataset.labels.length; i++) {
      allData.push({
        name: dataset.labels[i],
        value: dataset.count[i],
      });
    }
  }

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7c7c",
    "#8dd1e1",
    "#d084d0",
    "#87d068",
    "#ffc0cb",
    "#ffb347",
    "#98fb98",
  ];

  return (
    <>
      {dataset && (
        <div
          style={{
            height: "100%",
            minHeight: "600px",
            overflowX: "auto",
            overflowY: "auto",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
          }}
        >
          <div
            style={{
              height: "500px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={allData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent, value }) =>
                    `${name} ${value.toLocaleString()} (${(percent * 100).toFixed(
                      0,
                    )}%)`
                  }
                  outerRadius={180}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {allData.map((entry, index) => {
                    const color = colors[index % colors.length];
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), ""]} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
