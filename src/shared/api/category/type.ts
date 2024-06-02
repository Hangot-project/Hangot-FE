import { GeneralResponse } from "../config";

export interface ThemeListResponse extends GeneralResponse {
  result: {
    themeList: string[];
  };
}

export interface OrganizationListResponse extends GeneralResponse {
  result: {
    organizationList: string[];
  };
}

export interface LicenseListResponse extends GeneralResponse {
  result: {
    licensesList: string[];
  };
}
