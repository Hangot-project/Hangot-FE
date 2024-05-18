import { DataType, Organization } from "./dataset";

export interface Scrap {
  scrapId: number;
  datasetId: number;
  title: string;
  description: string;
  type: DataType;
  organization: Organization;
}
