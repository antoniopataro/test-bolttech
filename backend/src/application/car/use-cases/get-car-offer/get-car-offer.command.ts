import type { CarEntity, CarOffer, ICarRepository } from "@/domain/car";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import { Command } from "@/shared/utils/command";
import { NotFoundError } from "@/shared/utils/errors";

type Params = {
  offerId: string;
  searchId: string;
};

type RelatedEntities = {
  car: CarEntity;
  search: SearchEntity;
};

type Result = {
  car: CarOffer;
};

export class GetCarOfferCommand extends Command {
  constructor(
    private readonly carRepository: ICarRepository,
    private readonly searchRepository: ISearchRepository,
  ) {
    super(GetCarOfferCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { car, search } = await this.getRelatedEntities(params);

      this.logFinished();

      return {
        car: car.toCarOffer(search),
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private async getRelatedEntities(params: Params): Promise<RelatedEntities> {
    const { offerId, searchId } = params;

    const [car, search] = await Promise.all([
      this.carRepository.findById(offerId),
      this.searchRepository.findById(searchId),
    ]);

    if (!car) {
      throw new NotFoundError("Offer not found.");
    }

    if (!search) {
      throw new NotFoundError("Search not found.");
    }

    return {
      car,
      search,
    };
  }
}
