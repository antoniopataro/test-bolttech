import type { SearcherSchema } from "@/components/searcher/searcher.schema";
import { CarEntity, type Car } from "@/entities/car.entity";
import { SearchEntity } from "@/entities/search.entity";
import { api } from "@/shared/utils/api";
import type { Either } from "@/shared/utils/either";
import { failure, success } from "@/shared/utils/either";

export type GetSearchResponse = {
  search: SearchEntity;
};

export type ListCarOffersResponse = {
  cars: CarEntity[];
};

class SearchService {
  public async getSearch(
    searchId: string,
  ): Promise<Either<Error, GetSearchResponse>> {
    try {
      const response = await api.get(`/searches/${searchId}`);

      return success({
        search: new SearchEntity(response.data.search),
      });
    } catch (error) {
      return failure(error as Error);
    }
  }

  public async listCarOffers(
    searchId: string,
    data: SearcherSchema,
  ): Promise<Either<Error, ListCarOffersResponse>> {
    try {
      const response = await api.get(`/searches/${searchId}/offers`, {
        params: data,
      });

      return success({
        cars: response.data.cars.map(
          (car: unknown) => new CarEntity(car as Car),
        ),
      });
    } catch (error) {
      return failure(error as Error);
    }
  }
}

export const searchService = new SearchService();
