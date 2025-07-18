import { DATA_TYPES } from "../../constants";

export type DataType = (typeof DATA_TYPES)[number];

export interface DatasetChartType {
  x_axis_name: string;
  x_label: string[];
  dataName: string[];
  dataList: Array<Array<string>>;
}

export interface DatasetTableType {
  label: string[];
  dataList: string[][];
}

export interface DatasetInfoDetail {
  datasetId: number;
  title: string;
  description: string;
  organization: string;
  theme: string[];
  createdDate: string;
  updateDate: string;
  view: number;
  scrap: number;
  resourceName: string;
  resourceUrl: string;
  source: string;
  sourceUrl: string;
  type: DataType;
  license: string;
}

export interface DatasetInfo {
  datasetId: number;
  title: string;
  description: string;
  organization: string;
  view: number;
  type: DataType;
  themeList: string[];
  scrap: number;
  createDate: string;
}

export interface DatasetInfoBanner {
  datasetId: number;
  title: string;
  type: DataType;
  organization: string;
  themeList: string[];
  scrap: number;
}
