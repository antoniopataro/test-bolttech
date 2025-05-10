import type { SearchEntity } from "@/entities/search.entity";
import type { Seasons } from "@/shared/enums";

import { SeasonBadge } from "./season-badge/season-badge";
import { components } from "./season-badges.styles.ts";

type Props = {
  search: SearchEntity;
};

export const SeasonBadges: React.FC<Props> = ({ search }) => {
  return (
    <components.root>
      {Object.entries(search.seasons)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, { days }]) => days > 0)
        .map(([season, { days }]) => (
          <SeasonBadge days={days} key={season} season={season as Seasons} />
        ))}
    </components.root>
  );
};
