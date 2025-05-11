import { SEASONS_TRANSLATIONS } from "@/shared/constants";
import type { Seasons } from "@/shared/enums";

import { components } from "./season-badge.styles";

type Props = {
  days: number;
  season: Seasons;
};

export const SeasonBadge: React.FC<Props> = ({ days, season }) => {
  return (
    <components.root>
      <components.indicator season={season} />
      <components.label>
        {days} {days === 1 ? "day" : "days"} during{" "}
        {SEASONS_TRANSLATIONS[season]} season
      </components.label>
    </components.root>
  );
};
