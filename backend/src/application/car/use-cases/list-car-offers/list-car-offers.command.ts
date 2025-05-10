import type { CarEntity, CarOffer, ICarRepository } from "@/domain/car";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import { Command } from "@/shared/utils/command";

type Params = {
  endDate: string;
  searchId: string;
  startDate: string;
};

type RelatedEntities = {
  cars: CarEntity[];
  search: SearchEntity;
};

type Result = {
  cars: CarOffer[];
};

export class ListCarOffersCommand extends Command {
  constructor(
    private readonly carRepository: ICarRepository,
    private readonly searchRepository: ISearchRepository,
  ) {
    super(ListCarOffersCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { cars, search } = await this.getRelatedEntities(params);

      this.logFinished();

      return this.buildResult(cars, search);
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private buildResult(cars: CarEntity[], search: SearchEntity): Result {
    return {
      cars: cars.map((car) => car.toCarOffer(search)),
    };
  }

  private async getRelatedEntities(params: Params): Promise<RelatedEntities> {
    const { searchId } = params;

    const [cars, search] = await Promise.all([
      this.carRepository.findAll(),
      this.searchRepository.findById(searchId),
    ]);

    if (!search) {
      throw new Error("Search not found.");
    }

    return {
      cars,
      search,
    };
  }
}
