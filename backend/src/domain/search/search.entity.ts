import { differenceInDays, eachDayOfInterval } from "date-fns";

import { Seasons } from "@/shared/enums";
import { seasonHelper } from "@/shared/helpers/season.helper";

import type { Search, SearchAttributes, SearchSeasons } from "./search.types";

export class SearchEntity {
  private readonly _id: string;
  private readonly _endDate: string;
  private readonly _startDate: string;
  private readonly _userId: string;

  constructor(attributes: SearchAttributes) {
    this._id = attributes.id;
    this._endDate = attributes.endDate;
    this._startDate = attributes.startDate;
    this._userId = attributes.userId;
  }

  public get id(): string {
    return this._id;
  }

  public get endDate(): string {
    return this._endDate;
  }

  public get startDate(): string {
    return this._startDate;
  }

  //

  public calculateSeasons(): SearchSeasons {
    const days = eachDayOfInterval({
      end: this._endDate,
      start: this._startDate,
    });

    const seasons: SearchSeasons = {
      [Seasons.MID]: {
        days: 0,
      },
      [Seasons.OFF]: {
        days: 0,
      },
      [Seasons.PEAK]: {
        days: 0,
      },
    };

    for (const day of days) {
      const season = seasonHelper.getSeason(day);

      if (seasons[season]) {
        seasons[season].days++;
      }
    }

    return seasons;
  }

  public calculateDays(): number {
    return differenceInDays(this._endDate, this._startDate);
  }

  public getEndDate(): string {
    return this._endDate;
  }

  public toSearch(): Search {
    return {
      id: this._id,
      days: this.calculateDays(),
      period: {
        endDate: this._endDate,
        startDate: this._startDate,
      },
      seasons: this.calculateSeasons(),
      userId: this._userId,
    };
  }
}
