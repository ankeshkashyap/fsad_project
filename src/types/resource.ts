export type ResourceCategory = "Article" | "PDF" | "Website";

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  source: string;
}

