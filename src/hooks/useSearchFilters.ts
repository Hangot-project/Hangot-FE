import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { updateQueryString } from "../utils";
import { SERVER_PARAMS_KEY } from "../constants/dataset-search-params";
import { FilterSelection } from "../shared/types/filter";

export function useSearchFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [activeFilters, setActiveFilters] = useState<{
    types: string[];
    organizations: string[];
  }>({
    types: [],
    organizations: [],
  });

  const parseParamsToRecord = useCallback(
    (params: string): Record<string, string> => {
      const parsed = new URLSearchParams(params);
      const result: Record<string, string> = {};
      parsed.forEach((value, key) => {
        result[key] = value;
      });
      return result;
    },
    [],
  );

  const updateQuery = useCallback(
    (
      type: "create" | "append" | "remove",
      name: string,
      value?: any,
      resetPage?: boolean,
    ): Record<string, string> => {
      const updated = updateQueryString({
        type,
        name,
        value,
        searchParams: searchParams.toString(),
        resetPage,
      });
      return parseParamsToRecord(updated);
    },
    [searchParams, parseParamsToRecord],
  );

  const handleFilterApply = useCallback(
    (filters: FilterSelection) => {
      const updatedQuery = { ...parseParamsToRecord(searchParams.toString()) };

      // types 필터 처리
      if (filters.selectedTypes.length > 0) {
        updatedQuery[SERVER_PARAMS_KEY.TYPE] = filters.selectedTypes.join(",");
      } else {
        delete updatedQuery[SERVER_PARAMS_KEY.TYPE];
      }

      // organizations 필터 처리
      if (filters.selectedOrganizations.length > 0) {
        updatedQuery[SERVER_PARAMS_KEY.ORGANIZATION] =
          filters.selectedOrganizations.join(",");
      } else {
        delete updatedQuery[SERVER_PARAMS_KEY.ORGANIZATION];
      }

      // tags 필터 처리
      if (filters.selectedTags && filters.selectedTags.length > 0) {
        updatedQuery[SERVER_PARAMS_KEY.TAG] = filters.selectedTags.join(",");
      } else {
        delete updatedQuery[SERVER_PARAMS_KEY.TAG];
      }

      // 페이지 초기화
      delete updatedQuery[SERVER_PARAMS_KEY.PAGE];

      const count =
        filters.selectedTypes.length +
        filters.selectedOrganizations.length +
        (filters.selectedTags?.length || 0);
      setActiveFiltersCount(count);
      setActiveFilters({
        types: filters.selectedTypes,
        organizations: filters.selectedOrganizations,
      });

      const queryString = new URLSearchParams(updatedQuery).toString();
      router.push(`${pathName}${queryString ? `?${queryString}` : ""}` as any);
    },
    [router, pathName, searchParams, parseParamsToRecord],
  );

  const handleRemoveFilter = useCallback(
    (type: "types" | "organizations", value: string) => {
      const currentFilters = {
        types:
          type === "types"
            ? activeFilters.types.filter((t) => t !== value)
            : activeFilters.types,
        organizations:
          type === "organizations"
            ? activeFilters.organizations.filter((o) => o !== value)
            : activeFilters.organizations,
      };

      handleFilterApply({
        selectedTypes: currentFilters.types,
        selectedOrganizations: currentFilters.organizations,
      });
    },
    [activeFilters, handleFilterApply],
  );

  const handleClearAllFilters = useCallback(() => {
    handleFilterApply({
      selectedTypes: [],
      selectedOrganizations: [],
    });
  }, [handleFilterApply]);

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>, keyword: string) => {
      event.preventDefault();

      const updatedQuery = updateQuery(
        "create",
        SERVER_PARAMS_KEY.KEYWORD,
        keyword,
        true,
      );

      const queryString = new URLSearchParams(updatedQuery).toString();
      router.push(`/search-result${queryString ? `?${queryString}` : ""}` as any);
    },
    [router, updateQuery],
  );

  useEffect(() => {
    const types = searchParams.get(SERVER_PARAMS_KEY.TYPE);
    const organizations = searchParams.get(SERVER_PARAMS_KEY.ORGANIZATION);

    const count =
      (types ? types.split(",").length : 0) +
      (organizations ? organizations.split(",").length : 0);
    setActiveFiltersCount(count);
    setActiveFilters({
      types: types ? types.split(",") : [],
      organizations: organizations ? organizations.split(",") : [],
    });
  }, [searchParams]);

  return {
    activeFiltersCount,
    activeFilters,
    handleFilterApply,
    handleRemoveFilter,
    handleClearAllFilters,
    handleSearchSubmit,
    updateQuery,
  };
}
