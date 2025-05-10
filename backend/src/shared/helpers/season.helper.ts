import { format, isBefore, isWithinInterval } from "date-fns";

import { DEFAULT_SEASON_INTERVALS } from "../constants";
import { Seasons } from "../enums";

class SeasonHelper {
  public getSeason(date: Date): Seasons {
    const formattedDate = format(date, "MM-dd");

    const season = Object.keys(DEFAULT_SEASON_INTERVALS).find((season) => {
      const seasonIntervals = DEFAULT_SEASON_INTERVALS[season as Seasons];

      return seasonIntervals.some((seasonInterval) => {
        const { end, start } = seasonInterval;

        if (isBefore(end, start)) {
          return (
            isWithinInterval(formattedDate, {
              end: "12-31",
              start,
            }) ||
            isWithinInterval(formattedDate, {
              end,
              start: "01-01",
            })
          );
        }

        return isWithinInterval(formattedDate, seasonInterval);
      });
    }) as Seasons | undefined;

    if (!season) {
      return Seasons.OFF;
    }

    return season;
  }
}

export const seasonHelper = new SeasonHelper();
