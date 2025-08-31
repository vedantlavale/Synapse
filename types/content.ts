export interface Content {
  id: string;
  title: string;
  description?: string;
  link: string;
  type?: string;
  user?: {
    name: string;
    email: string;
  };
}

export interface ContentCounts {
  all: number;
  youtube: number;
  twitter: number;
  url: number;
}

export type FilterType = "all" | "youtube" | "twitter" | "url";
