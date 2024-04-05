import { Organization } from "../constants/dataset-search-params";

export interface Dataset {
  x_axis_name: string;
  x_label: string[];
  dataName: string[];
  dataList: Array<Array<string>>;
}

export interface DatasetDetail {
  datasetId: number;
  title: string;
  description: string;
  organization: Organization;
  theme: string[];
  createdDate: string;
  updateDate: string;
  view: number;
  download: number;
  resourceName: string;
  resourceUrl: string;
}
