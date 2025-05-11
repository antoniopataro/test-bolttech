import type { BookingEntity, IBookingRepository } from "@/domain/booking";
import type { CarEntity, CarOffer, ICarRepository } from "@/domain/car";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import { Command } from "@/shared/utils/command";
import { NotFoundError } from "@/shared/utils/errors";

type Params = {
  offerId: string;
  searchId: string;
};

type RelatedEntities = {
  bookings: BookingEntity[];
  car: CarEntity;
  search: SearchEntity;
};

type Result = {
  car: CarOffer;
};

export class GetCarOfferCommand extends Command {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly carRepository: ICarRepository,
    private readonly searchRepository: ISearchRepository,
  ) {
    super(GetCarOfferCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { bookings, car, search } = await this.getRelatedEntities(params);

      this.guardAgainstUnavailableCar(bookings, car);

      this.logFinished();

      const carOffer = car.toCarOffer(
        bookings.length,
        search.calculateDays(),
        search.calculateSeasons(),
      );

      return {
        car: carOffer,
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

    const bookings = await this.bookingRepository.listByOfferId(car.id, {
      endDate: search.endDate,
      startDate: search.startDate,
    });

    return {
      bookings,
      car,
      search,
    };
  }

  private guardAgainstUnavailableCar(
    bookings: BookingEntity[],
    car: CarEntity,
  ): void {
    if (!car.isAvailable(bookings.length)) {
      throw new NotFoundError("Car not available.");
    }
  }
}
