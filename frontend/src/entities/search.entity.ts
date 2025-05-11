import type { SearcherSchema } from "@/components/searcher/searcher.schema";
import type { Seasons } from "@/shared/enums";

export type Search = {
  id: string;
  days: number;
  period: SearchPeriod;
  seasons: SearchSeasons;
  userId: string | null;
};

type SearchPeriod = {
  endDate: string;
  startDate: string;
};

type SearchSeasons = Record<Seasons, { days: number }>;

export class SearchEntity {
  private readonly _id: string;
  private readonly _days: number;
  private readonly _period: SearchPeriod;
  private readonly _seasons: SearchSeasons;
  private readonly _userId: string | null;

  constructor(attributes: Search) {
    this._id = attributes.id;
    this._days = attributes.days;
    this._period = attributes.period;
    this._seasons = attributes.seasons;
    this._userId = attributes.userId;
  }

  public get id(): string {
    return this._id;
  }

  public get period(): SearchPeriod {
    return this._period;
  }

  public get seasons(): SearchSeasons {
    return this._seasons;
  }

  public get userId(): string | null {
    return this._userId;
  }

  //

  public getDays(): number {
    return this._days;
  }

  public toSearcherSchema(): SearcherSchema {
    return {
      endDate: new Date(this.period.endDate),
      startDate: new Date(this.period.startDate),
    };
  }
}
