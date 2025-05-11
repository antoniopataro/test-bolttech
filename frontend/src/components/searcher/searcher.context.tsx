import {
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";
import toast from "react-hot-toast";

import type { SearchEntity } from "@/entities/search.entity";
import { useContextFactory } from "@/shared/utils/use-context.factory";

import type { SearcherSchema } from "./searcher.schema";
import { searcherService } from "./searcher.service";

interface Actions {
  createSearch: (data: SearcherSchema) => Promise<SearchEntity | null>;
}

type State = {
  isLoading: boolean;
};

const initialState: State = {
  isLoading: false,
};

type ContextProps = Actions & State;

const SearcherContext = createContext<ContextProps>({} as ContextProps);

export const SearcherProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<State>(initialState);

  const createSearch = useCallback(async (data: SearcherSchema) => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const response = await searcherService.createSearch(data);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));

      toast.error("Failed to create search.");

      return null;
    }

    setState((prev) => ({
      ...prev,
      isLoading: false,
    }));

    const { search } = response.data;

    return search;
  }, []);

  return (
    <SearcherContext.Provider
      value={{
        ...state,
        createSearch,
      }}
    >
      {children}
    </SearcherContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearcher = () =>
  useContextFactory("SearcherContext", SearcherContext);
