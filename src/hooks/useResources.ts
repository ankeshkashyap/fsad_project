import { useMemo, useState } from "react";
import { Resource, ResourceCategory } from "../types/resource";
import { mockResources } from "../services/mockData";

export interface UseResourcesFilters {
  search: string;
  category: ResourceCategory | "All";
}

export interface UseResourcesResult {
  resources: Resource[];
  filteredResources: Resource[];
  filters: UseResourcesFilters;
  setFilters: (filters: UseResourcesFilters) => void;
}

export const useResources = (): UseResourcesResult => {
  const [resources] = useState<Resource[]>(() => mockResources);
  const [filters, setFilters] = useState<UseResourcesFilters>({
    search: "",
    category: "All"
  });

  const filteredResources = useMemo(() => {
    const searchLower = filters.search.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory =
        filters.category === "All" || resource.category === filters.category;
      const matchesSearch =
        !searchLower ||
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.source.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [resources, filters]);

  return {
    resources,
    filteredResources,
    filters,
    setFilters
  };
};

