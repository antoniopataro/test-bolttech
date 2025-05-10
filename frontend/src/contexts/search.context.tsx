import {
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";

import type { CarEntity } from "@/entities/car.entity";
import type { SearchEntity } from "@/entities/search.entity";
import { useContextFactory } from "@/shared/utils/use-context.factory";

import { searchService } from "./search.service";

interface Actions {
  getSearch: () => Promise<SearchEntity | null>;
  listCarOffers: (search: SearchEntity) => Promise<void>;
}

type Props = {
  searchId: string;
};

type State = {
  isLoadingOffers: boolean;
  isLoadingSearch: boolean;
  offers: CarEntity[] | null;
  search: SearchEntity | null;
};

const initialState: State = {
  isLoadingOffers: false,
  isLoadingSearch: false,
  offers: null,
  search: null,
};

type ContextProps = Actions & Props & State;

const SearchContext = createContext<ContextProps>({
  ...initialState,
} as ContextProps);

export const SearchProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  searchId,
}) => {
  const [state, setState] = useState<State>(initialState);

  const getSearch = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoadingSearch: true,
    }));

    const response = await searchService.getSearch(searchId);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingSearch: false,
      }));

      return null;
    }

    const { search } = response.data;

    setState((prev) => ({
      ...prev,
      isLoadingSearch: false,
      search,
    }));

    return search;
  }, [searchId]);

  const listCarOffers = useCallback(
    async (search: SearchEntity) => {
      setState((prev) => ({
        ...prev,
        isLoadingOffers: true,
      }));

      const response = await searchService.listCarOffers(
        searchId,
        search.toSearcherSchema(),
      );

      if (response.isFailure()) {
        setState((prev) => ({
          ...prev,
          isLoadingOffers: false,
        }));

        return;
      }

      const { cars } = response.data;

      setState((prev) => ({
        ...prev,
        isLoadingOffers: false,
        offers: cars,
      }));
    },
    [searchId],
  );

  return (
    <SearchContext.Provider
      value={{
        ...state,
        getSearch,
        listCarOffers,
        searchId,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = () =>
  useContextFactory("SearchContext", SearchContext);
