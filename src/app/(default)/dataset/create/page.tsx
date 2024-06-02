import React from "react";
import DataUpload from "./data-upload";
import { getThemes } from "../../../../shared/api/category/getThemes";
import { getLicense } from "../../../../shared/api/category/getLicense";
import { getOrganizations } from "../../../../shared/api/category/getOrganizations";

async function getCategories() {
  const themeList = await getThemes();
  const licenseList = await getLicense();
  const organizationList = await getOrganizations();
  return { themeList, licenseList, organizationList };
}

export default async function Page() {
  const { themeList, licenseList, organizationList } = await getCategories();
  return (
    <DataUpload
      themeList={themeList}
      licenseList={licenseList}
      organizationList={organizationList}
    />
  );
}
