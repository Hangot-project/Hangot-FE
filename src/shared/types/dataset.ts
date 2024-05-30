import {
  DATA_TYPES,
  ORGANIZATION_VALUES,
  SORT_VALUES,
  THEME_VALUES,
} from "../../constants";

export type Organization = (typeof ORGANIZATION_VALUES)[number];

export type DataType = (typeof DATA_TYPES)[number];

export type SortValueType = (typeof SORT_VALUES)[number];

export type ThemeType = (typeof THEME_VALUES)[number];

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
  organization: Organization;
  theme: string[];
  createdDate: string;
  updateDate: string;
  view: number;
  scrap: number;
  download: number;
  resourceName: string;
  resourceUrl: string;
  type: DataType;
  license: string;
}

export interface DatasetInfo {
  datasetId: number;
  title: string;
  description: string;
  organization: Organization;
  view: number;
  type: DataType;
  themeList: string[];
  scrap: number;
}

export interface DatasetInfoBanner {
  datasetId: number;
  title: string;
  type: DataType;
  organization: Organization;
  themeList: ThemeType[];
  scrap: number;
}
