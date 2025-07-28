"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { getDatasetChart } from "../../shared/api/dataset-visual/getDatasetChart";

interface Props {
  datasetId: number;
  colName: string;
}

export function LineChart({ datasetId, colName }: Props) {
  const [dataset, setDataset] = useState<any>(null);
  const [hiddenSeries, setHiddenSeries] = useState<Set<string>>(new Set());

  useEffect(() => {
    getDatasetChart(datasetId, colName).then(setDataset);
  }, [datasetId, colName]);

  // Convert dataset to recharts format
  const rechartsData =
    dataset?.x_label?.map((label, index) => {
      const dataPoint: any = { name: label };
      dataset.dataName.forEach((seriesName, seriesIndex) => {
        dataPoint[seriesName] = dataset.dataList[seriesIndex][index];
      });
      return dataPoint;
    }) || [];

  const handleLegendClick = (dataKey: string) => {
    const newHiddenSeries = new Set(hiddenSeries);
    if (hiddenSeries.has(dataKey)) {
      newHiddenSeries.delete(dataKey);
    } else {
      newHiddenSeries.add(dataKey);
    }
    setHiddenSeries(newHiddenSeries);
  };

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          marginBottom: "16px",
          maxHeight: "120px",
          overflowY: "auto",
          padding: "8px",
        }}
      >
        {payload.map((entry: any) => (
          <div
            key={entry.value}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              opacity: hiddenSeries.has(entry.value) ? 0.5 : 1,
              textDecoration: hiddenSeries.has(entry.value)
                ? "line-through"
                : "none",
            }}
            onClick={() => handleLegendClick(entry.value)}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: entry.color,
                marginRight: "8px",
              }}
            />
            <span>{entry.value}</span>
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              minWidth: `${Math.max(800, (dataset.x_label?.length || 0) * 60)}px`,
              flex: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 범례 */}
            <div style={{ flexShrink: 0 }}>
              {renderCustomLegend({
                payload: dataset.dataName.map((name, index) => ({
                  value: name,
                  color: `hsl(${(index * 360) / dataset.dataName.length}, 70%, 50%)`,
                })),
              })}
            </div>

            {/* 차트 */}
            <div style={{ flex: 1, minHeight: "400px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={rechartsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis tickFormatter={(value) => value.toLocaleString()} />
                  <Tooltip formatter={(value) => [value.toLocaleString(), ""]} />
                  {dataset.dataName.map((seriesName, index) => (
                    <Line
                      key={seriesName}
                      type="monotone"
                      dataKey={seriesName}
                      stroke={`hsl(${
                        (index * 360) / dataset.dataName.length
                      }, 70%, 50%)`}
                      strokeWidth={2}
                      dot={{
                        fill: `hsl(${
                          (index * 360) / dataset.dataName.length
                        }, 70%, 50%)`,
                      }}
                      hide={hiddenSeries.has(seriesName)}
                    />
                  ))}
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
