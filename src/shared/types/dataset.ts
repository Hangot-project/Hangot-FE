import { DATA_TYPES, ORGANIZATION_VALUES } from "../../constants";

export type Organization = (typeof ORGANIZATION_VALUES)[number];

export type DataType = (typeof DATA_TYPES)[number];

export interface Dataset {
  x_axis_name: string;
  x_label: string[];
  dataName: string[];
  dataList: Array<Array<string>>;
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
}

export interface DatasetInfo {
  datasetId: number;
  title: string;
  description: string;
  organization: Organization;
  view: number;
  type: string;
  themeList: string[];
}

export interface DatasetInfoBanner {
  datasetId: number;
  title: string;
  type: string;
  organization: Organization;
}
