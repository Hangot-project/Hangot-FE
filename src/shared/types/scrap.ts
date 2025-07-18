import { DataType } from "./dataset";

export interface Scrap {
  scrapId: number;
  datasetId: number;
  title: string;
  description: string;
  type: DataType;
  organization: string;
}
