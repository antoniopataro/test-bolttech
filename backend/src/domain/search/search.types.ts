import type { Seasons } from "@/shared/enums";

export type SearchAttributes = {
  id: string;
  endDate: string;
  startDate: string;
  userId: string;
};

export type SearchCreationAttributes = Omit<SearchAttributes, "id">;

export type Search = {
  id: string;
  days: number;
  period: SearchPeriod;
  seasons: SearchSeasons;
  userId: string | null;
};

export type SearchPeriod = {
  endDate: string;
  startDate: string;
};

export type SearchSeasons = Record<Seasons, { days: number }>;
