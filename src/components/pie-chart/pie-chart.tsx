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
import { getDatasetChart } from "../../shared/api/dataset-visual/getDatasetChart";

interface Props {
  datasetId: number;
  colName: string;
}
export function PieChart({ datasetId, colName }: Props) {
  const [dataset, setDataset] = useState<any>(null);
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  useEffect(() => {
    getDatasetChart(datasetId, colName).then(setDataset);
  }, [datasetId, colName]);

  // Convert dataset to recharts format for multiple series
  const allData = [];
  if (dataset) {
    for (let seriesIndex = 0; seriesIndex < dataset.dataName.length; seriesIndex++) {
      if (!hiddenSeries.has(dataset.dataName[seriesIndex])) {
        for (let i = 0; i < dataset.x_label.length; i++) {
          allData.push({
            name: `${dataset.dataName[seriesIndex]} - ${dataset.x_label[i]}`,
            value: dataset.dataList[seriesIndex][i],
            series: dataset.dataName[seriesIndex],
          });
        }
      }
    }
  }

  const handleLegendClick = (dataKey: string) => {
    const newHiddenSeries = new Set(hiddenSeries);
    if (hiddenSeries.has(dataKey)) {
      newHiddenSeries.delete(dataKey);
    } else {
      newHiddenSeries.add(dataKey);
    }
    setHiddenSeries(newHiddenSeries);
  };

  const renderCustomLegend = () => {
    if (!dataset) return null;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        {dataset.dataName.map((seriesName, index) => (
          <div
            key={seriesName}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              opacity: hiddenSeries.has(seriesName) ? 0.5 : 1,
              textDecoration: hiddenSeries.has(seriesName) ? "line-through" : "none",
            }}
            onClick={() => handleLegendClick(seriesName)}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: `hsl(${
                  (index * 360) / dataset.dataName.length
                }, 70%, 50%)`,
                marginRight: "8px",
              }}
            />
            <span>{seriesName}</span>
          </div>
        ))}
      </div>
    );
  };

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
                    const seriesIndex = dataset.dataName.indexOf(entry.series);
                    const color = `hsl(${
                      (seriesIndex * 360) / dataset.dataName.length
                    }, 70%, 50%)`;
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), ""]} />
                <Legend content={renderCustomLegend} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
