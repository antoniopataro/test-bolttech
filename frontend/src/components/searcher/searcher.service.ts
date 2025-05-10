import { SearchEntity } from "@/entities/search.entity";
import { api } from "@/shared/utils/api";
import type { Either } from "@/shared/utils/either";
import { failure, success } from "@/shared/utils/either";

import type { SearcherSchema } from "./searcher.schema";

export type CreateSearchResponse = {
  search: SearchEntity;
};

class SearcherService {
  public async createSearch(
    data: SearcherSchema,
  ): Promise<Either<Error, CreateSearchResponse>> {
    try {
      const response = await api.post("/searches", data);

      return success({
        search: new SearchEntity(response.data.search),
      });
    } catch (error) {
      return failure(error as Error);
    }
  }
}

export const searcherService = new SearcherService();
