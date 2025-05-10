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
      <components.label>
        {days} days during {SEASONS_TRANSLATIONS[season]} season
      </components.label>
    </components.root>
  );
};
