import { Scrap } from "../../types/scrap";
import { GeneralResponse } from "../config";

interface IsScrap {
  scrap: boolean;
}

export interface IsScrapResponse extends GeneralResponse {
  result: IsScrap;
}

export interface ScrapResponse extends GeneralResponse {
  result: Scrap;
}

export interface ScrapListResponse extends GeneralResponse {
  result: Scrap[];
}
