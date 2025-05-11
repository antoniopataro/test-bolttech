import type { BookingEntity, IBookingRepository } from "@/domain/booking";
import type { CarEntity, CarOffer, ICarRepository } from "@/domain/car";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import { Command } from "@/shared/utils/command";
import { NotFoundError } from "@/shared/utils/errors";

type Params = {
  endDate: string;
  searchId: string;
  startDate: string;
};

type RelatedEntities = {
  bookings: BookingEntity[];
  cars: CarEntity[];
  search: SearchEntity;
};

type Result = {
  cars: CarOffer[];
};

export class ListCarOffersCommand extends Command {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly carRepository: ICarRepository,
    private readonly searchRepository: ISearchRepository,
  ) {
    super(ListCarOffersCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { bookings, cars, search } = await this.getRelatedEntities(params);

      this.logFinished();

      return {
        cars: cars
          .filter((car) => car.isAvailable(bookings))
          .map((car) => car.toCarOffer(bookings, search)),
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private async getRelatedEntities(params: Params): Promise<RelatedEntities> {
    const { searchId } = params;

    const [cars, search] = await Promise.all([
      this.carRepository.listAll(),
      this.searchRepository.findById(searchId),
    ]);

    if (!search) {
      throw new NotFoundError("Search not found.");
    }

    const bookings = await this.bookingRepository.listByPeriod({
      endDate: params.endDate,
      startDate: params.startDate,
    });

    return {
      bookings,
      cars,
      search,
    };
  }
}
