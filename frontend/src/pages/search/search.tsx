import { useEffect } from "react";

import { Listing } from "@/components/listing/listing";
import { Searcher } from "@/components/searcher/searcher";
import { SeasonBadges } from "@/components/season-badges/season-badges";
import { useSearch } from "@/contexts/search.context";

import { components } from "./search.styles";

export const Search: React.FC = () => {
  const {
    getSearch,
    isLoadingOffers,
    isLoadingSearch,
    listCarOffers,
    offers,
    search,
  } = useSearch();

  useEffect(() => {
    void (async () => {
      const search = await getSearch();

      if (!search) {
        return;
      }

      await listCarOffers(search);
    })();
  }, [getSearch, listCarOffers]);

  if (isLoadingSearch) {
    return (
      <components.root>
        <components.loading>Loading...</components.loading>
      </components.root>
    );
  }

  if (!search) {
    return (
      <components.root>
        <components.empty.paragraph>
          <components.empty.text>Failed to load search. </components.empty.text>
          <components.empty.link to="/">Go back</components.empty.link>
        </components.empty.paragraph>
      </components.root>
    );
  }

  return (
    <components.root>
      <Searcher
        defaultValues={search.toSearcherSchema()}
        isLoading={isLoadingSearch}
      />
      <SeasonBadges search={search} />
      <Listing isLoading={isLoadingOffers} offers={offers} search={search} />
    </components.root>
  );
};
